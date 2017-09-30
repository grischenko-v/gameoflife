import React, { Component } from 'react';
import './App.css';
import ElementGrid from './ElementGrid/ElementGrid';

class App extends Component {
   constructor(props) {
    super(props);      
    this.size = 10;
    this.fps = 120;   
  };

 render() { 
   return (      
      <div>        
          <ElementGrid size = {this.size} fps = {this.fps}/>              
      </div>
    );
  }
}

export default App;
