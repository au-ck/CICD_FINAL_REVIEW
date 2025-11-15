// src/main/java/com/klef/service/ProductService.java
package com.klef.service;

import com.klef.entity.Product;
import com.klef.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    @Autowired private ProductRepository repo;

    public Product addProduct(Product product) {
        return repo.save(product);
    }

    public List<Product> getByFarmer(Long farmerId) {
        return repo.findByFarmerId(farmerId);
    }

    public List<Product> getApproved() {
        return repo.findByStatus(Product.Status.APPROVED);
    }
    
 // Add to ProductService
    public List<Product> getPendingProducts() {
        return repo.findByStatus(Product.Status.PENDING);
    }

    public Product approveProduct(Long id) {
        Product p = repo.findById(id).orElse(null);
        if (p != null) {
            p.setStatus(Product.Status.APPROVED);
            return repo.save(p);
        }
        return null;
    }

    public Product rejectProduct(Long id) {
        Product p = repo.findById(id).orElse(null);
        if (p != null) {
            p.setStatus(Product.Status.REJECTED);
            return repo.save(p);
        }
        return null;
    }
}