function format() {
    var rad = document.getElementsByName('view');
    var treeView = document.querySelector('.tree-view');
    var cards = document.querySelector('.cards-block');
    if (rad[0].checked) {
        $('li').remove();
        $('.popap').remove();
        cards.classList.remove('clear');
        $('.pag').addClass('paginator');
        treeView.classList.add('clear');
        dataOutput();
    }
    if (rad[1].checked) {
        $('#preloader').removeClass('done');
        setTimeout(function() { // Timer for 1 second
            $('.pag').removeClass('paginator');
            $('.card').remove();
            formatTreeCard();
            treeView.classList.remove('clear');
            cards.classList.add('clear');
            var preloader = document.getElementById('preloader'); // Take an item by id preloader
            if (!preloader.classList.contains('done')) { // If the preloader doesn't have the done class
                preloader.classList.add('done'); // Add the done class to the preloader
            }
        }, 1000);
    }
}