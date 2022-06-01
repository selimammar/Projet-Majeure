var map = L.map('map').setView([45.732333858926715, 4.8260937761478795], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var url = "http://vps.cpe-sn.fr:8081";
var teamuuid = "eda70af1-4c45-4f0a-abb1-99bf8f6b8385"; 
fetch(url+'/facility')
    .then (response => {
        return response.json();
    })
.then(facility => {
    console.log(facility);
    for (let x in facility) {
        var marker = L.marker([facility[x].lat, facility[x].lon]).addTo(map);
    }
    
});

const data = {
    "crewMember": 8,
    "facilityRefID": 94,
    "fuel": 0,
    "id": 0,
    "lat": 0,
    "liquidQuantity": 0,
    "liquidType": "ALL",
    "lon": 0,
    "type": "CAR"
};

function AddVehicle(){

    fetch (url+'/vehicle/'+teamuuid, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
        
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function  DelVehicle(){
    fetch (url+'/vehicle/'+teamuuid, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
    })
    .then (response => console.log('Success:', response.ok))
    .catch((error) => {
        console.error('Error:', error);
    });
}
