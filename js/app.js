var reset = function() {
    this.x = 0;
    this.y = (Math.floor(Math.random() * 3) + 1)*83;;
    this.speed = Math.random() * 300 + 100;
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    reset.call(this);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //var img = Resources.get(this.sprite);
    //console.log(img.naturalWidth, img.baturalHeight);
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

Player.prototype.update = function(dt) {
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
allEnemies = [];
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
player = new Player();


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
