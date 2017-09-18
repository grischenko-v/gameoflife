import React, { Component } from 'react';
import './App.css';
import Point from './Point/Point';
import ElementGrid from './ElementGrid';

class App extends Component {
   constructor(props) {
    super(props);   
    this.frameId ="";
    this.frameCount = 0;    
    this.size = 10;
    this.fps = 30;
    this.grid = new ElementGrid(this.size);
    this.grid.init();   
    this.state = {     
      aliveMas: this.grid.hash
    };  
    this.setColor = this.setColor.bind(this);
  };

 componentDidMount(){
    this.start();
 };

 componentWillUnmount() {
    this.stop();
 };

 setColor(){      
    if(this.frameCount < this.fps){
      this.frameCount++;
    }else{
      this.frameCount = 0;

       this.grid.addTransform();
       
     // if(this.allDie(this.state.aliveMas))    stop();   
      this.setState({
        aliveMas: this.grid.hash
      });
    }   
    this.frameId = window.requestAnimationFrame( this.setColor )
   };

 start(){
   if( !this.frameId ) {
     this.frameId = 
     window.requestAnimationFrame( this.setColor );
   }
 }

 stop(){
     window.cancelAnimationFrame( this.state.frameId );
 }

 indexToPosition(index){
   let yFind = parseInt(index / 10);
   let xFind = index - yFind * 10;
     return {X: xFind, Y: yFind};
 }

 createField(){   
   let points = [];
   let pointIndex = "";
   let temp; //think about del it  
   for(let i = 0; i < Math.pow(this.size, 2); i++){
     temp = this.indexToPosition(i);     
     pointIndex = temp.X + "" + temp.Y;    
     points.push(<Point alive = {this.state.aliveMas[pointIndex].value} key = {i}/>);
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
