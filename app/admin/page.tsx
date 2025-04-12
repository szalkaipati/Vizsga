"use client";
import Link from 'next/link';
import './style.css';
import { useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  videos: string[];
}

export const profiles: User[] = [
  { id: "u1", name: "Profil1", email: "Profil1@gmail.com", videos: ["Video1", "Video2", "Video3"] },
  { id: "u2", name: "Profil2", email: "Profil2@gmail.com", videos: ["VideoA", "VideoB"] },
  { id: "u3", name: "Profil3", email: "Profil3@gmail.com", videos: ["VideoX", "VideoY", "VideoZ"] },
  { id: "u4", name: "Profil4", email: "Profil4@gmail.com", videos: ["VideoM", "VideoN", "VideoO", "VideoP"] },
];

export default function AdminPage() {
  const [students, setStudents] = useState<User[]>(profiles.slice(2));
  const [teachers, setTeachers] = useState<User[]>(profiles.slice(0, 2));

  const [search, setSearch] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'teacher' | 'student'>('all');

  const promoteToTeacher = (studentId: string) => {
    const studentToPromote = students.find(student => student.id === studentId);
    if (studentToPromote) {
      setStudents(prev => prev.filter(student => student.id !== studentId));
      setTeachers(prev => [...prev, studentToPromote]);
    }
  };

  const demoteToStudent = (teacherId: string) => {
    const teacherToDemote = teachers.find(teacher => teacher.id === teacherId);
    if (teacherToDemote) {
      setTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
      setStudents(prev => [...prev, teacherToDemote]);
    }
  };

  const deleteUser = (userId: string, isTeacher: boolean) => {
    if (isTeacher) {
      setTeachers(prev => prev.filter(teacher => teacher.id !== userId));
    } else {
      setStudents(prev => prev.filter(student => student.id !== userId));
    }
  };

  const removeVideo = (userId: string, videoTitle: string, isTeacher: boolean) => {
    if (isTeacher) {
      setTeachers(prev => {
        return prev.map(teacher => 
          teacher.id === userId ? { ...teacher, videos: teacher.videos.filter(video => video !== videoTitle) } : teacher
        );
      });
    } else {
      setStudents(prev => {
        return prev.map(student => 
          student.id === userId ? { ...student, videos: student.videos.filter(video => video !== videoTitle) } : student
        );
      });
    }
  };

  const filteredTeachers = teachers.filter(profile => 
    (profile.name.toLowerCase().includes(search.toLowerCase()) || profile.email.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter === 'all' || roleFilter === 'teacher')
  );

  const filteredStudents = students.filter(profile => 
    (profile.name.toLowerCase().includes(search.toLowerCase()) || profile.email.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter === 'all' || roleFilter === 'student')
  );

  return (
    <>
      <div className="background">
        <h1 className="adminPage">Admin Page</h1>
        <h3>Search</h3>
        <form action="">
          <div>
            <p>Search by Name or Email:</p>
            <input 
              type="text" 
              name="search" 
              id="searchProfile" 
              placeholder="Search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <p>Filter by Role:</p>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as 'all' | 'teacher' | 'student')}>
              <option value="all">All</option>
              <option value="teacher">Teachers</option>
              <option value="student">Students</option>
            </select>
          </div>
        </form>

        <h2>Teachers</h2>
        {filteredTeachers.length === 0 ? (
          <p>No teachers found</p>
        ) : (
          filteredTeachers.map((profile) => {
            return (
              <div id="profiles" key={profile.id}>
                <div id="profile">
                  <Link href={`/profiles/${profile.id}`} style={{ color: "#181818", textDecoration: "none" }}>
                    {profile.name}
                  </Link>
                </div>
                <div id="profile">
                  <Link href={`/profiles/${profile.id}`} style={{ color: "#181818", textDecoration: "none" }}>
                    {profile.email}
                  </Link>
                </div>
                <div id="profile">
                  {profile.videos.map((video, index) => (
                    <div key={index}>
                      {video}
                      <button onClick={() => removeVideo(profile.id, video, true)}>Remove Video</button>
                    </div>
                  ))}
                </div>
                <button onClick={() => demoteToStudent(profile.id)}>Demote to Student</button>
                <button onClick={() => deleteUser(profile.id, true)}>Delete</button>
              </div>
            );
          })
        )}

        <hr />

        <h2>Students</h2>
        {filteredStudents.length === 0 ? (
          <p>No students found</p>
        ) : (
          filteredStudents.map((profile) => {
            return (
              <div id="profiles" key={profile.id}>
                <div id="profile">
                  <Link href={`/profiles/${profile.id}`} style={{ color: "#181818", textDecoration: "none" }}>
                    {profile.name}
                  </Link>
                </div>
                <div id="profile">
                  <Link href={`/profiles/${profile.id}`} style={{ color: "#181818", textDecoration: "none" }}>
                    {profile.email}
                  </Link>
                </div>
                <div id="profile">
                  {profile.videos.map((video, index) => (
                    <div key={index}>
                      {video}
                      <button onClick={() => removeVideo(profile.id, video, false)}>Remove Video</button>
                    </div>
                  ))}
                </div>
                <button onClick={() => promoteToTeacher(profile.id)}>Promote to Teacher</button>
                <button onClick={() => deleteUser(profile.id, false)}>Delete</button>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
