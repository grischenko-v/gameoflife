import React, { Component } from 'react';
import './Button.css';

class Button extends Component {

  render() {
  	let styles = "";
  	let green = this.props.enable ? " green" : "";
  	styles = "button" + green;
    return (
      <div className = {styles} onClick={this.props.start}>
      {this.props.value}       
      </div>
    );
  }
}

export default Button;