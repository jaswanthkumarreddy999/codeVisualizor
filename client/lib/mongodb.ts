import mongoose from 'mongoose';

// Cache connection across hot-reloads in development
let cached = (global as any).__mongoose_cache;
if (!cached) {
  cached = (global as any).__mongoose_cache = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI environment variable is not set. ' +
      'Please add it to .env.local with your MongoDB Atlas connection string.'
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected:', mongoose.connection.db?.databaseName);
    });
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
