package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.Feedback;

public interface FeedBackDao extends JpaRepository<Feedback, Long>{
	List<Feedback> findByStatus(boolean status); 	
//	List<Feedback> findAll();
}
