var numrand = 0;
var fov_obscured = false;
var navIsScrolled = false;
var animated_last = {};

function dorand() {
    // Removing animation class from old animated element
    $('.topic-wrapper:nth-child(' + numrand + ') .topic-box').removeClass('calling');

    // Settings new random number
    numrand = Math.floor(Math.random() * 21);

    // Adding animation class to the random element
    $('.topic-wrapper:nth-child(' + numrand + ') .topic-box').addClass('calling');

    // Recursing the function
    setTimeout(function () {
        if (!fov_obscured) {
            dorand();
        };
    }, numrand * 10 + 500);
};
function animate_sweep(subject) {
    $(subject).animate({
        'top': window.scrollY - 31 + 'px',
        'left': '40%',
        'height': '96%',
        'width': '56vw',
    }, 1000);
    setTimeout(function () {
        $(subject).css('box-shadow', 'inset 20px -12px 5px -12px rgba(0,0,0,0.3)');
    }, 1100);
};
function animate_shrink(subject) {
    $(subject).animate({
        'height': '170px',
        'width': '320px',
        'margin': '30px auto 30px auto',
        'top': '0',
        'left': '0',
    }, 1000);
};
function animate_rise(subject) {
    $(subject).css('box-shadow', '0 1px 1px rgba(0,0,0,0.11)');
    setTimeout(function () {
        $(subject).css('box-shadow', '0 2px 2px rgba(0,0,0,0.12)');
        setTimeout(function () {
            $(subject).css('box-shadow', '0 3px 3px rgba(0,0,0,0.13)');
            setTimeout(function () {
                $(subject).css('box-shadow', '0 4px 4px rgba(0,0,0,0.14)');
                setTimeout(function () {
                    $(subject).css('box-shadow', '0 5px 5px rgba(0,0,0,0.15)');
                    setTimeout(function () {
                        $(subject).css('box-shadow', '0 6px 6px rgba(0,0,0,0.16)');
                    }, 200);
                }, 150);
            }, 110);
        }, 90);
    }, 50);
}
function animate_fall(subject) {
    $(subject).css('box-shadow', '0 5px 5px rgba(0,0,0,0.15)');
    setTimeout(function () {
        $(subject).css('box-shadow', '0 4px 4px rgba(0,0,0,0.14)');
        setTimeout(function () {
            $(subject).css('box-shadow', '0 3px 3px rgba(0,0,0,0.13)');
            setTimeout(function () {
                $(subject).css('box-shadow', '0 2px 2px rgba(0,0,0,0.12)');
                setTimeout(function () {
                    $(subject).css('box-shadow', '0 1px 1px rgba(0,0,0,0.11)');
                    setTimeout(function () {
                        $(subject).css('box-shadow', 'none');
                    }, 200);
                }, 160);
            }, 140);
        }, 100);
    }, 50);
}
$(document).ready(function(event) {
    // Ensuring random elements animate
    dorand();
    $(document).on('scroll', function() {
        if (!navIsScrolled && (window.scrollY > 0)) {
            animate_rise('nav');
            navIsScrolled = true;
        } else if (navIsScrolled && (window.scrollY <= 0)) {
            animate_fall('nav');
            navIsScrolled = false;
        };
    });

    // Add and remove 'pressed' class from clicked .topic-box(es)
    $('.topic-box').click(function(event) {
        if (!fov_obscured) {
            $(this).removeClass('reset');
            $(this).addClass('active');
            animate_sweep(this);
            $('body').css('overflow-y', 'hidden');
            fov_obscured = true;
        };
        event.stopPropagation(); // Not working
    });
    $('button').click(function () {
        $('.topic-box').removeClass('active').addClass('reset');
        animate_shrink('.topic-box');
        $('body').css('overflow-y', 'shown');
        fov_obscured = false;
    });
});
