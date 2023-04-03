package com;

import java.util.Arrays;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.model.Patient;
import com.model.Services;
import com.service.PatientService;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
@ComponentScan(basePackages={"com.controller", "com.model", "com.repository", "com.service", "com.util", "com.exceptions"})
public class Assignment1Application {

	@Autowired
	private PatientService service;
	
	@PostConstruct
	public void post() {
		service.addPatient(new Patient(1, "Raj", "Yadav", new HashSet<>(Arrays.asList(new Services(1, "OPD", 125)))));
		service.addPatient(new Patient(2, "Ram", "Kumar", new HashSet<>(Arrays.asList(new Services(2, "Scan", 200)))));
		service.addPatient(new Patient(3, "Raghu", "Varma", new HashSet<>(Arrays.asList(new Services(3, "MRI", 300)))));
		service.addPatient(new Patient(4, "John", "Doe", new HashSet<>(Arrays.asList(new Services(4, "ECG", 500)))));
		service.addPatient(new Patient(5, "Ravi", "Kumar", new HashSet<>(Arrays.asList(new Services(5, "Blood Test", 150)))));
	}
	
	public static void main(String[] args) {
		SpringApplication.run(Assignment1Application.class, args);
	}

}
