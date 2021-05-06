"use strict";
// console.log('connected!');

window.onload = () => {
    
    //initialize line resize when browser is first opened
    resizeLine();
    
    //adjust height of line according to size of grid in browser
    function resizeLine () {
        //get essential parameters for calculation of line height and winning swing angle range
        let line = document.querySelectorAll('.line');

        let box6 = document.querySelector('.box6');
        let styleBox6 = getComputedStyle(box6);
        let heightOfBox6 = parseFloat(styleBox6['height']);
        let widthOfBox6 = parseFloat(styleBox6['inlineSize']);
        // console.log(heightOfBox6)
        // console.log(widthOfBox6)

        for (let noOfLines = 0; noOfLines < line.length; noOfLines++) {
            let heightOfLine = `${Math.sqrt(Math.pow(heightOfBox6, 2) + Math.pow(widthOfBox6, 2))}px`;
            line[noOfLines].style.height = heightOfLine
        }

        let winningAngle = Math.atan(widthOfBox6 / heightOfBox6) * (180/Math.PI);
        return winningAngle
        // console.log(winningAngle)
    }

    //re-initialize resize when browser is resized
    window.addEventListener('resize', resizeLine);

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
        } else if (event.keyCode == 76) {
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
            p1SwingBack();
            
        } else if (event.keyCode == 76) {
            playerTwoPressed = false;
            p2SwingBack();
        }
    }

    //create swing back motion based on coordinates of swing pull
    function p1SwingBack () {
        if(playerOnePressed === false) {
            console.log('player 1 stop');

            //update css keyframes-swinging3
            let deg0 = getP1SwingDegrees();
            let deg50 = -deg0;

            lineOne.setAttribute('id', 'p1SwingBack');
            let p1SwingBack = document.querySelector('#p1SwingBack');
            p1SwingBack.style.setProperty('--deg0', deg0 + 'deg');
            p1SwingBack.style.setProperty('--deg50', deg50 + 'deg');
            

            //check if collision is successful or not
            //if swing degree is within +- 1 of winning degree, then register as collision for Player 1
            let winningAngle = resizeLine();
            let angleUpperLimit = winningAngle + 1.5;
            let angleLowerLimit = winningAngle - 1.5;

            if (deg0 < angleUpperLimit && deg0 > angleLowerLimit) {
                console.log('hit');
                setTimeout(moveP1right, 1500);
            } else {
                console.log('missed');
            }
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

            //update css keyframes-swinging4
            let deg0 = getP2SwingDegrees();
            let deg50 = -deg0;

            lineTwo.setAttribute('id', 'p2SwingBack');
            let p2SwingBack = document.querySelector('#p2SwingBack');
            p2SwingBack.style.setProperty('--deg0', deg0 + 'deg');
            p2SwingBack.style.setProperty('--deg50', deg50 + 'deg');

            //check if collision is successful or not
            let winningAngle = resizeLine();
            let angleUpperLimit = -winningAngle + 1.5;
            let angleLowerLimit = -winningAngle - 1.5;

            if (deg0 < angleUpperLimit && deg0 > angleLowerLimit) {
                console.log('hit');
                // moveP2left();
                setTimeout(moveP2left, 1500);
            } else {
                console.log('missed');
            }
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

    //create array of counters and assign variables
    let counters = document.querySelectorAll('.counter');
    // counters[0]: div#item-0.counter
    // counters[1]: div#item-1.counter
    // counters[2]: div#item-2.counter
    // counters[3]: div#item-3.counter
    // counters[4]: div#item-4.counter
    // counters[5]: div#item-5.counter
    // counters[6]: div#item-6.counter

    //create sprite and attach to middle counter when game is initialized
    let startingIndex = 3
    let spriteStartingPosition = counters[startingIndex];
    let sprite = document.createElement('div');
    sprite.classList.add('sprite');

    spriteStartingPosition.appendChild(sprite);

    //create variable for current index position of sprite
    let currentIndex = startingIndex;

    //move sprite right if P1 collided successfully
    function moveP1right () {
        currentIndex += 1;
        counters[currentIndex].appendChild(sprite);

        //if sprite is in counter-6, player 1 wins
        if (currentIndex === 6) {
            let player = 1;
            winnerAlert(player);
        }
        
    }

    //move sprite left if P2 collided successfully
    function moveP2left () {
        currentIndex -= 1;
        counters[currentIndex].appendChild(sprite);

        //if sprite is in counter-0, player 2 wins
        if (currentIndex === 0) {
            let player = 2;
            winnerAlert(player);
        }
    }

    // modal appears when either player wins
    function winnerAlert (player) {
        let modal = document.getElementById('myModal');
        let span = document.querySelector('.close');
        let reset = document.querySelector('#reset');
        let announceWinner = document.querySelector('.winner');

        announceWinner.innerHTML = `Player ${player} is the superior Hooker!`

        modal.style.display = "block";

        span.addEventListener('click', () => {
            modal.style.display = 'none';
        })

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }

        reset.addEventListener('click', () => {
            location.reload();
        })
    }


    //change counters and sprite
    //add border for toy
    //add background image

    //add "intro" pop up window with instructions and welcome message > start game

    //add 3..2..1 countdown page

}
