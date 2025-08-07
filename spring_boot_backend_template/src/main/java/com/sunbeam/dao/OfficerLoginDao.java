package com.sunbeam.dao;

import com.sunbeam.entities.OfficerLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OfficerLoginDao extends JpaRepository<OfficerLogin, Long> {
    Optional<OfficerLogin> findByOfficerOfficerId(Long officerId);
}