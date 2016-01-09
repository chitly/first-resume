requirejs.config({
    baseUrl: 'assets/js',
    paths: {
        jquery: 'jquery-1.11.3.min',
        visible: 'jquery.visible.min',
        owl: 'owl.carousel.min',
    },
    shim: {
        visible: {
            deps: ['jquery'],
        },
        owl: {
            deps: ['jquery'],
        }
    }
});


require(['jquery', 'visible', 'owl'], function($, $v){

    function animateStuffs(){
        $('.skill-img').each(function(){
            if($(this).visible()){
                var elem = $(this);
                var progressbar = $(this).parent().find('.progress-bar');
                setTimeout(function(){
                    // elem.css({
                    //     'background-position': '0 ' + elem.attr('data-percent')
                    // });
                    progressbar.css({
                        'width': progressbar.attr('data-percent')
                    });
                    progressbar.addClass('glow');
                    setTimeout(function(){
                        progressbar.addClass('unglow');
                    }, 800);
                }, 200);
            }
        });

        $('.fade-in').each(function(){
            if($(this).visible(true)){
                var elem = $(this);
                setTimeout(function(){
                    elem.removeClass('fade-in');
                    if(elem.hasClass('glow')){
                        setTimeout(function(){
                            elem.addClass('unglow');
                        }, 800);
                    }
                }, 200);
            }
        });
    }

    $(document).ready(function(){
        var active = $('#active-menu').text();
        $('#nav').find('#' + active).addClass('active');

        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if(iOS){
            $('.fade-in').each(function(){
                $(this).removeClass('fade-in');
            });
        }

        animateStuffs();

        $('.content a:has(img)').addClass('image-container');
        $('.nav-toggle').click(function(){
            $('#nav').slideToggle();
        });
        $('#section-toggle').click(function(){
            $('#section-menu').slideToggle();
        });


        $("#carousel").owlCarousel({
            navigation : true,
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem: true,
            lazyLoad : true,
            autoPlay: 4000,
            autoHeight: true,
        });


        $(window).scroll(function(event){
            animateStuffs();

            if($(window).scrollTop() > 700)
                $('.top-button').removeClass('hide-fade');
            else
                $('.top-button').addClass('hide-fade');
        });


        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 700);
                    return false;
                }
            }
        });
    });
});
