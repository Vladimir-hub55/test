// Ловля кликов
tree.onclick = function(event) {
    if (event.target.tagName != 'SPAN') return; // Если кликнули не по span

    var childrenContainer = event.target.parentNode.querySelector('ul');
    if (!childrenContainer) return; // Если нет вложеных дитей

    childrenContainer.hidden = !childrenContainer.hidden; //  Скрыть или появить список

    if (childrenContainer.hidden) {
        event.target.classList.add('hide'); // Добавить класс
        event.target.classList.remove('show'); // Удалить класс
    } else {
        event.target.classList.add('show'); // Добавить класс
        event.target.classList.remove('hide'); // Удалить класс
    }
}