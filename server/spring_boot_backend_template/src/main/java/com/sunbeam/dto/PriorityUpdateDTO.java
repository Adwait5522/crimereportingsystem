package com.sunbeam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PriorityUpdateDTO {
    private String priority; // Must be "LOW", "MEDIUM", or "HIGH"
}