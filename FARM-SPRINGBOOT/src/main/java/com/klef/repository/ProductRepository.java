// src/main/java/com/klef/repository/ProductRepository.java
package com.klef.repository;

import com.klef.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByFarmerId(Long farmerId);
    List<Product> findByStatus(Product.Status status);
}