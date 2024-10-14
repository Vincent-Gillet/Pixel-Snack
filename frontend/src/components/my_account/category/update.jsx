import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Banner from '../../../components/banner/banner';
import customImage from '../../../assets/image/recettes/foodwarsterrinedelégumes.png';

function CategoryUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem('accessToken'); 
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCategory(response.data);
        setFormData({
          title: response.data.category.title,
          image: response.data.category.image,
        });
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
      const dataToSend = {
        title: formData.title,
        image: formData.image,
      };

      const response = await axios.put(`${import.meta.env.VITE_API_URL}/admin/categories/${id}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Server response:', response.data);
      setCategory(response.data); 
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
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/categories/${id}`, {
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
    <div className="App container">
      {isEditing ? (
        <>
          <Banner title="Modifier la catégorie" image={customImage} />
          <form className='form_dashboard' onSubmit={handleFormSubmit}>
            <div className='dashboard_input'>
              <label>Nom : </label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
            </div>
            <div className='dashboard_input'>
              <label>Image : </label>
              <input type="text" name="image" value={formData.image} onChange={handleInputChange} />
              {formData.image && <img src={formData.image} alt={formData.title} style={{ width: '200px', height: 'auto' }} />}
            </div>
            <div className='button_dashboard'>
              <button type="submit">Enregistrer</button>
              <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <Banner title="Catégorie" image={customImage} />
          <div className='form_dashboard'>
            <span><h2>Nom :</h2><p>{category.category.title}</p></span>
            {category.category.image && <img src={category.category.image} alt={category.category.title} style={{ width: '200px', height: 'auto' }} />}
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