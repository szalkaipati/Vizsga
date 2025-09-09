import { useEffect, useState } from "react";
import api from "../api/axios";

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
      setName(""); setEmail(""); setPassword("");
      fetchUsers();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error creating user");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure?")) return;
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-6 p-4 border rounded">
        <h2 className="font-bold mb-2">Create User</h2>
        <input className="border p-1 mr-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="border p-1 mr-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border p-1 mr-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <select className="border p-1 mr-2" value={role} onChange={e => setRole(e.target.value as any)}>
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
        </select>
        <button className="bg-green-500 text-white p-1 rounded" onClick={handleCreate}>Create</button>
      </div>

      <div className="p-4 border rounded">
        <h2 className="font-bold mb-2">Users</h2>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-2">ID</th>
              <th className="border px-2">Name</th>
              <th className="border px-2">Email</th>
              <th className="border px-2">Role</th>
              <th className="border px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td className="border px-2">{u.id}</td>
                <td className="border px-2">{u.name}</td>
                <td className="border px-2">{u.email}</td>
                <td className="border px-2">{u.role}</td>
                <td className="border px-2">
                  <button className="bg-red-500 text-white px-2 rounded" onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
