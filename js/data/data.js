var card = {}; // Карточки
var cnt = 2; //Сколько показывать записей
var cards = []; // Масив для сортировки карточек

$('document').ready(function() {
    loadGoods(); // Включение функции для появления карточек
})

function loadGoods() { // Функция для появления карточек
    $.getJSON('../data.json', function(data) {
        var out = []; // Карточки
        for (var key in data) { // Взятие информации из JSON файла
            // Перевод времени в нормальный вид
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
            out += '<img class="card__img" id="img' + key + '" src="' + data[key].image + '">'; // Картинка
            out += '<p id="filesize' + key + '">Размер: ' + data[key]['filesize'] + ' байт</p>'; // Размер
            out += '<p id="time' + key + '">Время: ' + formattedTime + '</p>'; // Время
            out += '<p id="category' + key + '">Категория: ' + data[key]['category'] + '</p>'; // Категория
            out += '<button class="card__btn nnn" data-art="' + key + '" onclick="cardDelete(' + key + ')">X</button>'; // Кнопка удаления
            out += '</div>';

            cards.push({
                filesize: data[key]['filesize'], // Размер
                image: data[key].image, // Картинка
                time: formattedTime, // Время
                Time: Time,
                category: data[key]['category'], // Категория
                btn: key // Кнопка удаления
            });
        }


        $('.cards').html(out); // Появление карточек

        $('.sortFilesize').on('click', sortFilesize); // Включение функции для сортировки по "Размеру"
        $('.sortTime').on('click', sortTime); // Включение функции для сортировки по "Времени"
        $('.sortCategory').on('click', sortCategory); // Включение функции для сортировки по "Категории"
        $('button.card__btn').on('click', cardBtn); // Включение фунции для добвление карточек в localStorage
        sortTime();
        var cntPage = Math.ceil(cards.length / cnt); //количество страниц
        // Выводим список страниц
        var paginator = document.querySelector('.paginator'); // Взять элемент с классом "paginator"
        var page = ''; // Номера страниц
        // Добавление страниц
        for (var i = 0; i < cntPage; i++) {
            page += '<span data-page="' + i * cnt + '" id="page' + (i + 1) + '">' + (i + 1) + '</span>';
        }
        paginator.innerHTML = page;

        //Выводим первые записи
        var divNum = document.querySelectorAll('.card'); // Взять все элементы с классом "card"
        for (var i = 0; i < divNum.length; i++) { // Скрыть все элементы
            divNum[i].classList.add('clear');
        }
        for (var i = 0; i < divNum.length; i++) { // Появление элементов на аервой странице
            if (i < cnt) {
                divNum[i].classList.remove('clear');
            }
        }

        var mainPage = document.getElementById('page1'); // Взять 1 номер страницы
        mainPage.classList.add('paginator-active'); // Добавть класс активности
        mainPage1 = mainPage; // Активация для всех элементов
        divNum1 = divNum; // 

    });
};

//Переключение страниц
function pagination(event) {
    var e = event || window.event;
    var target = e.target;
    var id = target.id;
    if (target.tagName.toLowerCase() != "span") return; // Если был нажат не номер сраницы

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

function cardBtn() { // фунции для добвление карточек в localStorage
    var articul = $(this).attr('data-art');
    if (card[articul] != undefined) {
        card[articul]++;
    } else {
        card[articul] = 1;
    }
    localStorage.setItem('card', JSON.stringify(card));
};

function clearDelete() { // Появление всех карточек
    for (var i = 0; i < divNum1.length; i++) {
        divNum1[i].classList.remove('clear');
    }
}

function sortFilesize() { // функции для сортировки по "Размеру"
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

function sortCategory() { // функции для сортировки по "Категории"
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

function sortTime() { // функции для сортировки по "Времени"
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