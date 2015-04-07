var ranNumber = function(lowerNum, higherNum) {
    return Math.floor(Math.random() * (higherNum - lowerNum + 1)) + lowerNum;
}
/* Enemies our player must avoid */

var Enemy = function() {
    
    this.sprite = 'images/enemy-bug.png';
    this.x = ranNumber(1, 4) * -101;
    this.y = (ranNumber(1, 3) * 83) - 25;
    this.speed = ranNumber(101, 202);
}

/* Update the enemy's position. Parameter: dt, a time delta between ticks */

Enemy.prototype.update = function(dt) {
    if (this.x > 506) {
        this.x = ranNumber(1, 4) * -101;
        this.y = (ranNumber(1, 3) * 83) - 25;        
    }
    this.x += this.speed * dt;
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 2 * 101;
    this.y = 5 * 83 - 35;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

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

var allEnemies = [];
for(var i = 0; i < 5; i++) {
    allEnemies.push(new Enemy());
}

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
