// src/farmer/Orders.jsx
import { useEffect, useState } from 'react';  // ← ADD THIS
import API from '../services/api';
import { Table, Badge, Button } from 'react-bootstrap';

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    API.get(`/api/orders/farmer/${user.id}`).then(res => setOrders(res.data));
  }, [user.id]);

  const accept = (id) => {
    API.put(`/api/orders/${id}/accept`).then(() => {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'ACCEPTED' } : o));
    });
  };

  return (
    <div>
      <h3 className="text-success">My Orders</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.productName}</td>
              <td>{o.quantity}</td>
              <td>₹{o.totalPrice}</td>
              <td>
                <Badge bg={o.status === 'PENDING' ? 'warning' : 'success'}>
                  {o.status}
                </Badge>
              </td>
              <td>
                {o.status === 'PENDING' && (
                  <Button size="sm" onClick={() => accept(o.id)}>Accept</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FarmerOrders;