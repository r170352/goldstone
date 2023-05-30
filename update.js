import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/fetch-users'); // Make a GET request to your microservice endpoint
        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            {/* Render other user details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
