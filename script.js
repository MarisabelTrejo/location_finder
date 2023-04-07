const button = document.querySelector("button");
// USE GEOLOCATION TO FIND THE USER
button.addEventListener("click", ()=>{
    if(navigator.geolocation){
        button.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        button.innerText = "Your browser not support";
    }
});
// when allowed report back location
function onSuccess(position){
    //when actively gathering locaiton
    button.innerText = "Detecting your location...";
    let {latitude, longitude} = position.coords;
    //fetching the apikey
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b7714137a49a4ec28354619634e91d79`)
    .then(response => response.json()).then(response =>{
        let allDetails = response.results[0].components;
        console.table(allDetails);
        let {road, city, state, county, postcode} = allDetails;
        button.innerText = `${road}, ${city}, ${state}, ${county}, ${postcode}`;
    }).catch(()=>{
        button.innerText = "Something went wrong";
    });
}
// when request fails to gather locaton
function onError(error){
    // denied
    if(error.code == 1){
        button.innerText = "You denied the request";
    }
    // location unavailable
    else if(error.code == 2){
        button.innerText = "Location is unavailable";
    }
    // somthing isnt right
    else{
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
}
