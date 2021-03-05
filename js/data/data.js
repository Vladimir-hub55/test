var card = {}; // Card
var cnt = 20; // How many records to show
var cards = []; // Array to sort the cards

var firstStart = 1;
var noFirstStart = 0;

var number = 0;
var start = 0;
var end = cnt;

var cardsDelete = [];
var vseCards = 1;

$.ajax({
    url: "http://contest.elecard.ru/frontend_data/catalog.json",
    method: "get",
    type: "json",
    success: function(data) {
        loadingtask(data);
    }
});

function loadingtask(information) {
    for (var i = 0; i < information.length; i++) {
        var unix_timestampa = information[i]['timestamp'];
        var date = new Date(unix_timestampa * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        var Time = hours + minutes.substr(-2) + seconds.substr(-2);
        if (Time.length == 5) {
            Time = '0' + hours + minutes.substr(-2) + seconds.substr(-2);
        }


        cards.push({
            filesize: information[i]['filesize'], // Size
            image: 'http://contest.elecard.ru/frontend_data/' + information[i].image, // Picture
            time: formattedTime, // Time
            Time: Time,
            category: information[i]['category'], // Category
            btn: i // Delete button
        });
        cardsDelete = [].concat(cards);
    }
    vseCards = 0;
    dataOutput();
    sortTime();
    if (localStorage.getItem('card') !== null) {
        if (noFirstStart == 1) {

            var qqqq = JSON.parse(localStorage.getItem('card'));
            for (var i = 0; i <= cards.length; i++) {
                if (qqqq[i] >= 1) {
                    cards.splice(i, 1);
                }
            }
            dataOutput();
        }
    }
}

// Switching pages
function pagination(event) {
    var e = event || window.event;
    var target = e.target;
    var id = target.id;
    if (target.tagName.toLowerCase() != "span") return; // If the wrong page number was clicked

    var num = id.substr(4);
    var dataPage = +target.dataset.page;
    mainPage1.classList.remove('paginator-active');
    mainPage1 = document.getElementById(id);
    mainPage1.classList.add('paginator-active');

    var j = 0;
    var start = (num - 1) * 18 + 2;
    for (var i = 0; i < divNum1.length; i++) {
        divNum1[i].classList.add('clear');
    }
    for (var i = dataPage; i < divNum1.length; i++) {
        if (j >= cnt) break;
        var ffff = 2;
        divNum1[i].classList.remove('clear');
        j++;
    }
    var qqqq = JSON.parse(localStorage.getItem('card'));

    if (localStorage.getItem('card') != null) {
        for (var i = 0; i <= cards.length; i++) {
            if (qqqq[i] == 1) {}
        }
    }
    number = num;
    dataOutput();
}

function cardBtn() { // functions for adding cards to localStorage
    var articul = $(this).attr('data-art');
    if (card[articul] != undefined) {
        card[articul]++;
    } else {
        card[articul] = 1;
    }
    localStorage.setItem('card', JSON.stringify(card));
};

function clearDelete() { // Appearance of all cards
    for (var i = 0; i < divNum1.length; i++) {
        divNum1[i].classList.remove('clear');
    }
}

function sortFilesize() { // functions for sorting by " Size"
    for (var ss = start; ss < end; ss++) {
        cards.sort(function(a, b) {
            return a.filesize - b.filesize;
        });
        if (cards[ss] != undefined) {
            document.getElementById('img' + ss).src = cards[ss]['image'];
            document.getElementById('filesize' + ss).innerHTML = '<p id="filesize' + ss + '">Размер: ' + cards[ss]['filesize'] + ' байт</p>';
            document.getElementById('time' + ss).innerHTML = '<p id="time' + cards[ss] + '">Время: ' + cards[ss]['time'] + '</p>';
            document.getElementById('category' + ss).innerHTML = '<p id="category' + cards[ss] + '">Категория: ' + cards[ss]['category'] + '</p>';
        }
    }
};

function sortCategory() { // functions for sorting by " Category"
    // for (var ss = 0; ss < cards.length; ss++) {
    for (var ss = start; ss < end; ss++) {

        cards.sort(function(a, b) {
            var nameA = a.category.toLowerCase();
            var nameB = b.category.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        if (cards[ss] != undefined) {
            document.getElementById('img' + ss).src = cards[ss]['image'];
            document.getElementById('filesize' + ss).innerHTML = '<p id="filesize' + ss + '">Размер: ' + cards[ss]['filesize'] + ' байт</p>';
            document.getElementById('time' + ss).innerHTML = '<p>Время: ' + cards[ss]['time'] + '</p>';
            document.getElementById('category' + ss).innerHTML = '<p>Категория: ' + cards[ss]['category'] + '</p>';
        }
    }
};

function sortTime() { // functions for sorting by " Time"
    for (var ss = start; ss < end; ss++) {
        cards.sort(function(a, b) {
            var nameA = a.Time.toLowerCase();
            var nameB = b.Time.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        if (cards[ss] != undefined) {
            document.getElementById('img' + ss).src = cards[ss]['image'];
            document.getElementById('filesize' + ss).innerHTML = '<p id="filesize' + ss + '">Размер: ' + cards[ss]['filesize'] + ' байт</p>';
            document.getElementById('time' + ss).innerHTML = '<p>Время: ' + cards[ss]['time'] + '</p>';
            document.getElementById('category' + ss).innerHTML = '<p>Категория: ' + cards[ss]['category'] + '</p>';
        }
    }
};

function dataOutput() {
    var out = document.getElementById('cards');
    out.innerHTML = '';

    let str = ' ';
    var qqqq = JSON.parse(localStorage.getItem('card'));

    var nomer = number;
    if (number == 0) {
        nomer = 1;
    }
    start = (nomer - 1) * cnt;
    end = start + cnt;

    for (var i = start; i < end; i++) {
        if (cards[i] !== undefined) {
            str += '<div class="card" id="card' + i + '">';
            str += '<img class="card__img" id="img' + i + '" src="' + cards[i].image + '">'; // Picture
            str += '<p id="filesize' + i + '">Размер: ' + cards[i].filesize + ' байт</p>'; // Size
            str += '<p id="time' + i + '">Время: ' + cards[i].time + '</p>'; // Time
            str += '<p id="category' + i + '">Категория: ' + cards[i].category + '</p>'; // Category
            str += '<button class="card__btn nnn" data-art="' + i + '" onclick="cardDelete(' + i + ')">X</button>'; // Delete button
            str += '</div>';
        }
    }

    out.innerHTML = str;
    $('.sortFilesize').on('click', sortFilesize); // Enabling the function for sorting by " Size"
    $('.sortTime').on('click', sortTime); // Enabling the function for sorting by " Time"
    $('.sortCategory').on('click', sortCategory); // Enabling the function to sort by " Category"
    $('button.card__btn').on('click', cardBtn); // Enabling the function for adding cards to localStorage
    var cntPage = Math.ceil(cards.length / cnt); // Number of pages
    // Displaying a list of pages
    var paginator = document.querySelector('.paginator'); // Take an element with the "paginator" class"
    var page = ''; // Number of pages
    // Adding Pages
    for (var i = 0; i < cntPage; i++) {
        page += '<span data-page="' + i * cnt + '" class="pages" id="page' + (i + 1) + '">' + (i + 1) + '</span>';
    }
    paginator.innerHTML = page;

    // Output the first records
    var divNum = document.querySelectorAll('.card'); // Take all the elements with the "card" class"
    for (var i = 0; i < divNum.length; i++) { // Hide all elements
        divNum[i].classList.add('clear');
    }
    for (var i = 0; i < divNum.length; i++) { // Appearance of elements on the first page
        var h = 0;
        var qqq = JSON.parse(localStorage.getItem('card'));
        var j = 0;

        if (localStorage.getItem('card') != null) { // If localStorage is not empty
            for (var i = 0; i < cards.length; i++) {
                if (qqq[i] >= 1) { // If this element is present in localStorage
                } else {
                    if (i < cnt) {}
                }
            }
        }
        if (i < cnt) {
            divNum[i].classList.remove('clear');
        }
    }
    for (var i = 0; i < divNum.length; i++) {
        if (j >= cnt) break;
        var ffff = 2;
        divNum[i].classList.remove('clear');
        j++;
    }
    if (number == 0) {
        var mainPage = document.getElementById('page1'); // Take 1 page number
    } else {
        var mainPage = document.getElementById('page' + number); // Take 1 page number
    }
    mainPage.classList.add('paginator-active'); // Add an activity class
    mainPage1 = mainPage; // Activation for all elements
    divNum1 = divNum; // 
    if (firstStart == 1) {
        firstStart = 0;
        noFirstStart = 1
    }
}