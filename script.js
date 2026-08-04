// ===============================
// HEADLESS DETECTION
// ===============================


const info = {

"webdriver":
navigator.webdriver,

"plugins":
navigator.plugins.length,

"language":
navigator.language,

"userAgent":
navigator.userAgent,

"window size":
window.innerWidth + " x " + window.innerHeight

};


const table =
document.getElementById("browserInfo");


Object.entries(info).forEach(([key,value])=>{


let row = table.insertRow();

row.insertCell(0).innerText = key;

row.insertCell(1).innerText = value;


});



let headlessScore = 0;


if(navigator.webdriver)
headlessScore++;


if(navigator.plugins.length === 0)
headlessScore++;



document.getElementById(
"headlessResult"
).innerText =


headlessScore > 0

?

"⚠️ Possible Headless Browser Detected"

:

"✅ Browser appears NOT headless";





// ===============================
// INCOGNITO DETECTION
// ===============================


async function detectIncognito(){


const result =
document.getElementById(
"incognitoResult"
);



try {


const storage =
await navigator.storage.estimate();



if(storage.quota &&
storage.quota < 1200000000){


result.innerText =
"⚠️ Possible Incognito Mode";


}

else {


result.innerText =
"✅ Normal Browser Mode";


}



}

catch(error){


result.innerText =
"Unable to detect";


}


}


detectIncognito();





// ===============================
// CLICK VALIDATION
// ===============================


const clickButton =
document.getElementById(
"clickButton"
);



clickButton.addEventListener(
"click",
function(event){


document.getElementById(
"clickResult"
).innerHTML =


`
<b>Click received</b><br><br>

Event trusted:
${event.isTrusted}

<br>

Event type:
${event.type}

<br>

Coordinates:
X ${event.clientX}
Y ${event.clientY}

`;



});





// ===============================
// SCREENSHOT
// ===============================


document.getElementById(
"screenshotResult"
).innerText =

"Page height: "
+
document.body.scrollHeight
+
" px";





// ===============================
// GEOLOCATION
// ===============================


async function checkGeolocation(){


const output =
document.getElementById(
"geoResult"
);



if(!navigator.geolocation){


output.innerText =
"Geolocation not supported";


return;

}



navigator.geolocation.getCurrentPosition(


(position)=>{


output.innerHTML =

`
Permission: GRANTED

<br>

Latitude:
${position.coords.latitude}

<br>

Longitude:
${position.coords.longitude}

`;



},


(error)=>{


output.innerHTML =

`
Permission: DENIED

<br>

${error.message}

`;


}


);


}






// ===============================
// OPACITY
// ===============================


function checkOpacity(){


const elements =
document.querySelectorAll(
".opacity-item"
);



let result = "";



elements.forEach((element,index)=>{


const opacity =
window.getComputedStyle(
element
).opacity;



const visible =
opacity > 0;



result +=

`
Element ${index+1}

<br>

Opacity:
${opacity}

<br>

Visible:
${visible}

<br><br>

`;


});



document.getElementById(
"opacityResult"
).innerHTML = result;


}



checkOpacity();
