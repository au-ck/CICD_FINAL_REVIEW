// src/admin/Dashboard.jsx
import { useEffect, useState } from 'react';
import API from '../services/api';
import { Tabs, Tab, Table, Badge, Button, Card, Row, Col } from 'react-bootstrap';

const AdminDashboard = () => {
  const [farmers, setFarmers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/api/admin/farmers').then(res => setFarmers(res.data));
    API.get('/api/admin/buyers').then(res => setBuyers(res.data));
    API.get('/api/admin/products/pending').then(res => setPendingProducts(res.data));
    API.get('/api/admin/orders').then(res => setOrders(res.data));
  }, []);

  const approve = (id) => {
    API.put(`/api/admin/products/${id}/approve`).then(() => {
      setPendingProducts(prev => prev.filter(p => p.id !== id));
    });
  };

  const reject = (id) => {
    API.put(`/api/admin/products/${id}/reject`).then(() => {
      setPendingProducts(prev => prev.filter(p => p.id !== id));
    });
  };

  return (
    <div>
      <h2 className="text-success mb-4">Admin Panel</h2>

      <Tabs defaultActiveKey="products" className="mb-3">
        <Tab eventKey="products" title="Pending Products">
          <Table striped bordered hover>
            <thead><tr><th>Name</th><th>Farmer</th><th>Price/kg</th><th>Actions</th></tr></thead>
            <tbody>
              {pendingProducts.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.farmer.name}</td>
                  <td>₹{p.pricePerKg}</td>
                  <td>
                    <Button size="sm" variant="success" onClick={() => approve(p.id)}>Approve</Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => reject(p.id)}>Reject</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="farmers" title="Farmers">
          <Row>
            {farmers.map(f => (
              <Col md={4} key={f.id}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{f.name}</Card.Title>
                    <Card.Text>Email: {f.email}<br/>Phone: {f.phone}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

        <Tab eventKey="buyers" title="Buyers">
          <Row>
            {buyers.map(b => (
              <Col md={4} key={b.id}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{b.name}</Card.Title>
                    <Card.Text>Email: {b.email}<br/>Phone: {b.phone}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>

        <Tab eventKey="orders" title="All Orders">
          <Table striped bordered hover>
            <thead><tr><th>Product</th><th>Buyer</th><th>Farmer</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td>{o.productName}</td>
                  <td>{o.buyerId}</td>
                  <td>{o.farmerId}</td>
                  <td>₹{o.totalPrice}</td>
                  <td><Badge bg={o.status === 'PENDING' ? 'warning' : 'success'}>{o.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;