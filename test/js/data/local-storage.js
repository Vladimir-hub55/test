function checkCard() {
    console.log(localStorage.getItem('card'));
    if (localStorage.getItem('card') != null) {
        card = JSON.parse(localStorage.getItem('card'));
    }
}

function show() {
    var out = '';
    for (var w in card) {
        out = w;
        if (out == w) {
            console.log(777);
            document.getElementById('card' + w).classList.add("clear");
        }
    }
    console.log("true");
}

document.body.onload = function() {
    setTimeout(function() {
        if (localStorage.getItem('card') != null) {
            var out = '';
            for (var w in card) {
                out = w;
                if (out == w) {
                    console.log(000);
                    var preloader = document.getElementById('card' + w);
                    if (!preloader.classList.contains('clear')) {
                        preloader.classList.add('clear');
                    }
                }
            }
        }


    }, 100);
}