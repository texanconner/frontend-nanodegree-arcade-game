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

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 756;
    doc.body.appendChild(canvas);

    var menu = true;

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

        // Sets the menu to update and render instead of the game
        if ( menu === true)
        {
            updateMenu();
            renderMenu();
            if(menu === false)
                ctx.clearRect(0,0,500,606);
        }

        // Sets the game to run instead of the MENU.
        // TODO:  Probably just needs to be an else statement here.
        if ( menu === false)
        {
        update(dt);
        render();
        }

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
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


    // Checks the colisions of Player v Enemy, Player v Gem, and Player v Water
    function checkCollisions() {

        // Resets the enemy chain to the left of the screen if it goes off the right side.
        allEnemies.forEach(function(enemy) {

            if(enemy.x > 1300)
            {
                enemy.reset();
            }

            // Variables the check the bounds of the second and third enemies drawn on each row.
            // TODO:  Should be made to be adjustable and shared in app.js.
            var enemySecond = 335;
            var enemyThird = 758;
            // Checks if the borders of the player and the enemy overlap.  If so, reset the game, the score, and player.
            // The or statements check the 2nd and 3rd drawing of the enemy.
            if((player.x < enemy.x + 60 && player.x + 60 > enemy.x && player.y < enemy.y + 60 && player.y + 60 > enemy.y)
                || (player.x < enemy.x + 60 - enemySecond && player.x + 60 > enemy.x - enemySecond && player.y < enemy.y + 60 && player.y + 60 > enemy.y)
                || (player.x < enemy.x + 60 - enemyThird && player.x + 60 > enemy.x - enemyThird && player.y < enemy.y + 60 && player.y + 60 > enemy.y))
               {
                 reset();
                 player.score = 0;
                 document.getElementById( "scoreValue" ).innerHTML = player.score;
                 player.reset();
               }

            // Checks if borders of player overlap the gem.  If so, incremnet score, print the text to canvas for the gem.  Reset Gem.
            if(player.x < gem.x + 60 && player.x + 60 > gem.x && player.y < gem.y + 60 && player.y + 60 > gem.y)
                {
                    player.score++;
                    document.getElementById( "scoreValue" ).innerHTML = player.score;
                    gemText();

                    gem.reset();
                }

            // Checks if player has made it to the water.  Resets game.  Prints winner message.
            if(player.y < 30)
                {
                 player.reset();
                 winner();
                }
        });
    }

    // Prints winner message.
    function winner() {

    ctx.font = "20pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "red";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.fillText("You Win", canvas.width / 2, 24);
    ctx.strokeText("You Win", canvas.width / 2, 24);
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

    // Prints custom messages when player collects each gem.
    function gemText() {

        ctx.font = "12pt Impact";
        ctx.textAlign = "left";
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        if(gem.sprite === "images/Heart.png") {

            ctx.fillStyle = "red";
            ctx.fillText("Power of Love", 0, 40);
            ctx.strokeText("Power of Love", 0, 40);
        }

        if(gem.sprite === "images/Key.png") {

            ctx.fillStyle = "gold";
            ctx.fillText("Key Party", 100, 40);
            ctx.strokeText("Key Party", 100, 40);
        }

        if(gem.sprite === "images/Star.png") {

            ctx.fillStyle = "yellow";
            ctx.fillText("You're a Star", 166, 40);
            ctx.strokeText("You're a Star", 166, 40);
        }

        if(gem.sprite === "images/Gem Blue.png") {

            ctx.fillStyle = "blue";
            ctx.fillText("Blue Bank", 249, 40);
            ctx.strokeText("Blue Bank", 249, 40);
        }


        if(gem.sprite === "images/Gem Green.png") {

            ctx.fillStyle = "green";
            ctx.fillText("Hulk Out", 322, 40);
            ctx.strokeText("Hulk Out", 322, 40);
        }

        if(gem.sprite === "images/Gem Orange.png") {

            ctx.fillStyle = "orange";
            ctx.fillText("Orangatang", 380, 40);
            ctx.strokeText("Orangatang", 380, 40);
        }
    }


    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',  // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 8,
            numCols = 5,
            row, col;

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
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
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
        // Renders gems, player, and enemy.
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();

        gem.render();
    }

    // Updates the menu by calling the selector update.
    // Sets the status of the variable menu to know if we should exit the menu.
    function updateMenu () {

        selector.update();
        menu = selector.menu;
    }

    // Clears the Canvas the remove old text and renders the menu text and images.
    // TODO:  Check if we clear in another spot.
    function renderMenu () {

        ctx.clearRect(0,0, 505, 606);
        selector.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        "images/Gem Blue.png",
        "images/Gem Green.png",
        "images/Gem Orange.png",
        "images/Key.png",
        "images/Heart.png",
        "images/Star.png",
        "images/char-cat-girl.png",
        "images/char-horn-girl.png",
        "images/char-pink-girl.png",
        "images/char-princess-girl.png",
        "images/Selector.png"
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
