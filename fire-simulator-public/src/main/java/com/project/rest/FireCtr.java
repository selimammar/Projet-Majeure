package com.project.rest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.dto.FireDto;
import com.project.service.ClientRestService;


@RestController
public class FireCtr {
	
	@Autowired
	ClientRestService CRService;
	
	@CrossOrigin(origins = "hhtp://127.0.0.1:5500")
	@GetMapping("/fire")
	public FireDto[] getAllFire() {
		return this.CRService.getAllFire();
	}
	
	@CrossOrigin(origins = "hhtp://127.0.0.1:5500")
	@GetMapping("/fire/{id}")
	public FireDto getFireByID(@PathVariable int id) {
		return this.CRService.getFireByID(id);
	}
}
