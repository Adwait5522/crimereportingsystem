package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunbeam.entities.Complaints;
import com.sunbeam.entities.PoliceStation;

@Repository
public interface ComplaintsDao extends JpaRepository<Complaints, Long> {
	
	 List<Complaints> findByPoliceStationIdPoliceStationId(Long policeStationId);
	 boolean existsByComplaintType(String complaintType);

//		boolean existsByComplaintTypeAndIdNot(String complaintType, Long complaintId);
	 boolean existsByComplaintTypeAndComplaintIdNot(String complaintType, Long complaintId);


//		List<Complaints> findUserById(Long userId);
	 List<Complaints> findByUserUserId(Long userId);
	List<Complaints> findByPoliceStationId(PoliceStation station);
	List<Complaints> findByOfficerOfficerId(Long officerId);
	
}