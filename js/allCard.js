var card = {}; // Card

function allCards() { // Appearance of all cards
    var mainPage; // Take 1 page number
    var cntPage = Math.ceil(cards.length / cnt); //Number of pages

    localStorage.clear(); // Clearing localStorage
    card = {}; // Clearing cards
    trewq();
    ewq();
    // console.log('oooo');

    var divNum = document.querySelectorAll('.card'); // Take all the elements with the "card" class"
    for (var i = 0; i < divNum.length; i++) { // Hide all elements
        divNum[i].classList.add('clear');
    }
    for (var i = 2; i <= cntPage; i++) {
        mainPage = document.getElementById('page' + i);
        mainPage.classList.remove('paginator-active'); // Add an activity class
    }
    for (var i = 0; i < divNum.length; i++) { // Appearance of elements on the first page
        if (i < cnt) {
            divNum[i].classList.remove('clear');
        }
    }
    mainPage = document.getElementById('page1');
    mainPage.classList.add('paginator-active'); // Add an activity class
    mainPage1 = mainPage; // Activation for all elements
    // clearDelete(); // Появление кароточек
}