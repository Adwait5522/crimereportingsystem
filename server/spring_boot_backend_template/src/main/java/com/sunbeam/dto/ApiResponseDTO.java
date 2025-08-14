package com.sunbeam.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;


////DTO - to send resp from REST server -> REST clnt
@Getter
@Setter
public class ApiResponseDTO {
	private LocalDateTime timeStamp;
	private String mesg;
	
	public ApiResponseDTO(String mesg) {
		this.mesg=mesg;
		this.timeStamp=LocalDateTime.now();
	}
}

