import { useEffect, useState } from "react";
import api from "../api/axios";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

      {teachers.map(teacher => (
        <div key={teacher.id} className="mb-4 border p-2 rounded">
          <h2 className="font-bold">{teacher.name}</h2>
          <p>{teacher.email}</p>
          <button className="bg-blue-500 text-white px-2 rounded my-1" onClick={() => { setSelectedTeacherId(teacher.id); fetchCourses(teacher.id); }}>Show Courses</button>

          {teacher.courses?.map(course => (
            <div key={course.id} className="ml-4 my-2 p-2 border rounded">
              <h3 className="font-bold">{course.name}</h3>
              <p>{course.description}</p>
              <ul>
                {course.videos.map(v => (
                  <li key={v.id}><a href={v.url} target="_blank" rel="noreferrer">{v.title}</a></li>
                ))}
              </ul>
              <button className="bg-green-500 text-white px-2 rounded" onClick={() => handleEnroll(course.id)}>Enroll</button>
            </div>
          ))}
        </div>
      ))}

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">My Courses</h2>
        {enrolledCourses.length === 0 && <p>No courses enrolled yet.</p>}
        {enrolledCourses.map(course => (
          <div key={course.id} className="mb-2 p-2 border rounded">
            <h3 className="font-bold">{course.name}</h3>
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
  );
};

export default StudentPage;
