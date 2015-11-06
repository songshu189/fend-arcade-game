var enemy_reset = function() {
    this.x = 0;
    this.row = (Math.floor(Math.random() * 3) + 1)
    this.y = this.row*blockHeight;
    this.speed = Math.random() * (vMax - vMin) + vMin;
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    enemy_reset.call(this);
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
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y-15*hRatio,
            //blockWidth, imgHeight)
            imgWidth, imgHeight);
};

Enemy.prototype.reset = enemy_reset;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function player_reset() {
    this.col = Math.floor(numCols/2);
    this.row = numRows-1;
}

var hit = false;

var Player = function() {
    player_reset.call(this);

    this.sprite = playerImages[nPlayerImage];
};

Player.prototype.reset = player_reset;

Player.prototype.update = function() {
    if (hit) {
        this.reset();
        hit = false;
    }
    for(var i = 0; i<allEnemies.length; i++) {
        var enemy = allEnemies[i];
        if (enemy.row == this.row && (this.x + 101) > (enemy.x+18) && (enemy.x + 81) > this.x) {
            hit = true;
            break;
        }
    }
    this.x = this.col*blockWidth;
    this.y = this.row*blockHeight - 10*hRatio;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,
        blockWidth, imgHeight);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'up':
            this.row--;
            if (this.row == 0) {
                this.reset();
                hit = true;
            }
            break;
        case 'down':
            this.row++;
            if (this.row == numRows)
                this.row = numRows-1;
            break;
        case 'left':
            this.col--;
            if (this.col == -1)
                this.col = 0;
            break;
        case 'right':
            this.col++;
            if (this.col == numCols)
                this.col = numCols-1;
    }
    console.log(key, this.row, this.col);

    console.log(window.innerWidth, window.outerWidth);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
var player = new Player();

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