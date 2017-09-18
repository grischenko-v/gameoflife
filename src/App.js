import React, { Component } from 'react';
import './App.css';
import Point from './Point/Point';


class Element {
 constructor(value, posX, posY){
    this.value = value;
    this.posX = posX;
    this.posY = posY;   
 }

}


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

    if(i > 10 && i < 89 &&
      i != 20 && i != 30 && i != 40 && i != 50 && i != 60 && i != 70 && i != 80 &&  
      i != 19 && i != 29 && i != 39 && i != 49 && i != 59 && i != 69 && i != 79 
      ){
  
      if(mass[i - 1])  alivePtCount++;  
      if(mass[i + 1])  alivePtCount++;     
      if(mass[i - 10]) alivePtCount++;   
      if(mass[i + 10]) alivePtCount++;    
      if(mass[i - 9])  alivePtCount++;
      if(mass[i + 9])  alivePtCount++;
      if(mass[i - 11]) alivePtCount++;
      if(mass[i + 11]) alivePtCount++;     
      
     
    if(alivePtCount == 3 && !mass[i]) newMass[i] = true;
    if((alivePtCount == 3 || alivePtCount == 2) && mass[i])
      newMass[i] =  true;
    if((alivePtCount > 3 || alivePtCount < 2) && mass[i])
       newMass[i] = false;
     alivePtCount = 0;   }
   
    else if(i >= 0 && i < 10){
      if(mass[i - 1]  )  alivePtCount++;  
      if(mass[i + 1])  alivePtCount++;     
      if(mass[i - 10]) alivePtCount++;   
      if(mass[i + 10]) alivePtCount++;    
      if(mass[i - 9])  alivePtCount++;
      if(mass[i + 9])  alivePtCount++;
      if(mass[i - 11]) alivePtCount++;
      if(mass[i + 11]) alivePtCount++;  
    }

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
  let elmMass = {};  
  let xPos = 0;
  let yPos = 0; 
  let temp;//think about del it
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
 
 checkHash(posX, posY){
   let hashX, hashY;
  

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
