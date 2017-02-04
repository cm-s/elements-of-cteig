import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import NavBar from './app/components/NavBar.jsx';
import ElementContainer from './app/components/ElementContainer.jsx';

export default class Binder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      e1: this.readJSON('assets/objects/e1.json', 'e1'),
      e2: this.readJSON('assets/objects/e2.json', 'e2'),
      e4: this.readJSON('assets/objects/e4.json', 'e4'),
      e5: this.readJSON('assets/objects/e5.json', 'e5'),
      e6: this.readJSON('assets/objects/e6.json', 'e6'),
      e7: this.readJSON('assets/objects/e7.json', 'e7'),
      e8: this.readJSON('assets/objects/e8.json', 'e8'),
      e8: this.readJSON('assets/objects/e9.json', 'e9'),
      e10: this.readJSON('assets/objects/e10.json', 'e10'),
      e11: this.readJSON('assets/objects/e11.json', 'e11'),
      elements: Array.from({length: 11}, (count, num = 1) => num + 1),
      scrollable: 'scroll',
      stackOffset: 55
    };
  }
  getElementData() {
    let packageData = (target) => {
      return {
        title: eval('this.refs.' + target + '.props.title'),
        topic: eval('this.refs.' + target + '.props.topic')
      };
    };
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
  }
  readJSON(file, register) {
    let component = this;
    $.getJSON(file, (data) => {
      eval('component.setState({ ' + register + ': data });');
    });
  }
  propagateSig(state) {
    this.setState({ scrollable: state })
  }
  propagateClick(event) {
    this.refs.navbar.invoke(event);
  }
  propagateScroll(event) {
    this.refs.navbar.updateZheight($(event.target).scrollTop());
  }
  dislodgeAll() {
    this.state.elements.forEach((index) => {
      if (eval('this.refs.e' + index +'.state.currentState') == 'active') {
        eval('this.refs.e' + index + '.retractCard()');
      };
    });
  }
  offsetStack(proportion) {
    this.setState({ stackOffset: proportion });
  }
  whitelist(filter, matches) {
    if (!filter) {
      this.dislodgeAll();
      this.state.elements.forEach((element) => {
        eval('this.refs.e' + element + '.fadeIn()');
      });
      return false;
    };
    if (matches.length <= 0) {
      this.dislodgeAll();
      this.state.elements.forEach((element) => {
        eval('this.refs.e' + element + '.fadeOut()');
      });
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
        });
        matches.forEach((match) => {
          eval('this.refs.' + match + '.fadeIn()');
        });
        break;
      case 'topicsTab':
        console.debug("rendering topics");
        break;
      case 'evidenceTab':
        console.debug("rendering evidence");
        break;
    };
    return true;
  }
  render() {
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
}

$(document).ready((event) => {
  ReactDOM.render(<Binder/>, document.getElementById('react-root'));
})

console.log("Done");
