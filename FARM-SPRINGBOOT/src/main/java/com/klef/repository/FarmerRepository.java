// src/main/java/com/klef/repository/FarmerRepository.java
package com.klef.repository;

import com.klef.entity.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Long> {
    Farmer findByEmail(String email);
}