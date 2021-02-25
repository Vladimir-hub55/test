$('document').ready(function() {
    loadTree();
})

function loadTree() {
    $.getJSON('../../data.json', function(data) {
        var outTree = '';
        outTree += 'Список карточек';
        for (var key in data) {
            var unix_timestampa = data[key]['timestamp'];
            var date = new Date(unix_timestampa * 1000);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

            outTree += '<li><span class="show">' + key + '</span>';
            outTree += '<ul>';
            outTree += '<li><a href="#popap' + key + '"><img class="tree__img" src="' + data[key].image + '"></a></li>';
            outTree += '<li>Размер: ' + data[key]['filesize'] + '</li>';
            outTree += '<li>Время: ' + formattedTime + '</li>';
            outTree += '<li>Категория: ' + data[key]['category'] + '</li>';
            outTree += '</ul></li>';

            outTree += '<div id="popap' + key + '" class="popap">';
            outTree += '<div class="popap__body">';
            outTree += '<a href="#" class="popap__close">X</a>';
            outTree += '<img class="popap__img" src="' + data[key].image + '">';
            outTree += '</div>';
            outTree += '</div>';
        }

        $('.tree').html(outTree);
    });
}