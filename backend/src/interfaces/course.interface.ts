import { Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  teacher: string; // Stored as string (ObjectId in string form)
  lessons: string[]; // Stored as string (ObjectId in string form)
  students: string[]; // Stored as string (ObjectId in string form)
  likes: string[]; // Stored as string (ObjectId in string form)
  feedback: { user: string; comment: string }[];
  views: number;
  subject?: string;
  level?: string;
}