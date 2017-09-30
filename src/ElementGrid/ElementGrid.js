import React, { Component } from 'react';
import './ElementGrid.css';
import Element from '../Element/Element';
import Button from '../Button/Button';

class ElementGrid extends Component {
  
  constructor(props){
    super(props);
    this.frameCount = 0;
    this.hash = {}; 
    this.hashMas = {};
    this.hashId = 0;
    this.randInit();
    this.state = {     
      aliveMas: this.hash,
      frameId: "",
      dataSeted: false,
      isDie: false
    };    

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.setColor = this.setColor.bind(this); 
  }

  componentDidMount() {
    this.start();    
  }

  componentWillUnmount() {
   
  }

  start(){
   if( !this.state.frameId ) {
    this.setState({
            frameId: window.requestAnimationFrame( this.setColor ),
            isDie: false
         });     
     }
  };

 getIsDie(){
   return this.state.isDie;  
 }


 stop(){
     window.cancelAnimationFrame( this.state.frameId );
 };

  setColor(){  
  let isAlive;    
  if(this.frameCount < this.props.fps){
    this.frameCount++;
  }else{
    this.frameCount = 0;
    isAlive = this.addTransform();
    isAlive &= this.allDie();    
    if(isAlive){ 
        this.stop();
        this.setState({
            isDie: true
        });
    }
    else 
    this.setState({
            aliveMas: this.hash
                       
        });
  }
     this.setState({          
            frameId: window.requestAnimationFrame( this.setColor )
        }); 
  };

   addTransform(){
     let temp;
     let aliveCount = 0;

     let newHash = this.cloneObject(this.hash);
     for(let i = 0; i < Math.pow(this.props.size, 2); i++){  
      temp = ElementGrid.indexToPosition(i);
      if(this.getNextX(temp.X, temp.Y))aliveCount++;
      if(this.getPrevX(temp.X, temp.Y))aliveCount++;
      if(this.getNextY(temp.X, temp.Y))aliveCount++;
      if(this.getPrevY(temp.X, temp.Y))aliveCount++;
      if(this.getNextXNextY(temp.X, temp.Y))aliveCount++;
      if(this.getNextXPrevY(temp.X, temp.Y))aliveCount++;
      if(this.getPrevXNextY(temp.X, temp.Y))aliveCount++;
      if(this.getPrevXPrevY(temp.X, temp.Y))aliveCount++;      
      //check should component be alive;
    
      if(aliveCount === 3 && !this.hash[temp.index].props.value) 
         newHash[temp.index] = <Element value = {true}  posX = {temp.X} posY = {temp.Y} key = {i}/>;
      if((aliveCount === 3 || aliveCount === 2) &&  this.hash[temp.index].props.value) 
        newHash[temp.index] = <Element value = {true}  posX = {temp.X} posY = {temp.Y} key = {i}/>;
      if((aliveCount > 3 || aliveCount < 2) &&  this.hash[temp.index].props.value) 
         newHash[temp.index] = <Element value = {false}  posX = {temp.X} posY = {temp.Y} key = {i}/>;
      aliveCount = 0;
    }      
    this.hash = this.cloneObject(newHash);
    if(this.hashMas[this.toStringHashId()] === undefined){
      this.hashMas[this.toStringHashId()] = this.hash;

      return false;//not die
    } 
    return true;//die   
  }; 

  init(){    
    let temp;
    for(let i = 0; i < Math.pow(this.props.size, 2); i++){   
      temp = this.indexToPosition(i);      
      this.hash[temp.index] =  <Element value = {false}  posX = {temp.X} posY = {temp.Y} key = {i}/>;      
    }     
    this.hashMas[this.toStringHashId()] = this.hash;
  }; 
  randInit(){    
    let temp;
    for(let i = 0; i < Math.pow(this.props.size, 2); i++){   
      temp = this.indexToPosition(i);      
      this.hash[temp.index] = <Element value = {(Math.random() >= 0.5)}  posX = {temp.X} posY = {temp.Y} key = {i}/>;      
    }    
    this.hashMas[this.toStringHashId()] = this.hash;
  }; 
  indexToPosition(index){
    let yFind = parseInt(index / 10);
    let xFind = index - yFind * 10;
    return {X: xFind, Y: yFind, index: xFind + "" + yFind};
  };

 toStringHashId(){
    let temp;
    let rtStr = "";
    for(let i = 0; i < Math.pow(this.props.size,2); i++){
      temp = ElementGrid.indexToPosition(i);     
      rtStr += (+this.hash[temp.index].props.value) + "";   
    }
    return rtStr;
  };

   allDie(){ 
    let temp;
    for(let i = 0; i < Math.pow(this.size, 2); i++){  
      temp = ElementGrid.indexToPosition(i);     
      if(this.hash[temp.index].value) return false;
    }
    return true;
  };
 
  static indexToPosition(index){
    let yFind = parseInt(index / 10);
    let xFind = index - yFind * 10;
    return {X: xFind, Y: yFind, index: xFind + "" + yFind};
  };

  findElement(posX, posY){
    return this.hash[posX + "" + posY].props.value;
  };
 
  getNextX(posX, posY){  
    let nextX = (posX === 9) ? 0 : posX + 1;
    return this.hash[nextX + "" + posY].props.value;
  };
 
  getPrevX(posX, posY){
    let prevX = (posX === 0) ? 9 : posX - 1;
    return this.hash[prevX + "" + posY].props.value;
  };

  getNextY(posX, posY){
    let nextY = (posY === 9) ? 0 : posY + 1;
    return this.hash[posX + "" + nextY].props.value;
  };
 
  getPrevY(posX, posY){
    let prevY = (posY === 0) ? 9 : posY - 1;
    return this.hash[posX + "" + prevY].props.value;
  };
 
  getNextXNextY(posX, posY){
    let nextX = (posX === 9) ? 0 : posX + 1; 
    let nextY = (posY === 9) ? 0 : posY + 1; 
    return this.hash[nextX + "" + nextY].props.value;
  };

  getNextXPrevY(posX, posY){
    let nextX = (posX === 9) ? 0 : posX + 1;
    let prevY = (posY === 0) ? 9 : posY - 1;
    return this.hash[nextX + "" + prevY].props.value;
  };
 
  getPrevXNextY(posX, posY){
    let prevX = (posX === 0) ? 9 : posX - 1;
    let nextY = (posY === 9) ? 0 : posY + 1;
    return this.hash[prevX + "" + nextY].props.value;
  };

  getPrevXPrevY(posX, posY){
    let prevX = (posX === 0) ? 9 : posX - 1;
    let prevY = (posY === 0) ? 9 : posY - 1;
    return this.hash[prevX + "" + prevY].props.value;
  };

  cloneObject(obj) {
    let clone = {};
    for(let i in obj) {
       clone[i] = React.cloneElement(obj[i]);  
    }     
    return clone;
  };

  createFields(){   
   let elements = [];  
   let temp;  
   for(let i = 0; i < Math.pow(this.props.size, 2); i++){
     temp = this.indexToPosition(i);    
     elements.push(this.state.aliveMas[temp.index]);
   }  

   return elements;
 };

  render() {
    const elements = this.createFields();
    return (
      <div>
      <div className= "container">
         {elements}
       </div>
       <div className = "buttonContainer">
           <Button value = "Randomize" start={this.state.isDie ? this.gridRandomize : ""} enable = {this.state.isDie}/>
       </div> 
       </div>       
    );
  }
}

export default ElementGrid;