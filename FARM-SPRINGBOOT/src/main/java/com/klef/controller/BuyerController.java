// src/main/java/com/klef/controller/BuyerController.java
package com.klef.controller;

import com.klef.entity.Buyer;
import com.klef.service.BuyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/buyers")
public class BuyerController {

    @Autowired private BuyerService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Buyer buyer) {
        try {
            Buyer saved = service.registerBuyer(buyer);
            saved.setPassword(null);
            Map<String, Object> res = new HashMap<>();
            res.put("id", saved.getId()); res.put("name", saved.getName());
            res.put("email", saved.getEmail()); res.put("role", "buyer");
            return ResponseEntity.status(201).body(res);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> cred) {
        Buyer b = service.loginBuyer(cred.get("email"), cred.get("password"));
        if (b != null) {
            b.setPassword(null);
            Map<String, Object> res = new HashMap<>();
            res.put("id", b.getId()); res.put("name", b.getName());
            res.put("email", b.getEmail()); res.put("role", "buyer");
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }
}