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
