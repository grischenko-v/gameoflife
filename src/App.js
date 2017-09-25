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
      manual: false
    };  

    this.gridRandomize = this.gridRandomize.bind(this); 

  };

  gridRandomize(){
    this.child.randInit();
    this.child.start();
  };
  

 render() { 
   return (   
      <div>        
          <ElementGrid onRef={ref => (this.child = ref)} size = {this.size} fps = {this.fps}/>     
          <div className = "buttonContainer">
            <Button value = "Randomize" start={this.gridRandomize}/>
          </div>     
      </div>
    );
  }
}

export default App;
