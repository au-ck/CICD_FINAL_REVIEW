// src/pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Alert, Card, CardContent, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const Register = () => {
  const [role, setRole] = useState('farmer');
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', address: ''
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

    const endpoint = role === 'farmer' ? '/api/farmers/register' : '/api/buyers/register';

    try {
      const res = await API.post(endpoint, formData);
      login(res.data);
      // REDIRECT TO /shop FOR BUYER
      navigate(role === 'farmer' ? '/farmer/dashboard' : '/shop');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card sx={{ maxWidth: 500, width: '100%', p: 2 }}>
        <CardContent>
          <Typography variant="h5" className="text-center mb-4 text-success fw-bold">Register</Typography>
          {error && <Alert severity="error" className="mb-3">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select value={role} onChange={(e) => setRole(e.target.value)}>
                <MenuItem value="farmer">Farmer</MenuItem>
                <MenuItem value="buyer">Buyer</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Name" name="name" fullWidth required margin="normal" onChange={handleChange} />
            <TextField label="Email" name="email" type="email" fullWidth required margin="normal" onChange={handleChange} />
            <TextField label="Password" name="password" type="password" fullWidth required margin="normal" onChange={handleChange} />
            <TextField label="Phone" name="phone" fullWidth required margin="normal" onChange={handleChange} />
            <TextField label="Address" name="address" fullWidth multiline rows={2} margin="normal" onChange={handleChange} />
            <Button type="submit" variant="contained" color="success" fullWidth disabled={loading} className="mt-3">
              {loading ? 'Creating...' : 'Register'}
            </Button>
          </form>
          <Typography className="text-center mt-3">
            Already have an account? <Link to="/login" className="text-success">Login</Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;