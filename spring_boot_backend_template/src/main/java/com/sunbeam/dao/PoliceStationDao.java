package com.sunbeam.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.PoliceStation;

public interface PoliceStationDao extends JpaRepository<PoliceStation, Long> {
	
	

}
