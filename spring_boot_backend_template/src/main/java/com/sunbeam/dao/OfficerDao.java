package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunbeam.entities.Officer;

@Repository
public interface OfficerDao extends JpaRepository<Officer, Long> {
    List<Officer> findByDesignationDesignationNameIgnoreCase(String designationName);
}