// src/main/java/com/klef/controller/AdminController.java
package com.klef.controller;

import com.klef.entity.Farmer;
import com.klef.entity.Buyer;
import com.klef.entity.Product;
import com.klef.entity.Order;
import com.klef.service.FarmerService;
import com.klef.service.BuyerService;
import com.klef.service.ProductService;
import com.klef.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired private FarmerService farmerService;
    @Autowired private BuyerService buyerService;
    @Autowired private ProductService productService;
    @Autowired private OrderService orderService;

    // Get all farmers
    @GetMapping("/farmers")
    public ResponseEntity<List<Farmer>> getAllFarmers() {
        return ResponseEntity.ok(farmerService.getAllFarmers());
    }

    // Get all buyers
    @GetMapping("/buyers")
    public ResponseEntity<List<Buyer>> getAllBuyers() {
        return ResponseEntity.ok(buyerService.getAllBuyers());
    }

    // Get pending products
    @GetMapping("/products/pending")
    public ResponseEntity<List<Product>> getPendingProducts() {
        return ResponseEntity.ok(productService.getPendingProducts());
    }

    // Approve product
    @PutMapping("/products/{id}/approve")
    public ResponseEntity<Product> approveProduct(@PathVariable Long id) {
        Product p = productService.approveProduct(id);
        return p != null ? ResponseEntity.ok(p) : ResponseEntity.notFound().build();
    }

    // Reject product
    @PutMapping("/products/{id}/reject")
    public ResponseEntity<Product> rejectProduct(@PathVariable Long id) {
        Product p = productService.rejectProduct(id);
        return p != null ? ResponseEntity.ok(p) : ResponseEntity.notFound().build();
    }

    // Get all orders
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}