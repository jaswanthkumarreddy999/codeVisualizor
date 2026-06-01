import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgram extends Document {
  title: string;
  code: string;
  language: 'typescript' | 'python' | 'java' | 'c' | 'cpp';
  folderId: string | null;
  isPublic: boolean;
  ownerId: string | null;
  visualizedVariables: string[];
  ignoredPointers: Record<string, string[]>;
  visualizerPositions: Record<string, { x: number; y: number }>;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema = new Schema<IProgram>({
  title:    { type: String, required: true },
  code:     { type: String, default: '' },
  language: { type: String, enum: ['typescript','python','java','c','cpp'], default: 'java' },
  folderId: { type: String, default: null },
  isPublic: { type: Boolean, default: false },
  ownerId:  { type: String, default: null },
  visualizedVariables: { type: [String], default: [] },
  ignoredPointers:     { type: Schema.Types.Mixed, default: {} },
  visualizerPositions: { type: Schema.Types.Mixed, default: {} },
  order:    { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ProgramSchema.index({ ownerId: 1, folderId: 1 });
ProgramSchema.index({ isPublic: 1, folderId: 1 });

export const Program: Model<IProgram> =
  mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);
