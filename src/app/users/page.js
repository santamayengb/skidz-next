// src/app/users/Users.js
import { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updateId, setUpdateId] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create or update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updateId) {
      await fetch(`/api/users/${updateId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
    } else {
      await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
    }

    setName('');
    setEmail('');
    setUpdateId(null);
    fetchUsers();
  };

  // Delete user
  const handleDelete = async (id) => {
    await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
    fetchUsers();
  };

  // Edit user
  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setUpdateId(user.id);
  };

  return (
    <div>
      <h1>Users</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{updateId ? 'Update User' : 'Add User'}</button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
