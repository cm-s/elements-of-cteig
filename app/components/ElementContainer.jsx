import React from 'react';
import { autobind } from 'core-decorators';

@autobind
class ElementContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }
  /*
   * spliceObject
   *
   * Seperates topic object properties into a filtered list, to later be
   * traversed for expected data constructs. (lists, sentances, lists of lists)
   *
   * @param obj; The object that will be subject to filtration.
   */
  spliceObject(obj) {
    obj = Object.keys(obj);
    let iter = 0;
    while (iter != obj.length) {
      if (obj[iter].length > 1) {
        obj.splice(iter, 1);
        iter--;
      }
      iter++;
    };
    return obj;
  }
  /*
   * cascadeData
   *
   * Primary algorithm that processes the individual data from each specified
   * property of a given object (subject).
   * This algoritm generates html elements, being either lists or list items, that
   * contain the content of a given aspect, topic, or subtopic (most specifically signified
   * by the 'letter' parameter) of the given object.
   * Note: Though this algoritm is recursive, it only recurses as a part of it's own
   * operation. As implied; Only calls itself within it's own scope.
   *
   * @param subject; The base object to be operated upon.
   * @param letter; Literally the letter, naming the property of the subject to be traversed.
   * @param propNumber; Parameter used exclusively for conditions of recursion. Names the property
   * number to be scanned next
   * @param secondProp; Used nearly synonymously with propNumber. The key difference being that
   * this param represents a deeper level of nesting.
   */
  cascadeData(subject, letter, propNumber, secondProp) {
    let output = [];
    if (propNumber == 'no' && secondProp == 'no') { // First level
      for
      (let prop = 0; prop < eval('this.props.topic.' + letter + '.' + subject + '.length'); prop++)
      {
        if (Array.isArray(eval('this.props.topic.' + letter + '.' + subject + '[' + prop + ']'))) {
          output.push(<ul>{this.cascadeData(subject, letter, prop, 'no')}</ul>);
        } else {
          output.push(
            <li key={new Date().getTime() + Math.random(0, 100)}>
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
            <li key={new Date().getTime() + Math.random(0, 100)}>
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
          <li key={new Date().getTime() + Math.random(0, 100)}>
            {eval('this.props.topic.' + letter + '.' + subject + '[' + propNumber + '][' + secondProp + '][' + prop + ']')}
          </li>
        );
      };
    };
    return output;
  }
  /*
   * listTopics
   *
   * Generates generic wrapper and scaffolding elements for the topic assigned to this component
   * and prompts the generation (calls 'cascadeData') of element data based on the specified
   * references (propRefs).
   *
   * @param propRefs; An array of letters to be used as the source of input data for functions of
   * this and other methods within the class.
   */
  listTopics(propRefs) {
    let self = this;
    let delimiter = (letter) => {
      if (Array.isArray(eval('self.props.topic.' + letter + '.text'))) {
        return <ul key={new Date().getTime() + Math.random(0, 3)}> // Needs a unique key
          {self.cascadeData('text', letter, 'no', 'no')}
        </ul>;
      } else {
        return eval('self.props.topic.' + letter + '.text');
      };
    };
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
  }
  /*
   * listEvidence
   *
   * Generates a header and <ul> containing respective data from the object assigned to this component.
   * Like above, one of this method's primary purposes is to populate an unordered list with data from
   * the object assigned to the parent component. In other words, calls the 'cascadeData' method with
   * the 'evidence' aspects targeted.
   *
   * @param propRefs; An array of letters to be used as the source of input data for functions of
   * this and other methods within the class.
   */
  listEvidence(propRefs) {
    let output = [];
    for (let prop = 0; prop < propRefs.length; prop++) {
      output.push(<h4 key={eval('this.props.topic.' + propRefs[prop] + '.key1')}>{propRefs[prop] + ". Evidence"}</h4>);
      output.push(<ul key={eval('this.props.topic.' + propRefs[prop] + '.key2')}>{this.cascadeData('evidence', propRefs[prop], 'no', 'no')}</ul>);
    };
    return output;
  }
  componentDidUpdate() {
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
  }
  retractCard() {
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
      this.props.propagateSig('scroll', this.props.that);
    };
  }
  expandCard() { // Always called by this element
    if (this.state.currentState == 'inactive') {
      this.props.dislodgeAll(this.props.that);
      this.setState({
        currentState: 'active',
        left: '40%',
        margin: 0,
        height: '96%',
        width: '56vw',
        boxShadow: 'inset 5px 0 5px rgba(0,0,0,0.3)',
        display: 'block'
      });
      this.props.propagateSig('noscroll', this.props.that);
    };
  }
  permitHover() {
    if (this.state.currentState != 'active') {
      this.setState({
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 12px -3px rgba(0,0,0,0.16)'
      });
    };
  }
  negateHover() {
    if (this.state.currentState != 'active') {
      this.setState({
        transform: 'none',
        boxShadow: '0 3px 6px 1px rgba(0,0,0,0.19)'
      });
    };
  }
  fadeOut() {
    this.setState({ opacity: 0 });
    setTimeout(function () {
      this.setState({ display: 'none' });
    }.bind(this), 300);
  }
  fadeIn() {
    this.setState({ opacity: 1 });
    setTimeout(function () {
      this.setState({ display: 'flex' });
    }.bind(this), 300);
  }
  render() {
    return (
      <div className="element-wrapper"
        style={{
          marginTop: this.props.offset + 'px',
          display: this.state.display
        }}>
        <div className={'element-card ' + this.state.currentState}
          onClick={this.expandCard.bind(this)}
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
            onClick={this.retractCard.bind(this)}>Close</button>
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
}

export default ElementContainer;
