(function(){
    var gameSquare = document.querySelectorAll('div.col-xs-4');
    var radioBtn = document.querySelectorAll('input[type=\'radio\']');
    var submitBtn = document.querySelector('button[type=\'button\']');
    var labels = document.querySelectorAll('label');
    var errorIcons = document.querySelectorAll('.error');
    var playerBoard = [];
    var computerBoard = [];
    var player = null;
    var computer = null;
    var playerTurns = [];
    var computerTurns = [];
    var turns = 1;

    //Gets and returns the players value and the computers value from the radio buttons
    function getPlayerValue(radios){
        var plyrVal = null;
        for(var i = 0; i < radios.length; i++){
            if(radios[i].checked === true){
                plyrVal = radios[i].value;
            }else{
                computer = radios[i].value;
            }
        }
        return plyrVal;
    }

    //Uses the players value to determine the order of turns for the player and computer
    function whosTurnIsIt(plyr){
        if(plyr === 'player1'){
            for(var i = 1; i < 10; i++){
                if(i % 2 !== 0){
                    playerTurns.push(i);
                }else{
                    computerTurns.push(i);
                }
            }
        }else{
            for(var i = 1; i < 10; i++){
                if(i % 2 === 0){
                    playerTurns.push(i);
                }
                else{
                    computerTurns.push(i);
                }
            }
        }
    }

    //Uses the players value to determine icon and background color for the player and returns the values
    function playerIcon(plyr){
        var playerAttr = null;
        if(plyr === "player1"){
            playerAttr = {
                icon: 'fa-times',
                color: '#51a351'
            };
        }else {
            playerAttr = {
                icon: 'fa-circle-o',
                color: '#bd362f'
            };
        }
        return playerAttr;
    }

    //Uses the players value to determine icon and background color for the computer and returns the values
    function computerIcon(plyr){
        var computerAttr = null;
        if(plyr === 'player1'){
            computerAttr = {
                icon: 'fa-circle-o',
                color: '#bd362f'
            };
        }else{
            computerAttr = {
                icon: 'fa-times',
                color: '#51a351'
            };
        }
        return computerAttr;
    }

    //Callback function for the mouseover event handler
    function hoverEnter(e, i){
        var target = e.target;
        if(target.hasAttribute('data-clicked') || turns !== playerTurns[0]){
            e.preventDefault();
        }else {
            var icon = document.createElement('i');
            icon.setAttribute('class', 'game fa ' + i.icon);
            target.appendChild(icon);
            target.style.backgroundColor = '#303030';
        }
    }

    //Callback function for the mouseleave event handler
    function hoverLeave(e){
        var target = e.target;
        if(target.hasAttribute('data-clicked') || turns !== playerTurns[0]){
            e.preventDefault();
        } else {
            target.innerHTML = '';
            var icon = target.firstElementChild;
            target.style.backgroundColor = '#B0B0B0';
        }
    }

    //Callback function for the click event handler
    function clickSquare(e, playerAttr){
        var target = e.target;
        if(target.hasAttribute('data-clicked') || turns > 9){
            e.preventDefault();
        }else if(target.tagName === 'DIV'){
            var val = parseInt(target.getAttribute('value'));
            var icon = document.createElement('i');
            icon.setAttribute('class', 'game fa ' + playerAttr.icon);
            target.style.backgroundColor = playerAttr.color;
            target.innerHTML = '';
            target.appendChild(icon);
            target.setAttribute('data-clicked', true);
            target.firstElementChild.setAttribute('data-clicked', true);
            target.firstElementChild.style.color = '#fff';
            playerBoard.push(val);
            playerTurns.shift();
        }else {
            var val = parseInt(target.parentNode.getAttribute('value'));
            target.style.color = '#fff';
            target.parentNode.style.backgroundColor = playerAttr.color;
            target.setAttribute('data-clicked', true);
            target.parentNode.setAttribute('data-clicked', true);
            playerBoard.push(val);
            playerTurns.shift();
        }
    }

    //Combines all player event handlers into a single function
    function playerChoice(plyr, gameSqr){
        playerHover(playerIcon(plyr), gameSqr);
        playerClick(playerIcon(plyr), computerIcon(plyr), gameSqr, plyr);
    }

    //Appends computer icon and styles for the computer's AI
    function computerClick(square, compIcon){
        var target = square;
        var icon = document.createElement('i');
        var val = parseInt(target.getAttribute('value'));

        icon.style.color = '#fff';
        icon.setAttribute('class', 'game fa ' + compIcon.icon);
        target.style.backgroundColor = compIcon.color;
        target.appendChild(icon);
        target.setAttribute('data-clicked', true);
        target.firstElementChild.setAttribute('data-clicked', true);
        computerBoard.push(val);
        computerTurns.shift();
        turns++;
    }

    //Selects a random and available square for the computer's AI
    function randomSquare(){
        var squares = document.querySelectorAll('.col-xs-4');
        square = null;

        do{
            square = squares[randInt(squares)];
        }
        while(square.hasAttribute('data-clicked'));

        function randInt(gameSqr){
            return Math.floor(Math.random() * squares.length);
        }
        return square;
    }

    //The computers brain, which is mostly defensive at the moment
    function smartComputerIntel(plyr, gameSqr, plyrBoard, compBoard){
        var winning = [[1,2,3], [1,5,9], [1,4,7], [2,5,8], [3,6,9], [3,5,7], [4,5,6]];

        Array.prototype.diff = function(a) {
            return this.filter(function(i) {
                return a.indexOf(i) < 0;
            });
        };

        function getDiff(win, board){
            return win.diff(board);
        }

        function gamePlay(board){
            return winning.map(function(val){
                var num = getDiff(val, board);

                if(num.length === 1){
                    return num;
                }
            }).filter(function(val){
                if(val !== undefined && !gameSqr[val - 1].hasAttribute('data-clicked')){
                    return val;
                }
            });
        }

        if(computerTurns.length > 0){
            if(!gameSqr[4].hasAttribute('data-clicked')){
                computerClick(gameSqr[4], computerIcon(plyr));
            }else {
                if(gamePlay(computerBoard).length === 0){
                    if(gamePlay(playerBoard).length === 0){
                        computerClick(randomSquare(), computerIcon(plyr));
                    }else {
                        console.log(gameSqr[gamePlay(playerBoard).pop() - 1])
                        computerClick(gameSqr[gamePlay(playerBoard).pop() - 1], computerIcon(plyr));
                    }
                }else {
                    console.log(gameSqr[gamePlay(computerBoard).pop() - 1]);
                    computerClick(gameSqr[gamePlay(computerBoard).pop() - 1], computerIcon(plyr));
                }
            }
        }
    }

    //Passed into the start button event handler and controls the games basic functionality
    function theGame(plyr, gameSqr){
        if (plyr === 'player2') {
            smartComputerIntel(plyr, gameSqr, playerBoard, computerBoard);
            playerChoice(plyr, gameSqr);
        } else {
            playerChoice(plyr, gameSqr);
        }
    }

    //jQuery fadeIn function written in vanilla
    function fadeIn(el) {
        el.style.display = 'block';
        var last = +new Date();
        var tick = function() {
            el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
            last = +new Date();

            if (+el.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
            }
        };

        tick();
    }

    //Mouse enter and Mouse leave event handlers
    function playerHover(i, sq){
        [].forEach.call(sq, function(el){
            el.addEventListener('mouseenter', function(e){
                hoverEnter(e, i);
            }, false);
        });

        [].forEach.call(sq, function(el){
            el.addEventListener('mouseleave', function(e){
                hoverLeave(e, i);
            }, false);
        });
    }

    //Click event handler for the player's choice
    //Also contains function for computers choice which is called directly after the players click
    function playerClick(plyrIcon, compIcon, sq, plyr){
        [].forEach.call(sq, function(el){
            el.addEventListener('click', function(e){
                if(playerTurns.length === 0 || turns > 9 || el.firstElementChild.hasAttribute('data-clicked')){
                    e.preventDefault();
                }else {
                    clickSquare(e, plyrIcon, compIcon);
                    turns++;
                    smartComputerIntel(plyr, gameSquare, playerBoard, computerBoard)
                }
            }, false);
        });
    }

    [].forEach.call(labels, function(el){
        el.addEventListener('click', function(e){
            var target = e.target;
            if(turns === 10 || el.hasAttribute('data-clicked')){
                e.preventDefault();
            }else if(el.classList.contains('player1')){
                target.classList.remove('btn-default');
                target.classList.add('btn-success');
            }else{
                target.classList.remove('btn-default');
                target.classList.add('btn-danger');
            }
        });
    });

    [].forEach.call(errorIcons, function(el){
        el.addEventListener('click', function(e){
            var overlay = document.querySelector('.overlay');
            var gameContainer = document.querySelector('.game-container');
            if(el.classList.contains('fa-times')){
                overlay.style.display = 'none';
                overlay.style.opacity = 0;
                gameContainer.style.display = 'block';
            }else {
                window.location = '';
            }
        });
    });

    //Start button click event handler
    //Contains the function that allows the actual game play
    submitBtn.addEventListener('click', function(e){
        var paragraph = document.querySelector('.lead');
        var errorIcon = document.querySelector('.error');
        var gameContainer = document.querySelector('.game-container');
        var overlay = document.querySelector('.overlay');
        player = getPlayerValue(radioBtn);

        if(player === null){
            e.preventDefault();
            gameContainer.style.display = 'none';
            fadeIn(overlay);
            paragraph.textContent = 'Choose a player first!';
            errorIcon.setAttribute('class', 'error fa fa-5x fa-times');
        }else if(turns > 2 && turns <= 9){
            e.preventDefault();
        }else if(turns > 9){
            e.preventDefault();
            gameContainer.style.display = 'none';
            fadeIn(overlay);
            paragraph.textContent = 'Click the button and play again!';
            errorIcon.setAttribute('class', 'error fa fa-refresh fa-spin fa-5x');
        }else{
            whosTurnIsIt(player);
            theGame(player, gameSquare);
        }
    }, false);
}());
