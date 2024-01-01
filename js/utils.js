let timer = 60;
let timerId;
function decreaseTimer(){
    if(timer > 0){
        setTimeout(decreaseTimer,1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }

    else if(player.health === player2.health){
        document.querySelector('#displayText').innerHTML = 'Tie';
        document.querySelector('#displayText').style.display = 'flex';
        document.querySelector('#restart').style.display = 'flex';
    }
    else if(player.health > player2.health){
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins';
        document.querySelector('#displayText').style.display = 'flex';
        document.querySelector('#restart').style.display = 'flex';
    }
    else if(player.health < player2.health){
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins';
        document.querySelector('#displayText').style.display = 'flex';
        document.querySelector('#restart').style.display = 'flex';
    }
}

document.querySelector('#restart').addEventListener('click',function(){
    location.reload();
})