// src/app/users/page.js
"use client"; // Mark this component as a Client Component

import { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from your API
    const fetchUsers = async () => {
      const response = await fetch('/api/users'); // Update this with your API endpoint
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li> // Adjust based on your user object structure
        ))}
      </ul>
    </div>
  );
};

export default Users;
