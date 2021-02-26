// Catching clicks
tree.onclick = function(event) {
    if (event.target.tagName != 'SPAN') return; // If you did not click on span

    var childrenContainer = event.target.parentNode.querySelector('ul');
    if (!childrenContainer) return; // If there are no nested children

    childrenContainer.hidden = !childrenContainer.hidden; //  Hide or show the list

    if (childrenContainer.hidden) {
        event.target.classList.add('hide'); // Add a class
        event.target.classList.remove('show'); // Delete a class
    } else {
        event.target.classList.add('show'); // Add a class
        event.target.classList.remove('hide'); // Delete a class
    }
}