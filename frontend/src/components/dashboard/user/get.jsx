import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UserGet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setUser(response.data.user);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.put(`http://127.0.0.1:8000/api/v1/admin/users/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setUser(response.data.user);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No token found');
      }
      await axios.delete(`http://127.0.0.1:8000/api/v1/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      navigate('/'); // Redirige vers la page d'accueil ou une autre page après la suppression
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <p className="error">Erreur: {error}</p>;
  }

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <>
        <div className="user_detail">
        {isEditing ? (
            <form className='form_edit' onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="name">Nom:</label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                />
            </div>
            <div>
                <label htmlFor="role">Role:</label>
                <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                />
            </div>
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
            </form>
        ) : (
            <>
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <button onClick={() => setIsEditing(true)}>Modifier</button>
            <button onClick={handleDeleteUser}>Supprimer</button>
            </>
        )}
        </div>    
    </>

  );
}

export default UserGet;