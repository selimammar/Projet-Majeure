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


var lfeu = new L.layerGroup();
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
.then (response => response.json())
.then(response => { 
response.forEach(vehicle => {
 tab_camion(vehicle);
 if (vehicle.facilityRefID == 173){
 var bindText = 'Type = ' +vehicle.type +'<br>'+'Nombre équipiers :' +vehicle.crewMember+'<br>'+ ' Type de liquide : ' +vehicle.liquidType+'<br>'+'Quantité de liquide : ' + vehicle.liquidQuantity;
 var marker = L.marker([vehicle.lat, vehicle.lon],{icon : VehicleIcon}).addTo(lnos_camions).bindPopup(bindText)
 }
 else {
 var bindText = 'Type = ' +vehicle.type +'<br>'+'Nombre équipiers :' +vehicle.crewMember+'<br>'+ ' Type de liquide : ' +vehicle.liquidType+'<br>'+'Quantité de liquide : ' + vehicle.liquidQuantity;
 var marker = L.marker([vehicle.lat, vehicle.lon],{icon : VehicleIcon2}).addTo(lleurs_camions).bindPopup(bindText)

 }
 } 
)});

let camions = [];

function tab_camion(camion) {
 camions.push(camion); 
}

lnos_camions = new L.layerGroup();
lleurs_camions = new L.layerGroup();

map.addLayer(lnos_camions);
map.addLayer(lleurs_camions);



function filtre_camion(){
 var nb_equipier = document.getElementById("equipier");
 var sliderE = document.getElementById("nb_equipier");
 var nos_camions = document.querySelector('input[value="nos_camions"]');
 var leurs_camions = document.querySelector('input[value="leurs_camions"]');

 nb_equipier.innerHTML = sliderE.value 

 lnos_camions.clearLayers();
 lleurs_camions.clearLayers();
 camions.forEach(camion =>{
 if (camion.crewMember <= sliderE.value ){
 console.log('aa')
 if (document.getElementById("nos_camions").checked == true && camion.facilityRefID == 173 ){
 var bindText = 'Type = ' +vehicle.type +'<br>'+'Nombre équipiers :' +camion.crewMember+'<br>'+ ' Type de liquide : ' +camion.liquidType+'<br>'+'Quantité de liquide : ' + camion.liquidQuantity;
 var marker = L.marker([camion.lat, camion.lon],{icon : VehicleIcon}).addTo(lnos_camions).bindPopup(bindText)
 }
 console.log('a')
 if(document.getElementById("leurs_camions").checked == true && !(camion.facilityRefID == 173)){
 var bindText = 'Type = ' +vehicle.type +'<br>'+'Nombre équipiers :' +camion.crewMember+'<br>'+ ' Type de liquide : ' +camion.liquidType+'<br>'+'Quantité de liquide : ' + camion.liquidQuantity;
 var marker = L.marker([camion.lat, camion.lon],{icon : VehicleIcon2}).addTo(lleurs_camions).bindPopup(bindText) 
 

 }
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



