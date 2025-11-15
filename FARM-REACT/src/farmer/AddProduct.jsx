// src/farmer/AddProduct.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { TextField, Button, Alert, Card, CardContent, Typography } from '@mui/material';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '', category: '', quantity: '', pricePerKg: '', description: ''
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('quantity', formData.quantity);
    data.append('pricePerKg', formData.pricePerKg);
    data.append('description', formData.description);
    data.append('farmerId', user.id);
    if (image) data.append('image', image);

    try {
      await API.post('/api/products', data);
      setSuccess('Product added!');
      setTimeout(() => navigate('/farmer/products'), 1500);
    } catch (err) {
      setError(err.response?.data || 'Failed to add product');
    }
  };

  return (
    <div className="container">
      <Typography variant="h5" className="mb-4 text-success">Add New Product</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField label="Name" name="name" fullWidth required margin="normal" onChange={handleChange} />
            <TextField label="Category" name="category" fullWidth required margin="normal" onChange={handleChange} />
            <TextField label="Quantity (kg)" name="quantity" type="number" fullWidth required margin="normal" onChange={handleChange} />
            <TextField label="Price per kg" name="pricePerKg" type="number" fullWidth required margin="normal" onChange={handleChange} />
            <TextField label="Description" name="description" fullWidth multiline rows={3} margin="normal" onChange={handleChange} />
            <div className="mb-3">
              <input type="file" accept="image/*" onChange={handleImage} className="form-control" />
            </div>
            <Button type="submit" variant="contained" color="success">Add Product</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;