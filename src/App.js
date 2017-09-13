import React, { Component } from 'react';
import './App.css';
import Point from './Point/Point';

class App extends Component {

 createField(){
   let points = [];
   for(let i = 0; i < 100; i++)
     points.push(<Point/>);
   return points;
 }

  render() {
    const points = this.createField();
    return (
      <div className="container">
           {points}
      </div>
    );
  }
}

export default App;
