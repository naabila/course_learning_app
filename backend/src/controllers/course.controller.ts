import { Request, Response, NextFunction } from 'express';
import Course from '../models/course.model';
import User from '../models/user.model';
import { errorResponse } from '../utils/errorResponse';
import { successResponse } from '../utils/successResponse';

interface AuthRequest extends Request {
  user?: { id: string; role: string; firebaseUid: string };
}

export const createCourse = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, description, subject, level } = req.body;
    const course = await Course.create({
      title,
      description,
      teacher: req.user?.id,
      subject,
      level,
    });

    await User.findByIdAndUpdate(req.user?.id, { $push: { coursesCreated: course._id } });

    successResponse(res, 201, 'Course created successfully', course);
  } catch (error) {
    next(error);
  }
};

export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, searchTerm } = req.query;

    const query: any = {};
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { subject: { $regex: searchTerm, $options: 'i' } },
        { level: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    const courses = await Course.find(query)
      .populate('teacher', 'name')
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await Course.countDocuments(query);

    successResponse(res, 200, 'Courses retrieved successfully', {
      courses,
      total,
      page: +page,
      limit: +limit,
    });
  } catch (error) {
    next(error);
  }
};

export const enrollCourse = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return errorResponse(res, 404, 'Course not found');
    }

    if (course.students.includes(req.user?.id as any)) {
      return errorResponse(res, 400, 'Already enrolled');
    }

    course.students.push(req.user?.id as any);
    course.views += 1;
    await course.save();

    await User.findByIdAndUpdate(req.user?.id, { $push: { coursesEnrolled: course._id } });

    successResponse(res, 200, 'Enrolled successfully', course);
  } catch (error) {
    next(error);
  }
};