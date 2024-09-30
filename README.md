# Project Title

A brief description of your project goes here.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Client Setup](#client-setup)
  - [Server Setup](#server-setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)

## Technologies Used

- React (Client)
- Node.js with Express (Server)
- TypeScript (for both client and server)
- PostgreSQL (Database)
- Prisma (ORM)
- Yarn (for client package management)
- npm (for server package management)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later) installed on your machine.
- Yarn (for the client) installed globally:
  ```sh
  npm install -g yarn
  ```

## Getting Started  

### Client Setup
1. Navigate to the client directory:
```sh
cd client
```
2. Install the necessary dependencies using Yarn:
```sh
yarn install
```

### Server Setup
1. Navigate to the server directory:
```sh
cd server
```
2. Install the necessary dependencies using npm:
```sh
npm install
```
3. Create a .env file in the server directory (if you haven't done this already) and add your environment variables, e.g.:
```sh
DATABASE_URL=postgres://username:password@localhost:5432/your_database
PORT=5001
JWT_SECRET=secret
```

## Database Setup

1. Create a new PostgreSQL database:
```sh
CREATE DATABASE your_database;
```

2. Run the following command to generate and apply migrations for your Prisma schema:
```sh
npx prisma migrate dev --name init
```

3. Run the following command to generate the Prisma Client:
```sh
npx prisma generate
```

## Running the Application

### Run the Server
1. In the server directory, start the server:
```sh
npm run start
```

### Run the Client
1. In the client directory, start the React app:
```sh
yarn start
```
