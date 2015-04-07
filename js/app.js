/* Selects a random number between two bounds. */

var ranNumber = function(lowerNum, higherNum) {
    return Math.floor(Math.random() * (higherNum - lowerNum + 1)) + lowerNum;
}
/* enemy object */

var Enemy = function() {

    /* Enemy image sprite.*/

    this.sprite = 'images/enemy-bug.png';

    /* Move enemy off the left
    of the display box by a random amount */    

    this.x = ranNumber(1, 4) * -101;

    /* Place the enemy in a random row. */

    this.y = (ranNumber(1, 3) * 83) - 25;

    /* Assigns a speed to the enemy */

    this.speed = ranNumber(101, 202);
}
    /*Update the enemy's position, 
    Parameter: dt, a time delta between ticks */

Enemy.prototype.update = function(dt) {

    /* When the enemy moves of the right side of the screen
    reset it randomly. */

    if (this.x > 506) {
        this.x = ranNumber(1, 4) * -101;
        this.y = (ranNumber(1, 3) * 83) - 25;        
    }
    /* Determine delta of x as a product of the speed property
    and the change in time. */

    this.x += this.speed * dt;
}
    /* Draw the enemy of the screen */

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
/* player object */

var Player = function () {

    /* sprite for the player character */

    this.sprite = 'images/char-boy.png';

    /* Starting x and y coodinates for the player */

    this.x = 2 * 101;
    this.y = 5 * 83 - 35;
}
/* Draw player on screen */

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
/* Makes sure player cannot move off the edges of the screen,
as well as reseting the player when water row is reached */

Player.prototype.update = function() {
    if (this.y > 5 * 83 - 35) {
        this.y = 5 * 83 - 35;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > 4 * 101) {
        this.x = 4 * 101;
    }
    if (this.y < 83 - 35) {
        this.x = 2 * 101;
        this.y = 5 * 83 -35;
    }
}
/* Maps user inputs to changes in x or y of the player. Set so 
one input command moves the player sprite the distance of
one tile.*/

Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'left':
            this.x -= 101;
            return;
        case 'up':
            this.y -= 83;
            return;
        case 'right':
            this.x += 101;
            return;
        case 'down':
            this.y += 83;
            return;
    }
}
/* Instantiate and store all enemies in an array. */

var allEnemies = [];
for(var i = 0; i < 5; i++) {
    allEnemies.push(new Enemy());
}
/* Instantiate player. */

var player = new Player();

/* This listens for key presses and sends the keys to the
Player.handleInput() method. */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
