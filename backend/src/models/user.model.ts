import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const userSchema = new Schema<IUser>({
  firebaseUid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['student', 'teacher'], required: true },
  coursesEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  coursesCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  followedTeachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<IUser>('User', userSchema);