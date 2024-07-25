import React, { useEffect, useState } from 'react';
import '../AdminContacts.css';
import { useAuth } from '../store/auth';

export const AdminContacts = () => {
  const { authorizationToken, API } = useAuth();
  const [contacts, setContacts] = useState([]);

  const getAllContactsData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== id));
      window.location.href = '/admin/contacts';
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };


  useEffect(() => {
    getAllContactsData();
  }, []);

  return (
    <div className="admin-contacts">
      <h1>Contact Management</h1>
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.username}</td>
              <td>{contact.email}</td>
              <td>{contact.message}</td>
              <td>
                {/* <button className="edit-btn">Reply</button> */}
                <button onClick={() => deleteContact(contact._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
