package com.sunbeam.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entities.Admin;


public interface AdminDao extends JpaRepository<Admin, Long>{

}
