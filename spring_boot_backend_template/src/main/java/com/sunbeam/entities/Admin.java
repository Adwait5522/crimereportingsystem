package com.sunbeam.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Admin extends BaseEntity {


    @Id
    private Long adminId;

    @Column(nullable = false, length = 255)
    private String adminName;

}