# Flight Management System

## Overview
This application allows agents to register, manage flight updates, and add passenger tickets. Passengers are notified of flight status updates via SMS and email.

## Features
- Agent registration with OTP verification via phone and email
- Add and update flights
- Add passenger requiring phone and email
- Notification to passengers when flight is updated

## Technologies Used
- Node.js
- Express.js
- Nodemailer
- Redis
- JSON Web Tokens (JWT)
- OTP verification

## Prerequisites
- Node.js (v14.x or later)
- Redis
- A configured SMTP server (e.g., Gmail)

## Environment Variables
Create a `.env` file in the root of your project and add the following environment variables:

```plaintext
JWT_SECRET=HACKATHON
JWT_EXPIRES_IN=<JWT expiry time>
NODEMAILER_EMAIL=<your email>
NODEMAILER_PASSWORD=<your email password>
REDIS_HOST=<redis host>
REDIS_PORT=<redis port>
DB_HOST=<database host>
DB_PORT=<database port>
DB_USERNAME=<database username>
DB_PASSWORD=<database password>
```

## Starting App

```npm run start:dev```
