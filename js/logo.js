document.addEventListener("DOMContentLoaded", function() {
    var text = "igital",
        animatedText = $("#animated-text"),
        index = 0,
        reverse = false;

    function animateText() {
        reverse ? (animatedText.text(text.slice(0, index)), --index < 0 ?
                (index = 0, reverse = false, setTimeout(animateText, 1000)) :
                setTimeout(animateText, 300)) :
            0 === index ? setTimeout(function() {
                index++, animateText()
            }, 1000) :
            (animatedText.text(text.slice(0, index)), ++index > text.length ?
                (index = text.length, reverse = true, setTimeout(animateText, 1000)) :
                setTimeout(animateText, 300));
    }

    function blinkCursor() {
        $(".blinking-cursor").toggleClass("hidden");
        setTimeout(blinkCursor, 400);
    }

    animateText();
    blinkCursor();
});