package com.project.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.dto.FacilityDto;
import com.project.model.dto.FireDto;
import com.project.service.ClientRestService;

@RestController
public class FacilityCtr {

	@Autowired
	ClientRestService CRService;
	
	@CrossOrigin(origins = "hhtp://127.0.0.1:5500")
	@GetMapping("/facility")
	public FacilityDto[] getAllFacility() {
		return this.CRService.getAllFacility();
	}
	
	@CrossOrigin(origins = "hhtp://127.0.0.1:5500")
	@GetMapping("/fire/{id}")
	public FacilityDto getFacilityByID(@PathVariable int id) {
		return this.CRService.getFacilityByID(id);
	}
}
