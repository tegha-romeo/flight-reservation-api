package com.example.flightreservation.repository;

import com.example.flightreservation.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
