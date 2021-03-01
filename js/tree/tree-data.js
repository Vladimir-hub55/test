const requestURLd = 'http://contest.elecard.ru/frontend_data/catalog.json';
const xhrl = new XMLHttpRequest();
xhrl.open('GET', requestURLd);
xhrl.responseType = 'json';
xhrl.onload = () => {
    var outTree = '';
    outTree += 'Список карточек';
    for (var key in xhrl.response) {
        var unix_timestampa = xhrl.response[key]['timestamp'];
        var date = new Date(unix_timestampa * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        outTree += '<li><span class="show">' + key + '</span>';
        outTree += '<ul>';
        outTree += '<li><a href="#popap' + key + '"><img class="tree__img" src="http://contest.elecard.ru/frontend_data/' + xhrl.response[key].image + '"></a></li>';
        outTree += '<li>Размер: ' + xhrl.response[key]['filesize'] + '</li>';
        outTree += '<li>Время: ' + formattedTime + '</li>';
        outTree += '<li>Категория: ' + xhrl.response[key]['category'] + '</li>';
        outTree += '</ul></li>';

        outTree += '<div id="popap' + key + '" class="popap">';
        outTree += '<div class="popap__body">';
        outTree += '<a href="#" class="popap__close">X</a>';
        outTree += '<img class="popap__img" src="http://contest.elecard.ru/frontend_data/' + xhrl.response[key].image + '">';
        outTree += '</div>';
        outTree += '</div>';
    }

    $('.tree').html(outTree);
}
xhrl.send();