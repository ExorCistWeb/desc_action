document.addEventListener("DOMContentLoaded", function() {
    $(document).ready(function() {
        var burgerIcon = $("#burger-icon"),
            menu = $(".menu"),
            nav = $(".nav"),
            logoLink = $("#logo-link");

        burgerIcon.on("click", function() {
            if ($(window).width() < 738) {
                $(this).toggleClass("clicked");
                menu.toggleClass("open");
                nav.toggleClass("open_nav");

                if (menu.hasClass("open")) {
                    menu.animate({
                        right: "0",
                        opacity: "1"
                    }, 400).css("display", "flex");

                    $("body").css("overflow", "hidden");
                    logoLink.addClass("white-text");
                } else {
                    menu.animate({
                        right: "-738px",
                        opacity: "0"
                    }, 400, function() {
                        $(this).css("display", "none");
                    });

                    $("body").css("overflow", "auto");
                    logoLink.removeClass("white-text");
                    handleScroll();
                }
            }
        });

        $(".menu .nav li a").on("click", function() {
            if ($(window).width() < 738) {
                menu.animate({
                    right: "-738px",
                    opacity: "0"
                }, 400, function() {
                    $(this).css("display", "none");
                });

                $("body").css("overflow", "auto");
                burgerIcon.removeClass("clicked");
                menu.removeClass("open");
                logoLink.removeClass("white-text");
                handleScroll();
            }
        });
    });
});