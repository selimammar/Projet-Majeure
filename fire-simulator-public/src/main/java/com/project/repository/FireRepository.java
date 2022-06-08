package com.project.repository;

import java.util.List;

import com.project.model.dto.*;

public interface FireRepository {

	public List<FireDto> findByName(String name);

	public FireDto[] findAll();

	public FireDto save(FireDto f);
}
