package com.project.repository;

import java.util.List;

import com.project.model.dto.*;

public interface VehicleRepository {

	public List<VehicleDTO> findByName(String name);
}
