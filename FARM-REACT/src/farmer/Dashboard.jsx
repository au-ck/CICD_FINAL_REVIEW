// src/farmer/Dashboard.jsx
import { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0 });

  useEffect(() => {
    API.get(`/api/products/farmer/${user.id}`).then(res => {
      const products = res.data;
      setStats({
        total: products.length,
        pending: products.filter(p => p.status === 'PENDING').length,
        approved: products.filter(p => p.status === 'APPROVED').length
      });
    });
  }, [user.id]);

  return (
    <div>
      <Typography variant="h4" className="mb-4 text-success">Welcome, {user.name}!</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card><CardContent><Typography variant="h6">Total Products</Typography><Typography variant="h3">{stats.total}</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card><CardContent><Typography variant="h6">Pending</Typography><Typography variant="h3">{stats.pending}</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card><CardContent><Typography variant="h6">Approved</Typography><Typography variant="h3">{stats.approved}</Typography></CardContent></Card>
        </Grid>
      </Grid>
      <Box className="mt-4">
        <Link to="/farmer/products/add"><Button variant="contained" color="success">Add Product</Button></Link>
      </Box>
    </div>
  );
};

export default FarmerDashboard;