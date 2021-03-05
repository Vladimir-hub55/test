var card = {}; // Card

function allCards() { // Appearance of all cards

    var sort = document.getElementsByName('sortt');


    localStorage.clear(); // Clearing localStorage
    card = {}; // Clearing cards
    cards = [].concat(cardsDelete);
    dataOutput();

    if (sort[0].checked) {
        sortFilesize();
    }
    if (sort[1].checked) {
        sortTime();
    }
    if (sort[2].checked) {
        sortTime();
        sortCategory();
    }
    dataOutput();
}