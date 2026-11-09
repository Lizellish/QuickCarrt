//database.ts
//Connects to MongoDB using the MONGO_URL from the .env file

import mongoose from "mongoose";
import { env } from "./env";

// Step 2: Connect to MongoDB
// connectDB() opens the connection to MongoDb with the address from .env .server.ts, calls it before the API Starts

export const connectDB = async () => {
  const connection = await mongoose.connect(env.mongoUri);
  console.log(`MongoDB Connected: ${connection.connection.host}`);
};

// Next: Step 3 (Create the Express app) -> server/src/app.ts
