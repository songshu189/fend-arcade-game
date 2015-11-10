
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
var wRatio = blockWidth/101;
var canvasWidth = 505;

var playerImageSrc = 'images/char-boy.png';
var cancelAnimation = false;
var request;

document.getElementById('select-player').addEventListener("click", function(e) {
    var target = e.target;
    if(!target) return;
    if(target.nodeName == 'IMG') {
        playerImageSrc = target.src;

        var input = target.parentNode.parentNode.getElementsByTagName('input')[0];
        input.checked = true;

        target.style.cursor = 'auto';

        setTimeout(function(){ e.target.style.cursor = 'pointer'; }, 1000);
    }
    else if(target.nodeName == 'INPUT') {
        playerImageSrc = target.parentNode.parentNode.getElementsByTagName('img')[0].src
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

    document.getElementsByName('vmin')[0].value = vMin;
    document.getElementsByName('vmax')[0].value = vMax;
    document.getElementsByName('nbug')[0].value = numBugs;
    document.getElementsByName('nbricks')[0].value = numBricks;
    document.getElementsByName('ngrass')[0].value = numGrass;
    document.getElementsByName('ncols')[0].value = numCols;
}