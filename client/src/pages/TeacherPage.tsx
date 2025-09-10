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
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/teacher/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

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

  const handleAddVideo = async () => {
    if (!selectedCourseId || !videoTitle || !videoUrl) return;
    try {
      await api.post(`/teacher/courses/${selectedCourseId}/videos`, { title: videoTitle, url: videoUrl });
      setVideoTitle(""); 
      setVideoUrl("");
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

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
          <input placeholder="Name" value={courseName} onChange={e => setCourseName(e.target.value)} />
          <input placeholder="Description" value={courseDesc} onChange={e => setCourseDesc(e.target.value)} />
          <button className="button create-button" onClick={handleCreateCourse}>Create</button>
        </div>

        <div className="section">
          <h2>Courses</h2>
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <button className="button delete-button mt-2" onClick={() => handleDeleteCourse(course.id)}>Delete Course</button>

              <div className="mt-2">
                <input placeholder="Video Title" value={videoTitle} onChange={e => setVideoTitle(e.target.value)} />
                <input placeholder="Video URL" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
                <button className="button add-video-button" onClick={() => { setSelectedCourseId(course.id); handleAddVideo(); }}>Add Video</button>
              </div>

              <ul>
                {course.videos.map(video => (
                  <li key={video.id}><a href={video.url} target="_blank" rel="noreferrer">{video.title}</a></li>
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
