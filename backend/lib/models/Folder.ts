import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFolder extends Document {
  name: string;
  icon: string;
  color: string;
  description: string;
  isPublic: boolean;
  ownerId: string | null;
  order: number;
  createdAt: Date;
}

const FolderSchema = new Schema<IFolder>({
  name:        { type: String, required: true },
  icon:        { type: String, default: 'Folder' },
  color:       { type: String, default: '#10b981' },
  description: { type: String, default: '' },
  isPublic:    { type: Boolean, default: false },
  ownerId:     { type: String, default: null },
  order:       { type: Number, default: 0 },
  createdAt:   { type: Date, default: Date.now },
});

FolderSchema.index({ ownerId: 1, isPublic: 1 });

export const Folder: Model<IFolder> =
  mongoose.models.Folder || mongoose.model<IFolder>('Folder', FolderSchema);
