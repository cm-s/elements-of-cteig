var Responder = React.createClass({
    getInitialState: function() {
        return {
            animating: false,
            top: false,
            left: false,
            type: this.props.type,
            position: 'absolute',
            dimensions: 0
        };
    },
    componentDidMount: function() {
        console.log(this.props.dimensions);
        if (this.props.type == 'small') {
            this.setState({
                position: 'relative',
                dimensions: this.props.dimensions
            });
        } else {
            this.setState({
                dimensions: this.props.dimensions * 2
            });
        };
        $($(this.refs.self)[0].parentElement).on('click', (event) => {
            console.debug("Ranme");
            let refactor = (side, event) => {
                if (side == 'top') {
                    if (this.state.position == 'absolute') {
                        return (event.pageY - (this.props.dimensions / 2)) - $($(this.refs.self)[0].parentElement).offset().top;
                    } else {
                        return null;
                    };
                } else {
                    if (this.state.position == 'absolute') {
                        return (event.pageX - (this.props.dimensions / 2)) - $($(this.refs.self)[0].parentElement).offset().left;
                    } else {
                        return null;
                    };
                };
            };
            this.setState({
                animating: 'animating-normal',
                top: refactor('top', event),
                left: refactor('left', event)
            });
            setTimeout(function () {
                this.setState({
                    animating: false
                });
            }.bind(this), 300);
        });
    },
    render: function() {
        return <span ref="self"
            className={this.state.animating + ' ' + this.props.className + ' ripple'}
            style={{
                position: this.state.position,
                top: this.state.top + 'px',
                left: this.state.left + 'px',
                height: this.state.dimensions + 'px',
                width: this.state.dimensions + 'px'
            }}></span>;
    }
});

var NavBar = React.createClass({
    getInitialState: function() {
        return {
            variables: {},
            transformation: 'scale(0)',
            navbarShadow: '0 2px 2px 0 rgba(0,0,0,0.2)',
            searchShadow: 'none',
            menuState: 'hidden',
            navbarHeight: 55,
            tabDisplay: 'none',
            tabWidth: 0,
            tabAlignment: 60,
            selectedTab: 'elementsTab',
            elements: Array.from({length: 11}, (count, num = 1) => num + 1),
            results: undefined
        };
    },
    filterResults: function(query, length) {
        if (length > 3) {
            let matches = [];
            // Expanding the navbar and performing proper initial adjustments if not already done
            if (this.state.navbarHeight == 55) {
                this.setState({
                    navbarHeight: 90,
                    tabDisplay: 'flex'
                });
                setTimeout(function () {
                    this.setState({ tabWidth: parseInt($(this.refs.elementsTab).css('width'), 10) + 20 });
                }.bind(this), 20);
                this.props.offsetStack(90);
            };
            switch (this.state.selectedTab) {
                case 'elementsTab':
                    this.state.elements.forEach((element) => {
                        if (eval('this.state.variables.e' + element + '.title').indexOf(query) !== -1) {
                            console.debug("Found it");
                            matches.push('e' + element);
                        };
                    }.bind(this));
                    break;
                case 'topicsTab':
                    break;
                    this.state.elements.forEach((element) => {
                        let propRefs = Object.keys(eval('this.state.variables.e' + element + '.topic'));
                        propRefs.splice(propRefs.length - 1, 1);
                        propRefs.forEach((ref) => {
                            if (Array.isArray(eval('this.state.variables.e' + element + '.topic.' + ref + '.text'))) {

                            } else {
                                if (eval('this.state.variables.e' + element + '.topic.' + ref + '.text').indexOf(query) !== -1) {
                                    matches.push('e' + element);
                                };
                            };
                        }.bind(this));
                    }.bind(this));
                    break;
                case 'evidenceTab':
                    console.debug("searching evidence");
                    break;
            };
            this.props.whitelist(this.state.selectedTab, matches);
        };
        if (length == 0) {
            this.setState({
                navbarHeight: 55,
                tabDisplay: 'none'
            });
            this.props.offsetStack(55);
            this.props.whitelist(null, []);
        };
    },
    search: function(event) {
        this.filterResults(event.target.value, event.target.value.length);
    },
    toggleMenu: function() {
        if (this.state.menuState == 'visible') {
            this.setState({
                transformation: 'scale(0)',
                menuState: 'hidden'
            });
        } else {
            this.setState({
                transformation: 'scale(1)',
                menuState: 'visible'
            });
        };
    },
    invoke: function(event) {
        if (this.state.menuState == 'hidden' && (event.target.id == 'dot-menu-container' || event.target.id == 'dot-menu-icon')) {
            this.toggleMenu();
        } else if (event.target.parentElement.id != 'dot-menu' && this.state.menuState == 'visible') {
            this.toggleMenu();
        };
    },
    viewPDF: function() {
        window.open('http://www.cnusd.k12.ca.us/cms/lib/CA01001152/Centricity/domain/6169/docs/CDE%2011%20Elements%20of%20HQ%20CTE%20Program.pdf');
    },
    downloadPDF: function() {
        document.getElementById('iframe').src = 'http://www.cnusd.k12.ca.us/cms/lib/CA01001152/Centricity/domain/6169/docs/CDE%2011%20Elements%20of%20HQ%20CTE%20Program.pdf';
    },
    componentDidMount: function() {
        // Setting one time trigger to a click of the search field to read all data from rendered elements
        let triggerFxn = () => {
            this.setState({
                variables: this.props.getElementData()
            });
            document.querySelector('#search-bar').removeEventListener('click', triggerFxn);
        };
        document.querySelector('#search-bar').addEventListener('click', triggerFxn);
    },
    updateZheight: function(input) {
        if (input > 0 && this.state.navbarShadow != '0 3px 3px 0 rgba(0,0,0,0.3)') {
            this.setState({
                shadow: '0 3px 3px 0 rgba(0,0,0,0.3)'
            });
        } else if (input == 0) {
            this.setState({
                shadow: '0 2px 2px 0 rgba(0,0,0,0.2)'
            });
        };
    },
    reselect: function(event) {
        if (event.target.id != this.state.selectedTab) {
            switch (event.target.id) {
                case 'elementsTab':
                    console.debug("set to elementsTab");
                    this.setState({
                        selectedTab: 'elementsTab',
                        tabWidth: parseInt($(this.refs.elementsTab).css('width'), 10) + 20,
                        tabAlignment: $(this.refs.elementsTab).offset().left
                    });
                    setTimeout(function () {
                        this.filterResults($(this.refs.searchField).val(), $(this.refs.searchField).val().length);
                    }.bind(this), 100);
                    break;
                case 'topicsTab':
                    console.debug("set to topicsTab");
                    this.setState({
                        selectedTab: 'topicsTab',
                        tabWidth: parseInt($(this.refs.topicsTab).css('width'), 10) + 20,
                        tabAlignment: $(this.refs.topicsTab).offset().left
                    });
                    setTimeout(function () {
                        this.filterResults($(this.refs.searchField).val(), $(this.refs.searchField).val().length);
                    }.bind(this), 100);
                    break;
                case 'evidenceTab':
                    console.debug("set to evidenceTab");
                    this.setState({
                        selectedTab: 'evidenceTab',
                        tabWidth: parseInt($(this.refs.evidenceTab).css('width'), 10) + 20,
                        tabAlignment: $(this.refs.evidenceTab).offset().left
                    });
                    setTimeout(function () {
                        this.filterResults($(this.refs.searchField).val(), $(this.refs.searchField).val().length);
                    }.bind(this), 100);
                    break;
            };
        };
    },
    permitHover: function() {
        this.setState({
            searchShadow: '0 2px 5px 2px rgba(0,0,0,0.35)'
        });
    },
    negateHover: function() {
        this.setState({
            searchShadow: 'none'
        });
    },
    render: function() {
        return (
            <nav style={{
                    boxShadow: this.state.navbarShadow,
                    height: this.state.navbarHeight + 'px'
                }}>
                <div id="dot-menu-container">
                    <Responder type="small"
                        dimensions={45}/>
                    <i className="mdi mdi-dots-vertical mdi-24px mdi-light" id="dot-menu-icon"></i>
                    <ul id="dot-menu"
                        style={{
                            transform: this.state.transformation
                        }}>
                        <li onClick={this.viewPDF}>
                            <i className="mdi mdi-file-pdf-box mdi-24px mdi-dark"></i>
                            View as PDF
                        </li>
                        <li onClick={this.downloadPDF}>
                            <iframe id="iframe"
                                style={{ display: 'none' }}
                                target="_blank"></iframe>
                            <i className="mdi mdi-cloud-download mdi-24px mdi-dark"></i>
                            Download PDF
                        </li>
                    </ul>
                </div>
                <div id="search-bar"
                    onFocus={this.permitHover}
                    onBlur={this.negateHover}
                    style={{ boxShadow: this.state.searchShadow }}>
                    <i className="mdi mdi-magnify mdi-24px mdi-dark"></i>
                    <input type="search"
                        name="searchbar"
                        placeholder="Enter query, more than three characters"
                        ref="searchField"
                        id="search-field"
                        autoComplete="off"
                        onChange={this.search} />
                </div>
                <div id="search-filter-container"
                    style={{ display: this.state.tabDisplay }}>
                    <span id="tab-marker"
                        style={{
                            left: this.state.tabAlignment + 'px',
                            width: this.state.tabWidth + 'px'
                        }}></span>
                    <span className="search-filter-tab"
                        ref="elementsTab"
                        id="elementsTab"
                        onClick={this.reselect}>
                        Elements
                    </span>
                    <span className="search-filter-tab"
                        ref="topicsTab"
                        id="topicsTab"
                        onClick={this.reselect}>
                        Topics
                    </span>
                    <span className="search-filter-tab"
                        ref="evidenceTab"
                        id="evidenceTab"
                        onClick={this.reselect}>
                        Evidence
                    </span>
                </div>
            </nav>
        );
    }
});

var ElementContainer = React.createClass({
    spliceObject: function(obj) {
        obj = Object.keys(obj);
        obj.splice(obj.length - 1, 1);
        return obj;
    },
    getInitialState: function() {
        return {
            alphabetical: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
            topics: undefined,
            evidence: undefined,
            latch: true,
            height: 90,
            currentState: 'inactive',
            left: 0,
            height: '170px',
            width: '360px',
            margin: '30px auto 30px auto',
            boxShadow: '0 3px 6px 1px rgba(0,0,0,0.19)',
            transform: 'none',
            display: 'flex',
            opacity: 1
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
    listTopics: function(propRefs) {
        let delimiter = (letter) => {
            if (Array.isArray(eval('this.props.topic.' + letter + '.text'))) {
                return <ul>{this.cascadeData('text', letter, 'no', 'no')}</ul>;
            } else {
                return eval('this.props.topic.' + letter + '.text');
            };
        }.bind(this);
        let output = [];
        for (let letter = 0; letter < propRefs.length; letter++) {
             output.push(
                 <li style={{ height: this.state.height }}>
                     <label>
                         <input type="checkbox"/>
                         <i className="mdi mdi-checkbox-blank-outline mdi-24px mdi-dark unchecked"></i>
                         <i className="mdi mdi-checkbox-marked mdi-24px mdi-dark checked"></i>
                         <div className="checkbox-ripple"></div>
                         <span>{propRefs[letter] + ". "}</span>
                     </label>
                     <div className="topic">
                         {delimiter(propRefs[letter])}
                     </div>
                 </li>
             );
        };
        return output;
    },
    listEvidence: function(propRefs) {
        let output = [];
        for (let prop = 0; prop < propRefs.length; prop++) {
            output.push(<h4>{propRefs[prop] + ". Evidence"}</h4>);
            output.push(<ul>{this.cascadeData('evidence', propRefs[prop], 'no', 'no')}</ul>);
        };
        return output;
    },
    componentDidUpdate: function() {
        if (this.state.latch && this.props.topic) {
            if (this.props.topic.length) {
                this.setState({
                    latch: false
                });
                this.setState({
                    topics: this.listTopics(this.spliceObject(this.props.topic)),
                    evidence: this.listEvidence(this.spliceObject(this.props.topic))
                });
            };
        };
    },
    retractCard: function() {
        if (this.state.currentState == 'active') {
            this.setState({
                currentState: 'inactive',
                height: '170px',
                width: '320px',
                left: 0,
                margin: '30px auto 30px auto',
                boxShadow: '0 3px 6px 1px rgba(0,0,0,0.19)',
                display: 'flex'
            });
            this.props.propagateSig('scroll');

        };
    },
    expandCard: function() {
        if (this.state.currentState == 'inactive') {
            this.props.dislodgeAll();
            this.setState({
                currentState: 'active',
                left: '40%',
                margin: 0,
                height: '96%',
                width: '56vw',
                boxShadow: 'inset 5px 0 5px rgba(0,0,0,0.3)',
                display: 'block'
            });
            this.props.propagateSig('noscroll');
        };
    },
    permitHover: function() {
        if (this.state.currentState != 'active') {
            this.setState({
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 12px -3px rgba(0,0,0,0.16)'
            });
        };
    },
    negateHover: function() {
        if (this.state.currentState != 'active') {
            this.setState({
                transform: 'none',
                boxShadow: '0 3px 6px 1px rgba(0,0,0,0.19)'
            });
        };
    },
    fadeOut: function() {
        this.setState({ opacity: 0 });
        setTimeout(function () {
            this.setState({ display: 'none' });
        }.bind(this), 300);
    },
    fadeIn: function() {
        this.setState({
            opacity: 1
        });
        setTimeout(function () {
            this.setState({ display: 'flex' });
        }.bind(this), 300);
    },
    render: function() {
        return (
            <div className="element-wrapper"
                style={{
                    marginTop: this.props.offset + 'px',
                    display: this.state.display
                }}>
                <div className={'element-card ' + this.state.currentState}
                    onClick={this.expandCard}
                    onMouseEnter={this.permitHover}
                    onMouseLeave={this.negateHover}
                    style={{
                        height: this.state.height,
                        width: this.state.width,
                        left: this.state.left,
                        margin: this.state.margin,
                        boxShadow: this.state.boxShadow,
                        transform: this.state.transform,
                        opacity: this.state.opacity,
                        display: this.state.display
                    }}>
                    <button name="close"
                        onClick={this.retractCard}>Close</button>
                    {this.props.title}
                    <div className="details">
                        <ul className="primary">
                            {this.state.topics}
                        </ul><br/>
                    {this.state.evidence}
                    </div>
                </div>
            </div>
        );
    }
});

var RenderedElements = React.createClass({
    getInitialState: function() {
        return {
            e1: this.readJSON('objects/e1.json', 'e1'),
            e2: this.readJSON('objects/e2.json', 'e2'),
            e4: this.readJSON('objects/e4.json', 'e4'),
            e5: this.readJSON('objects/e5.json', 'e5'),
            e6: this.readJSON('objects/e6.json', 'e6'),
            e7: this.readJSON('objects/e7.json', 'e7'),
            e8: this.readJSON('objects/e8.json', 'e8'),
            e8: this.readJSON('objects/e9.json', 'e9'),
            e10: this.readJSON('objects/e10.json', 'e10'),
            e11: this.readJSON('objects/e11.json', 'e11'),
            elements: Array.from({length: 11}, (count, num = 1) => num + 1),
            scrollable: 'scroll',
            stackOffset: 55
        };
    },
    getElementData: function() {
        let packageData = (target) => {
            return {
                title: eval('this.refs.' + target + '.props.title'),
                topic: eval('this.refs.' + target + '.props.topic')
            };
        }.bind(this);
        return {
            e1: packageData('e1'),
            e2: packageData('e2'),
            e3: packageData('e3'),
            e4: packageData('e4'),
            e5: packageData('e5'),
            e6: packageData('e6'),
            e7: packageData('e7'),
            e8: packageData('e8'),
            e9: packageData('e9'),
            e10: packageData('e10'),
            e11: packageData('e11'),
            elements: this.state.elements
        };
    },
    readJSON: function(file, register) {
        let component = this;
        $.getJSON(file, (data) => {
            eval('component.setState({ ' + register + ': data });');
        });
    },
    propagateSig: function(state) {
        this.setState({
            scrollable: state
        });
    },
    propagateClick: function(event) {
        this.refs.navbar.invoke(event);
    },
    propagateScroll: function(event) {
        this.refs.navbar.updateZheight($(event.target).scrollTop())
    },
    dislodgeAll: function() {
        this.state.elements.forEach((index) => {
            if (eval('this.refs.e' + index +'.state.currentState') == 'active') {
                eval('this.refs.e' + index + '.retractCard()');
            };
        }.bind(this));
    },
    offsetStack: function(proportion) {
        this.setState({
            stackOffset: proportion
        });
    },
    whitelist: function(filter, matches) {
        if (!filter) {
            this.dislodgeAll();
            this.state.elements.forEach((element) => {
                eval('this.refs.e' + element + '.fadeIn()');
            }.bind(this));
            return false;
        };
        if (matches.length <= 0) {
            this.dislodgeAll();
            this.state.elements.forEach((element) => {
                eval('this.refs.e' + element + '.fadeOut()');
            }.bind(this));
            return false;
        };
        switch (filter) {
            case 'elementsTab':
                console.debug("rendering elements");
                let elements = this.state.elements.map((prefect) => 'e' + prefect);
                let blacklist = elements.filter((element) => matches.every((match) => match != element));
                console.debug(blacklist);
                blacklist.forEach((element) => {
                    eval('this.refs.' + element + '.fadeOut()');
                }.bind(this));
                matches.forEach((match) => {
                    eval('this.refs.' + match + '.fadeIn()');
                }.bind(this));
                break;
            case 'topicsTab':
                console.debug("rendering topics");
                break;
            case 'evidenceTab':
                console.debug("rendering evidence");
                break;
        };
        return true;
    },
    render: function() {
        return (
            <div className={this.state.scrollable + ' react-main'}
                onClick={this.propagateClick}>
                <main onScroll={this.propagateScroll}>
                    <NavBar ref="navbar"
                        getElementData={this.getElementData}
                        whitelist={this.whitelist}
                        offsetStack={this.offsetStack}/>
                    <ElementContainer ref="e1"
                        propagateSig={this.propagateSig}
                        dislodgeAll={this.dislodgeAll}
                        title="Leadership At All Levels"
                        topic={this.state.e1}
                        offset={this.state.stackOffset}/>
                    <ElementContainer ref="e2"
                        propagateSig={this.propagateSig}
                        dislodgeAll={this.dislodgeAll}
                        title="High-Quality Curriculum And Instruction"
                        topic={this.state.e2}/>
                    <ElementContainer ref="e3"
                        propagateSig={this.propagateSig}
                        dislodgeAll={this.dislodgeAll}
                        title="Career Explorations And Guidance"
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
                    <ElementContainer ref="e4"
                        propagateSig={this.propagateSig}
                        dislodgeAll={this.dislodgeAll}
                        title="Student Support and Student Leadership Development"
                        topic={this.state.e4}/>
                    <ElementContainer ref="e5"
                        propagateSig={this.propagateSig}
                        dislodgeAll={this.dislodgeAll}
                        title="Industry Partnerships"
                        topic={this.state.e5}/>
                    <ElementContainer ref="e6"
                        propagateSig={this.propagateSig}
                        dislodgeAll={this.dislodgeAll}
                        title="System Alignment and Coherence"
                        topic={this.state.e6}/>
                    <ElementContainer ref="e7"
                        propagateSig={this.propagateSig}
                        dislodgeAll={this.dislodgeAll}
                        title="Effective Organizational Design"
                        topic={this.state.e7}/>
                    <ElementContainer ref="e8"
                        propagateSig={this.propagateSig}
                        dislodgeAll={this.dislodgeAll}
                        title="System Responsiveness to Changing Economic Demands"
                        topic={this.state.e8}/>
                    <ElementContainer ref="e9"
                        propagateSig={this.propagateSig}
                        dislodgeAll={this.dislodgeAll}
                        title="Skilled Faculty and Professional Development"
                        topic={this.state.e9}/>
                    <ElementContainer ref="e10"
                        propagateSig={this.propagateSig}
                        dislodgeAll={this.dislodgeAll}
                        title="Evaluation, Accountability, and Continuous Improvement"
                        topic={this.state.e10}/>
                    <ElementContainer ref="e11"
                        propagateSig={this.propagateSig}
                        dislodgeAll={this.dislodgeAll}
                        title="CTE Promotion, Outreach, Marketing, and Communication"
                        topic={this.state.e11}/>
                </main>
                <header>
                    <p id="header">
                        Career Technical Education (CTE)<br/>
                        11 Elements of a High-Quality CTE Program
                    </p>
                    <div id="title-divider"></div>
                    <p id="sub-header">
                        Self Review Tool
                    </p>
                    <footer>
                        <pre>
                            <mark>&#169;</mark> Charles Stevens
                        </pre>
                    </footer>
                </header>
            </div>
        );
    }
});

$(document).ready(function(event) {
    ReactDOM.render(<RenderedElements/>, document.getElementById('react-root'));
});
