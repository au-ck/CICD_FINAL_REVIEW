// src/pages/Checkout.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const Checkout = () => {
  const [address, setAddress] = useState({ name: '', phone: '', street: '', city: '', pincode: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async () => {
    if (cart.length === 0) return;

    const orders = cart.map(item => ({
      productName: item.name,
      quantity: item.qty || 1,
      pricePerKg: item.pricePerKg,
      totalPrice: (item.qty || 1) * item.pricePerKg,
      farmerId: item.farmer.id,
      buyerId: user.id
    }));

    try {
      await Promise.all(orders.map(o => API.post('/api/orders/place', o)));
      localStorage.removeItem('cart');
      setMessage('Order placed successfully!');
      setTimeout(() => navigate('/buyer/orders'), 2000);
    } catch {
      setMessage('Order failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>Checkout</Typography>
      {message && <Alert severity={message.includes('success') ? 'success' : 'error'}>{message}</Alert>}
      <TextField label="Full Name" fullWidth margin="normal" onChange={e => setAddress({ ...address, name: e.target.value })} />
      <TextField label="Phone" fullWidth margin="normal" onChange={e => setAddress({ ...address, phone: e.target.value })} />
      <TextField label="Street Address" fullWidth margin="normal" onChange={e => setAddress({ ...address, street: e.target.value })} />
      <TextField label="City" fullWidth margin="normal" onChange={e => setAddress({ ...address, city: e.target.value })} />
      <TextField label="PIN Code" fullWidth margin="normal" onChange={e => setAddress({ ...address, pincode: e.target.value })} />
      <Button fullWidth variant="contained" sx={{ mt: 3, py: 1.5, bgcolor: '#febd69', color: '#0F1111' }} onClick={handleSubmit}>
        Place Order
      </Button>
    </Box>
  );
};

export default Checkout;