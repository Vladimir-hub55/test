function format() {
    var rad = document.getElementsByName('view');
    var treeView = document.querySelector('.tree-view');
    var cards = document.querySelector('.cards-block');
    var pag = document.querySelector('.pag');
    for (var i = 0; i < rad.length; i++) {
        if (rad[i].checked) {
            treeView.classList.remove('clear');
            cards.classList.add('clear');
            $('.pag').toggleClass('paginator');
        } else {
            treeView.classList.add('clear');
            cards.classList.remove('clear');
        }
    }
}