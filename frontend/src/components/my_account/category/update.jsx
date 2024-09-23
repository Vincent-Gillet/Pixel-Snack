import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CategoryUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Supposons que le jeton est stocké dans le localStorage
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/admin/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCategory(response.data);
        setFormData({ title: response.data.category.title });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategory();
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
      console.log('Sending data:', { title: formData.title }); // Log the data being sent
      const response = await axios.put(`http://127.0.0.1:8000/api/v1/admin/categories/${id}`, { title: formData.title }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Server response:', response.data); // Log the server response
      setCategory(response.data); // Update the state with the response data
      setIsEditing(false);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(`Erreur: ${error.response.data.message}`);
      } else {
        setError(error.message);
      }
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://127.0.0.1:8000/api/v1/admin/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/categories');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(`Erreur: ${error.response.data.message}`);
      } else {
        setError(error.message);
      }
    }
  };

  if (error) {
    return <p className="error">Erreur: {error}</p>;
  }

  if (!category) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="">
      {isEditing ? (
        <>
          <h1>Catégorie</h1>
          <form className='form_dashboard' onSubmit={handleFormSubmit}>
            <div className='dashboard_input'>
              <label>Nom : </label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
            </div>
            <div className='button_dashboard'>
              <button type="submit">Enregistrer</button>
              <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h1>Catégorie</h1>
          <div className='form_dashboard'>
            <span><h2>Nom :</h2><p>{category.category.title}</p></span>
            <div className='button_dashboard'>
              <button onClick={() => setIsEditing(true)}>Modifier</button>
              <button onClick={handleDeleteCategory}>Supprimer</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryUpdate;