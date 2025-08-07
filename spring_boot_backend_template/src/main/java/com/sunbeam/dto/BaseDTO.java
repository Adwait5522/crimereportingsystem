package com.sunbeam.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public  abstract class BaseDTO {
	    private LocalDateTime createdAt;
	    private LocalDateTime updatedAt;
}
