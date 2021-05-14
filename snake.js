const board = document.getElementById("snake-board");
let inputDirection = {x:1 , y:0}; //initial move of snake  is right
let lastInputDirection = {x:0 , y:0};
snake ='';





class Config{
    constructor(){
        this.snake = snake;
        this.inputDirection = inputDirection;
        this.lastInputDirection = lastInputDirection;
        this.fullSnake =[
            {x: 1, y: 15},
            {x: 0 , y: 15},
            {x: -1, y: 15}
        ];
        
    }
   
    
}
class Snake extends Config{
    movements(rame){
            switch(rame.key){
                case 'ArrowLeft':
                    if ( lastInputDirection.x !== 0 )break;
                    inputDirection = {x:-1 , y:0};
                    break;
                case 'ArrowUp':
                    if(lastInputDirection.y !== 0) break;
                    inputDirection = {x:0 , y:-1};
                    break;
                case 'ArrowRight':
                    if(lastInputDirection.x !== 0) break;
                    inputDirection = {x:1 , y:0};
                    break;
                case 'ArrowDown':
                    if(lastInputDirection.y !== 0) break;
                    inputDirection = {x:0 , y:1};
                    break;
            }
             //console.log('arvici');     
    }
    
    getDirection(){
        lastInputDirection = inputDirection;
        return inputDirection;
    }

    //let's move snake
    updateSnake(){
        inputDirection = this.getDirection();
        for(let i = this.fullSnake.length -2  ; i>=0 ; i--){
            this.fullSnake[i+1] = {...this.fullSnake[i]};
       // console.log({...this.fullSnake[i]});
        }
        this.fullSnake[0].x += inputDirection.x;
        this.fullSnake[0].y +=inputDirection.y;
        
    
    }

    //let's draw snake
    drawSnake(board){
            this.fullSnake.forEach((segment) =>{
                this.snake = document.createElement('div');   
                this.snake.style.gridRowStart =segment.y;
                this.snake.style.gridColumnStart = segment.x;
                this.snake.classList.add('snake');
                board.appendChild(this.snake);
    
        });  
    }

    //slide snake on another side when touching board wall
    onTheWalls(){
        for (let k =0 ; k < this.fullSnake.length; k++){
            if (this.fullSnake[k].x === 30 && inputDirection.x === 1)
                this.fullSnake[k].x = 0;
            else if (this.fullSnake[k].x === 0 && inputDirection.x === -1)
                this.fullSnake[k].x = 30;
            else if (this.fullSnake[k].y === 0 && inputDirection.y === -1)
                this.fullSnake[k].y = 30;
            else if (this.fullSnake[k].y === 30 && inputDirection.y === 1)
                this.fullSnake[k].y = 0;  
        }          
    }           
}

class Food extends Snake{
    //getting random coordinantes of apple
    randomApple(){
        return {
            x : Math.floor(Math.random()* 30) + 1 ,
            y : Math.floor(Math.random()* 30) + 1 
        }
    }

    food=this.randomApple();

    //drawing apple
    drawFood(){
        this.apple = document.createElement('div'); 
        this.apple.style.gridRowStart = this.food.y;
        this.apple.style.gridColumnStart = this.food.x;
        this.apple.classList.add('food');
        board.appendChild(this.apple);
    }  
}




class Draw extends Food{
    // // let's show evrything how works in every 0.5second
    draw(){
        window.addEventListener("keydown",(e) => this.movements(e));
        this.updateSnake();
        board.innerHTML ='';
        this.drawSnake(board);
        this.onTheWalls();
        this.drawFood();
    }
}
let moveSnake = new Draw();
setInterval(()=>{moveSnake.draw()},500);
