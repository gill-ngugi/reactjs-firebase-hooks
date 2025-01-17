# Portfolio Site with Firebase
## Overview
-------------
A dynamic portfolio website built with React and Firebase, featuring authentication, real-time updates, and an admin dashboard for content management. This application allows administrators to manage projects, skills, and biographical information through a secure interface while providing visitors with a responsive and engaging viewing experience.

# Features
🔐 Secure Authentication System

👩‍💼 Admin Dashboard

📱 Responsive Design

🔄 Real-time Updates

📁 Project Management

💪 Skills Showcase

👤 Bio Management

🖼️ Image Upload Support

📊 Analytics Integration

# Tech Stack
React.js

Firebase

Authentication

Firestore

Storage

Analytics

React Router

Environment Variables

CSS3

# Prerequisites
Node.js (v14 or higher)
npm or yarn
Firebase account
Git

# Installation
1. Clone the repository
git clone https://github.com/gill-ngugi/react-redux-reducers.git 

2. Install dependencies
npm install or yarn install

3. Create a Firebase project
Go to Firebase Console
Create a new project
Enable Authentication, Firestore, and Storage services

4. npm start

# Firebase Configuration
Security Rules
Add these rules to your Firebase Console:
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth.uid == 'YOUR_ADMIN_UID';
    }
    
    match /{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}

// Storage Rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == 'YOUR_ADMIN_UID';
    }
  }
}

# Usage
## Admin Access
------------------
Create an admin user through Firebase Authentication

Set the user's UID in your Firebase security rules

Use the admin credentials to log in through the /signin route

## Content Management
Through the admin dashboard, you can:

Add/Edit/Delete projects

Update skills and proficiency levels

Modify biographical information

Upload images and files

## Public Access
Visitors can:

View projects

Browse skills

Read biographical information

Contact through provided channels

# Components
## Authentication
-------------------
SignIn.js - Handles admin authentication
PrivateRoute.js - Protects admin routes

## Admin Dashboard
-------------------
Dashboard.js - Main admin interface

ProjectForm.js - Project management

SkillForm.js - Skills management

BioForm.js - Biography management

## Public Views
----------------
Projects.js - Displays projects

Skills.js - Shows skills

Bio.js - Presents biographical information

# Deployment
## Build the project
npm run build

## Deploy to Firebase
npm install -g firebase-tools
firebase login
firebase init
firebase deploy


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
