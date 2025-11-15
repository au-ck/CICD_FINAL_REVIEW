// src/buyer/Shop.jsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../services/api';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  Grid, 
  Chip, 
  Box, 
  Skeleton,
  Container  // ← ADD THIS
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
  const searchParams = new URLSearchParams(useLocation().search);
  const search = searchParams.get('search') || '';

  useEffect(() => {
    API.get('/api/products/approved').then(res => {
      let filtered = res.data;
      if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      setProducts(filtered);
      setLoading(false);
    });
  }, [search]);

  const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id);
    const newCart = existing
      ? cart.map(i => i.id === product.id ? { ...i, qty: (i.qty || 1) + 1 } : i)
      : [...cart, { ...product, qty: 1 }];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>Shop Fresh Produce</Typography>
      <Grid container spacing={3}>
        {loading ? Array(8).fill().map((_, i) => (
          <Grid item xs={6} sm={4} md={3} key={i}><Skeleton variant="rectangular" height={300} /></Grid>
        )) : products.map(p => (
          <Grid item xs={6} sm={4} md={3} key={p.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
              <CardMedia component="img" height="180" image={p.imageUrl || 'https://via.placeholder.com/300'} alt={p.name} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap>{p.name}</Typography>
                <Typography variant="body2" color="text.secondary" noWrap>{p.description}</Typography>
                <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
                  <Chip label={p.category} size="small" color="success" />
                  <Chip label={`${p.quantity}kg`} size="small" />
                </Box>
                <Typography variant="h6" color="success.main">₹{p.pricePerKg}/kg</Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button fullWidth variant="contained" startIcon={<AddShoppingCart />} onClick={() => addToCart(p)}
                  sx={{ bgcolor: '#febd69', color: '#0F1111', fontWeight: 'bold' }}>
                  Add to Cart
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Shop;