console.log("form js ..");

// ce script gere les forms add,edit,del des vehicles

// ----------------------------1ere partie : ajout du html des forms -----------------------------

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


// ----------------------------2eme Parite : gerer l'affichage-------------------------------

// au debut, y a que le menu affiché
// onclick du menu -> CreateForm fait affiché le form souhaité

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



// -----------------------------------3eme Partie : fcts onclick des from  ----------------------------


var url = "http://vps.cpe-sn.fr:8081"
var teamuuid = "eda70af1-4c45-4f0a-abb1-99bf8f6b8385"; 
var facilityID=173;

const data = {
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


function AddVehicle(form){

    data.crewMember     =parseInt(form.crewMember.value);
    data.facilityRefID  =parseInt(form.facilityRefID.value);
    data.fuel           =parseInt(form.fuel.value);
    data.id             =parseInt(form.id.value);
    data.lat            =parseFloat(form.lat.value);
    data.liquidQuantity =parseInt(form.liquidQuantity.value);
    data.liquidType     =form.liquidType.value;
    data.lon            =parseFloat(form.lon.value);
    data.type           =form.type.value;
    console.log("vehicle to add :", data)
    // verifier pas vide
    ok = true;
    Object.values(data).every(
        element => {
            if(element == "" || (isNaN(element)&& typeof element != 'string')){
                alert("content empty"); 
                ok = false;
                return false;
            }
            return true;
        } 
    );
    if(!ok){return;}

    fetch (url+'/vehicle/'+teamuuid, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
        
    })
    .then(response => response.json())
    .then(data => {
        console.log('Added:', data);
    })
    .catch(error => console.error('Error:', error));
}

function EditVehicle(form){

    var editId = parseInt(form.editId.value);

    data.crewMember     =parseInt(form.crewMember.value);
    data.facilityRefID  =parseInt(form.facilityRefID.value);
    data.fuel           =parseInt(form.fuel.value);
    data.id             =parseInt(form.id.value);
    data.lat            =parseFloat(form.lat.value);
    data.liquidQuantity =parseInt(form.liquidQuantity.value);
    data.liquidType     =form.liquidType.value;
    data.lon            =parseFloat(form.lon.value);
    data.type           =form.type.value;

    // verifier pas vide
    ok = true;
    console.log("data before verify empty :", Object.values(data));
    Object.values(data).every(
        element => {
            console.log(element);
            if(element === "" || (isNaN(element)&& typeof element != 'string')){
                alert("content empty"); 
                ok = false;
                return false;
            }
            return true;
        } 
    );
    if(!ok){return;}

    console.log("ID of vehicle to edit :", editId);
    console.log("to translate to :", data)

    fetch (url+'/vehicle/'+teamuuid+'/'+editId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
        
    })
    .then(response => response.json())
    .then(data => {
        console.log('Edited: ', data);
    })
    .catch(error => console.error('Error:', error));

}

// !!!!!!!!!!!!!!!!!!!!!!! Attention : ne pas utiliser les fonctions Del !!!!!!!!!!!!!!!!!!!!!!

function  DelAllVehicle(){
    fetch (url+'/vehicle/'+teamuuid, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
    })
    .then (response => console.log('DeletedAll:', response.ok))
    .catch((error) => {
        console.error('Error:', error);
    });
}

function  DelVehicleByID(id){
    fetch (url+'/vehicle/'+teamuuid+'/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
    })
    .then (response => console.log('DeletedAll:', response.ok))
    .catch((error) => {
        console.error('Error:', error);
    });
}
