const board = document.getElementById("snake-board");
const apple = document.getElementById("apple");

let food=randomApple();
function randomApple(){
    return {
        x : Math.floor(Math.random()* 30) + 1 ,
        y :Math.floor(Math.random()* 30) + 1 
    }

}
function drawFood(){
    apple.style.gridRowStart = food.y;
    apple.style.gridColumnStart = food.x;
    apple.classList.add('food');
    console.log(food);
}
drawFood();

