import mongoose, { Schema } from 'mongoose';
import { ICourse } from '../interfaces/course.interface';

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  feedback: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, comment: String }],
  views: { type: Number, default: 0 },
  subject: { type: String },
  level: { type: String },
});

// Explicitly type the model
export default mongoose.model<ICourse>('Course', courseSchema);