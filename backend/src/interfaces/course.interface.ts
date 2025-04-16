import { Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  teacher: string;
  lessons: string[];
  students: string[];
  likes: string[];
  feedback: { user: string; comment: string }[];
  views: number;
  subject?: string;
  level?: string;
}