package com.project.model;

public class Vehicle {
	
	private Integer crewMember;
	final private Integer facilityRefID = 173;
	private Integer fuel;
	private Integer id;
	private Integer lat;
	private Integer lon;
	private Integer liquidQuantity;
	private String liquidtype;
	private String type;
	
	
	
	public Vehicle() {
	}



	public Vehicle(Integer crewMember, Integer fuel, Integer id, Integer lat, Integer lon, Integer liquidQuantity,
			String liquidtype, String type) {
		super();
		this.crewMember = crewMember;
		this.fuel = fuel;
		this.id = id;
		this.lat = lat;
		this.lon = lon;
		this.liquidQuantity = liquidQuantity;
		this.liquidtype = liquidtype;
		this.type = type;
	}



	public Integer getCrewMember() {
		return crewMember;
	}



	public void setCrewMember(Integer crewMember) {
		this.crewMember = crewMember;
	}



	public Integer getFacilityRefID() {
		return facilityRefID;
	}



	public void setFuel(Integer fuel) {
		this.fuel = fuel;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public void setLat(Integer lat) {
		this.lat = lat;
	}



	public void setLon(Integer lon) {
		this.lon = lon;
	}



	public void setLiquidQuantity(Integer liquidQuantity) {
		this.liquidQuantity = liquidQuantity;
	}



	public void setLiquidtype(String liquidtype) {
		this.liquidtype = liquidtype;
	}



	public void setType(String type) {
		this.type = type;
	}



	@Override
	public String toString() {
		return "Vehicle [crewMember=" + crewMember + ", facilityRefID=" + facilityRefID + ", fuel=" + fuel + ", id="
				+ id + ", lat=" + lat + ", lon=" + lon + ", liquidQuantity=" + liquidQuantity + ", liquidtype="
				+ liquidtype + ", type=" + type + "]";
	}
	
	
}