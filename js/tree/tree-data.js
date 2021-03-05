function formatTreeCard() {
    var outTree = '';
    outTree += 'Список карточек';
    for (var i = 0; i < cards.length; i++) {

        outTree += '<li><span class="show">' + i + '</span>';
        outTree += '<ul>';
        outTree += '<li><a href="#popap' + i + '"><img class="tree__img" src="' + cards[i].image + '"></a></li>';
        outTree += '<li>Размер: ' + cards[i]['filesize'] + '</li>';
        outTree += '<li>Время: ' + cards[i].time + '</li>';
        outTree += '<li>Категория: ' + cards[i]['category'] + '</li>';
        outTree += '</ul></li>';

        outTree += '<div id="popap' + i + '" class="popap">';
        outTree += '<div class="popap__body">';
        outTree += '<a href="#" class="popap__close">X</a>';
        outTree += '<img class="popap__img" src="' + cards[i].image + '">';
        outTree += '</div>';
        outTree += '</div>';
    }

    $('.tree').html(outTree);
}