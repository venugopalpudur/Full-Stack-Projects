/*package com.controller;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import org.aspectj.weaver.NewConstructorTypeMunger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.model.Patient;
import com.model.Service;
import com.repository.PatientRepository;
import com.repository.ServiceRepository;
import com.service.PatientService;


@Controller
public class PatientController {
	
	@Autowired
	private PatientRepository repo;
	
	@Autowired
	private ServiceRepository repoServ;
	
	@Autowired
	private PatientService service;
	
	@GetMapping("/")
	public String home() {
		
		Patient pt1 = new Patient(1, "raj", "kundra");
		
		Service s1 = new Service(1, "sdgs", 123, pt1);
		Service s2 = new Service(2, "sdgsd", 561, pt1);
		
		repo.save(pt1);
		repoServ.save(s1);
		repoServ.save(s2);
		
		return "index";
	}
	
	@PostMapping("/ptAdd")
	public String addPatients(@ModelAttribute("patient") Patient pt){//, @ModelAttribute("Service") Service sv) {
		
		return "index";
	}
	
	@PostMapping("/serviceAdd")
	public String addService(@ModelAttribute("patient") Patient pt) { //@ModelAttribute("service") Service sv, 
		//service.addPatient(sv);
		//System.out.println("Data - "+sv);
		return "service";
	}
	
	@GetMapping("/patient")
    public String showForm(Model model) {
        model.addAttribute("patient", new Patient());
        //model.addAttribute("service", new Service());
        model.addAttribute("patientsList", repo.findAll());
        return "service";
    }
	
	
	@GetMapping("/sv")
	public ModelAndView services() {
		//Patient pt1 = new Patient(1, "raj", "kundra", new HashSet<Service>(Arrays.asList(new Service(1, "asd", 125),new Service(2, "asd", 125))));
		
		//repo.save(pt1);
		
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("service");
		modelAndView.addObject("patient", repo.findAll());
		return modelAndView;
	}
	
}
*/