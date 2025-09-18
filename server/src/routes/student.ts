import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate, authorize, AuthRequest } from "../middleware/authMiddleware";
import { permit } from "../middleware/roleMiddleware";

const router = Router();
const prisma = new PrismaClient();

// Protect all routes: only logged-in students
// router.use(authenticate, permit("STUDENT"));

router.use(authenticate, authorize(["STUDENT"]));

// List all teachers
router.get("/teachers", async (req, res) => {
  try {
    const teachers = await prisma.user.findMany({
      where: { role: "TEACHER" },
      select: { id: true, name: true, email: true },
    });
    res.json({ teachers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// List courses of a specific teacher
router.get("/teachers/:teacherId/courses", async (req, res) => {
  const teacherId = Number(req.params.teacherId);

  try {
    const courses = await prisma.course.findMany({
      where: { teacherId },
      include: { videos: true },
    });

    res.json({ courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Enroll in a course
router.post("/courses/:courseId/enroll", async (req: AuthRequest, res) => {
  const studentId = req.user!.userId;
  const courseId = Number(req.params.courseId);

  try {
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: { studentId, courseId },
    });

    if (existingEnrollment)
      return res.status(400).json({ message: "Already enrolled" });

    const enrollment = await prisma.enrollment.create({
      data: { studentId, courseId },
    });

    res.json({ message: "Enrolled successfully", enrollment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// List student's enrolled courses
router.get("/my-courses", async (req: AuthRequest, res) => {
  const studentId = req.user!.userId;

  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: { course: { include: { teacher: true, videos: true } } },
    });

    const courses = enrollments.map((e) => e.course);
    res.json({ courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
