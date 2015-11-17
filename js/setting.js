// Setting parameters
// vMin: minimum speed of enemy, (pixel/second)
// vMax: maximum speed of enemy, (pixel/second)
// numBugs: number of bugs of the game, randomly appear at paved block
// numBricks: number of rows of paved blocks
// numCols: number of columns of the scene
var vMin = 80;
var vMax = 300;
var numBugs = 3;
var numBricks = 3;
var numGrass = 2;
var numCols = 5;
var numRows = numBricks + numGrass + 1;

// hRatio: height ratio of when number of rows changed, used for bug height, width,
//         and player height
// blockHeight: Height of each block
// blockWidth: Width of each block
// imgHeight, imgWidth: Height and Width of image when defaul parameters changed
// wRatio: width ratio, only used for player width
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

// This event listener is used for select player image, the player image
// source file name is saved as playImageSrc
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
        playerImageSrc = target.parentNode.parentNode.getElementsByTagName('img')[0].src;
    }
});


// This event listen works for change setting parameters
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

// This event listener hides setting page, shows setting button on game page
document.getElementsByName('button')[0].onclick=function(){
    cancelAnimation = false;
    document.getElementById('setting-div').className = "hide-row";
    document.getElementById('setting-button').className = "setting-button";
    Engine(window);
};

// This event listener hides canvas (game scene) and setting button, shows
// setting page.
function settingButton() {
    cancelAnimation = true;
    cancelAnimationFrame(request);
    document.getElementById('setting-button').className = "hide-row";
    document.getElementById('setting-div').className = "setting";
    document.querySelector('canvas').className = "hide-row";
}