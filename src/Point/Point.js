import React, { Component } from 'react';
import './Point.css';

class Point extends Component {
  render() {
    return (
      <div className={`point ${ this.props.alive ? "red" : "" }`}>       
      </div>
    );
  }
}

export default Point;