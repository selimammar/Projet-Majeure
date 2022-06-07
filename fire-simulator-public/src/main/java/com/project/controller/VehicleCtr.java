package com.project.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.model.dto.VehicleDTO;
import com.project.service.ClientRestService;

@RestController
public class VehicleCtr{
	
	@Autowired
	ClientRestService CRService;
	
	@GetMapping("/vehicle")
	public VehicleDTO[] getAllVehicles() {
		return this.CRService.getAllVehicles();
	}
	
	@GetMapping("/vehicle/{id}")
	public VehicleDTO getVehicleByID(@PathVariable int id) {
		return this.CRService.getVehicleByID(id);
	}
	
	@PostMapping("/vehicle/{teamuuid}")
	public VehicleDTO postVehicle(@PathVariable String teamuuid, @RequestBody VehicleDTO vehicle) {
		return this.CRService.postVehicle(teamuuid, vehicle);
	}
	
	@PutMapping("/vehicle/{teamuuid}/{id}")
	public void putVehicle(@PathVariable String teamuuid, @RequestBody VehicleDTO vehicle) {
		this.CRService.putVehicle(teamuuid, vehicle);
	}
	
}