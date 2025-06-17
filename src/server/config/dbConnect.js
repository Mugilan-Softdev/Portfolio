import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
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
      dbName: "Portfolio", // Fixed spelling
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    mongoose.set("strictQuery", true);

    try {
      cached.promise = mongoose.connect(MONGODB_URI, opts);
    } catch (error) {
      cached.promise = null;
      console.error("Failed to establish MongoDB connection:", error);
      throw new Error("Database connection failed");
    }
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ Database connected successfully");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("Error connecting to MongoDB:", error);
    throw new Error(
      "Failed to connect to database. Please check your connection string and network."
    );
  }
}

// Handle connection errors
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
  cached.promise = null;
  cached.conn = null;
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
  cached.promise = null;
  cached.conn = null;
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default dbConnect;
