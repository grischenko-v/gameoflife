import Element from './Element';
class ElementGrid{

  constructor(aSize){
    this.hash = {}; 
    this.size = aSize;     
    this.hashMas = [];
  }; 

  init(val){  
    let xPos = 0;
    let yPos = 0; 
    let temp;
    for(let i = 0; i < Math.pow(this.size, 2); i++){  
      temp = this.indexToPosition(i);
      xPos = temp.X;
      yPos = temp.Y;
      this.hash[xPos + "" + yPos] = new Element(val, xPos, yPos);      
    }     
  };

  addTransform(){
  	 let temp;
  	 let aliveCount = 0;
  	 let newHash = this.cloneObject(this.hash);
  	 for(let i = 0; i < Math.pow(this.size, 2); i++){  
      temp = this.indexToPosition(i);
      if(this.getNextX(temp.X, temp.Y))aliveCount++;
      if(this.getPrevX(temp.X, temp.Y))aliveCount++;
      if(this.getNextY(temp.X, temp.Y))aliveCount++;
      if(this.getPrevY(temp.X, temp.Y))aliveCount++;
      if(this.getNextXNextY(temp.X, temp.Y))aliveCount++;
      if(this.getNextXPrevY(temp.X, temp.Y))aliveCount++;
      if(this.getPrevXNextY(temp.X, temp.Y))aliveCount++;
      if(this.getPrevXPrevY(temp.X, temp.Y))aliveCount++;
      
      //check should component be alive;
      
     
      aliveCount = 0;
    }   
  };

  allDie(){
  };
 
  indexToPosition(index){
    let yFind = parseInt(index / 10);
    let xFind = index - yFind * 10;
    return {X: xFind, Y: yFind};
  };

  findElement(posX, posY){
    return this.hash[posX + "" + posY].value;
  };
 
  getNextX(posX, posY){  
    let nextX = (posX === 9) ? 0 : posX + 1;
    return this.hash[nextX + " " + posY].value;
  };
 
  getPrevX(posX, posY){
    let prevX = (posX === 0) ? 9 : posX - 1;
    return this.hash[prevX + " " + posY].value;
  };

  getNextY(posX, posY){
    let nextY = (posY === 9) ? 0 : posY + 1;
    return this.hash[posX + " " + nextY].value;
  };
 
  getPrevY(posX, posY){
    let prevY = (posY === 0) ? 9 : posY - 1;
    return this.hash[posX + " " + prevY].value;
  };
 
  getNextXNextY(posX, posY){
    let nextX = (posX === 9) ? 0 : posX + 1; 
    let nextY = (posY === 9) ? 0 : posY + 1; 
    return this.hash[nextX + " " + nextY].value;
  };

  getNextXPrevY(posX, posY){
    let nextX = (posX === 9) ? 0 : posX + 1;
    let prevY = (posY === 0) ? 9 : posY - 1;
    return this.hash[nextX + " " + prevY].value;
  };
 
  getPrevXNextY(posX, posY){
    let prevX = (posX === 0) ? 9 : posX - 1;
    let nextY = (posY === 9) ? 0 : posY + 1;
    return this.hash[prevX + " " + nextY].value;
  };

  getPrevXPrevY(posX, posY){
    let prevX = (posX === 0) ? 9 : posX - 1;
    let prevY = (posY === 0) ? 9 : posY - 1;
    return this.hash[prevX + " " + prevY].value;
  };

  cloneObject(obj) {
    let clone = {};
    for(let i in obj) {
        if(typeof(obj[i]) === "object" && obj[i] != null)
            clone[i] = this.cloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
  };
}

export default ElementGrid;