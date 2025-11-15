// src/components/CartSidebar.jsx
import { useState } from 'react';
import { Drawer, Box, Typography, Button, Divider, IconButton, Badge } from '@mui/material';
import { Close, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ open, onClose }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const navigate = useNavigate();

  const removeItem = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + (item.pricePerKg * (item.qty || 1)), 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 380, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Shopping Cart <Badge badgeContent={cart.length} color="error" sx={{ ml: 1 }} />
          </Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {cart.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ my: 8, fontSize: 16 }}>
            Your cart is empty
          </Typography>
        ) : (
          <>
            {cart.map(item => (
              <Box key={item.id} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', p: 1, border: '1px solid #eee', borderRadius: 2 }}>
                <img 
                  src={item.imageUrl || 'https://via.placeholder.com/80'} 
                  alt={item.name} 
                  width={80} 
                  height={80} 
                  style={{ objectFit: 'cover', borderRadius: 8 }} 
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>{item.name}</Typography>
                  <Typography variant="caption" color="text.secondary">₹{item.pricePerKg}/kg</Typography>
                  <Typography variant="body2" color="success.main" sx={{ fontWeight: 'bold' }}>
                    ₹{(item.pricePerKg * (item.qty || 1)).toFixed(2)}
                  </Typography>
                </Box>
                <IconButton size="small" color="error" onClick={() => removeItem(item.id)}>
                  <Delete />
                </IconButton>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
              <Typography variant="h6" color="success.main" sx={{ fontWeight: 'bold' }}>
                ₹{total.toFixed(2)}
              </Typography>
            </Box>

            <Button 
              fullWidth 
              variant="contained" 
              size="large"
              sx={{ 
                bgcolor: '#febd69', 
                color: '#0F1111', 
                fontWeight: 'bold',
                py: 1.5,
                '&:hover': { bgcolor: '#f3a847' } 
              }} 
              onClick={() => {
                onClose();
                navigate('/checkout');
              }}
            >
              Proceed to Checkout
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartSidebar;