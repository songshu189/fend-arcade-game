var reset = function() {
    this.x = 0;
    this.row = (Math.floor(Math.random() * 3) + 1)
    this.y = this.row*83;;
    this.speed = Math.random() * 200 + 50;
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    reset.call(this);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed*dt;
    if (this.x > 505) this.reset();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y-15);
};

Enemy.prototype.reset = reset;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.col = 2;
    this.row = 5;

    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    if (hit) {
        this.col = 2;
        this.row = 5;
        hit = false;
    }
    for(var i = 0; i<allEnemies.length; i++) {
        var enemy = allEnemies[i];
        if (enemy.row == this.row && (this.x + 101) > (enemy.x+18) && (enemy.x + 81) > this.x) {
            hit = true;
            break;
        }
    }
    this.x = this.col*101;
    this.y = this.row*83 - 10;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'up':
            this.row--;
            if (this.row == 0) {
                this.col = 2;
                this.row = 5;
                hit = true;
            }
            break;
        case 'down':
            this.row++;
            if (this.row == 6)
                this.row = 5;
            break;
        case 'left':
            this.col--;
            if (this.col == -1)
                this.col = 0;
            break;
        case 'right':
            this.col++;
            if (this.col == 5)
                this.col = 4;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
var player = new Player();

var hit = false;
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var imgIdx = {
    'char-boy.png':0,
    'char-cat-girl.png':1,
    'char-horn-girl.png':2,
    'char-pink-girl.png':3,
    'char-princess-girl.png':4};

document.body.addEventListener("click", function(e) {
    if(e.target && e.target.nodeName == 'IMG') {
        var path = e.target.src;
        var pos = path.lastIndexOf('/') + 1;
        var file = path.substr(pos, path.length-pos);
        document.getElementsByName('player')[imgIdx[file]].checked=true;
        e.target.style.cursor = 'auto';

        setTimeout(function(){ e.target.style.cursor = 'pointer'; }, 1000);
    }
});