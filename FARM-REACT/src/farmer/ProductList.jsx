// src/farmer/ProductList.jsx
import { useEffect, useState } from 'react';
import API from '../services/api';
import { Table, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    API.get(`/api/products/farmer/${user.id}`).then(res => setProducts(res.data));
  }, [user.id]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-success">My Products</h3>
        <Link to="/farmer/products/add">
          <Button variant="success">Add Product</Button>
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price/kg</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td><img src={p.imageUrl} alt={p.name} width="50" height="50" style={{ objectFit: 'cover' }} /></td>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
              <td>₹{p.pricePerKg}</td>
              <td><Badge bg={p.status === 'APPROVED' ? 'success' : 'warning'}>{p.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;