$(document).ready(function() {
    function scrollToTarget(target) {
        var offset = $(target).offset().top - $(window).height() / 6.;
        $("html, body").animate({
            scrollTop: offset
        }, 1000);
    }

    // Обработка при загрузке страницы
    if (window.location.hash) {
        var target = window.location.hash;
        scrollToTarget(target);
    }

    // Обработка якорных ссылок
    $('a[href^="#"]').click(function(event) {
        event.preventDefault();

        var target = $(this).attr("href");
        scrollToTarget(target);

        var newURL = window.location.protocol + "//" + window.location.hostname +
            window.location.pathname + window.location.search + target;

        // Обновление URL без перезагрузки страницы
        window.history.pushState({}, document.title, newURL);
    });

    // Перехват изменения якорей из адресной строки
    window.addEventListener("popstate", function(event) {
        if (window.location.hash) {
            var target = window.location.hash;
            scrollToTarget(target);
        }
    });
});