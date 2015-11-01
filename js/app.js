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
    //if(cc++ > 100) return;
    //console.log(dt);
    this.x += this.speed*dt;
    if (this.x > 505) this.reset();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //var img = Resources.get(this.sprite);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y-15);
    //ctx.strokeRect(this.x, 63, img.naturalWidth, 63);
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
    //var img = Resources.get(this.sprite);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //ctx.strokeRect(this.x, this.y+53, img.naturalWidth, 75);
};

Player.prototype.handleInput = function(key) {


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
