import Link from 'next/link';
import './style.css';
import { useState } from 'react';
import NavBar from '../components/navbar/navBar';

export interface Tanar {
  id: string;
  name: string;
  email: string;
  videos?: string[];
}
export interface Tanulo {
  id: string;
  name: string;
  email: string;
}

export const tanarok: Tanar[] = [
  { id: "u1", name: "Lilla", email: "lilla1975@gmail.com", videos: ["C# bevezető", "C# Lista", "C# gyakorló"] },
  { id: "u2", name: "Zsófi", email: "zsófi.szabo2002@gmail.com", videos: ["Javascript 1", "Javascript 2"] },
  { id: "u3", name: "Botond", email: "botond.kov@gmail.com", videos: ["Tesztelés: minták", "Tesztelés: selenium", "Tesztelés: cypress"] },
  { id: "u4", name: "Krisztina", email: "krisztina@gmail.com", videos: ["HTML", "CSS", "Bootstrap", "Összefoglaló (HTML, CSS, Bootstrap)"] },
];
export const tanulok: Tanulo[] = [
  { id: "u1", name: "Szaffi", email: "takacs.szaffiii@gmail.com"},
  { id: "u2", name: "Tibor", email: "tibi@gmail.com"},
  { id: "u3", name: "Laci", email: "lacimeszaros@gmail.com"},
  { id: "u4", name: "Álmos", email: "almosfazekas@gmail.com"},
];

export default function AdminPage() {
  const [students, setStudents] = useState<Tanulo[]>(tanulok);
  const [teachers, setTeachers] = useState<Tanar[]>(tanarok);

  const [search, setSearch] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'tanárok' | 'tanulók'>('all');

  const promoteToTeacher = (studentId: string) => {
    const studentToPromote = students.find(student => student.id === studentId);
    if (studentToPromote) {
      setStudents(prev => prev.filter(student => student.id !== studentId));
      setTeachers(prev => [...prev, studentToPromote]);
    }
  };

  const demoteToStudent = (teacherId: string) => {
    const teacherToDemote = teachers.find(teacher => teacher.id === teacherId);
    //
    if (confirm( "Kiválasztott tanár: " + teacherToDemote?.name + "\nBiztos legyen diák?\nA videók törlődni fognak!")) {
      if (teacherToDemote) {
        setTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
        setStudents(prev => [...prev, teacherToDemote]);
      }
    } else {
      return
    }
    
  };

  const deleteUser = (userId: string, isTeacher: boolean) => {
    window.confirm("Biztos törli?");
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
          teacher.id === userId ? { ...teacher, videos: teacher.videos?.filter(video => video !== videoTitle) } : teacher
        );
      });
    } else {
      setStudents(prev => {
        return prev.map(student => 
          student.id === userId ? { ...student } : student
        );
      });
    }
  };

  const filteredTeachers = teachers.filter(profile => 
    (profile.name.toLowerCase().includes(search.toLowerCase()) || profile.email.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter === 'all' || roleFilter === 'tanárok')
  );

  const filteredStudents = students.filter(profile => 
    (profile.name.toLowerCase().includes(search.toLowerCase()) || profile.email.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter === 'all' || roleFilter === 'tanulók')
  );

  return (
    <>
    <NavBar/>
      <div className="background">
        <h1 className="adminPage">Admin oldal</h1>
        <h3>Keresés</h3>
        <form action="">
          <div>
            <p>Keresés név vagy email alapján:</p>
            <input 
              type="text" 
              name="search" 
              id="searchProfile" 
              placeholder="Keresés..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <p>Filter:</p>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as 'all' | 'tanárok' | 'tanulók')}>
              <option value="all">Összes</option>
              <option value="tanárok">Tanárok</option>
              <option value="tanulók">Tanulók</option>
            </select>
          </div>
        </form>

        <h2>Tanárok</h2>
        {filteredTeachers.length === 0 ? (
          <p>Nincs tanár</p>
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
                  {profile.videos?.map((video, index) => (
                    <div key={index}>
                      {video}
                      <button className='deleteVideo' onClick={() => removeVideo(profile.id, video, true)}>Videó törlése</button>
                    </div>
                  ))}
                </div>
                <button onClick={() => demoteToStudent(profile.id)}>Legyen diák?</button>
                <button className='delete' onClick={() => deleteUser(profile.id, true)}>Törlés</button>
              </div>
            );
          })
        )}

        <hr />

        <h2>Diákok</h2>
        {filteredStudents.length === 0 ? (
          <p>Nincsenek diákok</p>
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
                
                <button onClick={() => promoteToTeacher(profile.id)}>Legyen tanár?</button>
                <button className='delete' onClick={() => deleteUser(profile.id, false)}>Törlés</button>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
