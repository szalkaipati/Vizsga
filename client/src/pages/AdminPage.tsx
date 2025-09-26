import { useEffect, useState } from "react";
import api from "../api/axios";
import "./AdminPage.css";
import Navbar from "./Navbar";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "TEACHER">("STUDENT");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    try {
      await api.post("/admin/create-user", { name, email, password, role });
      setName(""); 
      setEmail(""); 
      setPassword("");
      fetchUsers();
    } catch (err: any) {
      alert(err.response?.data?.message || "A felhasználó létrehozása közben hiba történt");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Biztos törölni szeretné?\nE folyamat a felhasználó összes adatát törli!")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="admin-page">
        <h1>Adminisztrációs oldal</h1>

        <div className="section">
          <h2>Felhasználó létrehozása</h2>
          <input placeholder="Név" value={name} onChange={e => setName(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Jelszó" value={password} onChange={e => setPassword(e.target.value)} />
          <select value={role} onChange={e => setRole(e.target.value as any)}>
            <option value="STUDENT">Tanuló</option>
            <option value="TEACHER">Tanár</option>
          </select>
          <button className="button create-button" onClick={handleCreate}>Létrehozás</button>
        </div>

        <div className="section">
          <h2>Felhasználók</h2>
          <div className="table-responsive">
          <table >
            <thead>
              <tr>
                <th>ID</th>
                <th>Név</th>
                <th>Email</th>
                <th>Felhasználói típus</th>
                <th>Kezelés</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button className="button delete-button" onClick={() => handleDelete(u.id)}>Törlés</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
