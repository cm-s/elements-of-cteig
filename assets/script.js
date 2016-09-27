var numrand = 0;
var viewport_middle = 0;
var fov_obscured = false;

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

$(document).ready(function(event) {
    // Determining the height of the viewport
    viewport_middle = parseInt($('header').css('height'));
    // Ensuring random elements animate
    dorand();

    // Add and remove 'pressed' class from clicked .topic-box(es)
    $('.topic-box').click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).addClass('reset');
            animate_shrink(this);
            $('body').css('overflow-y', 'auto');
            fov_obscured = false;
        } else {
            $(this).removeClass('reset');
            $(this).addClass('active');
            animate_sweep(this);
            $('body').css('overflow-y', 'hidden');
            fov_obscured = true;
        };
    });
});
