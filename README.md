# Media Tracking Website

The primary objective of this website is to gain a deeper understanding of authentication mechanisms and the implementation of user cookies. Upon a user's login, a session cookie is generated with a unique identifier to facilitate their interaction with the site. Additionally, a unique identifier that was assigned to each user is stored in the website's database. This unique identifier serves as a reference point for identifying users and managing their sessions. As a result, users experience seamless automatic login, triggered by the verification of their unique identifier in the database.

## Features

1. Registration System: Users can sign up and create an account on the website.
2. Login System: Registered users can securely log in to their accounts.
3. Session Management: Creation and management of user sessions using cookies to maintain user state.
4. Database Integration: Storing user data, including unique identifiers, in a database for retrieval and verification.
5. Automatic Login: Enabling users to be logged in automatically upon returning visits based on their unique identifier.
6. Profile Page: Each user has a dedicated page displaying their personal information.
7. Add Media: Users can add media by providing information about it.
8. Edit Media: Existing media can be edited.
9. Delete Media: Users have the ability to remove media from the database as needed.
10. Search for Media: The website offers a search functionality, enabling users to find specific media using keywords.

## Technologies Used

- React: Frontend
- Express.js: Backend
- SQLite: Database

## Installation

Clone the repository:

```
git clone https://github.com/Edga380/media-tracking-website.git
```

## Navigate to the project directory:

```
cd media-tracking-website
```

## Install dependencies:

```
npm install
```

## First start Express server:

```
node server.js
```

## Second start React application:

```
npm run dev
```

Open your web browser and navigate to http://localhost:5173 to access the application.
