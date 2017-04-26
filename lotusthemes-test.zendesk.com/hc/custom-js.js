$(window).load(function() {
    FixTopBar();

    $('.js-load-news').click(function() {
        GetNewsItems();
    });

    $(window).scroll(function (event) {
        FixTopBar();
    });

    $('.lines-button').click(function (event) {
        FixTopBar();
    });
});

function FixTopBar() {
    var scroll = $(window).scrollTop();

    if ($('.lines-button').hasClass('is-active') || (scroll >= 1)) {
        $('.topbar').addClass('scrolled-down');
    } else {
        $('.topbar').removeClass('scrolled-down');
    }
}

function GetNewsItems() {
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts/',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function(data) {
            var NewsHtmlCode = '';

            $(data).slice(0, 10).each(function (index, value) {
                NewsHtmlCode = '<div class="ajax-news-item"><h2 class="ajax-news-item__title">' + value.title + '</h2><p class="ajax-news-item__text">' + value.body + '</p></div>' + NewsHtmlCode;
            });

            $('.js-load-news').remove();
            $('.ajax-news').append(NewsHtmlCode)
        }
    });
}

