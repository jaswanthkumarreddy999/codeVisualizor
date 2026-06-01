import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  email: string;
  name: string;
  avatar: string;
  role: 'admin' | 'user';
  age?: number;
  major?: string;
  institution?: string;
  bio?: string;
  isProfileComplete: boolean;
  createdAt: Date;
  lastLoginAt: Date;
}

const UserSchema = new Schema<IUser>({
  googleId: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  name:     { type: String, required: true },
  avatar:   { type: String, default: '' },
  role:     { type: String, enum: ['admin', 'user'], default: 'user' },
  age:      { type: Number },
  major:    { type: String },
  institution: { type: String },
  bio:      { type: String },
  isProfileComplete: { type: Boolean, default: false },
  createdAt:   { type: Date, default: Date.now },
  lastLoginAt: { type: Date, default: Date.now },
});

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
