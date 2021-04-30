"use strict";
// console.log('connected!');

window.onload = () => {
    
    //initialize line resize when browser is first opened
    //adjust height of line according to size of grid in browser
    resizeLine();

    function resizeLine () {
        let line = document.querySelectorAll('.line');

        let box6 = document.querySelector('.box6');
        let styleBox6 = getComputedStyle(box6);
        let heightOfBox6 = parseFloat(styleBox6['height']);
        let widthOfBox6 = parseFloat(styleBox6['inlineSize']);
        
        for (let noOfLines = 0; noOfLines < line.length; noOfLines++) {
            let heightofline = `${Math.sqrt(Math.pow(heightOfBox6, 2) + Math.pow(widthOfBox6, 2))}px`;
            line[noOfLines].style.height = heightofline
        }
    }
    //re-initialize resize when browser is resized
    window.onresize = resizeLine;

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

            //revert to neutral position after swing back
            // lineOne.removeAttribute('id', 'p1SwingBack');

        } else if (event.keyCode == 39) {
            playerTwoPressed = false;
            p2SwingBack()
        }
    }

    //create swing back motion based on coordinates of swing pull
    function p1SwingBack () {
        if(playerOnePressed === false) {
            console.log('player 1 stop');
            //lineOne.removeAttribute('id', 'p1Swing');

            //update css keyframes-swinging3
            let deg0 = getP1SwingDegrees();
            let deg50 = -deg0;

            lineOne.setAttribute('id', 'p1SwingBack');
            let p1SwingBack = document.querySelector('#p1SwingBack');
            p1SwingBack.style.setProperty('--deg0', deg0 + 'deg');
            p1SwingBack.style.setProperty('--deg50', deg50 + 'deg');
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

            //update css keyframes-swinging3
            let deg0 = getP2SwingDegrees();
            let deg50 = -deg0;

            lineTwo.setAttribute('id', 'p2SwingBack');
            let p2SwingBack = document.querySelector('#p2SwingBack');
            p2SwingBack.style.setProperty('--deg0', deg0 + 'deg');
            p2SwingBack.style.setProperty('--deg50', deg50 + 'deg');
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
        let deg0 = (180 * rad) / Math.PI;
        return deg0;
    }

    //if line 1 touches row line 7 col line 8, then move counter right
    //else revert to neutral position
    //if line 2 touches row line 7 col line 8, then move counter left
    //else revert to neutral position

    //set winning criteria

    //reset game


}
