/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods. */

var Engine = (function(global) {

    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM. */

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods. */

    function main() {

        /* Get our time delta information. */

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation. */

        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called. */

        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame. */

        win.requestAnimationFrame(main);
    };

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. */

    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    /* This is called by the update function  and loops through all of the
     * objects within the allEnemies array as defined in app.js and calls
     * their update() methods. */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
       player.update();
    }

    /* Check for collision and reset player if it occures. */

    function checkCollisions() {
        for (var i = 0; i < allEnemies.length; i++) {
            if (player.y == allEnemies[i].y - 10
                && player.x + 30 < allEnemies[i].x + 101
                && player.x + 75 > allEnemies[i].x) {
                player = new Player();
            }
        }
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function.*/

    function render() {

        /* This array holds the relative URL to the image used
         * for that particular row of the game level. */

        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid" */

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }


        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions. */

    function renderEntities() {

        /* Loop through all of the objects within the allEnemies array and call
         * the render function.*/

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser).*/

    global.ctx = ctx;
    
})(this);
