//total table is 20 row*20 colum, each cell has a unique number, start from 0 up to 399, cell size is 20px*20px

let snake = [0],       //snake array 
direction = 1,          //1->right，-1->left，20->down，-20->up
food = 43,              //initial food location
n,                      //next head location
map = document.getElementById('map').getContext('2d'), //create map canvas as the playground
totalCount = 0, //count the total scores
timer=0; //count settimeout called times

//use canvas to draw the cells for food or new snake header
function draw(n,color){
    map.fillStyle = color;
    let x_loc = n%20*20+1;
    let y_loc = Math.floor(n/20)*20+1;
    map.fillRect(x_loc,y_loc,18,18);
}

document.onkeydown = (evt)=>{
    //check if input is really the arrow keys and check if the direction is allowed
    if((evt.keyCode - 37)>=0&&evt.keyCode - 37<4){
        n = [-1, -20, 1, 20][evt.keyCode - 37];
        if(direction!=(-1)*n){
            direction=n;
            clearTimeout(timer); //since I'm using the settimeout for the auto moving, clear the timeout when player changed the direction
            snakeMove();
        }
    }
}

draw(food, "brown");

function snakeMove(){
     n = snake[0]+direction;
     snake.unshift(n);
     if(snake.length==400){
         return alert("Congradulations! You won!")
     }
    if(snake.indexOf(n, 1) > 0 || n < 0 || n > 399 || direction == 1 && n % 20 == 0 || direction == -1 && n % 20 == 19){
        
        return alert("Game Over! Your score is " +totalCount);
    }else{
        draw(n,"lime");
        if(n==food){
            //if snake ate food, then re-create another food
            food = Math.floor(Math.random() * 400);
            while (snake.indexOf(food ) >= 0){
                food =Math.floor(Math.random() * 400);
            };
            totalCount++;
            draw(food,'brown');
        }else{
            //remove the tail of the snake
            draw(snake.pop(),'darkcyan');
        }
    }
    timer =  setTimeout(arguments.callee, 150);   
}

function startMove(){
    if(!timer){
        snakeMove();
    }
}
function replayGame(){
    totalCount=0;
    clearTimeout(timer); 
    timer =0;
    while(snake.length>0){
        draw(snake.pop(),'darkcyan');
    }
    snake = [0];      
    direction = 1;          
    food = 43;
    snakeMove();
}