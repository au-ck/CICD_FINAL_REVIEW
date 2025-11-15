// src/main/java/com/klef/controller/ProductController.java
package com.klef.controller;

import com.klef.entity.Farmer;
import com.klef.entity.Product;
import com.klef.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired private ProductService service;
    private final String UPLOAD_DIR = "uploads/images/";

    @PostMapping
    public ResponseEntity<?> add(
            @RequestParam String name, @RequestParam String category,
            @RequestParam Double quantity, @RequestParam Double pricePerKg,
            @RequestParam String description, @RequestParam Long farmerId,
            @RequestParam(required = false) MultipartFile image) {
        try {
            Product p = new Product();
            p.setName(name); p.setCategory(category); p.setQuantity(quantity);
            p.setPricePerKg(pricePerKg); p.setDescription(description);
            Farmer f = new Farmer(); f.setId(farmerId); p.setFarmer(f);

            String imageUrl = null;
            if (image != null && !image.isEmpty()) {
                Files.createDirectories(Paths.get(UPLOAD_DIR));
                String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                Path path = Paths.get(UPLOAD_DIR + fileName);
                Files.write(path, image.getBytes());
                imageUrl = "http://localhost:2085/images/" + fileName;
            }
            p.setImageUrl(imageUrl);

            return ResponseEntity.status(201).body(service.addProduct(p));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/farmer/{id}")
    public ResponseEntity<List<Product>> getByFarmer(@PathVariable Long id) {
        return ResponseEntity.ok(service.getByFarmer(id));
    }

    @GetMapping("/approved")
    public ResponseEntity<List<Product>> getApproved() {
        return ResponseEntity.ok(service.getApproved());
    }
}