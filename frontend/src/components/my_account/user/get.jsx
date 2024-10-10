import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UserGet() {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          password: '',
          role: response.data.user.role
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, []);

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
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/users/${user.id}`, formData, {
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

  if (error) {
    return <p className="error">Erreur: {error}</p>;
  }

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      {isEditing ? (
        <form className='form_dashboard' onSubmit={handleFormSubmit}>
          <div className='dashboard_input'>
            <label>Nom :</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className='dashboard_input'>
            <label>Email :</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className='dashboard_input'>
            <label>Mot de passe :</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
          </div>
          {localStorage.getItem('role') === 'admin' && (
            <div className='dashboard_input'>
              <label>Rôle:</label>
              <input type="text" name="role" value={formData.role} onChange={handleInputChange} />
            </div>
          )}
          <div className='button_dashboard'>
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
          </div>
        </form>
      ) : (
        <div className='form_dashboard'>
          <span><h2>Nom :</h2><p>{user.name}</p></span>
          <span><h2>Email :</h2><p>{user.email}</p></span>
          {localStorage.getItem('role') === 'admin' && (
            <span><h2>Rôle :</h2><p>{user.role}</p></span>
          )}
          <div className='button_dashboard'>
            <button onClick={() => setIsEditing(true)}>Modifier</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserGet;