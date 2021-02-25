function cardDelete(num) {
    var preloader = document.getElementById('card' + num);
    if (!preloader.classList.contains('clear')) {
        preloader.classList.add('clear');
    }
}