var map = L.map('map',{
    center: [39.73, -104.99],
    zoom: 10,
}).setView([45.732333858926715, 4.8260937761478795], 12);

var FacilityIcon = L.icon({
    iconUrl :  'caserne.png',
    iconSize : [50,50],
})

var FireIcon = L.icon({
    iconUrl :  'feu.png',
    iconSize : [40,60],
})

var VehicleIcon = L.icon({
    iconUrl :  'camion.png',
    iconSize : [70,60],
})

var VehicleIcon2 = L.icon({
    iconUrl :  'camion2.png',
    iconSize : [50,30],
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);http://vps.cpe-sn.fr:8081/facility

var url = "http://vps.cpe-sn.fr:8081"
var teamuuid = "eda70af1-4c45-4f0a-abb1-99bf8f6b8385"; 


fetch(url+'/fire')
.then (response =>  response.json())
.then(reponse => {
    reponse.forEach(fire => {
        tab(fire);
        var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lfeu).bindPopup('Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range)
    })
});

let feu = [];

function tab(fire) {
    feu.push(fire);
}


lfeu = new L.layerGroup();
map.addLayer(lfeu);

function filtre_feu(){
    var etendue = document.getElementById("val_eten");
    var intensite = document.getElementById("val_int");
    var sliderE = document.getElementById("myRange");
    var sliderI = document.getElementById("myRangeI")
    ;
    var A = document.querySelector('input[value="A"]');
    var B_Gasoline = document.querySelector('input[value="B_Gasoline"]');
    var B_Alcohol = document.querySelector('input[value="B_Alcohol"]');
    var B_Plastics = document.querySelector('input[value="B_Plastics"]');
    var C_Flammable_Gases = document.querySelector('input[value="C_Flammable_Gases"]');
    var D_Metals = document.querySelector('input[value="D_Metals"]');
    var E_Electric = document.querySelector('input[value="E_Electric"]')

    etendue.innerHTML = sliderE.value;
    intensite.innerHTML = sliderI.value;    



    lfeu.clearLayers();
    feu.forEach(fire =>{
    if (fire.intensity <= sliderI.value ){
        if ( fire.range <= sliderE.value){
            if ((document.getElementById("A").checked == true && fire.type == 'A' )||
            (document.getElementById("B_Gasoline").checked == true && fire.type == 'B_Gasoline' )||
            (document.getElementById("B_Alcohol").checked == true && fire.type == 'B_Alcohol' )||
            (document.getElementById("B_Plastics").checked == true && fire.type == 'B_Plastics' )||
            (document.getElementById("C_Flammable_Gases").checked == true && fire.type == 'C_Flammable_Gases' )||
            (document.getElementById("D_Metals").checked == true && fire.type == 'D_Metals' )||
            (document.getElementById("E_Electric").checked == true && fire.type == 'E_Electric' )){
                var marker = L.marker([fire.lat, fire.lon],{icon : FireIcon}).addTo(lfeu).bindPopup('Type = ' +fire.type +'<br>'+'Intensite :' +fire.intensity+'<br>'+'Etendue :' +fire.range)
}}}})}



fetch(url+'/vehicle')
.then (response =>  response.json())
.then(response => {   
response.forEach(vehicle => {
    tab_camion(vehicle);
    })   
});


lleurs_camions = new L.layerGroup();
lnos_camions =new  L.layerGroup();

map.addLayer(lleurs_camions);
map.addLayer(lnos_camions);

let camions = [];

function tab_camion(camion) {
    camions.push(camion);
    coucheNos_camions();
    coucheLeurs_camions();
    
}

function box_camion(){
    var nos_camions = document.querySelector('input[value="nos_camions"]');
    var leurs_camions = document.querySelector('input[value="leurs_camions"]');

    var bnos_camions = true;
    var bleurs_camions= true;


    nos_camions.onchange = function() {
        
        if (bnos_camions){
            lnos_camions.clearLayers();
            bnos_camions = false;
        }
        else{
            coucheNos_camions();
            bnos_camions=true;
        }
        
    }
    leurs_camions.onchange = function(){
        if (bleurs_camions){
            
            lleurs_camions.clearLayers();
            bleurs_camions = false;
        }
        else{
            coucheLeurs_camions();
            bleurs_camions=true;
        }
    }
}


    
function coucheNos_camions(){

    camions.forEach(vehicle =>{
        if (vehicle.facilityRefID == 173){
            var bindText = 'Type = ' +vehicle.type +'<br>'+'Nombre équipiers :' +vehicle.crewMember+'<br>'+ ' Type de liquide : ' +vehicle.liquidType+'<br>'+'Quantité de liquide : ' + vehicle.liquidQuantity;
            var marker = L.marker([vehicle.lat, vehicle.lon],{icon : VehicleIcon}).addTo(lnos_camions).bindPopup(bindText)//.openPopup();
    }
    })}

function coucheLeurs_camions(){
    camions.forEach(vehicle =>{
    if (!(vehicle.facilityRefID == 173)){
        var bindText = 'Type = ' +vehicle.type +'<br>'+'Nombre équipiers :' +vehicle.crewMember+'<br>'+ ' Type de liquide : ' +vehicle.liquidType+'<br>'+'Quantité de liquide : ' + vehicle.liquidQuantity;
        var marker = L.marker([vehicle.lat, vehicle.lon],{icon : VehicleIcon2}).addTo(lleurs_camions).bindPopup(bindText)//.openPopup();
    }
})}
    



fetch(url+'/facility')
.then (response =>  response.json())
.then(response => {   
response.forEach(facility => {
    tab_caserne(facility);
    })   
});


lleurs_casernes = new L.layerGroup();
lnotre_caserne =new  L.layerGroup();

map.addLayer(lnotre_caserne);
map.addLayer(lleurs_casernes);

let casernes = [];

function tab_caserne(caserne) {
    casernes.push(caserne);
    coucheNotre_caserne();
    coucheLeurs_casernes();
    
}

function box_caserne(){
    var notre_caserne = document.querySelector('input[value="notre_caserne"]');
    var leurs_casernes = document.querySelector('input[value="leurs_casernes"]');

    var bnotre_caserne = true;
    var bleurs_casernes= true;


    notre_caserne.onchange = function() {
        
        if (bnotre_caserne){
            lnotre_caserne.clearLayers();
            bnotre_caserne = false;
        }
        else{
            coucheNotre_caserne();
            bnotre_caserne=true;
        }
        
    }

    leurs_casernes.onchange = function(){
        if (bleurs_casernes){
            lleurs_casernes.clearLayers();
            bleurs_casernes = false;
        }
        else{
            coucheLeurs_casernes();
            bleurs_casernes=true;
        }
    }
}


    
function coucheNotre_caserne(){
    casernes.forEach(facility =>{
        if (facility.id == 173){
            var marker = L.marker([facility.lat, facility.lon],{icon: FacilityIcon}).addTo(lnotre_caserne).bindPopup('Id = ' +facility.id +'<br>'+'Nom :' +facility.name)
    }
    })}

function coucheLeurs_casernes(){
    casernes.forEach(facility =>{
    if (!(facility.id== 173)){
        var marker = L.marker([facility.lat, facility.lon],{icon: FacilityIcon}).addTo(lleurs_casernes).bindPopup('Id = ' +facility.id +'<br>'+'Nom :' +facility.name)
    }
})}






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
    data.lat            =parseInt(form.id.value);
    data.liquidQuantity =parseInt(form.liquidQuantity.value);
    data.liquidType     =form.liquidType.value;
    data.lon            =parseInt(form.lon.value);
    data.type           =form.type.value;
    console.log("vehicle to add :", data)
    // verifier pas vide
    ok = true;
    Object.values(data).every(
        element => {
            if(element == "" || isNaN(element)){
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

function  DelVehicle(){
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
