import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const userSchema = new Schema<IUser>({
  firebaseUid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['student', 'teacher'], required: true },
  coursesEnrolled: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  coursesCreated: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  followedTeachers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<IUser>('User', userSchema);