package com.project.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.dto.FireDto;
import com.project.model.dto.VehicleDTO;
import com.project.service.ClientRestService;
import com.project.service.FireService;

@RestController
public class VehicleCtr{
	
	@Autowired
	ClientRestService CRService;
	
	@Autowired
	FireService fservice;
	
	@GetMapping("/vehicle")
	public VehicleDTO[] getAllVehicles() {
		return this.CRService.getAllVehicles();
	}
	
	@GetMapping("/vehicle/{id}")
	public VehicleDTO getVehicleByID(@PathVariable int id) {
		return this.CRService.getVehicleByID(id);
	}
	
	@GetMapping("/fire")
	public FireDto[] getAllFire() {
		return this.CRService.getAllFire();
	}

	
	
}