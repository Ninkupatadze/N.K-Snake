const board = document.getElementById("snake-board");
let inputDirection = {x:-1 , y:0}; //initial move of snake  is left
let lastInputDirection = {x:0 , y:0};
var snake ='';
//initial snake coordinates
var snakeBody = [
    {x: 15, y: 15},
    {x: 16, y: 15},
    {x: 17, y: 15}
];


class Config{
    constructor(){
        this.snake = snake;
        this.inputDirection = inputDirection;
        this.lastInputDirection = lastInputDirection;
        this.fullSnake = snakeBody;
        
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
                  
    }
    
    getDirection(){
        lastInputDirection = inputDirection;
        return inputDirection;
    }

    //adding one snake div
    addSnakeDiv(){
        snake = document.createElement('div');
        snake.classList.add('snake');
        snake.style.backgroundImage = "url('snake.png')";
        

    }
    //let's draw snake
    drawSnake(board){
        this.fullSnake.forEach((segment) =>{
            this.addSnakeDiv();
            snake.style.gridRowStart =segment.y;
            snake.style.gridColumnStart = segment.x;
            board.appendChild(snake);
            
    });

}

    //let's move snake
    updateSnake(){
        inputDirection = this.getDirection();
        for(let i = this.fullSnake.length - 1 ; i >=1; i--){
            this.fullSnake[i].y = this.fullSnake [i-1].y;
            this.fullSnake[i].x = this.fullSnake [i-1].x;
        }
        this.fullSnake[0].x += inputDirection.x;
        this.fullSnake[0].y +=inputDirection.y;
    }
   
    snakeFail(){
        for(let i = 1 ; i<this.fullSnake.length; i++){
            if(this.fullSnake[0].x == this.fullSnake[i].x && this.fullSnake[0].y == this.fullSnake[i].y)
                window.location.reload();
            
        }   
            
    }

    //slide snake on another side when touching board wall
    onTheWalls(){
        for (let k =0 ; k < this.fullSnake.length; k++){
            if (this.fullSnake[k].x === 31 && inputDirection.x === 1)
                this.fullSnake[k].x = 0;
            else if (this.fullSnake[k].x === 0 && inputDirection.x === -1)
                this.fullSnake[k].x = 30;
            else if (this.fullSnake[k].y === 0 && inputDirection.y === -1)
                this.fullSnake[k].y = 30;
            else if (this.fullSnake[k].y === 31 && inputDirection.y === 1)
                this.fullSnake[k].y = 0;  
        }          
    }           
}


class Food extends Snake{
    //getting random coordinates of apple
    randomApple(){
        return {
            x : Math.floor(Math.random()* 30) + 1 ,
            y : Math.floor(Math.random()* 30) + 1 
        }
    }

    food=this.randomApple();

    //checking if food and snake coordinates are same ,if so we call another randomApple function
    check(){
        if(this.food.x == this.fullSnake.x && this.food.y == this.fullSnake.y)
            return this.food = this.randomApple();
           
    }
    

    //drawing apple
    drawFood(){
        this.check();
        this.apple = document.createElement('div'); 
        this.apple.style.gridRowStart = this.food.y;
        this.apple.style.gridColumnStart = this.food.x;
        this.apple.classList.add('food');
        board.appendChild(this.apple);
        
    }  
  
}


 class EatFood extends Food{
    eatAndGrow(){
        if(this.food.x === this.fullSnake[0].x && this.food.y == this.fullSnake[0].y){
            this.food =this.randomApple();
            this.addSnakeDiv();
            this.fullSnake.push(snake);
        }   
    }
}


class Draw extends EatFood{
    // let's show how evrything works in every 0.5second
    draw(){
        window.addEventListener("keydown",(e) => this.movements(e));
        board.innerHTML ='';
        this.drawSnake(board);  
        this.updateSnake();
        this.snakeFail();
        this.onTheWalls();
        this.eatAndGrow();
        this.drawFood();
    }
}

let moveSnake = new Draw();
setInterval(()=>{moveSnake.draw()},100);
