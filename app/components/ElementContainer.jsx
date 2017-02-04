import React from 'react';

export default class ElementContainer extends React.Component {
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
  spliceObject(obj) {
    obj = Object.keys(obj);
    console.debug(obj);
    let iterator = 0;
    for (let aspect of obj) {
      console.debug(aspect);
      if (aspect.length >= 1)
      obj.splice(iterator, 1);
      iterator++;
    };
    console.debug(obj);
    return obj;
  }
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
  }
  listTopics(propRefs) {
    let self = this;
    let delimiter = (letter) => {
      if (Array.isArray(eval('self.props.topic.' + letter + '.text'))) {
        return <ul>{self.cascadeData('text', letter, 'no', 'no')}</ul>;
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
  listEvidence(propRefs) {
    let output = [];
    for (let prop = 0; prop < propRefs.length; prop++) {
      output.push(<h4 key=''>{propRefs[prop] + ". Evidence"}</h4>);
      output.push(<ul>{this.cascadeData('evidence', propRefs[prop], 'no', 'no')}</ul>);
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
      this.props.propagateSig('scroll');
    };
  }
  expandCard() {
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
}
