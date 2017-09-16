import React, { Component } from 'react';
import './App.css';
import Point from './Point/Point';

class App extends Component {

   constructor(props) {
    super(props);   
    this.frameId ="";
    this.frameCount = 0;    
    this.size = 10;
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
     // if(this.allDie(this.state.aliveMas))    stop();   
      this.setState({
          aliveMas: this.addTransform(this.state.aliveMas)
      });
    }   
    this.frameId = window.requestAnimationFrame( this.setColor )
   };

 addTransform(mass){
   let alivePtCount = 0;
   let newMass = mass;
  
   for(let i = 0; i < mass.length; i++){
      if(mass[i-1] != undefined && mass[i-1])
          alivePtCount++;
      if(mass[i+1] != undefined && mass[i+1])
          alivePtCount++;
      if(mass[i-10] != undefined && mass[i-10])
          alivePtCount++;
      if(mass[i+10] != undefined && mass[i+10])
          alivePtCount++;
      if(mass[i-9] != undefined && mass[i-9])
          alivePtCount++;
      if(mass[i+9] != undefined && mass[i+9])
          alivePtCount++;
      if(mass[i-11] != undefined && mass[i-11])
          alivePtCount++;
      if(mass[i+11] != undefined && mass[i+11])
          alivePtCount++;     
  
      if(alivePtCount == 3) newMass[i] = true;
      else if(alivePtCount == 3 || alivePtCount == 2)
           newMass[i] = newMass[i]
      else if(alivePtCount > 3 || alivePtCount < 2)
            newMass[i] = false;
      alivePtCount = 0;
    }

    return newMass;  
 };

 
 allDie(mass){
   let count = 0
       for(let i = 0; i < mass.length; i++){
    if(mass[i]) count++;
   
 } 
 return (count == 0)
}

 initAlive(){
  let mass = [];
  let m = 43;
  for(let i = 0; i < Math.pow(this.size, 2); i++){
    mass.push( Math.random() >= 0.5);
   /*if(i === m || i === m + 10 || i === m - 10
      || i === m + 9 || i === m - 9
      || i === m + 11 || i === m - 11
      || i === m + 1  || i === m - 1
      ) mass.push( true);
    else mass.push( false);*/
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
   for(let i = 0; i < Math.pow(this.size, 2); i++)
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
