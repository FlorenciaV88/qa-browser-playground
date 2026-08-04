// ===============================
// Browser Diagnostics
// ===============================


const browserData = {


"User Agent":
navigator.userAgent,


"Language":
navigator.language,


"Platform":
navigator.platform,


"webdriver":
navigator.webdriver,


"Plugins":
navigator.plugins.length,


"Cookies":
navigator.cookieEnabled,


"Screen":
screen.width+" x "+screen.height,


"Window Inner":
window.innerWidth+" x "+window.innerHeight,


"Window Outer":
window.outerWidth+" x "+window.outerHeight

};



const table =
document.getElementById(
"browserInfo"
);



Object.entries(browserData)
.forEach(([key,value])=>{


let row =
table.insertRow();


row.insertCell(0).innerText=key;


row.insertCell(1).innerText=value;


});




// ===============================
// Headless Detection
// ===============================


let headlessScore=0;


if(navigator.webdriver)
headlessScore++;


if(navigator.plugins.length===0)
headlessScore++;


if(window.outerWidth===0 ||
window.outerHeight===0)
headlessScore++;



document.getElementById(
"headlessResult"
).innerText =

headlessScore>=2

?

"⚠️ Possible Headless / Automation"

:

"✅ Normal Browser Indicators";





// ===============================
// Incognito Heuristic
// ===============================


async function detectIncognito(){


const output =
document.getElementById(
"incognitoResult"
);



try {


const estimate =
await navigator.storage.estimate();



if(
estimate.quota &&
estimate.quota < 1200000000
){


output.innerText =
"⚠️ Possible Incognito Mode";


}

else {


output.innerText =
"✅ Normal Browser Mode";


}



}

catch(e){


output.innerText =
"Unable to detect";


}


}



detectIncognito();





// ===============================
// Storage
// ===============================


function saveStorage(){


localStorage.setItem(

"qa-value",

document.getElementById(
"storageInput"
).value

);


document.getElementById(
"storageStatus"
).innerText =
"Saved";


}



function loadStorage(){


document.getElementById(
"storageStatus"
).innerText =


localStorage.getItem(
"qa-value"
)

|| "No value";


}



function clearStorage(){


localStorage.clear();


document.getElementById(
"storageStatus"
).innerText =
"Cleared";


}





// ===============================
// Geolocation
// ===============================


function requestLocation(){


navigator.geolocation.getCurrentPosition(

(position)=>{


document.getElementById(
"geoStatus"
).innerText =

"Allowed\nLatitude: "

+position.coords.latitude+

"\nLongitude: "

+position.coords.longitude;


},


(error)=>{


document.getElementById(
"geoStatus"
).innerText =

"Blocked\n"+error.message;


}


);


}





// ===============================
// Click Playground
// ===============================



document
.getElementById(
"normalButton"
)
.onclick=function(){


document.getElementById(
"normalResult"
).innerText =
"Normal click executed";


};




document
.getElementById(
"overlayButton"
)
.onclick=function(){


document.getElementById(
"overlayResult"
).innerText =
"Button received click";


};




document
.querySelector(
".overlay"
)
.onclick=function(){


document.getElementById(
"overlayResult"
).innerText =
"Overlay intercepted click";


};





document
.getElementById(
"movingButton"
)
.onclick=function(){


document.getElementById(
"movingResult"
).innerText =
"Moving button clicked";


};



document
.getElementById(
"disabledPointer"
)
.onclick=function(){


document.getElementById(
"pointerResult"
).innerText =
"Clicked";


};





let move=false;


setInterval(()=>{


const button =
document.getElementById(
"movingButton"
);


move=!move;


button.style.left =
move ? "100px" : "0px";


},2000);
