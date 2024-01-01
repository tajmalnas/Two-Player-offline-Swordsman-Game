const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height);

const gravity = 0.6;


const background = new sprite({
    position:{
        x: 0, y: 0
    },
    imageSrc: 'img/background.png',
})

const shop = new sprite({
    position:{
        x: 600, y: 95.5
    },
    imageSrc: 'img/shop.png',
    scale: 3,
    framesMax:6,
})

const player = new Fighter({
    position:{
     x: 0, y: 0
    },
    velocity:{
        x: 0, y: 0
    },
    color: 'red',
    // offset:{
    //     x: 0,
    //     y: 0
    // },
    imageSrc:'img/samuraiMack-20231212T164843Z-001/samuraiMack/Idle.png',
    framesMax: 8,
    scale:2.5,
    offset:{
        x: 215,
        y: 156,
    },
    sprites:{
        idle:{
            imageSrc:'img/samuraiMack-20231212T164843Z-001/samuraiMack/Idle.png',
            framesMax: 8,
        },
        run:{
            imageSrc:'img/samuraiMack-20231212T164843Z-001/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump:{
            imageSrc:'img/samuraiMack-20231212T164843Z-001/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fall:{
            imageSrc:'img/samuraiMack-20231212T164843Z-001/samuraiMack/Fall.png',
            framesMax: 2,
        },
        attack1:{
            imageSrc:'img/samuraiMack-20231212T164843Z-001/samuraiMack/Attack1.png',
            framesMax:6,
        },
        takeHit:{
            imageSrc:'img/samuraiMack-20231212T164843Z-001/samuraiMack/Take Hit - white silhouette.png',
            framesMax:4,
        },
        death:{
            imageSrc:'img/samuraiMack-20231212T164843Z-001/samuraiMack/Death.png',
            framesMax:6,
        }
    },
    attackBox:{
        offset:{
            x: -40,
            y: 0,
        },
        width:150,
        height:50,
    }
});

const player2 = new Fighter({
    position:{
        x: 400, y: 100
    },
    velocity:{
        x: 0, y: 0
    },
    color: 'blue',
    // offset:{
    //     x: 50,
    //     y: 0,
    // },
    imageSrc:'img/kenji-20231212T164843Z-001/kenji/Idle.png',
    framesMax: 4,
    scale:2.5,
    offset:{
        x: 215,
        y: 166,
    },
    sprites:{
        idle:{
            imageSrc:'img/kenji-20231212T164843Z-001/kenji/Idle.png',
            framesMax: 4,
        },
        run:{
            imageSrc:'img/kenji-20231212T164843Z-001/kenji/Run.png',
            framesMax: 8,
        },
        jump:{
            imageSrc:'img/kenji-20231212T164843Z-001/kenji/Jump.png',
            framesMax: 2,
        },
        fall:{
            imageSrc:'img/kenji-20231212T164843Z-001/kenji/Fall.png',
            framesMax: 2,
        },
        attack1:{
            imageSrc:'img/kenji-20231212T164843Z-001/kenji/Attack1.png',
            framesMax:4,
        },
        takeHit:{
            imageSrc:'img/kenji-20231212T164843Z-001/kenji/Take hit.png',
            framesMax:3,
        },
        death:{
            imageSrc:'img/kenji-20231212T164843Z-001/kenji/Death.png',
            framesMax:7,
        }
    },
    attackBox:{
        offset:{
            x: 150,
            y: 0,
        },
        width:190,
        height:50,
    }
});


const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    }
}


function rectangularCollision({rect1, rect2}){
    return(
        rect1.attackBox.position.x + rect1.attackBox.width > rect2.position.x 
        && rect1.attackBox.position.x < rect2.position.x + rect2.width 
        && rect1.attackBox.position.y + rect1.attackBox.height > rect2.position.y 
        && rect1.attackBox.position.y < rect2.position.y + rect2.height
        && rect1.isAttacking
    )
}


function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0,0,canvas.width,canvas.height);
    
    background.update();
    shop.update();
    c.fillStyle = 'rgba(255,255,250,0.1)'
    c.fillRect(0,0,canvas.width,canvas.height);
    player.update();
    player2.update();

    player.velocity.x = 0;
    
    // player.switchSprite('idle');

    if(keys.a.pressed && player.lastKey == 'a'){
        player.velocity.x = -4;
        player.switchSprite('run');
    }
    else if(keys.d.pressed && player.lastKey == 'd'){   
        player.velocity.x = 4;
        player.switchSprite('run');
    }
    else{
        player.switchSprite('idle');
    }

    if(player.velocity.y < 0){
        player.switchSprite('jump');
    }
    else if(player.velocity.y>0){
        player.switchSprite('fall');
    }

    player.position.x += player.velocity.x;
    player.position.x = clamp(player.position.x, 0, canvas.width - player.width);
    

    player2.velocity.x = 0;
    if(keys.ArrowLeft.pressed && player2.lastKey == 'ArrowLeft'){
        player2.velocity.x = -4;
        player2.switchSprite('run');
    }
    else if(keys.ArrowRight.pressed && player2.lastKey == 'ArrowRight'){
        player2.velocity.x = 4;
        player2.switchSprite('run');
    }
    else{
        player2.switchSprite('idle');
    }

    if(player2.velocity.y < 0){
        player2.switchSprite('jump');
    }
    else if(player2.velocity.y>0){
        player2.switchSprite('fall');
    }
    player2.position.x += player2.velocity.x;
    player2.position.x = clamp(player2.position.x, 0, canvas.width - player2.width);
    
    // Update player 1 y-coordinate
    player.position.y += player.velocity.y;
    player.position.y = clamp(player.position.y, 0, canvas.height - player.height);

    // Update player 2 y-coordinate
    player2.position.y += player2.velocity.y;
    player2.position.y = clamp(player2.position.y, 0, canvas.height - player2.height);


    if(rectangularCollision({rect1:player, rect2:player2})
        && player.isAttacking && player.framesCurrent===4
    )
    {
        player2.takeHit();
        player.isAttacking = false;
        
        document.querySelector('#player2Health').style.width = player2.health + '%';

        console.log('hit');
    }

    if(rectangularCollision({rect1:player2, rect2:player}) 
        && player2.isAttacking && player2.framesCurrent===2
    )
    {
        
        player.takeHit();
        player2.isAttacking = false;
        document.querySelector('#playerHealth').style.width = player.health + '%';
        console.log('hit 2');
    }

    if(player.isAttacking && player.framesCurrent===4){
        player.isAttacking = false;
    }

    if(player2.isAttacking && player2.framesCurrent===2){
        player2.isAttacking = false;
    }

    if(player.health <= 0){
        document.querySelector('#displayText').innerHTML = 'player 2 wins';
        document.querySelector('#displayText').style.display = 'flex';
        timer = 0;
    }

    if(player2.health <= 0){
        document.querySelector('#displayText').innerHTML = 'player 1 wins';
        document.querySelector('#displayText').style.display = 'flex';
        timer = 0;
    }

}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}


decreaseTimer();

animate();

window.addEventListener('keydown', (e) => {
    if(!player.dead && timer>0){
        if(e.key == 'w'){
            player.velocity.y = -15; 
        }
        if(e.key == 'a'){
            keys.a.pressed = true;
            player.lastKey = 'a';
        }
        if(e.key == 'd'){
            keys.d.pressed = true;
            player.lastKey = 'd';
        }
    
        if(e.key == ' '){
            player.attack();
        }
    }

    if(!player2.dead && timer>0){
        if(e.key == 'ArrowUp'){
            player2.velocity.y = -15;
        }
        
        if(e.key == 'ArrowLeft'){
            keys.ArrowLeft.pressed = true;
            player2.lastKey = 'ArrowLeft';
        }
        if(e.key == 'ArrowRight'){
            keys.ArrowRight.pressed = true;
            player2.lastKey = 'ArrowRight';
        }
    
        if(e.key == 'Enter'){
            player2.attack();
        }
    }
});

window.addEventListener('keyup', (e) => {
    
    if(e.key == 'w'){
       player.velocity.y = 0;
    }
    if(e.key == 'a'){
        keys.a.pressed = false;
    }
    if(e.key == 'd'){
        keys.d.pressed = false;
    }
    if(e.key == 'ArrowUp'){
        player2.velocity.y = 0;
    }
    if(e.key == 'ArrowLeft'){
        keys.ArrowLeft.pressed = false;
    }
    if(e.key == 'ArrowRight'){
        keys.ArrowRight.pressed = false;
    }
});