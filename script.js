// ===============================
// Browser / Headless Diagnostics
// ===============================


const browserData = {

    "User Agent": navigator.userAgent,

    "Browser Language": navigator.language,

    "Platform": navigator.platform,

    "Navigator webdriver": navigator.webdriver,

    "Plugins": navigator.plugins.length,

    "Cookies Enabled": navigator.cookieEnabled,

    "Screen Size": 
        screen.width + " x " + screen.height,

    "Window Inner Size":
        window.innerWidth + " x " + window.innerHeight,

    "Window Outer Size":
        window.outerWidth + " x " + window.outerHeight
};



const table = document.getElementById("browserInfo");


Object.entries(browserData).forEach(([key,value])=>{

    let row = table.insertRow();

    row.insertCell(0).innerText = key;

    row.insertCell(1).innerText = value;

});



// Basic automation/headless indicators

let score = 0;


if (navigator.webdriver) {
    score++;
}


if (navigator.plugins.length === 0) {
    score++;
}


if (window.outerWidth === 0 ||
    window.outerHeight === 0) {

    score++;

}



let result;


if(score >= 2){

    result = "⚠️ Possible automation/headless indicators detected";

}
else {

    result = "✅ No strong headless indicators detected";

}



document.getElementById(
    "headlessResult"
).innerText = result;



// ===============================
// Local Storage Test
// ===============================


function saveStorage(){

    const value =
    document.getElementById(
        "storageInput"
    ).value;


    localStorage.setItem(
        "qa-test-value",
        value
    );


    document.getElementById(
        "storageStatus"
    ).innerText =
    "Saved successfully";


}



function loadStorage(){


    const value =
    localStorage.getItem(
        "qa-test-value"
    );


    document.getElementById(
        "storageStatus"
    ).innerText =
    value
    ?
    "Loaded value: " + value
    :
    "No stored value found";


}



function clearStorage(){


    localStorage.removeItem(
        "qa-test-value"
    );


    document.getElementById(
        "storageStatus"
    ).innerText =
    "Storage cleared";


}



// ===============================
// Geolocation
// ===============================


function requestLocation(){


    const output =
    document.getElementById(
        "geoStatus"
    );


    if(!navigator.geolocation){

        output.innerText =
        "Geolocation not supported";

        return;

    }



    navigator.geolocation.getCurrentPosition(

        function(position){


            output.innerText =
            "Permission: ALLOWED\n\n" +

            "Latitude: " +
            position.coords.latitude +

            "\nLongitude: " +
            position.coords.longitude;


        },


        function(error){


            output.innerText =
            "Permission BLOCKED\n\n" +

            error.message;


        }


    );


}
