//package com.sunbeam.dto;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class OfficerLoginRespDTO {
//	 private String message;
//	
//}



package com.sunbeam.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfficerLoginRespDTO {
    private String message;
    private Long designationId; // ✅ new field
}