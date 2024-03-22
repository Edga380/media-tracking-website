import express from "express";
const app = express();
const port = 3000;
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import {
  initializeDatabase,
  registerNewUser,
  loginUser,
  retrieveUserCookieData,
  removeUserSession,
} from "./database/database.js";
const usersDataBase = initializeDatabase(
  process.env.USERS_DB,
  process.env.USERS_SCHEMA
);
const mediaDataBase = initializeDatabase(
  process.env.MEDIA_DB,
  process.env.MEDIA_SCHEMA
);

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser(process.env.PARSE_COOKIE));
app.use(express.json());

app.post("/check-login", async (req, res) => {
  const retrieveSessionData = await retrieveUserCookieData(
    usersDataBase,
    req.signedCookies.mediaTrackingWebsiteCookie
  );
  if (retrieveSessionData) {
    res.status(200).json(retrieveSessionData);
  } else {
    res.status(401).json({ error: "Cookie data not found in the database." });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userData = await loginUser(usersDataBase, username, password);
  if (userData.success) {
    res.cookie("mediaTrackingWebsiteCookie", userData.userSessionId, {
      signed: true,
      httpOnly: true,
      sameSite: "lax",
    });
    res.status(200).json({ message: "Login successful." });
  } else {
    res.status(401).json({ error: "Invalid username or password." });
  }
});

app.post("/logout", async (req, res) => {
  const logoutResponse = await removeUserSession(
    usersDataBase,
    req.signedCookies.mediaTrackingWebsiteCookie
  );
  if (logoutResponse) {
    res.status(200).json(logoutResponse);
  } else {
    res.status(401).json({ error: "Cookie data not found in the database." });
  }
});

app.post("/register", async (req, res) => {
  const { chooseUsername, choosePassword, confirmPassword } = req.body;
  if (choosePassword === confirmPassword) {
    const userRegistration = await registerNewUser(
      usersDataBase,
      chooseUsername,
      choosePassword
    );
    if (userRegistration) {
      res.status(200).json({ message: "Registration successful." });
    } else {
      res.status(401).json({ message: "Username taken." });
    }
  } else {
    res.status(401).json({ message: "Passwords do not match." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
