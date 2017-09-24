import React, { Component } from 'react';
import './App.css';
import Button from './Button/Button';

import ElementGrid from './ElementGrid/ElementGrid';

class App extends Component {
   constructor(props) {
    super(props);  
     
    this.size = 10;
    this.fps = 120;   
    this.state = {    

      dataSeted: false
    };  
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
