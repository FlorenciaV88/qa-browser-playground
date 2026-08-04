const browserInfo = {
"User Agent": navigator.userAgent,
"navigator.webdriver": navigator.webdriver,
"Language": navigator.language,
"Platform": navigator.platform,
"Plugins": navigator.plugins.length,
"Cookies Enabled": navigator.cookieEnabled,
"Hardware Concurrency": navigator.hardwareConcurrency,
"Device Memory": navigator.deviceMemory ?? "Unknown",
"Inner Size": window.innerWidth + " x " + window.innerHeight,
"Outer Size": window.outerWidth + " x " + window.outerHeight
};

const table=document.getElementById("browserTable");

for(const [k,v] of Object.entries(browserInfo)){
let row=table.insertRow();
row.insertCell().innerText=k;
row.insertCell().innerText=v;
}

document.getElementById("webdriver").innerText=navigator.webdriver;

let score=0;

if(navigator.webdriver) score++;
if(navigator.plugins.length===0) score++;
if(window.outerWidth===0) score++;
if(window.outerHeight===0) score++;

document.getElementById("score").innerText=score+"/4";

document.getElementById("headless").innerText=
score>=2?"HIGH":"LOW";

function saveLocal(){
localStorage.setItem("qa-test",
document.getElementById("localInput").value);
document.getElementById("localResult").innerText="Saved";
}

function loadLocal(){
document.getElementById("localResult").innerText=
localStorage.getItem("qa-test");
}

function clearLocal(){
localStorage.removeItem("qa-test");
document.getElementById("localResult").innerText="Cleared";
}

function saveSession(){
sessionStorage.setItem("qa-session",
document.getElementById("sessionInput").value);
document.getElementById("sessionResult").innerText="Saved";
}

function loadSession(){
document.getElementById("sessionResult").innerText=
sessionStorage.getItem("qa-session");
}

function clearSession(){
sessionStorage.removeItem("qa-session");
document.getElementById("sessionResult").innerText="Cleared";
}

function saveCookie(){
document.cookie="qatest="+
document.getElementById("cookieInput").value+
";path=/";
document.getElementById("cookieResult").innerText="Saved";
}

function loadCookie(){

const cookie=document.cookie
.split("; ")
.find(c=>c.startsWith("qatest="));

document.getElementById("cookieResult").innerText=
cookie?cookie.split("=")[1]:"Not Found";

}

function clearCookie(){

document.cookie="qatest=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";

document.getElementById("cookieResult").innerText="Cleared";

}
