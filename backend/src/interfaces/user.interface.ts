import { Document } from 'mongoose';

export interface IUser extends Document {
  firebaseUid: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  coursesEnrolled: string[];
  coursesCreated: string[];
  followedTeachers: string[];
}