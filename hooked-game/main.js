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

    //add keypress to trigger swing pull
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    let playerOnePressed = false;
    let playerTwoPressed = false;
    let lineOne = document.querySelector('.box4');
    let lineTwo = document.querySelector('.box5');

    function keyDownHandler (event) {
        if(event.keyCode == 65) {
            playerOnePressed = true;
            activateP1Swing()
        } else if (event.keyCode == 39) {
            playerTwoPressed = true;
            activateP2Swing()
        }
    }

    function activateP1Swing() {
        if (playerOnePressed) {
            console.log('P1 swing activated');
            lineOne.setAttribute('id', 'p1Swing');
        }
    }

    function activateP2Swing () {
        if (playerTwoPressed) {
            console.log('P2 swing activated');
            lineTwo.setAttribute('id', 'p2Swing');
        }
    }

    function keyUpHandler (event) {
        if(event.keyCode == 65) {
            playerOnePressed = false;
            p1SwingBack()
        } else if (event.keyCode == 39) {
            playerTwoPressed = false;
            p2SwingBack()
        }
    }

    //create swing back motion based on coordinates of swing pull
    function p1SwingBack () {
        if(playerOnePressed === false) {
            console.log('player 1 stop');
            // lineOne.removeAttribute('id', 'p1Swing');
            // lineOne.setAttribute('id', 'p2SwingBack');
            let deg0 = getP1SwingDegrees();
            let deg50 = -deg0;
            //console.log(deg0)
            //console.log(deg50)

            //update css keyframes-swinging3



        }
    }

    //get swing degree of P1
    //reference: https://stackoverflow.com/questions/3336101/css3-animation-on-transform-rotate-way-to-fetch-current-deg-of-the-rotating-el
    function getP1SwingDegrees () {
        let style = window.getComputedStyle(lineOne);
        let transformString = style['transform'];

        if (!transformString || transformString == 'none') {
            return 0;
        }

        let splits = transformString.split(',');
        let parenLoc = splits[0].indexOf('(');
        let a = parseFloat(splits[0].substr(parenLoc+1));
        let b = parseFloat(splits[1]);
        //doing atan2 on b, a will give the angle in radians, then convert to degrees
        let rad = Math.atan2(b, a);
        let deg0 = (180 * rad) / Math.PI;
        return deg0;
    }

    function p2SwingBack () {
        if(playerTwoPressed === false) {
            console.log('player 2 stop');
            //lineTwo.removeAttribute('id', 'p2Swing');
            getP2SwingDegrees();
        }
    }

    //get swing degree of P2
    function getP2SwingDegrees () {
        let style = window.getComputedStyle(lineTwo);
        let transformString = style['transform'];

        if (!transformString || transformString == 'none') {
            return 0;
        }

        let splits = transformString.split(',');
        let parenLoc = splits[0].indexOf('(');
        let a = parseFloat(splits[0].substr(parenLoc+1));
        let b = parseFloat(splits[1]);
        //doing atan2 on b, a will give the angle in radians, then convert to degrees
        let rad = Math.atan2(b, a);
        let deg = -((180 * rad) / Math.PI);
        return deg;
    }

    //make line dynamic

    //if line 1 touches row line 7 col line 8, then move counter right
    //else revert to neutral position
    //if line 2 touches row line 7 col line 8, then move counter left
    //else revert to neutral position

    //set winning criteria

    //reset game


}
