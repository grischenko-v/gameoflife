import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    return (
      <div className ={`button ${ this.props.value === "Start" ? "green" : "" }`}    onClick={this.props.start}>
      {this.props.value}       
      </div>
    );
  }
}

export default Button;