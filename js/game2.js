var gameSquare = document.querySelectorAll('div.col-xs-4');
var radioBtn = document.querySelectorAll('input[type=\'radio\']');
var submitBtn = document.querySelector('button[type=\'button\']');
var sq1 = document.querySelector('.sq1');
var sq2 = document.querySelector('.sq2');
var sq3 = document.querySelector('.sq3');
var sq4 = document.querySelector('.sq4');
var sq5 = document.querySelector('.sq5');
var sq6 = document.querySelector('.sq6');
var sq7 = document.querySelector('.sq7');
var sq8 = document.querySelector('.sq8');
var sq9 = document.querySelector('.sq9');
var gameBoard = [].slice.call(gameSquare);
var playerBoard = [];
var computerBoard = [];
var player = null;

var hoverObj = {
    playerIcon: function(plyr){
        var icon = null;

        if(plyr === "player1"){
            icon = 'fa-times';
        }else {
            icon = 'fa-circle-o'
        }
        return icon;
    },
    mouseEnterEvent: function(e, i){
        var target = e.target;
        var icon = document.createElement('i');
        icon.setAttribute('class', 'fa ' + i);
        target.item.appendChild(hoverObj.playerIcon);
        target.style.backgroundColor = '#303030';

    },
    mouseLeaveEvent: function(e, i){
        var icon = e.target.firstElementChild;
        var target = e.target;
        target.style.backgroundColor = '#B0B0B0';
        if(target.tagName = 'DIV'){
            target.removeChild(target.firstElementChild);
        }else {
            var div = target.parentNode;
            div.removeChild(target);
        }
    },
    init: function(){
        var game = document.querySelectorAll('div.col-xs-4');

        [].forEach.call(game, function(el){
            el.addEventListener('mouseenter', this.mouseEnterEvent);
        });

        [].forEach.call(game, function(el){
            el.addEventListener('mouseleave', this.mouseLeaveEvent);
        });
    }
};

submitBtn.addEventListener('click', function(e){
    player = getRadioValue(radioBtn);
    if(player === null){
        e.preventDefault();
        alert('Choose a player!');
    }else{
        //playerChoice();
        hoverObj.init();
        playerClick(playerIcon(player), gameSquare);
    }
}, false);

function playerIcon(plyr){
    var icon = null;

    if(plyr === "player1"){
        icon = 'fa-times';
    }else {
        icon = 'fa-circle-o'
    }
    return icon;
}

function getRadioValue(radios){
    var plyrVal = null;
    for(var i = 0; i < radios.length; i++){
        if(radios[i].checked === true){
            plyrVal = radios[i].value;
        }
    }
    return plyrVal;
}

function playerClick(i, sq){
    console.log(gameSquare);
    [].forEach.call(sq, function(el){
        el.addEventListener('click', function(e){
            console.log(e.target.tagName);
            if(e.target.tagName === 'DIV'){
                var icon = document.createElement('i');
                icon.setAttribute('class', 'fa ' + i);
                // clear whatever was there
                e.target.innerHTML = '';
                e.target.appendChild(icon);
                e.target.firstElementChild.style.color = '#fff';
                e.target.style.backgroundColor = '#3399FF';
                console.log(gameSquare);
            }else {
                e.target.style.color = '#fff';
                e.target.parentNode.style.backgroundColor = '#3399FF';
                e.target.parentNode.removeEventListener('mouseleave', hoverLeave(), false);
            }
            //playerBoard.push(e.target.getAttribute('value'));
        }, false);
    });
}



function playerChoice() {
    playerHover(gameSquare);
}