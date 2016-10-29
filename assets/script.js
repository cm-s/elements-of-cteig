var numrand = 0;
var navIsScrolled = false;
var card_out = { state: false, identifier: -1 };

class seeker {
    constructor() {
        this.titles = [
            ['Leadership At All Levels', 0],
            ['High-Quality Curriculum And Instruction', 0],
            ['Career Explorations And Guidance', 265],
            ['Student Support and Student Leadership Development', 477],
            ['Industry Partnerships', 742],
            ['System Alignment and Coherence', 954],
            ['Effective Organizational Design', 1219],
            ['System Responsiveness to Changing Economic Demands', 1484],
            ['Skilled Faculty and Professional Development', 1749],
            ['Evaluation, Accountability, and Continuous Improvement', 1961],
            ['CTE Promotion, Outreach, Marketing, and Communication', 2028]
        ];
    };
    search(text) {
        $('.search-result').remove();
        if (text.length > 2) {
            for (let index = 0; index < this.titles.length; index++) {
                if (this.titles[index][0].toLowerCase().indexOf(text.toLowerCase()) != -1) {
                    $('#search-bar').append($('<div class="search-result"></div>').text(String(this.titles[index][0])));
                    $('.search-result:nth-last-of-type(1)').attr('id', index);
                };
            };
        };
        if ($('#search-bar').nextAll().prevObject[0].children.length > 3) {
            $('#search-bar').css('border-bottom-left-radius', '0').css('border-bottom-right-radius', '0');
        } else {
            $('#search-bar').css('border-bottom-left-radius', '8px').css('border-bottom-right-radius', '8px');
        };
    };
    close() {
        this.search('\0\0');
    };
    direct_to(topic) {
        $('html, body').animate({scrollTop: this.titles[topic][1]}, 300);
        $('.search-result').remove();
    };
};

function dorand() {
    // Removing animation class from old animated element
    $('.topic-wrapper:nth-child(' + numrand + ') .topic-box').removeClass('calling');

    // Setting new random number
    numrand = Math.floor(Math.random() * 21);

    // Adding animation class to the random element
    $('.topic-wrapper:nth-child(' + numrand + ') .topic-box').addClass('calling');

    // Recursing the function
    setTimeout(function () {
        if (!card_out) {
            dorand();
        };
    }, numrand * 10 + 500);
};
function clear_styles(subject) {
    // Function to clear all animated styles from the object.
    // Setting them to '' removes them automatically.
    $(subject).css('top', '').css('left', '').css('height', '').css('width', '').css('margin', '').css('box-shadow', '');
};
function animate_sweep(subject) {
    clear_styles(subject);
    $(subject).animate({
        'top': window.scrollY - 31 + 'px',
        'left': '40%',
        'height': '96%',
        'width': '56vw',
    }, 700);
    setTimeout(function () {
        $(subject).css('box-shadow', 'inset 20px -12px 5px -12px rgba(0,0,0,0.3)');
    }, 800);
};
function animate_shrink(subject) {
    $(subject).css('box-shadow', 'none');
    $(subject).animate({
        'height': '170px',
        'width': '320px',
        'margin': '30px auto 30px auto',
        'top': '0',
        'left': '0',
    }, 700);
    setTimeout(function () {
        clear_styles(subject);
    }, 800);
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
function feedback(container) {
    console.log(container);
};
$(document).ready(function(event) {
    // Ensuring random elements animate
    dorand();
    // Activating search
    var searcher = new seeker();

    // Animate navbar height changes
    $(document).on('scroll', function() {
        if (!navIsScrolled && (window.scrollY > 0)) {
            animate_rise('nav');
            navIsScrolled = true;
        } else if (navIsScrolled && (window.scrollY <= 0)) {
            animate_fall('nav');
            navIsScrolled = false;
        };
    });

    $('#dot-menu-container').click(function(event) {
        $('#dot-menu-container .ripple').css('top', (event.pageY - 80) - $(this).offset().top + 'px')
                                        .css('left', (event.pageX - 80) - $(this).offset().left + 'px');

        $('#dot-menu-container .ripple').addClass('active').delay(400).queue(function() {
            $('#dot-menu-container .ripple').removeClass('active').dequeue();
        });
        setTimeout(function () {
            $('#dot-menu').addClass('active');
            $('#dot-menu-container').addClass('active');
        }, 200);
        $('#dot-menu li').click(function() {
            feedback(this);
        });
        $('#view-pdf-link').click(function() {
            let new_window = window.open('https://goo.gl/0QEaaa', '_blank');
            new_window.focus();
        });
        /*

        $('html').click(function() {
        $('#dot-menu-container').removeClass('active');
        $('#dot-menu').removeClass('active');
    })
        */
    })

    // Control search bar functionality mechanics
    $('#search-bar').click(function(event) {
        searcher.search($('#search-field').val());
        $('#search-field').keyup(function() {
            searcher.search($(this).val());
        });
        $(this).addClass('active');
        event.stopPropagation();
        $('html').click(function() {
            $('#search-bar').removeClass('active');
            searcher.close();
        });
        $('.search-result').click(function(event) {
            searcher.direct_to(Number($(this).attr('id')));
        });
    });

    // Control topic box viewing and animation invocation mechanics
    $('.topic-box').click(function() {
        if (!card_out.state) {
            $(this).removeClass('reset').addClass('active');
            animate_sweep(this);
            $('body').addClass('no_scroll');
            card_out.state = true;
            card_out.identifier = $(this).attr('id');
        } else {
            if ($(this).attr('id') != card_out.identifier) {
                $('body').addClass('no_scroll');
                $('.topic-box#' + card_out.identifier).removeClass('active').addClass('reset');
                animate_shrink('.topic-box#' + card_out.identifier);
                let this_card = $(this);
                setTimeout(function () {
                    $(this_card).removeClass('reset').addClass('active');
                    animate_sweep(this_card);
                    card_out.state = true;
                    card_out.identifier = $(this_card).attr('id');
                }, 1100);
            };
        };
    });
    $('button').click(function (event) {
        $('.topic-box').removeClass('active').addClass('reset');
        animate_shrink('.topic-box');
        $('body').removeClass('no_scroll');
        card_out.state = false;
        event.stopPropagation();
    });
});
