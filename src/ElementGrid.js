import Element from './Element';
class ElementGrid{

  constructor(aSize){
    this.hash = {}; 
    this.size = aSize;     
    this.hashMas = [];
  }; 

  init(){  
    let xPos = 0;
    let yPos = 0; 
    let temp;
    for(let i = 0; i < Math.pow(this.size, 2); i++){  
      temp = this.indexToPosition(i);
      xPos = temp.X;
      yPos = temp.Y;
      this.hash[xPos + "" + yPos] = new Element(false, xPos, yPos);      
    }     
  };

  addTransform(){
  	 let temp;
  	 let aliveCount;
  	 let newHash = this.cloneObject(this.hash);
  	 for(let i = 0; i < Math.pow(this.size, 2); i++){  
      temp = this.indexToPosition(i);
      if(this.getNextX())aliveCount++;
      if(this.getPrevX())aliveCount++;
      if(this.getNextY())aliveCount++;
      if(this.getPrevY())aliveCount++;
      if(this.getNextXNextY())aliveCount++;
      if(this.getNextXPrevY())aliveCount++;
      if(this.getPrevXNextY())aliveCount++;
      if(this.getPrevXPrevY())aliveCount++;
      
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
    return this.hash[posX + "" + posY];
  };
 
  getNextX(posX, posY){  
    let nextX = (posX === 9) ? 0 : posX + 1;
    return this.hash[nextX + " " + posY];
  };
 
  getPrevX(posX, posY){
    let prevX = (posX === 0) ? 9 : posX - 1;
    return this.hash[prevX + " " + posY];
  };

  getNextY(posX, posY){
    let nextY = (posY === 9) ? 0 : posY + 1;
    return this.hash[posX + " " + nextY];
  };
 
  getPrevY(posX, posY){
    let prevY = (posY === 0) ? 9 : posY - 1;
    return this.hash[posX + " " + prevY];
  };
 
  getNextXNextY(posX, posY){
    let nextX = (posX === 9) ? 0 : posX + 1; 
    let nextY = (posY === 9) ? 0 : posY + 1; 
    return this.hash[nextX + " " + nextY];
  };

  getNextXPrevY(posX, posY){
    let nextX = (posX === 9) ? 0 : posX + 1;
    let prevY = (posY === 0) ? 9 : posY - 1;
    return this.hash[nextX + " " + prevY];
  };
 
  getPrevXNextY(posX, posY){
    let prevX = (posX === 0) ? 9 : posX - 1;
    let nextY = (posY === 9) ? 0 : posY + 1;
    return this.hash[prevX + " " + nextY];
  };

  getPrevXPrevY(posX, posY){
    let prevX = (posX === 0) ? 9 : posX - 1;
    let prevY = (posY === 0) ? 9 : posY - 1;
    return this.hash[prevX + " " + prevY];
  };

  cloneObject(obj) {
    let clone = {};
    for(let i in obj) {
        if(typeof(obj[i])=="object" && obj[i] != null)
            clone[i] = this.cloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
  };
}

export default ElementGrid;