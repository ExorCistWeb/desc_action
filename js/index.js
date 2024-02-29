document.addEventListener("DOMContentLoaded", function() {
    var animatedElements = document.querySelectorAll(".animated");

    animatedElements.forEach(function(element) {
        element.classList.add("animate");
    });
});