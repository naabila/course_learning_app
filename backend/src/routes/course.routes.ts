import express from 'express';
import { createCourse, getCourses, enrollCourse } from '../controllers/course.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getCourses);
router.post('/', protect, restrictTo('teacher'), createCourse);
router.post('/:id/enroll', protect, restrictTo('student'), enrollCourse);

export default router;