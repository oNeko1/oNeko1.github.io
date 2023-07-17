
// Loading Screen
// ************************************

const loadingScreen = document.getElementById("loadingScreen");

window.addEventListener("load", function() {
    setTimeout(loadingScreenFade, 2000);
});

function loadingScreenFade(loadingTime)
{
    loadingScreen.style.opacity = 0;
    loadingScreen.style.transition = "all 1s";
    
    // Delete the element afterwards so that it does not interfere with the rest of the page
    loadingScreen.addEventListener("transitionend", function() {
        loadingScreen.remove();
    });
}

// ************************************

// Swapping between the pages
// ************************************

const homeButton = document.getElementById("homeButton");
const destinationButton = document.getElementById("destinationButton");
const testButton1 = document.getElementById("testButton1");
const testButton2 = document.getElementById("testButton2");
let pages = document.querySelectorAll(".page");

function hideallPages()
{
    for(let page of pages)
    {
        page.style.display="none";
    }
}

function showPage(pageName)
{
    hideallPages();
    let page = document.querySelector(pageName);
    page.style.display = "flex";
}

homeButton.addEventListener("click", function() {
    showPage("#homePage");
})

testButton1.addEventListener("click", function() {
    showPage("#testPage1");
})

destinationButton.addEventListener("click", function() {
    showPage("#destinationPage");
})

testButton2.addEventListener("click", function() {
    showPage("#testPage2");
})

// ************************************

// Opening up the left menu using the menu button
// ************************************

const menuButton = document.getElementById("menuButton");
const mainDiv = document.getElementById("main");
var isMenuOpen = false;

function openMenu()
{
    if (!isMenuOpen)
    {
        mainDiv.style.translate = "30%";
        mainDiv.style.transition = "translate 1s ease-in-out";
    }
    else
    {
        mainDiv.style.translate = "0px";
    }

    isMenuOpen = !isMenuOpen;  // Give value based on whether the menu should be open
}

menuButton.addEventListener("click", function() {
    openMenu();
})