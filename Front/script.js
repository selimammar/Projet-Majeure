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
addFormCont += "<input type='button' value='Add Vehicle' onclick='AddVehicle(this.form)'/>"
addForm.innerHTML = addFormCont;

var editForm = document.getElementById("edit");
var editFormCont = "<h1> Edit Vehicle by ID </h1>";
editFormCont += "<label> ID to be edited</label><input type='text' name='editId'>"
editFormCont += formCont;
editFormCont += "<input type='button' value='Edit Vehicle' onclick='EditVehicle(this.form)'/>"
editForm.innerHTML = editFormCont;

var delForm = document.getElementById("del");

addForm.style.display="none";
editForm.style.display="none";
delForm.style.display="none";


function CreateForm(formType){
    if (formType=='add'){    
        addForm.style.display="";
        editForm.style.display="none";
        delForm.style.display="none";
    }else if (formType=='edit'){
        addForm.style.display="none";
        editForm.style.display="";
        delForm.style.display="none";
    }else{
        addForm.style.display="none";
        editForm.style.display="none";
        delForm.style.display="";
    }

}