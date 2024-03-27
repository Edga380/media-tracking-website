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
export function initializeDatabase(databaseName, schemaToRead) {
  const dbFilePath = path.join(__dirname, databaseName);
  const db = new Database(dbFilePath);

  // Read the schema
  const schemaPath = path.join(__dirname, schemaToRead);
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
    "INSERT INTO Users (username, password, joined_in) VALUES (?, ?, ?)"
  );
  try {
    stmt.run(username, hashedPassword, getCurrentYearMonthDay());
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

export async function retrieveUserData(db, signedCookie) {
  const stmt = db.prepare("SELECT * FROM Sessions WHERE id = ?");
  const userSessionData = stmt.get(signedCookie);
  if (userSessionData) {
    const stmt = db.prepare(
      "SELECT user_id, username, joined_in FROM Users WHERE user_id = ?"
    );
    const usernameData = stmt.get(userSessionData.user_id);
    return usernameData;
  } else {
    return false;
  }
}

export async function addMedia(db, userId, mediaData) {
  const stmt = db.prepare(
    "INSERT INTO Media (user_id, image_url, name, description, category, genre, year, duration, watched) VALUES (?, ?, ?, ?, ?, ?, ?, ?, false)"
  );
  try {
    stmt.run(
      userId,
      mediaData.imgUrl,
      mediaData.name,
      mediaData.description,
      mediaData.category,
      mediaData.genre,
      mediaData.year,
      mediaData.duration
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function editMedia(db, editedMediaData) {
  const stmt = db.prepare(
    "UPDATE Media SET image_url = ?, name = ?, description = ?, category = ?, genre = ?, year = ?, duration = ?, watched = ? WHERE user_id = ? AND media_id = ?"
  );
  const mediaData = stmt.run(
    editedMediaData.image_url,
    editedMediaData.name,
    editedMediaData.description,
    editedMediaData.category,
    editedMediaData.genre,
    editedMediaData.year,
    editedMediaData.duration,
    editedMediaData.watched,
    editedMediaData.user_id,
    editedMediaData.media_id
  );
  if (mediaData.changes > 0) {
    return true;
  } else {
    return false;
  }
}

export async function editMediaWatched(db, editedMediaData) {
  const stmt = db.prepare(
    "UPDATE Media SET watched = ? WHERE user_id = ? AND media_id = ?"
  );
  const changeWachedState = editedMediaData.watched == 0 ? 1 : 0;
  const mediaData = stmt.run(
    changeWachedState,
    editedMediaData.user_id,
    editedMediaData.media_id
  );
  if (mediaData.changes > 0) {
    return changeWachedState;
  } else {
    return false;
  }
}

export async function retrieveMedia(db, userId) {
  const stmt = db.prepare("SELECT * FROM Media WHERE user_id = ?");
  const mediaData = stmt.all(userId);
  if (mediaData) {
    return mediaData;
  } else {
    return false;
  }
}

function getCurrentYearMonthDay() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
