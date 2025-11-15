// src/main/java/com/klef/service/OrderService.java
package com.klef.service;

import com.klef.entity.Order;
import com.klef.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderService {

    @Autowired private OrderRepository repo;

    public Order placeOrder(Order order) {
        return repo.save(order);
    }

    public List<Order> getByFarmer(Long farmerId) {
        return repo.findByFarmerId(farmerId);
    }

    public List<Order> getByBuyer(Long buyerId) {
        return repo.findByBuyerId(buyerId);
    }

    public Order accept(Long id) {
        Order o = repo.findById(id).orElse(null);
        if (o != null) {
            o.setStatus(Order.OrderStatus.ACCEPTED);
            return repo.save(o);
        }
        return null;
    }
 // Add to OrderService
    public List<Order> getAllOrders() {
        return repo.findAll();
    }
}