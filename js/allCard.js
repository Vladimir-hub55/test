var card = {}; // Карточки

function allCards() { // Появление всех карточек
    var mainPage; // Взять 1 номер страницы
    var cntPage = Math.ceil(cards.length / cnt); //количество страниц

    localStorage.clear(); // Очистка localStorage
    card = {}; // Очистка карточек
    var divNum = document.querySelectorAll('.card'); // Взять все элементы с классом "card"
    for (var i = 0; i < divNum.length; i++) { // Скрыть все элементы
        divNum[i].classList.add('clear');
    }
    for (var i = 2; i <= cntPage; i++) {
        mainPage = document.getElementById('page' + i);
        mainPage.classList.remove('paginator-active'); // Добавть класс активности
    }
    for (var i = 0; i < divNum.length; i++) { // Появление элементов на аервой странице
        if (i < cnt) {
            divNum[i].classList.remove('clear');
        }
    }
    mainPage = document.getElementById('page1');
    mainPage.classList.add('paginator-active'); // Добавть класс активности
    mainPage1 = mainPage; // Активация для всех элементов
    // clearDelete(); // Появление кароточек
}