function aaaa(num) {
    table = document.getElementById('cards');
    var pages = document.querySelector('#pages');
    var items = [];
    var notesOnPage = 3;
    var countOfItems = Math.ceil(num.length / notesOnPage);
    var countOfItems;
    console.log('ddd' + cards.length);
    console.log(countOfItems);
    eval(console.log('eval' + cards.length));

    for (var i = 1; i <= countOfItems; i++) {
        var li = document.createElement('li');
        li.innerHTML = i;
        pages.appendChild(li);
        items.push(li);
    }
    showPages(items[0]);
    var active;

    for (var item of items) {
        item.addEventListener('click', function() {
            showPages(this);

        });
    }

    function showPages(item) {
        if (active) {
            active.classList.remove('active');
        }
        active = item;

        item.classList.add('active');
        var pageNum = +item.innerHTML;

        var start = (pageNum - 1) * notesOnPage;
        var end = start + notesOnPage;


        var notes = cards.slice(start, end);
        console.log(notes);

        table.innerHTML = '';
        var d = 0;
        console.log('item' + item);
        for (var note of notes) {
            if (localStorage.getItem('card') == null) {
                table.innerHTML += note.diva + note.img + note.size + note.time + note.category + note.btn + note.divb;
            }
            d++;
            console.log('123' + d);
        }
    }
}