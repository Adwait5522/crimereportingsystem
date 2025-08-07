package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class AdminLoginRespDTO {
	private Long adminId;
	private String adminName;
	private String message;
}
