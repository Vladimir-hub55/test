function format() {
    var rad = document.getElementsByName('view');
    var treeView = document.querySelector('.tree-view');
    var cards = document.querySelector('.cards-block');
    for (var i = 0; i < rad.length; i++) {
        if (rad[i].checked) {
            treeView.classList.remove('clear');
            cards.classList.add('clear');
        } else {
            treeView.classList.add('clear');
            cards.classList.remove('clear');
        }
    }
}