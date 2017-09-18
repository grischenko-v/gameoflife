class ElementGrid{
  constructor(aSize){
    let hash = {}; 
    let size = aSize;     
  }  
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
 }

 indexToPosition(index){
   let yFind = parseInt(index / 10);
   let xFind = index - yFind * 10;
     return {X: xFind, Y: yFind};
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

}

export default ElementGrid;