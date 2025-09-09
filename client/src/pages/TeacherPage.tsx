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
      setCourseName(""); setCourseDesc("");
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddVideo = async () => {
    if (!selectedCourseId || !videoTitle || !videoUrl) return;
    try {
      await api.post(`/teacher/courses/${selectedCourseId}/videos`, { title: videoTitle, url: videoUrl });
      setVideoTitle(""); setVideoUrl("");
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>

      <div className="mb-6 p-4 border rounded">
        <h2 className="font-bold mb-2">Create Course</h2>
        <input className="border p-1 mr-2" placeholder="Name" value={courseName} onChange={e => setCourseName(e.target.value)} />
        <input className="border p-1 mr-2" placeholder="Description" value={courseDesc} onChange={e => setCourseDesc(e.target.value)} />
        <button className="bg-green-500 text-white p-1 rounded" onClick={handleCreateCourse}>Create</button>
      </div>

      <div className="mb-6 p-4 border rounded">
        <h2 className="font-bold mb-2">Courses</h2>
        {courses.map(course => (
          <div key={course.id} className="mb-4 border p-2 rounded">
            <h3 className="font-bold">{course.name}</h3>
            <p>{course.description}</p>
            <button className="bg-red-500 text-white px-2 rounded my-1" onClick={() => handleDeleteCourse(course.id)}>Delete Course</button>

            <div className="mt-2">
              <input placeholder="Video Title" className="border p-1 mr-1" value={videoTitle} onChange={e => setVideoTitle(e.target.value)} />
              <input placeholder="Video URL" className="border p-1 mr-1" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
              <button className="bg-blue-500 text-white px-2 rounded" onClick={() => { setSelectedCourseId(course.id); handleAddVideo(); }}>Add Video</button>
            </div>

            <ul className="mt-2">
              {course.videos.map(video => (
                <li key={video.id}><a href={video.url} target="_blank" rel="noreferrer">{video.title}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherPage;
