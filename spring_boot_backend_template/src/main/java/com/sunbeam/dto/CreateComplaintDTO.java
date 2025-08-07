package com.sunbeam.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateComplaintDTO {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String city;

    @NotBlank
    private String state;

    private int locationPincode;  // Optional validation
}


