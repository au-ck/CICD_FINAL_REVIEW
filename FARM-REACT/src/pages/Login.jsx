// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Alert, Card, CardContent, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const Login = () => {
  const [role, setRole] = useState('farmer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    adminKey: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // === ADMIN LOGIN (HARDCODED) ===
    if (role === 'admin') {
      if (formData.adminKey !== 'admin123') {
        setError('Invalid admin key');
        setLoading(false);
        return;
      }
      login({ id: 1, name: 'Admin', email: 'admin@ff.com', role: 'admin' });
      navigate('/admin/dashboard');
      setLoading(false);
      return;
    }
    // === END ADMIN LOGIN ===

    const endpoint = role === 'farmer' ? '/api/farmers/login' : '/api/buyers/login';

    try {
      const res = await API.post(endpoint, formData);
      login(res.data);
      // REDIRECT TO /shop FOR BUYER
      if (role === 'farmer') {
        navigate('/farmer/dashboard');
      } else {
        navigate('/shop');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card sx={{ maxWidth: 400, width: '100%', p: 2 }}>
        <CardContent>
          <Typography variant="h5" className="text-center mb-4 text-success fw-bold">Login</Typography>
          {error && <Alert severity="error" className="mb-3">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select value={role} onChange={(e) => setRole(e.target.value)}>
                <MenuItem value="farmer">Farmer</MenuItem>
                <MenuItem value="buyer">Buyer</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>

            <TextField label="Email" name="email" type="email" fullWidth required margin="normal" onChange={handleChange} />
            <TextField label="Password" name="password" type="password" fullWidth required margin="normal" onChange={handleChange} />

            {/* ADMIN KEY FIELD */}
            {role === 'admin' && (
              <TextField
                label="Admin Key"
                name="adminKey"
                type="password"
                fullWidth
                required
                margin="normal"
                onChange={handleChange}
                placeholder="Enter admin123"
              />
            )}

            <Button type="submit" variant="contained" color="success" fullWidth disabled={loading} className="mt-3">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <Typography className="text-center mt-3">
            New? <Link to="/register" className="text-success">Register</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;