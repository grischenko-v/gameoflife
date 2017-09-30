import React, { Component } from 'react';
import './Button.css';

class Button extends Component {

  render() {
  	let green = this.props.enable ? " green" : "";
  	let styles = "button" + green;
    return (
      <div className = {styles} onClick={this.props.start}>
      {this.props.value}       
      </div>
    );
  }
}

export default Button;