// src/main/java/com/klef/controller/OrderController.java
package com.klef.controller;

import com.klef.entity.Order;
import com.klef.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired private OrderService service;

    @PostMapping("/place")
    public ResponseEntity<Order> place(@RequestBody Order order) {
        return ResponseEntity.status(201).body(service.placeOrder(order));
    }

    @GetMapping("/farmer/{id}")
    public ResponseEntity<List<Order>> getFarmer(@PathVariable Long id) {
        return ResponseEntity.ok(service.getByFarmer(id));
    }

    @GetMapping("/buyer/{id}")
    public ResponseEntity<List<Order>> getBuyer(@PathVariable Long id) {
        return ResponseEntity.ok(service.getByBuyer(id));
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<Order> accept(@PathVariable Long id) {
        Order o = service.accept(id);
        return o != null ? ResponseEntity.ok(o) : ResponseEntity.notFound().build();
    }
}