// src/buyer/Orders.jsx
import { useEffect, useState } from 'react';
import API from '../services/api';
import { Table, Badge, Box, Typography, Paper, Chip } from '@mui/material';
import { LocalShipping, CheckCircle, Pending } from '@mui/icons-material';

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    API.get(`/api/orders/buyer/${user.id}`).then(res => setOrders(res.data));
  }, [user.id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return <Pending sx={{ color: '#ff9800' }} />;
      case 'ACCEPTED': return <LocalShipping sx={{ color: '#2196f3' }} />;
      case 'DELIVERED': return <CheckCircle sx={{ color: '#4caf50' }} />;
      default: return <Pending />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'ACCEPTED': return 'info';
      case 'DELIVERED': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#0F1111' }}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f8f9fa' }}>
          <Typography color="text.secondary" sx={{ fontSize: 18 }}>
            No orders yet. Start shopping!
          </Typography>
        </Paper>
      ) : (
        <Table sx={{ minWidth: 650, bgcolor: 'white', borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '16px', textAlign: 'left' }}>Order</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Quantity</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Total</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '16px' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {o.productName}
                  </Typography>
                </td>
                <td style={{ padding: '16px' }}>
                  <Chip label={`${o.quantity} kg`} size="small" />
                </td>
                <td style={{ padding: '16px' }}>
                  <Typography variant="h6" color="success.main" sx={{ fontWeight: 'bold' }}>
                    ₹{o.totalPrice}
                  </Typography>
                </td>
                <td style={{ padding: '16px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getStatusIcon(o.status)}
                    <Badge color={getStatusColor(o.status)}>
                      {o.status}
                    </Badge>
                  </Box>
                </td>
                <td style={{ padding: '16px' }}>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(o.orderDate).toLocaleDateString()}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Box>
  );
};

export default BuyerOrders;