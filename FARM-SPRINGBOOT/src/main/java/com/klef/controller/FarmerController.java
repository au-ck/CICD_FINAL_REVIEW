// src/main/java/com/klef/controller/FarmerController.java
package com.klef.controller;

import com.klef.entity.Farmer;
import com.klef.service.FarmerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/farmers")
public class FarmerController {

    @Autowired private FarmerService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Farmer farmer) {
        try {
            Farmer saved = service.registerFarmer(farmer);
            saved.setPassword(null);
            Map<String, Object> res = new HashMap<>();
            res.put("id", saved.getId()); res.put("name", saved.getName());
            res.put("email", saved.getEmail()); res.put("role", "farmer");
            return ResponseEntity.status(201).body(res);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> cred) {
        Farmer f = service.loginFarmer(cred.get("email"), cred.get("password"));
        if (f != null) {
            f.setPassword(null);
            Map<String, Object> res = new HashMap<>();
            res.put("id", f.getId()); res.put("name", f.getName());
            res.put("email", f.getEmail()); res.put("role", "farmer");
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }
}