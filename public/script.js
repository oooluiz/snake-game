const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const cell_size = 16
// each pixel has 16 real pixels

const snake = {
  size: 1,
  pos: [
    {x: 0, y: 0}
  ],
  direction: null,
  past_direction: null,
  load_snake: function(){
    ctx.fillStyle = "rgb(0,0,0)"
//    ctx.fillRect(this.pos[0].x*16,this.pos[0].y*16,cell_size,cell_size)
    this.pos.forEach((p)=>{
      ctx.fillRect(p.x*16,p.y*16,cell_size,cell_size)
    }) // iterate over the 'pos' array and draw each pixel
  },

  load: function(){
    
    // TODO:
    // fazer a cobra nao ir pra tras 
    // e nem pra frente se ela ja estiver indo
    // acho q deu pra emtender
    //
    
    //if(this.past_direction == 'w' && this.direction == 's'){alert(this.past_direction)}
    

    let head = {...this.pos[0]}
    switch(this.direction)
    {
      case "w": //up
	head.y--
      break;
      case "s": //down
	head.y++
      break;
      case "a": // left
	head.x--
      break;
      case "d": //right
	head.x++
      break;

      default: 
	this.load_snake()
	break
    }
    this.pos.unshift(head)
    this.pos.pop()
    console.log(this.pos.length)
    this.load_snake()

  },
  score:1
}
/* the snake can walk only 20 pixels up and down
 * since the screen size ÷ 16 is 20 (320/16)
 *
 * THE SNAKE CAN GO FROM 0 TO 19
*/ 
let apple = {
  pos: {
    x: Math.floor(Math.random()*19),
    y: Math.floor(Math.random()*19)
  },
  reset_pos: function(){
    this.pos.y = Math.floor(Math.random()*19)
    this.pos.x = Math.floor(Math.random()*19)
  },
  load: function(){
    ctx.fillStyle = "rgb(0,100,0)"
    ctx.fillRect(this.pos.x*16,this.pos.y*16,16,16)
  }
}


function eat_or_die()
{
  if(snake.score == 2)
  {
    console.dir(`${ snake.pos.slice(1) }`)
    console.dir(`${ snake.pos[0] }`)
  }

  if(apple.pos.y == snake.pos[0].y && apple.pos.x == snake.pos[0].x) // if the snake eat the apple...
  {
    snake.score++
    apple.reset_pos()
    snake.pos.push(apple.pos)
//    snake.pos.push(apple.pos)
  } 
  else if(snake.pos[0].y < 0 || snake.pos[0].y > 19 || snake.pos[0].x < 0 || snake.pos[0].x > 19)
  { // if the snake die
    return true
  } else if(snake.pos.slice(1).some(part=>part.x == snake.pos[0].x && part.y == snake.pos[0].y)){
    return true
    // this piece of code checks if the positon of the head
    // is inside the positions array
    // excluding the head itself, so the snake wont collide with its own head, only the body
  }

  // TODO:
  // PROGRAMAR COLISAO CONSIGO MESMO - FEITO EM 22/11/2025
}

// TODO--:
// crescer a cobra XD - FEITO EM 21/11/2025 
// // A COBRA TA GORDINHA 

game_loop = setInterval(function(){
  if(eat_or_die()){
    clearInterval(game_loop)
    alert("perdeu fi")
  }
  ctx.reset() 
  snake.load()
  apple.load()
},150) //gameloop
// An apple will be placed in a pseudo-random location

// same thing here
// read the first comment


opposites = {
  "w":"s",
  "s":"w",

  "a":"d",
  "d":"a"
}
$(".game_button").on('click',function(){
//  alert(opposites[this.id])
  if(snake.direction == opposites[this.id])
  {
    return
  }
  
  snake.direction = this.id
})

$(document).on('keydown',function(event){

  if(snake.direction == opposites[event.key])
  {
    return
  }

  if( ['w','a','s','d'].includes(event.key) )
  {
    snake.direction = event.key
  }
})
