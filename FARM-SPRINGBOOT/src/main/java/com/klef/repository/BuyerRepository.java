// src/main/java/com/klef/repository/BuyerRepository.java
package com.klef.repository;

import com.klef.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer, Long> {
    Buyer findByEmail(String email);
}