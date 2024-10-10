import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from '../../cards/user_card/user_card';
import axios from 'axios';
import Pagination from '../../pagination';

function DashboardUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async (page) => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('Données récupérées:', response.data); 
        if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
          console.log('État des utilisateurs après mise à jour:', response.data.users);
        } else {
          console.error('Structure des données inattendue:', response.data);
        }
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        setError(error.message);
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    };

    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleViewUser = (userId) => {
    navigate(`/user/${userId}`);
  };


  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No token found');
      }
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      setError(error.message);
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  };

  return (
    <div className="App container">
      {error ? (
        <p className="error">Erreur: {error}</p>
      ) : (
        <div className="container_dashboard">
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <UserCard
                key={user.id}
                name={user.name}
                email={user.email}
                onView={() => handleViewUser(user.id)}
                onDelete={() => handleDeleteUser(user.id)}
              />
            ))
          ) : (
            <p>Aucun utilisateur trouvé.</p>
          )}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
      />
    </div>
  );
}

export default DashboardUsers;