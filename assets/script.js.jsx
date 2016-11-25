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
var ElementContainer = React.createClass({
    spliceObject: function(obj) {
        obj = Object.keys(obj);
        obj.splice(obj.length - 1, 1);
        return obj;
    },
    getInitialState: function() {
        return {
            alphabetical: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
            propRefs: this.spliceObject(this.props.topic)
        };
    },
    cascadeData: function(subject, letter, propNumber, secondProp) {
        let output = [];
        if (propNumber == 'no' && secondProp == 'no') { // First level
            for
            (let prop = 0; prop < eval('this.props.topic.' + letter + '.' + subject + '.length'); prop++)
            {
                if (Array.isArray(eval('this.props.topic.' + letter + '.' + subject + '[' + prop + ']'))) {
                    output.push(<ul>{this.cascadeData(subject, letter, prop, 'no')}</ul>);
                } else {
                    output.push(
                        <li>
                            {eval('this.props.topic.' + letter + '.' + subject + '[' + prop + ']')}
                        </li>
                    );
                };
            };
        } else if (secondProp == 'no') { // Second level
            if (letter == 'C') {
                console.log("Here at subject: " + subject);
                console.log("Here at: " + eval('this.props.topic.C.' + subject));
            };

            for
            (let prop = 0; prop < eval('this.props.topic.' + letter + '.' + subject + '[' + propNumber + '].length'); prop++)
            {
                if (Array.isArray(eval('this.props.topic.' + letter + '.' + subject + '[' + propNumber + '][' + prop + ']'))) {
                    output.push(<ul>{this.cascadeData(subject, letter, propNumber, prop)}</ul>)
                } else {
                    output.push(
                        <li>
                            {eval('this.props.topic.' + letter + '.' + subject + '[' + propNumber + '][' + prop + ']')}
                        </li>
                    );
                };
            };
        } else { // Third level
            console.log("Got to level three!!");
            for
            (let prop = 0; prop < eval('this.props.topic.' + letter + '.' + subject + '[' + propNumber + '][' + secondProp + '].length'); prop++)
            {
                output.push(
                    <li>
                        {eval('this.props.topic.' + letter + '.' + subject + '[' + propNumber + '][' + secondProp + '][' + prop + ']')}
                    </li>
                );
            };
        };
        return output;
    },
    listTopics: function() {
        let delimiter = (letter) => {
            if (Array.isArray(eval('this.props.topic.' + letter + '.text'))) {
                return <ul>{this.cascadeData('text', letter, 'no', 'no')}</ul>;
            } else {
                return eval('this.props.topic.' + letter + '.text');
            };
        }.bind(this);
        let output = [];
        for (let letter = 0; letter < this.state.propRefs.length; letter++) {
             output.push(
                 <li>
                     <label>
                         <input type="checkbox"/>
                         <i className="mdi mdi-checkbox-blank-outline mdi-24px mdi-dark unchecked"></i>
                         <i className="mdi mdi-checkbox-marked mdi-24px mdi-dark checked"></i>
                         <div className="checkbox-ripple"></div>
                         <span>{this.state.propRefs[letter] + ". "}</span>
                     </label>
                     <div className="topic">
                         {delimiter(this.state.propRefs[letter])}
                     </div>
                 </li>
             );
        };
        return output;
    },
    listEvidence: function() {
        let output = [];
        for (let prop = 0; prop < this.state.propRefs.length; prop++) {
            output.push(<h4>{this.state.propRefs[prop] + ". Evidence"}</h4>);
            output.push(<ul>{this.cascadeData('evidence', this.state.propRefs[prop], 'no', 'no')}</ul>);
        };
        return output;
    },
    render: function() {
        return (
            <div className="element-wrapper">
                <div className="element-card">
                    <button name="close">Close</button>
                    {this.props.title}
                    <div className="details">
                        <ul className="primary">
                            {this.listTopics()}
                        </ul><br/>
                        {this.listEvidence()}
                    </div>
                </div>
            </div>
        );
    }
});

var RenderedElements = React.createClass({
    render: function() {
        return (
            <div>
                <ElementContainer title="Leadership At All Levels"
                    topic={{
                        A: {
                            text: "The CTE pathways are articulated with post-secondary and industry through programs of study, formal articulation agreements, and/or Tech Prep.",
                            evidence: [
                                "Tech Prep Agreements",
                                "Articulation Agreements"
                            ]
                        },
                        B: {
                            text: "Local district administrators participate in CTE professional development regarding the benefits of CTE and the management of CTE within the larger context of educational improvement to serve all students.",
                            evidence: [
                                "Dates and Names of Activities"
                            ]
                        },
                        C: {
                            text: "Investment is made to provide support for CTE leadership at the local level to ensure that CTE administrators, teacher(s), and counseling and instructional leaders have sufficient time and resources to implement system improvements and work with their counterparts in other programs.",
                            evidence: [
                                "Dates and Names of Activtiies"
                            ]
                        },
                        length: 3
                    }}/>
                <ElementContainer title="High-Quality Curriculum And Instruction"
                    topic={{
                        A: {
                            text: "The CTE Model Curriculum Standards and Framework for the __________________ Industry Sector are the basis for content of courses offered. Curriculum addresses \"Pathway\" standards within the program pathway(s) and course sequence.",
                            evidence: [
                                "Course Outlines",
                                "Course Catalog",
                                "Local CTE Plan",
                                "Review Curriculum"
                            ]
                        },
                        B: {
                            text: "Career paths have been identified and can be found on a chart or diagram in the CTE Plan.",
                            evidence: [
                                "Local CTE Plan"
                            ]
                        },
                        C: {
                            text: "The CTE program has classroom-linked work-based learning and work experience education opportunities through strengthened industry partnerships, effective coordination with Regional Occupation Center/Program (ROC/P), adult schools, Work Experience Education, and Cooperative Work Experience Education programs, and a systematic review of policies and practices addressing barriers to access, including insurance, liability, and other issues.",
                            evidence: [
                                "List of Work Based Learning (WBL) Sites",
                                "Percentage of Students Participating"
                            ]
                        },
                        D: {
                            text: "The school master schedule allows students to follow the recommended sequence of CTE courses to complete the selected career path(s).",
                            evidence: [
                                "Master Schedule",
                                "Course Catalog"
                            ]
                        },
                        E: {
                            text: "Students are provided with a strong experience in and understanding of all aspects of industry.",
                            evidence: [
                                "WBL Experiences",
                                "Review Curriculum Document",
                                "Lesson Plans"
                            ]
                        },
                        F: {
                            text: "Technology is incorporated into program instruction.",
                            evidence: [
                                "Program-Based Software",
                                "Program-Related Technology and Advanced Equipment"
                            ]
                        },
                        G: {
                            text: "There is collaboration between academic and CTE teachers.",
                            evidence: [
                                "Agenda",
                                "Minutes",
                                "Sign-In Sheets"
                            ]
                        },
                        H: {
                            text: "CTE courses are industry certified, have been submitted to meet high school graduation requirements, University of California a-g (UC a-g) credit, or articulated with a community college.",
                            evidence: [
                                "Copy of Certification or Licensure",
                                "Copy of UC A-G Approval List; Articulation Agreements"
                            ]
                        },
                        length: 8
                    }}/>
                <ElementContainer title="Career Explorations And Guidance"
                    topic={{
                        A: {
                            text: [
                                "Students are counseled regarding:",
                                [
                                    "CTE career opportunities.",
                                    "CTE and academic courses necessary to complete career pathway offerings.",
                                    "Post-secondary education and training options."
                                ],
                            ],
                            evidence: [
                                "List of Activities",
                                "List of Career Path Information Sent to Parents, Counselors and Students"
                            ]
                        },
                        B: {
                            text: "All students have a completed a four year career plan that is updated annually.",
                            evidence: [
                                "Lesson Plans",
                                "Example of Student Four Year Plan"
                            ]
                        },
                        length: 2
                    }}/>
                <ElementContainer title="Student Support and Student Leadership Development"
                    topic={{
                        A: {
                            text: "An official Career Technical Student Organization (CTSO) has been chartered (or in application process) by the State Association.",
                            evidence: [
                                "CTSO Document",
                                "Agenda/Minutes/Sign-In Sheets"
                            ]
                        },
                        B: {
                            text: "A local CTSO work plan is developed annually and a copy is furnished to local administration.",
                            evidence: [
                                "CTSO Work Plan"
                            ]
                        },
                        C: {
                            text: "Leadership activities are embedded in the CTE curriculum.",
                            evidence: [
                                "List of Leadership Activities",
                                [
                                    "Lesson Plans",
                                    "Curriculum"
                                ],
                                "Percentage of Students Participating",
                                "Evidence of Student Achievement",
                                "List of Student Organization Involvement In Community or School Related Activities"
                            ]
                        },
                        D: {
                            text: "All students enrolled in CTSO's are affiliated with the State Association.",
                            evidence: [
                                "Local CTSO Roster"
                            ]
                        },
                        E: {
                            text: "Program meets the needs of special population students (including special education, english learners, non-traditional students, and the general student population).",
                            evidence: [
                                "Student Completion Rates",
                                "Student Placement Results",
                                "Catalog of Support Services",
                                "Retention Rates",
                                "Mentors, Role-Models, Etc"
                            ]
                        },
                        F: {
                            text: "Students are made aware of non-traditional CTE offerings and pathways that lead to high skill, high wage, or high demand careers.",
                            evidence: [
                                "Promotional Materials",
                                "Sudent Placement Results",
                                "Counseling Materials"
                            ]
                        },
                        length: 6
                    }}/>
                <ElementContainer title="Industry Partnerships"
                    topic={{
                        A: {
                            text: "The Local CTE Advisory Committee is operational and reflects the committee membership as outlined in the California Education Code §8070 and meets at least once a year.",
                            evidence: [
                                "List of Advisory",
                                [
                                    "Members",
                                    "Titles",
                                    "Industry"
                                ],
                                "List of Educators",
                                "Aganda/Minutes/Sign-In",
                                "E-mails"
                            ]
                        },
                        B: {
                            text: "Business/industry is involved in student learning activities.",
                            evidence: [
                                "List of Activities",
                                [
                                    "Job Shadowing",
                                    "Speakers"
                                ],
                                "Percent of Industry Participation"
                            ]
                        },
                        C: {
                            text: "Business/industry is involved in the development and validation of the curriculum.",
                            evidence: [
                                "List of Advisory Members and Industries",
                                "Agenda/Meeting/Minutes/Sign-In Sheets"
                            ]
                        },
                        D: {
                            text: "Labor market demand has been documented for the Program.",
                            evidence: [
                                "Labor Market Projections"
                            ]
                        },
                        E: {
                            text: "There are industry certification standards and certificates for students who achieve industry recognized skill and knowledge requirements.",
                            evidence: [
                                "Copy of Certification Standards",
                                "Percentage of Students Receiving Certification"
                            ]
                        },
                        length: 5
                    }}/>
                <ElementContainer title="System Alignment and Coherence"
                    topic={{
                        A: {
                            text: "A Program of Study, with a post-secondary institution, has been developed.",
                            evidence: [
                                "Industry Sector/Career Pathway Identified",
                                "Articulation, UC A-G, Technical School Sequence"
                            ]
                        },
                        B: {
                            text: "Sufficient time is provided for faculty to build cross-segmental and cross-disciplinary collaborations aimed at aligning curricula and programs, as well as models, tools, and professional development to facilitate pathway development.",
                            evidence: [
                                "Meeting Dates for Collaboration Time with Others in Identified Sequence",
                                "Documents Identifying Sequence"
                            ]
                        },
                        C: {
                            text: "Each CTE program sequence will include at least one district-funded CTE course in the industry sector.",
                            evidence: [
                                "Local CTE Plan",
                                "Fiscal Records"
                            ]
                        },
                        length: 3
                    }}/>
                <ElementContainer title="Effective Organizational Design"
                    topic={{
                        A: {
                            text: "Opportunities provide for better use of after-school, extended-day, and out-of-school time for career exploration, projects, and WBL connected to in-class curricula.",
                            evidence: [
                                "Percentage of Students Who Participate",
                                "List of WBL Activities",
                                "Signed WBL Agreements"
                            ]
                        },
                        B: {
                            text: "There are open-entry/open-exit strategies where feasible, in ways that maintain the integrity of CTE courses and course sequences and comply with industry requirements; structure and sequence curriculum in modules or “chunks” tied to jobs with multiple entry and exit points, and with multiple levels of industry-recognized credentials built into the sequencing of the pathway.",
                            evidence: [
                                "Program Plans",
                                "Counseling Materials",
                                "Programs of Study Documents"
                            ]
                        },
                        C: {
                            text: "Provides education and training for students and incumbent workers at times and locations convenient to students and employers, including non-traditional time or methods.",
                            evidence: [
                                "Distance Learning Activities",
                                "Internet CTE Research Project Completed by Students"
                            ]
                        },
                        length: 3
                    }}/>
                <ElementContainer title="System Responsiveness to Changing Economic Demands"
                    topic={{
                        A: {
                            text: "Mechanisms are in place that systematically track labor market demands, maintain the currency of occupational classifications, and ensure that teachers and counselors are informed of new developments in their fields.",
                            evidence: [
                                "Minutes Showing Business/Industry Input Into Curriculum And Programs"
                            ]
                        },
                        B: {
                            text: "There is sufficient funding to cover costs of necessary equipment and facilities.",
                            evidence: [
                                "Documented Costs Over Last 2 Years",
                                "Assessment of Ongoing Costs"
                            ]
                        },
                        C: {
                            text: "There is a partnership among local businesses and local workforce development and educational organization to provide consistent and reliable data about the regional economic and labor markets for planning programs.",
                            evidence: [
                                "Labor Market Reports for both Regional and Global",
                                "Advisory Committee Minutes/Agendas"
                            ]
                        },
                        length: 3
                    }}/>
                <ElementContainer title="Skilled Faculty and Professional Development"
                    topic={{
                        A: {
                            text: "Every CTE teacher has the appropriate credential for teaching the subject(s) assigned as well as documented employment experience outside of education in the program area taught.",
                            evidence: [
                                "Approved by Local Credential offices"
                            ]
                        },
                        B: {
                            text: "Based on the previous year’s records, every CTE teacher, teaching at least half time CTE, attends a minimum of four professional development activities.",
                            evidence: [
                                "List of Teacher Technical Development Activities Such as Staff Exchange, Technical Conferences, Industry Certification Training, Etc."
                            ]
                        },
                        C: {
                            text: "The CTE staff meets a minimum of twice a month. (This criteria does not apply to single person departments - mark column N/A = Not Applicable.)",
                            evidence: [
                                "Staff Meeting Minutes"
                            ]
                        },
                        D: {
                            text: "A written record of minutes of action taken during CTE staff meetings is kept in Department files.",
                            evidence: [
                                "Staff Meeting Minutes"
                            ]
                        },
                        length: 4
                    }}/>
                <ElementContainer title="Evaluation, Accountability, and Continuous Improvement"
                    topic={{
                        A: {
                            text: "A District CTE Plan is on file with the local administration and a copy is retained in the local department files.",
                            evidence: [
                                "Local Plan Files"
                            ]
                        },
                        B: {
                            text: "Updates of the CTE Plan are sent to the local administrator by February. These updates include: (1) Five Year Equipment Acquisition Schedule; (2) Chart of Staff Responsibilities; (3) CTSO Program of Work; (4) Advisory Committee Roster.",
                            evidence: [
                                "Meeting Notes",
                                "Improvement Plan"
                            ]
                        },
                        C: {
                            text: [
                                "Enrollment report (CDE 101-E1)",
                                [
                                    "All CTE courses are properly identified in data system (inluding new courses).",
                                    "Enrollment figures and reports are reviewed by:",
                                    [
                                        "Site Staff and district CTE staff",
                                        "Site and district advisory committees"
                                    ],
                                    "Completed and submitted by October 15 to the CDE"
                                ]
                            ],
                            evidence: [
                                "CDE Records",
                                "Local Data System",
                                "Meeting Notes/Minutes"
                            ]
                        },
                        D: {
                            text: [
                                "A follow-up system (including membership in California Partnership for Achieving Student Success [CALPASS]) is used which gathers the following information from program completers:",
                                [
                                    "Student placement status in postsecondary education or advanced training, in military service, or in employment.",
                                    "Opinion regarding the value and relevance of the CTE program.",
                                    "Suggestions for improving the CTE program"
                                ]
                            ],
                            evidence: [
                                "CDE Records",
                                "Meeting Notes/Minutes"
                            ]
                        },
                        E: {
                            text: "Graduate Follow Up/Placement Report (CDE 101-E2) The Graduate Follow Up data collected and presented to the CDE by March 15",
                            evidence: [
                                "CDE Records"
                            ]
                        },
                        F: {
                            text: "The CTE Department analyzes their student retention numbers each year and develops strategies to help increase retention within the program.",
                            evidence: [
                                "Meeting Notes",
                                "Advisory Agenda/Minutes"
                            ]
                        },
                        G: {
                            text: "All Core Indicators meet or exceed the State level targets",
                            evidence: [
                                "Meeting Dates, Discussion Points"
                            ]
                        },
                        H: {
                            text: "The Expenditure Reports (CDE 101-A and VE-5) are received by the CDE by September 30",
                            evidence: [
                                "CDE Records",
                                "Interview of District Fiscal Representative"
                            ]
                        },
                        length: 8
                    }}/>
                <ElementContainer title="CTE Promotion, Outreach, Marketing, and Communication"
                    topic={{
                        A: {
                            text: "The CTE program has a recruitment brochure or similar document used to promote the program.",
                            evidence: [
                                "Copy of Plan",
                                "Date and Type of Activities such as Web Page, Career Fairs, Open House, Serving on Program Related Committees, Etc."
                            ]
                        },
                        B: {
                            text: "The CTE Department(s) conduct recruitment activities.",
                            evidence: [
                                "Copy of Plan such as Feeder School Meetings"
                            ]
                        },
                        length: 2
                    }}/>
            </div>
        );
    }
});

$(document).ready(function(event) {
    ReactDOM.render(<RenderedElements/>, document.getElementById('react-root'));
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
    $('.element-card').click(function() {
        if (!card_out.state) {
            $(this).removeClass('reset').addClass('active');
            animate_sweep(this);
            $('body').addClass('no_scroll');
            card_out.state = true;
            card_out.identifier = $(this).attr('id');
        } else {
            if ($(this).attr('id') != card_out.identifier) {
                $('body').addClass('no_scroll');
                $('.element-card#' + card_out.identifier).removeClass('active').addClass('reset');
                animate_shrink('.element-card#' + card_out.identifier);
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
        $('.element-card').removeClass('active').addClass('reset');
        animate_shrink('.element-card');
        $('body').removeClass('no_scroll');
        card_out.state = false;
        event.stopPropagation();
    });

});
