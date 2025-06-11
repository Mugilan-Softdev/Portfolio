import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("please provide valid url");
}

// ✅ First ensure global.mongoose exists
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

// ✅ Then assign it to cached
let cached = global.mongoose;

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      dbName: "Protfolio", // keep your spelling if this is intentional
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log("db connected successfully");
    return cached.conn;
  } catch (error) {
    console.error("error while connecting to db");
    throw error;
  }
}

export default dbConnect;
