import React, { useEffect, useState } from 'react';
import '../AdminUsers.css';
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';

export const AdminUsers = () => {
  const { authorizationToken, API } = useAuth();
  const [users, setUsers] = useState([]);

  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
      window.location.href = '/admin/users';
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []); 

  return (
    <div className="admin-users">
      <h1>User Management</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link to ={`/admin/users/${user._id}/edit`} className="edit-btn">Edit</Link>
                <button onClick={() => deleteUser(user._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
