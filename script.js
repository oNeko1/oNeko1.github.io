// ************************************
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

const homeButton = document.getElementsByClassName("homeButton");
const destinationButton = document.getElementsByClassName("destinationButton");
const learnButton = document.getElementsByClassName("learnButton");
const gamesButton = document.getElementsByClassName("gamesButton");
let pages = document.querySelectorAll(".page");

function hideallPages()
{
    for(let page of pages)
    {
        page.style.display = "none";
    }
}

function showPage(pageName)
{
    hideallPages();
    let page = document.querySelector(pageName);
    page.style.display = "flex";
}

// Add event listener to all homeButtons
for (const buttons of homeButton)
{
    buttons.addEventListener("click", function() {
        showPage("#homePage");
    })
}

// Add event listener to all learnButtons
for (const buttons of learnButton)
{
    buttons.addEventListener("click", function() {
        showPage("#learnPage");
    })
}

// Add event listener to all destinationButtons
for (const buttons of destinationButton)
{
    buttons.addEventListener("click", function() {
        showPage("#destinationPage");
    })
}

// Add event listener to all gamesButtons
for (const buttons of gamesButton)
{
    buttons.addEventListener("click", function() {
        showPage("#gamesPage");
    })
}

// ************************************ 
// Opening up the left menu using the menu button
// ************************************

const menuButton = document.getElementById("menuButton");
const leftMenu = document.getElementById("left-menu");
var isMenuOpen = false;

function openMenu()
{
    if (!isMenuOpen)
    {
        leftMenu.style.left = "0%";
        leftMenu.style.transition = "left 1s ease-in-out";

        menuButton.style.position = "relative";
    }
    else
    {
        leftMenu.style.left = "-120%";

        menuButton.style.position = "sticky";
    }

    isMenuOpen = !isMenuOpen;  // Give value based on whether the menu should be open
}

menuButton.addEventListener("click", function() {
    openMenu();
})

// ************************************
// The card game
// ************************************

const symbols = ['1', '2', '3', '4', '5', '6', '7', '8'];
const cards = symbols.concat(symbols); // Create pairs of symbols

let openedCards = [];  // Array to store the number of cards that are flipped open
let matchedCards = [];  // Array to store the number of cards that have been matched

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('cardClosed');
    card.textContent = symbol;
    card.classList.add("cardType" + symbol);  // For the background image of the card type

    card.addEventListener('click', () => onCardClick(card, symbol));
    return card;
}

function onCardClick(card, symbol) {

    // Prevent opening the same card twice and allow only two cards open at a time
    if (!openedCards.includes(card) && openedCards.length < 2) {
        openedCards.push(card);
        card.classList.remove('cardClosed');

        if (openedCards.length === 2) {
            const [card1, card2] = openedCards;
            const symbol1 = card1.textContent;
            const symbol2 = card2.textContent;

            // Match found
            if (symbol1 === symbol2) {
                matchedCards.push(card1, card2);
                openedCards = [];

            // No match, close cards after a short delay
            } 
            else {
                setTimeout(closeCards, 1000);
            }
        }

        checkGameStatus();
    }
}

function closeCards() {
    openedCards.forEach(card => card.classList.add('cardClosed'));
    openedCards = [];
}

// Check if win
function checkGameStatus() {
    if (matchedCards.length === cards.length) {
        setTimeout(() => alert("You Win!"), 300);  // A brief delay before showing the alert
        setTimeout(() => initializeGame(), 300);  // Reset the game
    }
}

function initializeGame() {
    const shuffledSymbols = shuffle(cards);
    matchedCards = [];  // Reset the matched cards

    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';   // Clear any existing cards

    shuffledSymbols.forEach(symbol => {
        const card = createCard(symbol);
        gameContainer.appendChild(card);
    });
}

initializeGame();  // Initialize game at the start

// ************************************
// The scaling of the destinationLinks
// ************************************

let destinationLinks = document.querySelectorAll("#destinationLinks > a > p");
var activeLink = destinationLinks[2];

function updateDestinationLinks(activeLinkIndex) {
    destinationLinks.forEach((link, index) => {
        link.style.scale = 1 - (Math.abs(index - activeLinkIndex) * 0.2);

        // Cap how small it can get
        if (link.style.scale < 0.6) {
            link.style.scale = 0.6;
        }
    });
}

destinationLinks.forEach((link, index) => {
    link.addEventListener("mouseover", function() {
        updateDestinationLinks(index);
    });
});

updateDestinationLinks(2);

// ************************************
// The scrolling animation
// ************************************

let sections = document.querySelectorAll(".scrollAnimated");

sections.forEach(sec => {
    sec.classList.add("invisibleScroll");
})

// So that I can use it for below (60vh)
const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY + (0.5 * viewportHeight);
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;
        
        if (top >= offset && top < offset + height) {
            sec.classList.remove("invisibleScroll");
        }

        else {
            sec.classList.add("invisibleScroll");
        }
    })
}
