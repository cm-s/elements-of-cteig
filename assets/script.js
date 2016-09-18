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

$(document).ready(function(event) {
    // Determining the height of the viewport
    viewport_middle = parseInt($('header').css('height'));
    // Ensuring random elements animate
    dorand();
    // Add and remove 'pressed' class from clicked .topic-box(es)
    $('.topic-box').click(function() {
        $(this).css('z-index', '4');
        $('#shadow').css('display', 'block')
        $('#shadow').animate({'opacity': '.4'}, 500)
        $(this).addClass('pressed');
        setTimeout(function () {
            $('.topic-box').removeClass('pressed');
        }, 400);
        $(this).animate({'margin-bottom': '-' + (viewport_middle - 190 )+ 'px'}, 400 );
        $(this).css('transform', 'scale(2) translateX(60px)');
        fov_obscured = true;
    });
});
