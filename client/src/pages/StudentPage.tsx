import { useEffect, useState } from "react";
import api from "../api/axios";
import "./StudentPage.css";
import Navbar from "./Navbar";

interface Video {
  id: number;
  title: string;
  url: string;
}

interface Course {
  id: number;
  name: string;
  description: string;
  teacher: { name: string; email: string };
  videos: Video[];
}

interface Teacher {
  id: number;
  name: string;
  email: string;
  courses?: Course[];
}

const StudentPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  const fetchTeachers = async () => {
    try {
      const res = await api.get("/student/teachers");
      setTeachers(res.data.teachers); // <-- use .teachers
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCourses = async (teacherId: number) => {
    try {
      const res = await api.get(`/student/teachers/${teacherId}/courses`);
      setTeachers(prev =>
        prev.map(t =>
          t.id === teacherId ? { ...t, courses: res.data.courses } : t
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnroll = async (courseId: number) => {
    try {
      await api.post(`/student/courses/${courseId}/enroll`);
      alert("Enrolled successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error enrolling");
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const res = await api.get("/student/my-courses");
      setEnrolledCourses(res.data.courses); // <-- matches your backend
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchEnrolledCourses();
  }, []);

  return (
    <>
      <Navbar />
      <div className="student-page">
        <h1>Student Dashboard</h1>

        {teachers.map(teacher => (
          <div key={teacher.id} className="teacher-card">
            <h2>{teacher.name}</h2>
            <p>{teacher.email}</p>
            <button className="button show-courses-button" onClick={() => { setSelectedTeacherId(teacher.id); fetchCourses(teacher.id); }}>
              Show Courses
            </button>

            {teacher.courses?.map(course => (
              <div key={course.id} className="course-card">
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <ul>
                  {course.videos.map(v => (
                    <li key={v.id}><a href={v.url} target="_blank" rel="noreferrer">{v.title}</a></li>
                  ))}
                </ul>
                <button className="button enroll-button" onClick={() => handleEnroll(course.id)}>Enroll</button>
              </div>
            ))}
          </div>
        ))}

        <div className="mt-8">
          <h2>My Courses</h2>
          {enrolledCourses.length === 0 && <p>No courses enrolled yet.</p>}
          {enrolledCourses.map(course => (
            <div key={course.id} className="enrolled-course-card">
              <h3>{course.name}</h3>
              <p>Teacher: {course.teacher.name} ({course.teacher.email})</p>
              <ul>
                {course.videos.map(v => (
                  <li key={v.id}><a href={v.url} target="_blank" rel="noreferrer">{v.title}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StudentPage;
