import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Header from './components/header/header';
import Footer from './components/footer/footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Recettes from './pages/Recipes';
import Categories from './pages/Categories';
import Category from './pages/Category';
import CategoryUpdate from './components/my_account/category/update';
import Contact from './pages/Contact';
import Recipe from './pages/Recipe';
import RecipeEdit from './components/my_account/recipe/update/update';
import RecipePost from './components/my_account/recipe/post';
import CGU from './pages/CGU/CGU';
import Account from './pages/Account/Account';
import UserGet from './components/my_account/user/get';

import './styles/main.scss';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recettes" element={<Recettes />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categorie/:id" element={<Category />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/recipes/:id" element={<Recipe />} />
            <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
            <Route path="/dashboard" element={<Account />} />
            <Route path="/user/:id" element={<UserGet />} />
            <Route path="/categories/:id/edit" element={<CategoryUpdate />} />
            <Route path="/recipe/create" element={<RecipePost />} />
            <Route path="/cgu" element={<CGU />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;