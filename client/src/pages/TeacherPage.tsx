import { useEffect, useState } from "react";
import api from "../api/axios";
import "./TeacherPage.css";
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
  videos: Video[];
}

const TeacherPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [videoInputs, setVideoInputs] = useState<{ [key: number]: { title: string; url: string } }>({});

  // Fetch teacher's courses
  const fetchCourses = async () => {
    try {
      const res = await api.get("/teacher/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Create a new course
  const handleCreateCourse = async () => {
    if (!courseName || !courseDesc) return;
    try {
      await api.post("/teacher/courses", { name: courseName, description: courseDesc });
      setCourseName("");
      setCourseDesc("");
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle per-course video input change
  const handleVideoChange = (courseId: number, field: "title" | "url", value: string) => {
    setVideoInputs(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        [field]: value
      }
    }));
  };

  // Add video to a course
  const handleAddVideo = async (courseId: number) => {
    const input = videoInputs[courseId];
    if (!input?.title || !input?.url) return;

    try {
      await api.post(`/teacher/courses/${courseId}/videos`, { title: input.title, url: input.url });
      setVideoInputs(prev => ({ ...prev, [courseId]: { title: "", url: "" } })); // clear inputs
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a course
  const handleDeleteCourse = async (id: number) => {
    if (!window.confirm("Delete course?")) return;
    try {
      await api.delete(`/teacher/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <Navbar />
      <div className="teacher-page">
        <h1>Teacher Dashboard</h1>

        <div className="section">
          <h2>Create Course</h2>
          <input
            placeholder="Name"
            value={courseName}
            onChange={e => setCourseName(e.target.value)}
          />
          <input
            placeholder="Description"
            value={courseDesc}
            onChange={e => setCourseDesc(e.target.value)}
          />
          <button className="button create-button" onClick={handleCreateCourse}>
            Create
          </button>
        </div>

        <div className="section">
          <h2>Courses</h2>
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <button className="button delete-button mt-2" onClick={() => handleDeleteCourse(course.id)}>
                Delete Course
              </button>

              <div className="mt-2">
                <input
                  placeholder="Video Title"
                  value={videoInputs[course.id]?.title || ""}
                  onChange={e => handleVideoChange(course.id, "title", e.target.value)}
                />
                <input
                  placeholder="Video URL"
                  value={videoInputs[course.id]?.url || ""}
                  onChange={e => handleVideoChange(course.id, "url", e.target.value)}
                />
                <button className="button add-video-button" onClick={() => handleAddVideo(course.id)}>
                  Add Video
                </button>
              </div>

              <ul>
                {course.videos.map(video => (
                  <li key={video.id}>
                    <a href={video.url} target="_blank" rel="noreferrer">{video.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TeacherPage;
