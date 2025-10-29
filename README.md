# Lead Manager Backend - Express.js Guide

This guide will walk you through the installation and setup process for the Lead Manager backend using Express.js with a MongoDB database.

## Prerequisites

Make sure you have the following installed:

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- MongoDB (Atlas or local)

## Installation Steps

### 1. Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### 2. Configure Environment Variables
Create a .env file in the root of the backend folder and add the following:

```env
MONGO_URI=<your-mongo-uri>
```
Replace <your-mongo-uri> with your MongoDB connection string.

### 3. Start the Server
Run the following command to start the Express.js server:

```bash
npm run dev
```
Or for production:

```bash
npm start
```
The server should now be running at http://localhost:4000.
