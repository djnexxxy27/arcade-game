// Enemies our player must avoid
var Enemy = function (x, y, howFast) {

    // Variables determining x & y axis and enemy speed
    this.x = x;
    this.y = y;
    this.howFast = howFast;

    // Image of (enemy)princess that is added to the playing field 
    this.sprite = 'images/char-princess-girl.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

    // Speed multiplier by (delta time) on x axis
    this.x += this.howFast * dt;

    // Enemies reappearing randomly with different speed 
    if (this.x > 450) {
        this.x = -40;
        this.howFast = 100 + Math.floor(Math.random() * 300);
    };

    // Enemies vs. Player collision check
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    };
};

// Draws the enemy on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class ('x' and 'y' axis)
var Player = function (x, y) {

    // Variables for the player to move along x and y axis 
    this.x = x;
    this.y = y;

    //The player image ('poor'bug) is added to the game 
    this.player = 'images/enemy-bug.png';
};

Player.prototype.update = function (dt) {

};

// User being rendered into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Arrow keys used to move in the game
Player.prototype.handleInput = function (keyPress) {

    // Left arrow key to move left on x axis and not to go overboard in the game
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    };

    // Right arrow key to move right on x axis and not to go overboard in the game
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    };

    // Up arrow key to move up on y axis and not to go overboard in the game
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };

    // Down arrow key to move down on y axis and not to go overboard in the game
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    };

    // When reaching the 'Water' on top, player is moved to starting position
    // on the bottom of the game board
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 800);
    };
};


// Enemies placed in an array
var allEnemies = [];

// Where the enemies are located
var enemyLocation = [60, 150, 235];

//Enemy located on y axis from 0, on x axis to move @ speed of 205 until update function takes over 
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 205);
    allEnemies.push(enemy);
});
//Primary location of the player on x and y axis
var player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
