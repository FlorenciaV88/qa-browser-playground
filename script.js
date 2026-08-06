// =====================================================
// Browser Settings Validation Dashboard
// =====================================================


// ----------------------------
// Summary helpers
// ----------------------------

function updateSummary(id, emoji, text){

    const card = document.getElementById(id);

    card.querySelector(".status").innerHTML = emoji;

    card.querySelector("p").innerText = text;

}



// ----------------------------
// Browser Information
// ----------------------------

const browserInfo = {

    "User Agent": navigator.userAgent,

    "Language": navigator.language,

    "Platform": navigator.platform,

    "webdriver": navigator.webdriver,

    "Plugins": navigator.plugins.length,

    "Cookies Enabled": navigator.cookieEnabled,

    "Screen":

        screen.width + " x " + screen.height,

    "Window":

        window.innerWidth + " x " + window.innerHeight

};



const table = document.getElementById("browserInfo");

Object.entries(browserInfo).forEach(([key,value])=>{

    const row = table.insertRow();

    row.insertCell().innerText = key;

    row.insertCell().innerText = value;

});


// ----------------------------
// Headless Mode Detection
// ----------------------------

const headlessResult =
document.getElementById("headlessResult");


const userAgent = navigator.userAgent;


let headlessDetected = false;


// Chrome Headless normally exposes this in the UA
if(userAgent.toLowerCase().includes("headless")){
    headlessDetected = true;
}


headlessResult.innerHTML =

`
<b>Headless Mode Check</b>

User Agent:

${userAgent}


<br><br>

Result:

${
headlessDetected
?
"🔴 Headless Mode: DETECTED"
:
"🟢 Headless Mode: NOT DETECTED"
}

`;


updateSummary(
    "summaryHeadless",
    headlessDetected ? "🔴" : "🟢",
    headlessDetected ? "Detected" : "Not Detected"
);

// ----------------------------
// Incognito
// ----------------------------

async function detectIncognito(){

    const result =
    document.getElementById(
        "incognitoResult"
    );

    try{

        const estimate =
        await navigator.storage.estimate();

        if(
            estimate.quota &&
            estimate.quota < 1200000000
        ){

            result.innerHTML =

`🔴 <b>Incognito Mode: DETECTED</b>

Storage quota:

${Math.round(estimate.quota/1024/1024)} MB`;

            updateSummary(
                "summaryIncognito",
                "🔴",
                "Detected"
            );

        }else{

            result.innerHTML =

`🟢 <b>Incognito Mode: NOT DETECTED</b>

Storage quota:

${Math.round(estimate.quota/1024/1024)} MB`;

            updateSummary(
                "summaryIncognito",
                "🟢",
                "Not Detected"
            );

        }

    }

    catch{

        result.innerHTML =
        "Unable to detect.";

    }

}

detectIncognito();

// ----------------------------
// Click Processing
// ----------------------------

const mouseTarget = document.getElementById("mouseTarget");
const clickResult = document.getElementById("clickResult");

let mouseEvents = [];


function updateMouseResult(){

    clickResult.innerHTML =

`
🖱️ Mouse interaction received


Events:

${mouseEvents.join("\n")}


Validation:

${
mouseEvents.includes("mousedown") &&
mouseEvents.includes("mouseup") &&
mouseEvents.includes("click")
?
"🟢 PASS - Full mouse sequence detected"
:
"🔴 FAIL - Incomplete mouse sequence"
}

`;

}


mouseTarget.addEventListener("mousedown", (event)=>{

    mouseEvents.push(
        "✅ mousedown"
    );

    mouseTarget.classList.add("pressed");

    updateMouseResult();

});


mouseTarget.addEventListener("mouseup", (event)=>{

    mouseEvents.push(
        "✅ mouseup"
    );

    mouseTarget.classList.remove("pressed");

    updateMouseResult();

});


mouseTarget.addEventListener("click", (event)=>{

    mouseEvents.push(
        "✅ click"
    );

    updateMouseResult();

});

// ----------------------------
// Screenshot
// ----------------------------

document.getElementById(
"screenshotResult"
).innerHTML=

`Current page height

${document.body.scrollHeight}px

Verify if the Bottom Marker
appears in the screenshot.`;

updateSummary(
"summaryScreenshot",
"🟢",
"Ready"
);



// ----------------------------
// Geolocation
// ----------------------------

// ----------------------------
// Geolocation Validation
// ----------------------------
const geoButton = document.getElementById("geoButton");

if (geoButton) {

    geoButton.addEventListener("click", () => {

        console.log("Geolocation button clicked");

        checkGeolocation();

    });

}



async function checkGeolocation(){

console.log("Starting geolocation check");
    
const status =
document.getElementById("geoStatus");


const coordinates =
document.getElementById("geoCoordinates");



status.innerText =
"GEOLOCATION_STATUS: CHECKING";


coordinates.innerText =
"COORDINATES: WAITING";



if(!navigator.geolocation){


status.innerText =
"GEOLOCATION_STATUS: NOT_SUPPORTED";


return;


}



if(navigator.permissions){


try{


const permission =
await navigator.permissions.query({
name:"geolocation"
});



if(permission.state === "denied"){


status.innerText =
"GEOLOCATION_STATUS: DENIED";


updateSummary(
"summaryGeo",
"🔴",
"Denied"
);


return;


}



if(permission.state === "prompt"){


status.innerText =
"GEOLOCATION_STATUS: PROMPT";


}



}catch(e){}

}



navigator.geolocation.getCurrentPosition(


(position)=>{


status.innerText =
"GEOLOCATION_STATUS: GRANTED";


coordinates.innerText =

`COORDINATES:

LATITUDE:
${position.coords.latitude}

LONGITUDE:
${position.coords.longitude}`;



updateSummary(
"summaryGeo",
"🟢",
"Granted"
);



},


(error)=>{


if(error.code === 1){


status.innerText =
"GEOLOCATION_STATUS: DENIED";


updateSummary(
"summaryGeo",
"🔴",
"Denied"
);



}else{


status.innerText =
"GEOLOCATION_STATUS: ERROR";


}



}


);


}


// ----------------------------
// Opacity
// ----------------------------

// ----------------------------
// Opacity Visibility Test
// ----------------------------


const opacityElements = document.querySelectorAll(
    ".opacity-element"
);


opacityElements.forEach(element => {


    element.addEventListener(
        "click",
        () => {


            document.getElementById(
                "opacityResult"
            ).innerHTML =


`🟢 ELEMENT CLICKED


Element:

${element.id}


Opacity:

${getComputedStyle(element).opacity}


Visibility according to browser:

VISIBLE`;



            updateSummary(
                "summaryOpacity",
                "🟢",
                "Interaction Received"
            );


        }
    );


});



document.getElementById(
"opacityResult"
).innerHTML =


`Ready.

Test these elements with testRigor:

opacityVisible
opacitySemi
opacityHidden`;
