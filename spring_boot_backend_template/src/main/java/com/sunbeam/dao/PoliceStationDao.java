package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.PoliceStation;

public interface PoliceStationDao extends JpaRepository<PoliceStation, Long>{
	List<PoliceStation> findAll(); 	
	List<PoliceStation> findByStatus(boolean status);
}
