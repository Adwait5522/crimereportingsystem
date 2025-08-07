package com.sunbeam.service;

import org.springframework.stereotype.Service;


import com.sunbeam.dao.AdminDao;
import com.sunbeam.dao.AdminLoginDao;
import com.sunbeam.dto.AdminLoginReqDTO;
import com.sunbeam.dto.AdminLoginRespDTO;
import com.sunbeam.entities.Admin;
import com.sunbeam.entities.AdminLogin;
import com.sunbeam.exception.ApiException;
import com.sunbeam.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AdminServiceImpl implements AdminService{
	private final AdminLoginDao adminLoginDao;
	private final AdminDao adminDao;
	@Override
	public AdminLoginRespDTO authenticate(AdminLoginReqDTO logindto) {
        AdminLogin login = adminLoginDao
                .findByAdminAdminId(logindto.getAdminId())
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found!"));
        Admin admin = adminDao.findById(logindto.getAdminId()).orElseThrow(() -> new ResourceNotFoundException("Admin not found!"));     
        
            if (!login.getPassword().equals(logindto.getPassword())) {
                throw new ApiException("Invalid password!");
            }
            return new AdminLoginRespDTO(admin.getAdminId(),admin.getAdminName(),"Logged in as admin -"+admin.getAdminName()+" Successfully!");
	}
	
}
