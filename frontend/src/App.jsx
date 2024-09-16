import './styles/main.scss';
import Header from './components/header';
import Footer from './components/footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Subscription from './pages/Subscription';
import Recettes from './pages/Recipes';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import Recipe from './pages/Recipe';
import DashboardAdmin from './pages/Dashboard_Admin/Dashboard_Admin';

import UserGet from './components/dashboard/user/get'; 


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/recettes" element={<Recettes />} />
          <Route path="/catégories" element={<Categories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/recette" element={<Recipe />} />
          <Route path="/dashboard" element={<DashboardAdmin />} />
          <Route path="/user/:id" element={<UserGet />} />
        </Routes>
      
        <Footer />

      </Router>
    </div>
  );
}

export default App;
