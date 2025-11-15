// src/components/LandingPage.jsx
import { Box, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store, VerifiedUser } from '@mui/icons-material';

const LandingPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: '#131921', color: 'white', py: 12, textAlign: 'center' }}>
        <Container>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Fresh from Farm to Your Door
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Buy & Sell Fresh Produce Directly
          </Typography>
          <Button component={Link} to="/register" size="large" variant="contained" sx={{ bgcolor: '#febd69', color: '#0F1111', fontWeight: 'bold', px: 4 }}>
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
              <ShoppingCart sx={{ fontSize: 60, color: '#febd69', mb: 2 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>Shop Fresh</Typography>
                <Typography color="text.secondary">Buy organic produce directly from farmers</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
              <Store sx={{ fontSize: 60, color: '#febd69', mb: 2 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>Sell Direct</Typography>
                <Typography color="text.secondary">Farmers list products, earn more</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
              <VerifiedUser sx={{ fontSize: 60, color: '#febd69', mb: 2 }} />
              <CardContent>
                <Typography variant="h6" gutterBottom>Trusted</Typography>
                <Typography color="text.secondary">Admin verified products only</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;