
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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
    if (this.x > canvasWidth) this.reset();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y-15*hRatio,
            //blockWidth, imgHeight)
            imgWidth, imgHeight);
};

// Reset the enemy, randomly generate row and speed
Enemy.prototype.reset =  function() {
    this.x = 0;
    this.row = (Math.floor(Math.random() * numBricks) + 1)
    this.y = this.row*blockHeight;
    this.speed = Math.random() * (vMax - vMin) + vMin;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// when player collides with enemy, set the hit flag as true.\
var hit = false;

var Player = function() {
    this.sprite = playerImages[nPlayerImage];
};

// Reset the player at the last row, middle column
Player.prototype.reset = function () {
    this.col = Math.floor(numCols/2);
    this.row = numRows-1;
}


Player.prototype.update = function() {
    if (hit) {
        this.reset();
        hit = false;
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
                //hit = true;
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
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var player = new Player();


// Check if player collides with enemy, only check those enemies at the same row with the player
// player's left, right is [18, 84], enemy's left, right is [18, 81], with respect to
// respective left position
var checkCollisions = function() {
    for(var i = 0; i<allEnemies.length; i++) {
        var enemy = allEnemies[i];
        if (enemy.row == player.row && (player.x + 84*wRatio) > (enemy.x+18*hRatio) &&
            (enemy.x + 81*hRatio) > (player.x + 18*wRatio)) {
            hit = true;
            break;
        }
    }
}

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