// src/main/java/com/klef/service/FarmerService.java
package com.klef.service;

import com.klef.entity.Farmer;
import com.klef.repository.FarmerRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FarmerService {

    @Autowired private FarmerRepository repo;

    public Farmer registerFarmer(Farmer farmer) {
        if (repo.findByEmail(farmer.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        return repo.save(farmer);
    }

    public Farmer loginFarmer(String email, String password) {
        Farmer f = repo.findByEmail(email);
        if (f != null && f.getPassword().equals(password)) {
            return f;
        }
        return null;
    }
    public List<Farmer> getAllFarmers() {
        return repo.findAll();
    }
}