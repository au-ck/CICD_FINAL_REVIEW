// src/components/Header.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Search, Menu } from '@mui/icons-material';
import { 
  AppBar, Toolbar, IconButton, InputBase, Badge, Drawer, Box, List, 
  ListItem, ListItemText, Avatar, Menu as MuiMenu, MenuItem, 
  Typography, Button 
} from '@mui/material';

const Header = ({ setCartOpen }) => {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const cartCount = JSON.parse(localStorage.getItem('cart') || '[]').length;

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search) navigate(`/shop?search=${search}`);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: '#131921' }}>
        <Toolbar sx={{ gap: 2 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#febd69' }}>
              FarmerMart
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, maxWidth: 600, display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{ bgcolor: 'white', borderRadius: 1, display: 'flex', width: '100%' }}>
              <InputBase
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleSearch}
                sx={{ flexGrow: 1, pl: 2, color: 'black' }}
              />
              <IconButton sx={{ color: '#febd69' }}><Search /></IconButton>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {user ? (
              <>
                <IconButton color="inherit" onClick={() => setCartOpen(true)}>
                  <Badge badgeContent={cartCount} color="error"><ShoppingCart /></Badge>
                </IconButton>

                <IconButton 
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ p: 0 }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#febd69' }}>
                    {user.name[0]}
                  </Avatar>
                </IconButton>

                <MuiMenu 
                  anchorEl={anchorEl} 
                  open={Boolean(anchorEl)} 
                  onClose={() => setAnchorEl(null)}
                  MenuListProps={{ 'aria-labelledby': 'user-menu' }}
                >
                  <MenuItem onClick={() => { logout(); setAnchorEl(null); navigate('/'); }}>Logout</MenuItem>
                  {user.role === 'buyer' && <MenuItem onClick={() => { setAnchorEl(null); navigate('/buyer/orders'); }}>My Orders</MenuItem>}
                  {user.role === 'farmer' && <MenuItem onClick={() => { setAnchorEl(null); navigate('/farmer/dashboard'); }}>Dashboard</MenuItem>}
                  {user.role === 'admin' && <MenuItem onClick={() => { setAnchorEl(null); navigate('/admin/dashboard'); }}>Admin</MenuItem>}
                </MuiMenu>
              </>
            ) : (
              <Button 
                component={Link} 
                to="/login" 
                variant="outlined" 
                size="small" 
                sx={{ color: 'white', borderColor: 'white', textTransform: 'none', fontWeight: 500 }}
              >
                Login
              </Button>
            )}
          </Box>

          <IconButton color="inherit" sx={{ display: { md: 'none' } }} onClick={() => setMobileOpen(true)}>
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            <ListItem button onClick={() => { setMobileOpen(false); navigate('/'); }}>
              <ListItemText primary="Home" />
            </ListItem>
            {user?.role === 'buyer' && (
              <>
                <ListItem button onClick={() => { setMobileOpen(false); navigate('/shop'); }}>
                  <ListItemText primary="Shop" />
                </ListItem>
                <ListItem button onClick={() => { setMobileOpen(false); navigate('/buyer/orders'); }}>
                  <ListItemText primary="My Orders" />
                </ListItem>
              </>
            )}
            {user?.role === 'farmer' && (
              <ListItem button onClick={() => { setMobileOpen(false); navigate('/farmer/dashboard'); }}>
                <ListItemText primary="Dashboard" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;