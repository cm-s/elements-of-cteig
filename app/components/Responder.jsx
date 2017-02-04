import React from 'react';
import $ from 'jquery';

export default class Responder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
      top: false,
      left: false,
      type: this.props.type,
      position: 'absolute',
      dimensions: 0
    };
  }
  componentDidMount() {
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
  }
  render() {
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
}
