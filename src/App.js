import React, { Component } from 'react';
import './App.css';
import Point from './Point/Point';
import ElementGrid from './ElementGrid';

class App extends Component {
   constructor(props) {
    super(props);  
    this.frameCount = 0;    
    this.size = 10;
    this.fps = 120;
    this.grid = new ElementGrid(this.size);
    this.grid.init();   
    this.state = {     
      aliveMas: this.grid.hash,
      frameId: ""
    };  
    this.setColor = this.setColor.bind(this);
  };

 componentDidMount(){
    this.start();
 };

 setColor(){  
  let isAlive;    
  if(this.frameCount < this.fps){
    this.frameCount++;
  }else{
    this.frameCount = 0;
    isAlive = this.grid.addTransform();
    isAlive &= this.grid.allDie();    
    if(isAlive) this.stop();
    else this.setState({
            aliveMas: this.grid.hash
         });
  }   
    this.frameId = window.requestAnimationFrame( this.setColor )
  };

 start(){
   if( !this.frameId ) {
     this.state.frameId = window.requestAnimationFrame( this.setColor );
   }
 }

 stop(){
     window.cancelAnimationFrame( this.state.frameId );
 }

 createField(){   
   let points = [];  
   let temp;  
   for(let i = 0; i < Math.pow(this.size, 2); i++){
     temp = ElementGrid.indexToPosition(i);    
     points.push(<Point alive = {this.state.aliveMas[temp.index].value} key = {i}/>);
   }  
   return points;
 };

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
