package com.sunbeam.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.PoliceStation;

public interface PoliceStationDao extends JpaRepository<PoliceStation, Long>{
	List<PoliceStation> findAll(); 	
	List<PoliceStation> findByStatus(boolean status);
	Optional<PoliceStation> findByPoliceStationPincode(int policeStationPincode);
	
	boolean existsByStationHeadOfficerId(Long officerId);
	
}
