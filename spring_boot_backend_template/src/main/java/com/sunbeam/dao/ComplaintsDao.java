package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunbeam.entities.Complaints;

@Repository
public interface ComplaintsDao extends JpaRepository<Complaints, Long> {
	
	 List<Complaints> findByPoliceStationIdPoliceStationId(Long policeStationId);
}