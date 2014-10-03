(function($) {

    $(document).ready(function() {

        $('nav a').click(function(e) {
            if ($($(this).attr('href')).length > 0) {
                $.scrollTo($($(this).attr('href')), 500, {offset: {'top': -54}});
                e.preventDefault();
            }
        });

        $.Placeholder.init({color : '#393939'});

        $('form').validate();

        $('.news-slider').each(function() {
            var curSlider = $(this);
            curSlider.data('disableAnimation', true);

            var curPages = Math.ceil(curSlider.find('li').length / 4);
            if (curPages > 1) {
                var newHTML = '';
                for (var i = 0; i < curPages; i++) {
                    newHTML += '<a href="#"></a>';
                }
                $('.news-ctrl').html(newHTML);
                $('.news-ctrl a:first').addClass('active');
            }

            curSlider.find('ul').width(curSlider.find('li:first').width() * 4);
        });

        $('#news').on('click', '.news-ctrl a', function(e) {
            var curSlider = $('.news-slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = $('.news-ctrl a').index($(this));

                $('.news-ctrl a.active').removeClass('active');
                $('.news-ctrl a').eq(curIndex).addClass('active');

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').fadeOut(function() {
                    curSlider.find('li').hide();
                    curSlider.find('li').eq(curIndex * 4).show();
                    curSlider.find('li').eq(curIndex * 4 + 1).show();
                    curSlider.find('li').eq(curIndex * 4 + 2).show();
                    curSlider.find('li').eq(curIndex * 4 + 3).show();
                    curSlider.find('ul').fadeIn(function() {
                        curSlider.data('disableAnimation', true);
                    });
                });
            }

            e.preventDefault();
        });

    });

    $(window).bind('load resize scroll', function() {
        var curScroll = $(window).scrollTop();
        var curHeight = $(window).height() / 2;
        $('nav a').each(function() {
            var curBlock = $(this).attr('href');
            if ($(curBlock).offset().top < (curScroll + curHeight)) {
                $('nav li.active').removeClass('active');
                $(this).parent().addClass('active');
            }
        });
    });

})(jQuery);