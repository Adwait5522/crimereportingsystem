package com.sunbeam.service;

import com.sunbeam.dto.AdminLoginReqDTO;
import com.sunbeam.dto.AdminLoginRespDTO;

public interface AdminService {
	AdminLoginRespDTO authenticate(AdminLoginReqDTO logindto);
}
