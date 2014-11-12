(function($) {

    $(document).ready(function() {

        $('nav a').click(function(e) {
            if ($($(this).attr('href')).length > 0) {
                $.scrollTo($($(this).attr('href')), 500, {offset: {'top': -54}});
                e.preventDefault();
            }
        });

        // подсказки
        $('.form-input input, .form-input textarea').each(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        $('.form-input input, .form-input textarea').focus(function() {
            $(this).parent().find('span').css({'display': 'none'});
        });

        $('.form-input input, .form-input textarea').blur(function() {
            if ($(this).val() == '') {
                $(this).parent().find('span').css({'display': 'block'});
            }
        });

        $('.form-select select').chosen({disable_search: true});

        $('.fileupload').fileupload({
            url: 'js/jquery.fileupload/server/php/',
            acceptFileTypes: /(\.|\/)(jpg)$/i,
            autoUpload: true
        });

        $('.form-filelink-top-file input').unbind('change').bind('change', function() {
            var curBlock = $(this).parents().filter('.form-filelink');
            curBlock.find('.form-filelink-value span').html($(this).val());
            curBlock.find('.form-input, .form-filelink-top-or').hide();
            curBlock.find('.form-filelink-value, .form-filelink-top-url').show();
            curBlock.find('.form-filelink-top-file span').html(curBlock.find('.form-filelink-top-file span').attr('rel'));
        });

        $('.form-filelink-value strong, .form-filelink-top-url span').click(function() {
            var curBlock = $(this).parents().filter('.form-filelink');
            curBlock.find('.form-filelink-top-file input').val('');
            curBlock.find('.form-filelink-value span').html($(this).val());
            curBlock.find('.form-input, .form-filelink-top-or').show();
            curBlock.find('.form-filelink-value, .form-filelink-top-url').hide();
            curBlock.find('.form-filelink-top-file span').html(curBlock.find('.form-filelink-top-file span').attr('rev'));
        });

        $('.form-checkbox span input:checked').parent().addClass('checked');
        $('.form-checkbox').click(function() {
            $(this).find('span').toggleClass('checked');
            $(this).find('input').prop('checked', $(this).find('span').hasClass('checked')).trigger('change');
        });

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
            if ($(curBlock).length > 0 && $(curBlock).offset().top < (curScroll + curHeight)) {
                $('nav li.active').removeClass('active');
                $(this).parent().addClass('active');
            }
        });
    });

    $(window).load(function() {
        $('.map-inner').css({'margin': '-' + ($('.map-inner').height() / 2) + 'px 0 0 -' + ($('.map-inner').width() / 2) + 'px'});
    });

})(jQuery);