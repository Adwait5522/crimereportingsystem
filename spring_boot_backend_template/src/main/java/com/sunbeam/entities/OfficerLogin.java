package com.sunbeam.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "officerlogin")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OfficerLogin extends BaseEntity {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "login_id")
	    private Long loginId;

	    @OneToOne
	    @JoinColumn(name = "officer_id")
	    private Officer officer;

	    @Column(nullable = false)
	    private String password;
	
}
