var numrand = 0;
var navIsScrolled = false;
var card_out = { state: false, identifier: -1 };
var menu_out = { state: false };

class seeker {
    constructor() {
        this.titles = [
            ['Element', 'Leadership At All Levels', 0],
            ['Element', 'High-Quality Curriculum And Instruction', 0],
            ['Element', 'Career Explorations And Guidance', 265],
            ['Element', 'Student Support and Student Leadership Development', 477],
            ['Element', 'Industry Partnerships', 742],
            ['Element', 'System Alignment and Coherence', 954],
            ['Element', 'Effective Organizational Design', 1219],
            ['Element', 'System Responsiveness to Changing Economic Demands', 1484],
            ['Element', 'Skilled Faculty and Professional Development', 1749],
            ['Element', 'Evaluation, Accountability, and Continuous Improvement', 1961],
            ['Element', 'CTE Promotion, Outreach, Marketing, and Communication', 2028],
            ['Req', 'The CTE pathways are articulated with post-secondary and industry through programs of study, formal articulation agreements, and/or Tech Prep.', 1],
            ['Req', 'Local district administrators participate in CTE professional development regarding the benefits of CTE and the management of CTE within the larger context of educational improvement to serve all students.', 1],
            ['Req', 'Investment is made to provide support for CTE leadership at the local level to ensure that CTE administrators, teacher(s), and counseling and instructional leaders have sufficient time and resources to implement system improvements and work with their counterparts in other programs.', 1],
            ['Req', 'The CTE Model Curriculum Standards and Framework for the __________________ Industry Sector are the basis for content of courses offered. Curriculum addresses "Pathway" standards within the program pathway(s) and course sequence.', 2],
            ['Req', 'Career paths have been identified and can be found on a chart or diagram in the CTE Plan.', 2],
            ['Req', 'The CTE program has classroom-linked work-based learning and work experience education opportunities through strengthened industry partnerships, effective coordination with Regional Occupation Center/Program (ROC/P), adult schools, Work Experience Education, and Cooperative Work Experience Education programs, and a systematic review of policies and practices addressing barriers to access, including insurance, liability, and other issues.', 2],
            ['Req', 'The school master schedule allows students to follow the recommended sequence of CTE courses to complete the selected career path(s).', 2],
            ['Req', 'Students are provided with a strong experience in and understanding of all aspects of industry.', 2],
            ['Req', 'Technology is incorporated into program instruction.', 2],
            ['Req', 'There is collaboration between academic and CTE teachers.', 2],
            ['Req', 'CTE courses are industry certified, have been submitted to meet high school graduation requirements, University of California a-g (UC a-g) credit, or articulated with a community college.', 2]


        ];
    };
    search(text) {
        $('.search-result').remove();
        if (text.length > 2) {
            for (let index = 0; index < this.titles.length; index++) {
                if (this.titles[index][1].toLowerCase().indexOf(text.toLowerCase()) != -1) {
                    $('#search-bar').append($('<div class="search-result"></div>').text(this.filter(String(this.titles[index][1]), this.strip(text.toLowerCase()))));
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
    strip(text) {
        let output = ''
        for (let i = 0; i < text.length; i++) {
            if (text[i] != ' ') {
                output += text[i];
            };
        };
        return output;
    };
    filter(result, search) {
        let purified_result = result.toLowerCase()
        let output = '';
        let place = 0;
        while (true) {
            let word = '';
            for (let index = place; index < purified_result.length; index++) {
                if (purified_result[index] == ' ') {
                    place = index + 1;
                    break;
                };
                word += purified_result[index];
            };
            if (word.indexOf(search) != -1) {
                break;
            };
            if ((purified_result.length - place) <= 5) {
                break;
            };
        };
        if (result.length > 62) {
            if (place > 31 && (result.length - place) + place < result.length) {
                output += '.';
                output += '.';
                output += '.';
                for (let index = place - 31; index < (result.length - (result.length - place) + 20); index++) {
                    output += result[index];
                };
            } else {
                for (let index = 0; index < 62; index++) {
                    output += result[index];
                };
            };
            output += '.';
            output += '.';
            output += '.';
        } else {
            output = result;
        };
        return output;
    };
    close() {
        this.search('\0\0');
    };
    direct_to(topic) {
        $('html, body').animate({scrollTop: this.titles[topic][2]}, 300);
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
        if (!card_out.state) {
            dorand();
        } else {
            $('.topic-box').removeClass('calling');
        };
    }, numrand * 10 + 500);
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
        if (!menu_out.state) {
            menu_out.state = true;
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
        };
        event.stopPropagation();
        $('html').click(function() {
            if (menu_out.state) {
                $('#dot-menu li').css('animation', 'fadeout 20ms linear forwards 1').delay(400).queue(function() {
                    $(this).css('animation', 'none').dequeue();
                });
                $('#dot-menu').css('animation', 'fadeout 300ms linear forwards 1').delay(400).queue(function() {
                    $(this).css('animation', 'none').dequeue();
                });
                setTimeout(function () {
                    menu_out.state = false;
                    $('#dot-menu-container').removeClass('active');
                    $('#dot-menu').removeClass('active');
                }, 300);
            };
        });
    });

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
