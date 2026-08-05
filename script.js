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
// Headless
// ----------------------------

// ----------------------------
// Headless Mode Detection
// ----------------------------

// ----------------------------
// Headless Mode Detection - DEBUG
// ----------------------------

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

const button = document.getElementById("clickButton");

const clickResult = document.getElementById("clickResult");

let detectedEvents = [];
let clickStartTime = 0;
let analysisTimer;


const trackedEvents = [
    "mouseover",
    "mouseenter",
    "pointermove",
    "mousemove",
    "mousedown",
    "mouseup",
    "click"
];


trackedEvents.forEach(eventName => {

    button.addEventListener(eventName, function(event){


        if(eventName === "mouseover"){
            detectedEvents = [];
            clickStartTime = Date.now();
        }


        if(!detectedEvents.includes(eventName)){
            detectedEvents.push(eventName);
        }


        clearTimeout(analysisTimer);


        analysisTimer = setTimeout(() => {


            let hasMouseSequence =
                detectedEvents.includes("mousemove") ||
                detectedEvents.includes("pointermove") ||
                detectedEvents.includes("mouseenter");


            if(hasMouseSequence){

                clickResult.innerHTML =
`
🟢 JavaScript Click Processing behavior detected

Observed:

${detectedEvents.map(e=>"✓ " + e).join("<br>")}


Result:

DOM event sequence detected before click.
`;

                updateSummary(
                    "summaryClicks",
                    "🟢",
                    "JavaScript behavior detected"
                );


            } else {


                clickResult.innerHTML =
`
🟢 OS Mouse Click Processing behavior detected

Observed:

${detectedEvents.map(e=>"✓ " + e).join("<br>")}


Result:

Native mouse-like click sequence detected.
`;

                updateSummary(
                    "summaryClicks",
                    "🟢",
                    "OS Mouse behavior detected"
                );

            }


        }, 300);


    });

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
