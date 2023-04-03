package com.controller;

import java.util.Arrays;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exceptions.NoDataFoundException;
import com.exceptions.NullDataException;
import com.exceptions.PatientNotFoundException;
import com.model.Patient;
import com.service.PatientService;
import com.service.ServicesService;
import com.util.Status;

import jakarta.servlet.http.HttpServletRequest;


@RestController
@CrossOrigin("http://localhost:4200/")
public class Controller {

	@Autowired
	private PatientService service;
	
	@Autowired
	private ServicesService services;
	
	@GetMapping("/patient")
	public ResponseEntity<?> getPatient(HttpServletRequest request) throws NoDataFoundException {
		if(service.getAllPatients() != null) {
			Status status = new Status();
			status.setResponseStatus(service.getAllPatients() != null);
			status.setStatusCode(HttpStatus.OK);
			status.setPath(request.getRequestURI());
			status.setTimestamp(new Date());
			//status.setServices(null);
			status.setPatient(service.getAllPatients());
			return new ResponseEntity<>(status, HttpStatus.OK);
		}
		throw new NoDataFoundException("");
	}
	
	@GetMapping("/services")
	public ResponseEntity<?> getAllServices(HttpServletRequest request) throws NoDataFoundException {
		if(services.getAllServices() != null) {			
			Status status = new Status();
			status.setResponseStatus(services.getAllServices() != null);
			status.setStatusCode(HttpStatus.OK);
			status.setPath(request.getRequestURI());
			status.setTimestamp(new Date());
			//status.setPatient(null); 
			status.setServices(services.getAllServices());
			return new ResponseEntity<>(status, HttpStatus.OK);
		}
		throw new NoDataFoundException("No data found");
	}
	
	@PostMapping("/addpatient")
	public ResponseEntity<?> addPatient(@RequestBody Patient pt, HttpServletRequest request) throws NullDataException{
		if (service.addPatient(pt)) {
			Status status = new Status();
			status.setResponseStatus(service.addPatient(pt));
			status.setStatusCode(HttpStatus.CREATED);
			status.setPath(request.getRequestURI());
			status.setTimestamp(new Date());
			//status.setServices(null);
			//status.setPatient(null);
			return new ResponseEntity<>(status, HttpStatus.CREATED);
		}
		throw new NullDataException("Null Data cannot be added");
	}
	
	@GetMapping("/getpatient/{pid}")
	public ResponseEntity<?> getPatientById(@PathVariable("pid") long pid, HttpServletRequest request) throws PatientNotFoundException{
		if(service.getPatientById(pid) != null) {
			Status status = new Status();
			status.setResponseStatus(service.getPatientById(pid) != null);
			status.setStatusCode(HttpStatus.OK);
			status.setPath(request.getRequestURI());
			status.setTimestamp(new Date());
			//status.setServices(null);
			status.setPatient(Arrays.asList(service.getPatientById(pid)));
			return new ResponseEntity<>(status, HttpStatus.FOUND);
		}
		throw new PatientNotFoundException("Patient details not found");
	}
	
	@GetMapping("/getservice/{sid}")
	public ResponseEntity<?> getServiceById(@PathVariable("sid") long sid, HttpServletRequest request) throws NoDataFoundException{
		if(services.getServiceById(sid) != null) {
			Status status = new Status();
			status.setResponseStatus(services.getServiceById(sid) != null);
			status.setStatusCode(HttpStatus.OK);
			status.setPath(request.getRequestURI());
			status.setTimestamp(new Date());
			//status.setPatient(null);
			status.setServices(Arrays.asList(services.getServiceById(sid)));
			return new ResponseEntity<>(status, HttpStatus.FOUND);
		}
		throw new NoDataFoundException("No data found");
	}
	
	@GetMapping("/getservicesbyname")
	public ResponseEntity<?> getServiceById(@RequestParam("serviceName") String serviceName, HttpServletRequest request) throws NoDataFoundException{
		if(services.getServicesByServiceName(serviceName) != null) {
			Status status = new Status();
			status.setResponseStatus(services.getServicesByServiceName(serviceName) != null);
			status.setStatusCode(HttpStatus.OK);
			status.setPath(request.getRequestURI());
			status.setTimestamp(new Date());
			//status.setPatient(null);
			status.setServices(services.getServicesByServiceName(serviceName));
			return new ResponseEntity<>(status, HttpStatus.FOUND);
		}
		throw new NoDataFoundException("No data found");
	}
	
	@PutMapping("/updatepatient/{pid}")
	public ResponseEntity<?> updatePatientById(@RequestBody Patient pt, @PathVariable("pid") long pid, HttpServletRequest request) throws PatientNotFoundException{
		if(service.updatePatient(pt, pid)) {
			Status status = new Status();
			status.setResponseStatus(service.updatePatient(pt, pid));
			status.setStatusCode(HttpStatus.OK);
			status.setPath(request.getRequestURI());
			status.setTimestamp(new Date());
			//status.setServices(null);
			//status.setPatient(null);
			return new ResponseEntity<>(status, HttpStatus.OK);
		}
		throw new PatientNotFoundException("Patient details not found");
	}
	
	@DeleteMapping("/deletepatient/{pid}")
	public ResponseEntity<?> deletePatientById(@PathVariable("pid") long pid, HttpServletRequest request) throws PatientNotFoundException{
		if(service.deletePatientById(pid)) {
			Status status = new Status();
			status.setResponseStatus(service.deletePatientById(pid));
			status.setStatusCode(HttpStatus.OK);
			status.setPath(request.getRequestURI());
			status.setTimestamp(new Date());
			//status.setServices(null);
			//status.setPatient(null);
			return new ResponseEntity<>(status, HttpStatus.OK);
		}
		throw new PatientNotFoundException("Patient details not found");
	}
	
	@DeleteMapping("/deleteallpatients")
	public ResponseEntity<?> deleteAllPatients(HttpServletRequest request) throws NoDataFoundException{
		if(service.deletePatients()) {
			Status status = new Status();
			status.setResponseStatus(service.deletePatients());
			status.setStatusCode(HttpStatus.OK);
			status.setPath(request.getRequestURI());
			status.setTimestamp(new Date());
			//status.setServices(null);
			//status.setPatient(null);
			return new ResponseEntity<>(status, HttpStatus.OK);
		}
		throw new NoDataFoundException("No data found");
	}
}





