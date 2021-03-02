function cardDelete(num) {
    var preloader = document.getElementById('card' + num);
    if (!preloader.classList.contains('clear')) {
        // preloader.classList.add('clear');
        // cards.pop();
        // cards.splice(num, 1);
        // qwert();
        // cards.splice(num, 1);
        // qwert();

        // console.log(asd);
    }
    cards.splice(num, 1);
    qwert();

}