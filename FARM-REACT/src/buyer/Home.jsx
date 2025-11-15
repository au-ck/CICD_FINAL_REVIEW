// src/buyer/Home.jsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../services/api';
import { Card, CardMedia, CardContent, Typography, Button, Grid, Chip, Box, Skeleton, IconButton } from '@mui/material';
import { AddShoppingCart, Visibility } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const searchParams = new URLSearchParams(useLocation().search);
  const search = searchParams.get('search') || '';

  useEffect(() => {
    API.get('/api/products/approved').then(res => {
      let filtered = res.data;
      if (search) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      }
      setProducts(filtered);
      setLoading(false);
    });
  }, [search]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    let newCart;
    if (existing) {
      newCart = cart.map(item => 
        item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, qty: 1 }];
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with My Orders Link */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#0F1111' }}>
          {search ? `Results for "${search}"` : 'Fresh from Farmers'}
        </Typography>
        <Button 
          component={Link} 
          to="/buyer/orders"
          variant="outlined"
          startIcon={<Visibility />}
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
        >
          My Orders
        </Button>
      </Box>

      <Grid container spacing={3}>
        {loading ? (
          Array(6).fill().map((_, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 2 }} />
            </Grid>
          ))
        ) : products.length === 0 ? (
          <Grid item xs={12}>
            <Typography align="center" color="text.secondary" sx={{ my: 8, fontSize: 18 }}>
              No products found
            </Typography>
          </Grid>
        ) : (
          products.map(p => (
            <Grid item xs={6} sm={4} md={3} key={p.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                boxShadow: 3, 
                transition: '0.3s',
                '&:hover': { boxShadow: 8, transform: 'translateY(-4px)' }
              }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={p.imageUrl || 'https://via.placeholder.com/300x180?text=No+Image'}
                  alt={p.name}
                  sx={{ objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                />
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>{p.name}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1 }}>
                    {p.description || 'Fresh organic produce'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Chip label={p.category} size="small" color="success" />
                    <Typography variant="caption" color="text.secondary">
                      {p.quantity} kg available
                    </Typography>
                  </Box>
                  <Typography variant="h5" color="success.main" sx={{ fontWeight: 'bold' }}>
                    ₹{p.pricePerKg}/kg
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddShoppingCart />}
                    onClick={() => addToCart(p)}
                    sx={{ 
                      bgcolor: '#febd69', 
                      color: '#0F1111', 
                      fontWeight: 'bold',
                      '&:hover': { bgcolor: '#f3a847' } 
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Home;