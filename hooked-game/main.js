"use strict";
// console.log('connected!');

window.onload = () => {

    // add event listeners to counters 
    let counters = document.querySelectorAll('.counter');

    for (let i = 0; i < counters.length; i++) {
        counters[i].addEventListener('click', attachCounterPoint)
    }

    function attachCounterPoint (event) {
        let clickedCounter = event.target;
        clickedCounter.innerText = 'x';
    }    

    //add keypress to trigger swing
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    let playerOnePressed = false;
    let playerTwoPressed = false;
    let 

    function keyDownHandler (event) {
        if(event.keyCode == 65) {
            playerOnePressed = true;
            activateP1Swing()
            // console.log('player 1 go')
        } else if (event.keyCode == 39) {
            playerTwoPressed = true;
            activateP2Swing()
        }
    }

    function activateP1Swing() {
        if (playerOnePressed) {
            console.log('P1 swing activated');
        }
    }

    function activateP2Swing () {
        if (playerTwoPressed) {
            console.log('P2 swing activated');
        }
    }

    

    function keyUpHandler (event) {
        if(event.keyCode == 65) {
            playerOnePressed = false;
            console.log('player 1 stop')
        } else if (event.keyCode == 39) {
            playerTwoPressed = false;
            console.log('player 2 stop')
        }
    }

    //make line dynamic

    //if line 1 touches row line 7 col line 8, then move counter right
    //else revert to neutral position
    //if line 2 touches row line 7 col line 8, then move counter left
    //else revert to neutral position


}
