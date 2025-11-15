// src/main/java/com/klef/repository/OrderRepository.java
package com.klef.repository;

import com.klef.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByFarmerId(Long farmerId);
    List<Order> findByBuyerId(Long buyerId);
}