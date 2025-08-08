package com.sunbeam.controller;

import com.sunbeam.dto.OfficerLoginReqDTO;
import com.sunbeam.entities.OfficerLogin;
import com.sunbeam.service.OfficerService;
//import com.sunbeam.services.OfficerLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/officerlogin")
public class OfficerLoginController {

    @Autowired
    private OfficerService officerLoginService;

    @PostMapping("/add-login")
    public ResponseEntity<OfficerLogin> addOfficerLogin(@RequestBody OfficerLoginReqDTO dto) {
        OfficerLogin savedLogin = officerLoginService.addOfficerLogin(dto);
        return ResponseEntity.ok(savedLogin);
    }
}
