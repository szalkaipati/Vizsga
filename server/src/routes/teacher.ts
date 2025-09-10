import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate, authorize, AuthRequest } from "../middleware/authMiddleware";

const router = Router();
const prisma = new PrismaClient();

// Protect all teacher routes
router.use(authenticate, authorize(["TEACHER"]));

// Create a new course
router.post("/courses", async (req: AuthRequest, res) => {
  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).json({ message: "Name and description required" });

  try {
    const course = await prisma.course.create({
      data: {
        name,
        description,
        teacherId: req.user!.userId,
      },
    });
    res.status(201).json({ message: "Course created", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all courses for logged-in teacher
router.get("/courses", async (req: AuthRequest, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: { teacherId: req.user!.userId },
      include: { videos: true, enrollments: { include: { student: true } } },
    });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a video to a course
router.post("/courses/:courseId/videos", async (req: AuthRequest, res) => {
  const { url, title } = req.body;
  const { courseId } = req.params;

  if (!url || !title) return res.status(400).json({ message: "URL and title required" });

  try {
    const course = await prisma.course.findUnique({ where: { id: Number(courseId) } });

    if (!course || course.teacherId !== req.user!.userId) {
      return res.status(403).json({ message: "Forbidden: Not your course" });
    }

    const video = await prisma.video.create({
      data: { title, url, courseId: course.id },
    });

    res.status(201).json({ message: "Video added", video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a course (only teacher's own) with related videos and enrollments
router.delete("/courses/:courseId", async (req: AuthRequest, res) => {
  const { courseId } = req.params;
  const courseIdNum = Number(courseId);

  try {
    // Fetch course and check ownership
    const course = await prisma.course.findUnique({ where: { id: courseIdNum } });
    if (!course || course.teacherId !== req.user!.userId) {
      return res.status(403).json({ message: "Forbidden: Not your course" });
    }

    // Delete related videos first
    await prisma.video.deleteMany({ where: { courseId: courseIdNum } });

    // Delete related enrollments
    await prisma.enrollment.deleteMany({ where: { courseId: courseIdNum } });

    // Finally delete the course
    await prisma.course.delete({ where: { id: courseIdNum } });

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
