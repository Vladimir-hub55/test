var card = {}; // Card
var cnt = 2; // How many records to show
var cards = []; // Array to sort the cards

$('document').ready(function() {
    loadGoods(); // Enabling the function for the appearance of cards
})

function loadGoods() { // Function for the appearance of cards
    $.getJSON('../data.json', function(data) {
        var out = []; // Card
        for (var key in data) { // Taking information from a JSON file
            // Converting time to normal view
            var unix_timestampa = data[key]['timestamp'];
            var date = new Date(unix_timestampa * 1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            var Time = hours + minutes.substr(-2) + seconds.substr(-2);
            if (Time.length == 5) {
                Time = '0' + hours + minutes.substr(-2) + seconds.substr(-2);
            }

            out += '<div class="card" id="card' + key + '">';
            out += '<img class="card__img" id="img' + key + '" src="' + data[key].image + '">'; // Picture
            out += '<p id="filesize' + key + '">Размер: ' + data[key]['filesize'] + ' байт</p>'; // Size
            out += '<p id="time' + key + '">Время: ' + formattedTime + '</p>'; // Time
            out += '<p id="category' + key + '">Категория: ' + data[key]['category'] + '</p>'; // Category
            out += '<button class="card__btn nnn" data-art="' + key + '" onclick="cardDelete(' + key + ')">X</button>'; // Delete button
            out += '</div>';

            cards.push({
                filesize: data[key]['filesize'], // Size
                image: data[key].image, // Picture
                time: formattedTime, // Time
                Time: Time,
                category: data[key]['category'], // Category
                btn: key // Delete button
            });
        }


        $('.cards').html(out); // The appearance of the cards

        $('.sortFilesize').on('click', sortFilesize); // Enabling the function for sorting by " Size"
        $('.sortTime').on('click', sortTime); // Enabling the function for sorting by " Time"
        $('.sortCategory').on('click', sortCategory); // Enabling the function to sort by " Category"
        $('button.card__btn').on('click', cardBtn); // Enabling the function for adding cards to localStorage
        sortTime();
        var cntPage = Math.ceil(cards.length / cnt); // Number of pages
        // Displaying a list of pages
        var paginator = document.querySelector('.paginator'); // Take an element with the "paginator" class"
        var page = ''; // Number of pages
        // Adding Pages
        for (var i = 0; i < cntPage; i++) {
            page += '<span data-page="' + i * cnt + '" id="page' + (i + 1) + '">' + (i + 1) + '</span>';
        }
        paginator.innerHTML = page;

        // Output the first records
        var divNum = document.querySelectorAll('.card'); // Take all the elements with the "card" class"
        for (var i = 0; i < divNum.length; i++) { // Hide all elements
            divNum[i].classList.add('clear');
        }
        for (var i = 0; i < divNum.length; i++) { // Appearance of elements on the first page
            if (i < cnt) {
                divNum[i].classList.remove('clear');
            }
        }

        var mainPage = document.getElementById('page1'); // Take 1 page number
        mainPage.classList.add('paginator-active'); // Add an activity class
        mainPage1 = mainPage; // Activation for all elements
        divNum1 = divNum; // 

    });
};

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
    var h = 0;
    if (localStorage.getItem('card') != null) {
        for (var i = 0; i < cards.length; i++) {
            if (localStorage.getItem('card')[2 + h] == i) {
                divNum1[localStorage.getItem('card')[2 + h]].classList.add('clear');
                h = h + 6;

            }
        }
    }
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
    for (var ss = 0; ss < cards.length; ss++) {
        cards.sort(function(a, b) {
            return a.filesize - b.filesize;
        });
        document.getElementById('img' + ss).src = cards[ss]['image'];
        document.getElementById('filesize' + ss).innerHTML = '<p id="filesize' + ss + '">Размер: ' + cards[ss]['filesize'] + ' байт</p>';
        document.getElementById('time' + ss).innerHTML = '<p id="time' + cards[ss] + '">Время: ' + cards[ss]['time'] + '</p>';
        document.getElementById('category' + ss).innerHTML = '<p id="category' + cards[ss] + '">Категория: ' + cards[ss]['category'] + '</p>';
    }
};

function sortCategory() { // functions for sorting by " Category"
    for (var ss = 0; ss < cards.length; ss++) {
        cards.sort(function(a, b) {
            var nameA = a.category.toLowerCase();
            var nameB = b.category.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        document.getElementById('img' + ss).src = cards[ss]['image'];
        document.getElementById('filesize' + ss).innerHTML = '<p id="filesize' + ss + '">Размер: ' + cards[ss]['filesize'] + ' байт</p>';
        document.getElementById('time' + ss).innerHTML = '<p>Время: ' + cards[ss]['time'] + '</p>';
        document.getElementById('category' + ss).innerHTML = '<p>Категория: ' + cards[ss]['category'] + '</p>';
    }
};

function sortTime() { // functions for sorting by " Time"
    for (var ss = 0; ss < cards.length; ss++) {
        cards.sort(function(a, b) {
            var nameA = a.Time.toLowerCase();
            var nameB = b.Time.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        document.getElementById('img' + ss).src = cards[ss]['image'];
        document.getElementById('filesize' + ss).innerHTML = '<p id="filesize' + ss + '">Размер: ' + cards[ss]['filesize'] + ' байт</p>';
        document.getElementById('time' + ss).innerHTML = '<p>Время: ' + cards[ss]['time'] + '</p>';
        document.getElementById('category' + ss).innerHTML = '<p>Категория: ' + cards[ss]['category'] + '</p>';
    }
};