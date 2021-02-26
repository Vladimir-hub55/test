document.addEventListener('DOMContentLoaded', function() { // Loading indicator
    setTimeout(function() { // Timer for 1 second
        var preloader = document.getElementById('preloader'); // Take an item by id preloader
        if (!preloader.classList.contains('done')) { // If the preloader doesn't have the done class
            preloader.classList.add('done'); // Add the done class to the preloader
        }
    }, 1000);
})