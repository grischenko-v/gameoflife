import React, { Component } from 'react';
import './App.css';
import Point from './Point/Point';
import Element from './Element';
import ElementGrid from './ElementGrid';

class App extends Component {
   constructor(props) {
    super(props);   
    this.frameId ="";
    this.frameCount = 0;    
    this.size = 10;
    this.fps = 35;
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
        //aliveMas: this.addTransform(this.state.aliveMas)
      });
    }   
    this.frameId = window.requestAnimationFrame( this.setColor )
   };

 addTransform(mass){
   let alivePtCount = 0;
   let newMass = mass;
  
   for(let i = 0; i < 100; i++){  
      if(mass[i - 1])  alivePtCount++;  
      if(mass[i + 1])  alivePtCount++;     
      if(mass[i - 10]) alivePtCount++;   
      if(mass[i + 10]) alivePtCount++;    
      if(mass[i - 9])  alivePtCount++;
      if(mass[i + 9])  alivePtCount++;
      if(mass[i - 11]) alivePtCount++;
      if(mass[i + 11]) alivePtCount++;     
      
     
    if(alivePtCount === 3 && !mass[i]) newMass[i] = true;
    if((alivePtCount === 3 || alivePtCount === 2) && mass[i])
      newMass[i] =  true;
    if((alivePtCount > 3 || alivePtCount < 2) && mass[i])
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
 return (count === 0)
}

 initAlive(){
  let elmMass = {};  
  let xPos = 0;
  let yPos = 0; 
  let temp;
  for(let i = 0; i < Math.pow(this.size, 2); i++){  
      temp = this.indexToPosition(i);
      xPos = temp.X;
      yPos = temp.Y;
     elmMass[xPos + "" + yPos] = new Element(false, xPos, yPos);      
  }  
  return elmMass;
 }

 findElement(obj, posX, posY){
    return obj[posX + "" + posY];
 }
 
 getNextX(obj, posX, posY){  
   let nextX = (posX === 9) ? 0 : posX + 1;
   return obj[nextX + " " + posY];
 }
 
 getPrevX(obj, posX, posY){
   let prevX = (posX === 0) ? 9 : posX - 1;
   return obj[prevX + " " + posY];
 }

 getNextY(obj, posX, posY){
   let nextY = (posY === 9) ? 0 : posY + 1;
   return obj[posX + " " + nextY];
 }
 
 getPrevY(obj, posX, posY){
   let prevY = (posY === 0) ? 9 : posY - 1;
   return obj[posX + " " + prevY];
 }
 
 getNextXNextY(obj, posX, posY){
   let nextX = (posX === 9) ? 0 : posX + 1; 
   let nextY = (posY === 9) ? 0 : posY + 1; 
   return obj[nextX + " " + nextY];
 }

 getNextXPrevY(obj, posX, posY){
   let nextX = (posX === 9) ? 0 : posX + 1;
   let prevY = (posY === 0) ? 9 : posY - 1;
   return obj[nextX + " " + prevY];
 }
 
 getPrevXNextY(obj, posX, posY){
   let prevX = (posX === 0) ? 9 : posX - 1;
   let nextY = (posY === 9) ? 0 : posY + 1;
   return obj[prevX + " " + nextY];
 }

 getPrevXPrevY(obj, posX, posY){
   let prevX = (posX === 0) ? 9 : posX - 1;
   let prevY = (posY === 0) ? 9 : posY - 1;
  return obj[prevX + " " + prevY];
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
