/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas,
        ctx,
        lastTime;

    canvas = document.querySelector('canvas');

    if(!canvas) {
        canvas= doc.createElement('canvas');
        doc.body.appendChild(canvas);
    }
    else {
        canvas.className = '';
    }
    if(numCols<=10) {
        canvasWidth = 505;
        doc.body.style.width = '505px';
    }
    else {
        canvasWidth = 808;
        doc.body.style.width = '808px';
    }
    canvas.width = canvasWidth;
    canvas.height = 606;
    ctx = canvas.getContext('2d');

    var rowImages = [
                'images/water-block.png',   // Top row is water
            ];

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        if(!won) {
            update(dt);
        }
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        if(cancelAnimation) {
           cancelAnimationFrame(request);
        }
        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        request = win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        request = win.requestAnimationFrame(main);
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        var row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]),
                    col * blockWidth, row * blockHeight,
                    blockWidth, imgHeight);

            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    /* This function resets the game according to the setting paramters,
     * it sets the images of each row (rowImages), the enemy array allEnemies,
     * resets each Enemy and Player.
     */
    function reset() {
        numRows = numBricks + numGrass + 1;
        hRatio = 586/((numRows-1)*83+171);
        blockHeight = Math.round(hRatio*83);
        blockWidth = Math.floor(canvasWidth/numCols);
        imgHeight = hRatio*171;
        imgWidth = hRatio*101;
        console.log(imgWidth, imgHeight);

        wRatio = blockWidth/101;

        canvasWidth = blockWidth*numCols;
        canvas.width = canvasWidth;
         /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        for(var i=0; i<numBricks; i++)
            rowImages.push('images/stone-block.png');

        for(i=0; i<numGrass; i++)
            rowImages.push('images/grass-block.png');

        var nbug = allEnemies.length;
        var enemy;
        if( nbug < numBugs) {
            for(i=nbug; i<numBugs; i++) {
                enemy = new Enemy();
                allEnemies.push(enemy);
            }
        } else {
            for(i=numBugs; i<nbug; i++) {
                allEnemies.pop();
            }
        }

        allEnemies.forEach(function(enemy) {
            enemy.reset();
        });

        player.reset();
        player.sprite = playerImageSrc;
    }

    // Check if player collides with enemy, only check those enemies at the same row with the player
    // player's left, right is [18, 84], enemy's left, right is [18, 81], with respect to
    // respective left position
    function checkCollisions() {
        for(var i = 0; i<allEnemies.length; i++) {
            var enemy = allEnemies[i];
            if (enemy.row == player.row && (player.x + 84*wRatio) > (enemy.x+18*hRatio) &&
                (enemy.x + 81*hRatio) > (player.x + 18*wRatio)) {
                hit = true;
                break;
            }
        }
    }

    var resources = ['images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png'];
    resources.push(playerImageSrc);

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     * Add a line call Resources.clear, to clear callback function in Resources.
     */
    Resources.clear();
    Resources.onReady(init);
    Resources.load(resources);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
};
