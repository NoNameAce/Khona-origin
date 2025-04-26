'use client'
import { decodeUserToken } from "@/entities/auth/token";
import { deleteUser, getUser, updateUser, createUser } from "@/entities/user/service";
import { Search, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]); 
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: ""
  });

  useEffect(() => {
    async function fetchData() {
      const token = decodeUserToken();
      console.log(token);
      const userResult = await getUser();
      setUsers(userResult || []);
    }
    fetchData();
  }, []);

  const handleDelete = async (userId: string) => {
    await deleteUser(userId);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleEdit = (user: User) => {
    setFormData(user);
    setShowEditDialog(true);
  };

  const handleAdd = () => {
    setFormData({ id: "", name: "", email: "", phone: "", role: "" });
    setShowAddDialog(true);
  };

  const handleSaveEdit = async () => {
    const updatedUser = await updateUser(formData.id, formData);
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === formData.id ? updatedUser : user))
    );
    setShowEditDialog(false);
  };

  const handleSaveAdd = async () => {
    const newUser = await createUser(formData);
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setShowAddDialog(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Менеҷер кардани истифодабарандагон</h1>

      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Ҷустуҷӯи истифодабарандагон..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Истифодабарандаи нав илова кунед
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ном</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Почтаи электронии</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Телефон</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Нақша</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Амалиёт</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleEdit(user)} className="text-blue-600 hover:underline mr-2">
                    <Edit className="inline mr-1" />
                    Вусъат додани истифодабаранда
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">
                    <Trash2 className="inline mr-1" />
                    Устуандоз
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Dialog */}
      {showEditDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Вусъат додани истифодабаранда</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
            >
              <div className="mb-4">
                <label className="block mb-1">Ном</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Почтаи электронӣ</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Телефон</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Нақша</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowEditDialog(false)} className="px-4 py-2 border rounded">
                  Бекор
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Савганд
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New User Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Истифодабарандаи нав илова кунед</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveAdd();
              }}
            >
              <div className="mb-4">
                <label className="block mb-1">Ном</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Почтаи электронӣ</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Телефон</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Нақша</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddDialog(false)} className="px-4 py-2 border rounded">
                  Бекор
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Савганд
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
