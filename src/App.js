import React, { Component } from 'react';
import './App.css';
import Point from './Point/Point';

class App extends Component {

   constructor(props) {
    super(props);   
    this.frameId ="";
    this.frameCount = 0;    
    this.fps = 60;
    this.state = {     
      aliveMas: this.initAlive()
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
      this.setState({
          aliveMas: this.addTransform(this.state.aliveMas)
      });
    }   
    this.frameId = window.requestAnimationFrame( this.setColor )
   };

 addTransform(mass){
   return mass.map(function(alive) {            
                  return !alive;
               });  
 };

 initAlive(){
  let mass = [];
  for(let i = 0; i <100; i++){
    mass.push( Math.random() >= 0.5);
  }
  return mass;
 }
 
 start(){
   if( !this.frameId ) {
     this.frameId = 
     window.requestAnimationFrame( this.setColor );
   }
 }

 stop(){
     window.cancelAnimationFrame( this.state.frameId );
 }

 createField(){   
   let points = [];
   for(let i = 0; i < 100; i++)
     points.push(<Point alive = {this.state.aliveMas[i]} key = {i}/>);
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
