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

const headlessResult =
document.getElementById("headlessResult");


headlessResult.innerHTML =

`
<b>Headless Debug</b>

webdriver:
${navigator.webdriver}

<br><br>

plugins:
${navigator.plugins.length}

<br><br>

outerWidth:
${window.outerWidth}

<br><br>

outerHeight:
${window.outerHeight}

<br><br>

innerWidth:
${window.innerWidth}

<br><br>

innerHeight:
${window.innerHeight}

`;
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

const button =
document.getElementById("clickButton");

button.addEventListener("click",(event)=>{

    document.getElementById("clickResult").innerHTML=

`🟢 CLICK RECEIVED

Type:
${event.type}

Trusted:
${event.isTrusted}

Button:
${event.button}

Buttons:
${event.buttons}

Client:
${event.clientX}, ${event.clientY}

Screen:
${event.screenX}, ${event.screenY}

TimeStamp:
${Math.round(event.timeStamp)}
`;

    updateSummary(
        "summaryClicks",
        "🟢",
        "Click Received"
    );

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

async function checkGeolocation(){

    const result =
    document.getElementById(
        "geoResult"
    );

    if(
        !navigator.geolocation
    ){

        result.innerHTML=
        "Not supported";

        return;

    }

    if(navigator.permissions){

        try{

            const permission =
            await navigator.permissions.query({
                name:"geolocation"
            });

            result.innerHTML=

`Permission

${permission.state.toUpperCase()}

Waiting for location...`;

        }

        catch{}

    }

    navigator.geolocation.getCurrentPosition(

        position=>{

            result.innerHTML=

`🟢 GRANTED

Latitude

${position.coords.latitude}

Longitude

${position.coords.longitude}`;

            updateSummary(
                "summaryGeo",
                "🟢",
                "Granted"
            );

        },

        error=>{

            result.innerHTML=

`🔴 DENIED

${error.message}`;

            updateSummary(
                "summaryGeo",
                "🔴",
                "Denied"
            );

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
