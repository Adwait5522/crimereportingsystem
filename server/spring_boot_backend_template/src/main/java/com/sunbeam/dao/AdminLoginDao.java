package com.sunbeam.dao;

import com.sunbeam.entities.AdminLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminLoginDao extends JpaRepository<AdminLogin, Long> {
    Optional<AdminLogin> findByAdminAdminId(Long adminId);
}