package com.project.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.model.dto.VehicleDTO;
import com.project.service.ClientRestService;

@RestController
public class VehicleCtr{
	
	@Autowired
	ClientRestService CRService;
	
	@CrossOrigin(origins = "127.0.0.1:5500")
	@GetMapping("/vehicle")
	public VehicleDTO[] getAllVehicles() {
		return this.CRService.getAllVehicles();
	}
	
	@GetMapping("/vehicle/{id}")
	public VehicleDTO getVehicleByID(@PathVariable int id) {
		return this.CRService.getVehicleByID(id);
	}
	
//	@PostMapping("/vehicle/{teamuuid}")
//	public VehicleDTO addVehicle(@PathVariable String teamuuid, @RequestBody VehicleDTO vehicle) {
//		return this.CRService.addVehicle(teamuuid, vehicle);
//	}
	
}