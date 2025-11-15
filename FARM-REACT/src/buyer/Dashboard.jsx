// src/buyer/Dashboard.jsx
import { useEffect, useState } from 'react';
import API from '../services/api';
import { Card, Button, Alert } from 'react-bootstrap';

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get('/api/products/approved').then(res => setProducts(res.data));
  }, []);

  const addToCart = (id, qty) => {
    setCart(prev => ({ ...prev, [id]: Math.min((prev[id] || 0) + 1, qty) }));
  };

  const placeOrder = async (p) => {
    const qty = cart[p.id] || 1;
    const order = {
      productName: p.name,
      quantity: qty,
      pricePerKg: p.pricePerKg,
      totalPrice: qty * p.pricePerKg,
      farmerId: p.farmer.id,
      buyerId: JSON.parse(localStorage.getItem('user')).id
    };
    try {
      await API.post('/api/orders/place', order);
      setMessage(`Ordered ${qty}kg of ${p.name}!`);
      setCart(prev => ({ ...prev, [p.id]: 0 }));
    } catch {
      setMessage('Order failed');
    }
  };

  return (
    <div>
      <h3 className="text-success">Available Products</h3>
      {message && <Alert variant="info">{message}</Alert>}
      <div className="row">
        {products.map(p => (
          <div className="col-md-4 mb-3" key={p.id}>
            <Card>
              <Card.Img variant="top" src={p.imageUrl} height="200" style={{ objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text>₹{p.pricePerKg}/kg | {p.quantity} kg</Card.Text>
                <Button size="sm" onClick={() => addToCart(p.id, p.quantity)}>Add ({cart[p.id] || 0})</Button>
                <Button variant="success" size="sm" onClick={() => placeOrder(p)} disabled={!cart[p.id]} className="ms-2">Order</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerDashboard;