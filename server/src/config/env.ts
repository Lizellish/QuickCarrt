// env.ts
// reads the settings from the .env file in one place, so the rest of the code uses `env.port`, `env.mongoUri`, etc

import dotenv from "dotenv";

dotenv.config({ quiet: true });

// === Step 1: Read the settings from .env
//All settings (port, database address, JWT Secret....) are read from .env here, once, so the rest of the code uses env.port, env.monogoUri and so on.

//Next: Step 2 (Connect to MongoDB) - server/src/config/database.ts

export const env = {
  port: Number(process.env.Port) || 5000,
  mongoUri:
    process.env.MONGO_URL ||
    "mongodb+srv://agbelusi11_db_user:ZPNX1DSHO1sgKqI6@cluster0.6fqokkd.mongodb.net/quicktask",

  jwtSecret: process.env.JWT_SECRET || "dev-secret-dontchange-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15d", // "Remain logged in for 15days"
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
};

// Note i change the mongoDB fetch code from MongoUTL to MongoURL num-16
