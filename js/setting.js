
var vMin = 80;
var vMax = 300;
var numBugs = 3;
var numBricks = 3;
var numGrass = 2;
var numCols = 5;
var numRows = numBricks + numGrass + 1;

var hRatio = 586/((numRows-1)*83+171);
var blockHeight = Math.round(hRatio*83),
    blockWidth = Math.floor(505/numCols),
    imgHeight = hRatio*171,
    imgWidth = hRatio*83;

var playerImages = ['images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'];

var nPlayerImage = 0;
var playerImageIdx = {
    'char-boy.png':0,
    'char-cat-girl.png':1,
    'char-horn-girl.png':2,
    'char-pink-girl.png':3,
    'char-princess-girl.png':4};
var cancelAnimation = false;
var request;

document.getElementById('select-player').addEventListener("click", function(e) {
    var target = e.target;
    if(!target) return;
    if(target.nodeName == 'IMG') {
        var path = target.src;
        var pos = path.lastIndexOf('/') + 1;
        var file = path.substr(pos, path.length-pos);
        nPlayerImage = playerImageIdx[file];
        console.log(nPlayerImage);
        document.getElementsByName('player')[nPlayerImage].checked=true;
        target.style.cursor = 'auto';

        setTimeout(function(){ e.target.style.cursor = 'pointer'; }, 1000);
    }
    else if(target.nodeName == 'INPUT') {
        nPlayerImage = parseInt(target.value);
    }
});

document.querySelector('table').addEventListener('change', function(e){
    var target = e.target;

    if(target && target.nodeName == 'INPUT') {
        var val = parseInt(target.value);

        switch(target.name) {
            case 'vmin':
                if(val>vMax) {
                    document.getElementById('min-error').className = 'red-text';
                }else {
                    vMin = val;
                    document.getElementById('min-error').className = 'hide-row';
                }
            break;
            case 'vmax':
                if(val<vMin) {
                    document.getElementById('max-error').className = 'red-text';
                } else {
                    vMax = val;
                    document.getElementById('max-error').className = 'hide-row';
                }
            break;
            case 'nbug':
                numBugs = val;
            break;
            case 'nbricks':
                numBricks = val;
            break;
            case 'ngrass':
                numGrass = val;
            break;
            case 'ncols':
                numCols = val;
            break;
        }
    }
});

document.getElementsByName('button')[0].onclick=function(){
    cancelAnimation = false;
    document.getElementById('setting-div').className = "hide-row";
    document.getElementById('setting-button').className = "setting-button";
    Engine(window);
};

function setting_button() {
    cancelAnimation = true;
    cancelAnimationFrame(request);
    document.getElementById('setting-button').className = "hide-row";
    document.getElementById('setting-div').className = "setting";
    document.querySelector('canvas').className = "hide-row";

    document.getElementsByName('player')[nPlayerImage].checked=true;
    document.getElementsByName('vmin')[0].value = vMin;
    document.getElementsByName('vmax')[0].value = vMax;
    document.getElementsByName('nbug')[0].value = numBugs;
    document.getElementsByName('nbricks')[0].value = numBricks;
    document.getElementsByName('ngrass')[0].value = numGrass;
    document.getElementsByName('ncols')[0].value = numCols;
}