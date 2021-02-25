document.addEventListener('DOMContentLoaded', function() { // Индикатор загрузки
    setTimeout(function() { // Таймер на 1 секунду
        var preloader = document.getElementById('preloader'); // Взять элемент по id preloader
        if (!preloader.classList.contains('done')) { // Если у preloader нет класса done
            preloader.classList.add('done'); // Добавить класс done к preloader
        }
    }, 1000);
})