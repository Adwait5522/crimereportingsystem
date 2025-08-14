package com.sunbeam.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.Designation;
import com.sunbeam.entities.PoliceStation;


public interface DesignationDao extends JpaRepository<Designation,Long>{
	List<Designation> findAll();

	 Optional<Designation> findByDesignationName(String designationName);
}
