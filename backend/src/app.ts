import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.config';
import userRoutes from './routes/user.routes';
import courseRoutes from './routes/course.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Course Learning App API.' });
  });

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/courses', courseRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));