console.log("form js ..");

var vDto = {
    "crewMember": 0,
    "facilityRefID": 0,
    "fuel": 0,
    "id": 0,
    "lat": 0,
    "liquidQuantity": 0,
    "liquidType": "ALL",
    "lon": 0,
    "type": "CAR"
};



var formCont = "";

var formInput1 = "<label> ";
var formInput2 = "</label><input type='text' name='";
var formInput3 = "'>";

for (var vDto_i in vDto) {
    formCont += formInput1 + vDto_i + formInput2 + vDto_i + formInput3;
}

var addForm = document.getElementById("add");
var addFormCont = "<h1> Add Vehicle </h1>";
addFormCont += formCont;
addFormCont += "<input type='button' value='Add Vehicle' onclick='AddVehicle()'/>"
addForm.innerHTML = addFormCont;

var delForm = document.getElementById("del");
var delFormCont = "<h1> Delete Vehicle </h1>";
delFormCont += formCont;
delFormCont += "<input type='button' value='Delete Vehicle' onclick='DelllllllVehicle()'/>"
delForm.innerHTML = delFormCont;