//globals
var intervals = []
var pos = 0; 
var playerDirection; 
var jumping; 
var coinSound = new Audio('audio/coin.wav'); 
var jumpSound = new Audio('audio/ah.mp3');
var packagedMusic = new Audio('audio/packaged.mp3'); 
var music = new Audio('audio/polka.mp3'); 

//updateable elements 
var coin = true; 
var note = true;
var score = 0 ; 

//for clearing intervals of these timers 
var startJumpingid;
var idleId; 

//game is paused onload
var paused = false; 


//control button elements 
var playBtn =  document.getElementById('play');
var pauseBtn = document.getElementById('pause'); 


//player object 
var player = {
    
    name: 'player',  
    //for setting the running animation of the sprite
  animateSprite :function(direction){
      console.log('position:',pos); 
      var player = document.getElementById('player');
      var cx = player.getContext("2d");
      var img = document.createElement("img");
      img.src = "img/miku.png";
      var spriteW = 77, spriteH = 65;
      img.addEventListener("load", function() {
        var cycle = 0;
       var transformImg = function() {
            if(pos >= 0){
            cx.clearRect(0, 0, 200 ,250);
            //
          cx.drawImage(img, cycle * spriteW, 64, spriteW, spriteH, 20, 75, spriteW, spriteH);
          cycle = (cycle + 1) % 8;
            //for setting the right boundary     
            var windowWidth = window.innerWidth;
           if(direction === 'right' && pos < windowWidth -70 ){
               pos+=11;
               console.log('moving right =>'); 
           }else if(direction === 'left' && pos != 0){
               pos-=11; 
               console.log('moving left <='); 
           }
           player.style.left = pos + 'px'; 
               if(coin){
                    if(pos > 425){
                       coin = false;
                       console.log('coin picked up *')
                       coinSound.play(); 
                       var gameContainer = document.querySelector('.game-container'); 
                       var elm =  document.getElementById('coin'); 
                       gameContainer.removeChild(elm);
                       score++;
                       scoreUpdate(score); 
                    }
               }
            }
        }
       //variable timer to push into the intervals array 
        var animating = setInterval(transformImg, 70);
          intervals.push(animating); 

      });
} , 
    //for displaying the idle sprite 
    displayIdle : function(){
      var player = document.getElementById('player'); 
     //turns juming off
        if(jumping){
          player.classList.toggle('jumping'); 
        }
     
      var cx = player.getContext("2d");
      var img = document.createElement("img");
      img.src = "img/miku.png";
       var spriteW = 59, spriteH = 64;
            img.addEventListener("load", function() {    
                var cycle  = 0 ; 
                var idle =function(){
                  cx.clearRect(0, 0, 200 ,250);
                   cx.drawImage(img,cycle * spriteW, 0, spriteW, spriteH, 20, 75, spriteW, spriteH);
                    cycle = (cycle + 1) % 19;  
              }  
              
              var animating = setInterval(idle, 100);
                idleId = animating; 
                intervals.push(animating);
          });
    } , 
    
    flip: function(){
        var player = document.getElementById('player'); 
        player.classList.toggle('flipped');
        
    
    }, 
    
    flipped: false , 
        
    unflip : function(){
        var player = document.getElementById('player'); 
        player.className ='player'; 
    } , 
    
    action: {
        jump: function(){
                jumpSound.play();
                var player  = document.getElementById('player');
                var cx = player.getContext('2d'); 
                var img = document.createElement("img");
                img.src = "img/miku.png";
                var spriteW = 77, spriteH = 100 ;
                img.addEventListener("load", function() {
                var cycle  = 0 ; 
                var jumping =function(){
                 cx.clearRect(0, 0, 200 ,250);
                   cx.drawImage(img,cycle * spriteW, 132, spriteW, spriteH, 0 , 43, spriteW, spriteH);        
                    cycle = (cycle + 1) % 8 ;
                     
              }  
                
              var startJumping = setInterval(jumping, 120);
                    startJumpingid = startJumping;
                    intervals.push(startJumping)
                        
              });
                player.classList.toggle('jumping');
                var windowWidth = window.innerWidth;
            
                if(pos >=90 && pos < 144 && jumping){
                       setTimeout(function(){
                            var gameContainer = document.querySelector('.game-container');
                            var note = document.getElementById('note'); 
                            gameContainer.removeChild(note); 
                            note = false; 
                            changeMusic(packagedMusic); 
                            score++;
                           scoreUpdate(score); 
                   } , 500); 
                }
            
                else if(pos > windowWidth - 250 && pos < windowWidth - 100){
                    setTimeout(function(){
                        score++; 
                        scoreUpdate(score);
                        coinSound.play(); 
                    }, 500) 
                }
            
        }
    }, 
    

}

var pressed = false; 
document.addEventListener("keypress" , function(event){
    //to prevent scrolling on jump
    event.preventDefault()
    
    //keycode number
    var keycode = event.keyCode;

    
     intervals.forEach(function(interval){
       if(interval === idleId){
           clearInterval(interval);
       } 
   })
     
    
   if(!pressed && !jumping && !paused){
        if(keycode == '100'){
            if(player.flipped){
                player.unflip();
                player.flipped = false; 
            }
            playerDirection = 'right'; 
            player.animateSprite(playerDirection);
           pressed = true; 
           
       }else if(keycode == '97'){
           if(playerDirection == 'left'){
                player.animateSprite(playerDirection); 
                pressed = true;
           }else{
               playerDirection = 'left'; 
               player.flip(); 
               player.flipped = true; 
               player.animateSprite(playerDirection); 
               pressed = true;
           }
       }
       
       if(keycode == '32'){
           jumping = true; 
           player.action.jump();
           console.log('jumping' , jumping)
           setTimeout(function(){apex=true} , 300); 
       }
   }
    console.log('pressed',keycode); 
})

document.addEventListener('keyup' , function(event) {
    if(!paused){
        pressed = false; 
       intervals.forEach(function(interval){
           if(interval !== startJumpingid){
               clearInterval(interval);
           } 
       })
        if(jumping){
            setTimeout(player.displayIdle , 950 )
            setTimeout(clearAnimation , 950);
            setTimeout(function(){
                 jumping = false; 
            } ,950)
        }else{
            clearAnimation();
            player.displayIdle(); 
            console.log('released key'); 
        }
    }
})

function clearAnimation(){
    intervals.forEach(function(interval){
       clearInterval(interval)
   })
}

function scoreUpdate(score){
        var elm = document.querySelector('.score'); 
        //removes the score 
       while (elm.hasChildNodes()) {   
        elm.removeChild(elm.firstChild);
        }
        //for addition of the  new score  
        var p = document.createElement('P'); 
        var text = document.createTextNode('Score:'+ score); 
        p.appendChild(text); 
        elm.appendChild(p); 

}

function init(){
    scoreUpdate(score);
    music.loop = true ; 
    pause();
}

function play(){
    paused = false; 
    music.play(); 
    player.displayIdle();
    
    disableButton(playBtn)
    enableButton(pauseBtn)
    
   //for ouset effect
   pauseBtn.style.borderBottomColor = "#000"; 
   pauseBtn.style.borderRightColor = "#000";
   pauseBtn.style.borderTopColor = "#fff"; 
   pauseBtn.style.borderLeftColor="#fff"; 
    
   //for inset outset effect 
   playBtn.style.borderBottomColor = "#fff"; 
   playBtn.style.borderRightColor = "#fff";
   playBtn.style.borderTopColor = "#000"; 
   playBtn.style.borderLeftColor="#000";
    
    
    console.log('playing')
    
}

function pause(){
    paused = true; 
    clearAnimation();
    music.pause();
    
    enableButton(playBtn)
    disableButton(pauseBtn)
    
   //for inset outset effect 
   pauseBtn.style.borderBottomColor = "#fff"; 
   pauseBtn.style.borderRightColor = "#fff";
   pauseBtn.style.borderTopColor = "#000"; 
   pauseBtn.style.borderLeftColor="#000";
    
   //for ouset effect
   playBtn.style.borderBottomColor = "#000"; 
   playBtn.style.borderRightColor = "#000";
   playBtn.style.borderTopColor = "#fff"; 
   playBtn.style.borderLeftColor="#fff"; 

    
    
    
}

function disableButton(elm){
    elm.disabled = true; 
}

function enableButton(elm){
    elm.disabled = false; 
}

function changeMusic(newMusic){
    music.pause(); 
    music = newMusic;
    music.currentTime = 0; 
    music.play()
    
}


//main call 
init(); 





