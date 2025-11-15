// src/main/java/com/klef/service/BuyerService.java
package com.klef.service;

import com.klef.entity.Buyer;
import com.klef.repository.BuyerRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BuyerService {

    @Autowired private BuyerRepository repo;

    public Buyer registerBuyer(Buyer buyer) {
        if (repo.findByEmail(buyer.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        return repo.save(buyer);
    }

    public Buyer loginBuyer(String email, String password) {
        Buyer b = repo.findByEmail(email);
        if (b != null && b.getPassword().equals(password)) {
            return b;
        }
        return null;
    }
 // Add to BuyerService
    public List<Buyer> getAllBuyers() {
        return repo.findAll();
    }
}