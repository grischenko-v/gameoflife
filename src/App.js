import React, { Component } from 'react';
import './App.css';
import Point from './Point/Point';

class App extends Component {

   constructor(props) {
    super(props);   
    this.frameId ="";
    this.frameCount = 0;
    this.boolColor = true;
    this.fps = 60;
    this.state = {     
      color: "red",
      request: 0
    };  
   this.setColor = this.setColor.bind(this);
  };
 createField(){   
   let points = [];
   for(let i = 0; i < 100; i++)
     points.push(<Point color = {this.state.color}/>);
   return points;
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
      this.boolColor = !this.boolColor;
      this.setState({
          color: this.boolColor ?  "" : "red"
      });
    }
      this.state.frameId = 
      window.requestAnimationFrame( this.setColor )
   };
 
 start(){
   if( !this.state.frameId ) {
     this.state.frameId = 
     window.requestAnimationFrame( this.setColor );
   }
 }

 stop(){
     window.cancelAnimationFrame( this.state.frameId );
 }

 render() {
   const points = this.createField();
   return (
      <div className="container">
       <Point color = {this.state.color}/>
      </div>
    );
  }
}

export default App;
