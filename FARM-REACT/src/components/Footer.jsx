// src/components/Footer.jsx
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#131921', color: 'white', py: 3, mt: 'auto' }}>
      <Container>
        <Typography align="center">
          © 2025 <strong>FarmerMart</strong> | Fresh from Farm to You
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;