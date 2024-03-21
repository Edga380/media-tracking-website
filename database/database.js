import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import dotenv from "dotenv";
dotenv.config();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Initialize database
export function initializeDatabase(databaseName) {
  const dbFilePath = path.join(__dirname, databaseName);
  const db = new Database(dbFilePath);

  // Read the schema
  const schemaPath = path.join(__dirname, "createUsersDataBase.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  // Execute schema
  db.exec(schema);

  return db;
}

export async function registerNewUser(db, username, password) {
  const hashedPassword = await bcrypt.hash(
    password + process.env.HASH_PASSWORD_ADDON,
    12
  );
  const stmt = db.prepare(
    "INSERT INTO Users (username, password) VALUES (?, ?)"
  );
  try {
    stmt.run(username, hashedPassword);
    return true;
  } catch (error) {
    return false;
  }
}

export async function loginUser(db, username, password) {
  const userPasswordFromDb = await getUserPassword(db, username);
  const comparePasswords = await bcrypt.compare(
    password + process.env.HASH_PASSWORD_ADDON,
    userPasswordFromDb
  );
  if (comparePasswords) {
    const userId = await getUserId(db, username);
    const userSession = await setUserSession(db, userId.user_id);
    return { success: true, userSessionId: userSession };
  } else {
    return { success: false, error: "User not found" };
  }
}

async function setUserSession(db, userId) {
  const randomSessionId = crypto.randomBytes(18).toString("base64");
  const stmt = db.prepare(
    "INSERT INTO Sessions (id, user_id, expires_at) VALUES (?, ?, DATE('now', '+7 days'))"
  );
  try {
    stmt.run(randomSessionId, userId);
    return randomSessionId;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function removeUserSession(db, signedCookie) {
  const stmt = db.prepare("DELETE FROM Sessions WHERE id = ?");
  try {
    stmt.run(signedCookie);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function retrieveUserCookieData(db, signedCookie) {
  const stmt = db.prepare("SELECT * FROM Sessions WHERE id = ?");
  const userSessionData = stmt.get(signedCookie);
  if (userSessionData) {
    if (userSessionData.expires_at < getCurrentYearMonthDay()) {
      const stmt = db.prepare("DELETE FROM Sessions WHERE id = ?");
      stmt.run(signedCookie);
      return false;
    }
    const stmt = db.prepare("SELECT username FROM Users WHERE user_id = ?");
    const username = stmt.get(userSessionData.user_id);
    return username;
  } else {
    return false;
  }
}

async function getUserPassword(db, username) {
  const stmt = db.prepare("SELECT password FROM Users WHERE username = ?");
  const userPasswordDb = stmt.get(username);
  if (userPasswordDb) {
    return userPasswordDb.password;
  } else {
    return "null";
  }
}

async function getUserId(db, username) {
  const stmt = db.prepare("SELECT user_id FROM Users WHERE username = ?");
  const userIddDb = stmt.get(username);
  return userIddDb;
}

function getCurrentYearMonthDay() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
