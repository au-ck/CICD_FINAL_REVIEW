// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useState } from 'react';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';

// Buyer
import Shop from './buyer/Shop';
import BuyerOrders from './buyer/Orders';

// Farmer
import FarmerDashboard from './farmer/Dashboard';
import AddProduct from './farmer/AddProduct';
import FarmerOrders from './farmer/Orders';
import ProductList from './farmer/ProductList';

// Admin
import AdminDashboard from './admin/Dashboard';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100 bg-light">
          <Header setCartOpen={setCartOpen} />
          <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
          <main className="flex-grow-1">
            <Routes>
              {/* PUBLIC */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* BUYER */}
              <Route path="/shop" element={<ProtectedRoute role="buyer"><Shop /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute role="buyer"><Checkout /></ProtectedRoute>} />
              <Route path="/buyer/orders" element={<ProtectedRoute role="buyer"><BuyerOrders /></ProtectedRoute>} />

              {/* FARMER */}
              <Route path="/farmer/dashboard" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
              <Route path="/farmer/products" element={<ProtectedRoute role="farmer"><ProductList /></ProtectedRoute>} />
              <Route path="/farmer/products/add" element={<ProtectedRoute role="farmer"><AddProduct /></ProtectedRoute>} />
              <Route path="/farmer/orders" element={<ProtectedRoute role="farmer"><FarmerOrders /></ProtectedRoute>} />

              {/* ADMIN */}
              <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;