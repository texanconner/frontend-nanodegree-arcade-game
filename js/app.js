// TODO:  change if statements per style guide to: return val ? foo() : bar(); form


// Enemies our player must avoid
var Enemy = function(enemyLevel) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Starts the enemy to the left of the canvas.
    // Placed each enemy on an incrementing row.  Enemy Level is from the instance loop.
    // TODO: 83 is the row height, could probably place it in a var.
    this.x = -100;
    this.y = enemyLevel * 83 + 60;

    // Gives each enemy a randomly assigned speed.
    this.speed = enemySpeed();

};


// Returns a random speed value between 80 and 200
function enemySpeed() {

    var speed = Math.floor(Math.random() * 200) + 80;

    return speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

};

// Resets the enemy back to the left of the canvas and reassigns a random speed.
Enemy.prototype.reset = function() {

    this.x = -100;
    this.speed = enemySpeed();


};


// Draw the enemy on the screen, required method for game
// Draws 3 enemies per each row at fixed distances between them.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x - 335, this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x - 758, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    // Sets initial position and attributes for the player instance
    // Selector.choice1 allows for the player image to change during the menu
    this.sprite = selector.choice1;
    this.x = 200;
    this.y = 561;

    this.moveX = 0;
    this.moveY = 0;

    this.score = 0;

};


// Updates the player position.
Player.prototype.update = function()
{

    this.x += this.moveX;
    this.y += this.moveY;
    this.moveX = 0;
    this.moveY = 0;

};

// Draws the player to the canvas at current position.
Player.prototype.render = function() {

     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Resets the player to initial starting point.
Player.prototype.reset = function() {

    this.x = 200;
    this.y = 561;

};

// Takes keyboard input to change the position of the player.
// Limits the player to the bounds of the canvas
// TODO: change the bounds and movement numbers to vars for better customiztion.

Player.prototype.handleInput = function(key){

     switch( key )
    {
        case 'left':
            this.moveX = -30;
            if(this.x < 0)
                this.moveX = 0;
            break;

        case 'up':
            this.moveY = -30;
            if(this.y < 10)
                this.moveY = 0;
            break;

        case 'right':
            this.moveX = 30;
            if(this.x > 400)
                this.moveX = 0;
            break;

        case 'down':
            this.moveY = 30;
            if(this.y > 560)
                this.moveY = 0;
            break;

// Clears the canvas after the menu selection.
// TODO:  Find a better way to implement this more logically.
        case 'space':
            ctx.clearRect(0,0, 500, 100);
            break;

        default:
            break;
    }


};

// Creates the Gem object and assigns random position and type(sprite) of gem.
var Gem = function() {


    this.getGemType(Math.floor(Math.random() * 6) + 1);

    this.x = Math.floor(Math.random() * 6) * 60 + 10;
    this.y = Math.floor(Math.random() * 6) * 60 + 10;

};

// Assigns the Gem sprite from a random number passed to the function.
// TODO:  Should move this to an array instead of switch case.
Gem.prototype.getGemType = function(gemSelect) {


        switch(gemSelect)
    {
        case 1:
            this.sprite = "images/Gem Blue.png";
        break;

        case 2:
            this.sprite = "images/Gem Green.png";
        break;

        case 3:
            this.sprite = "images/Gem Orange.png";
        break;

        case 4:
            this.sprite = "images/Key.png";
        break;

        case 5:
            this.sprite = "images/Heart.png";
        break;

        case 6:
            this.sprite = "images/Star.png";
        break;

        default:
            break;
    }
};

// Draws the gem at its current position.
Gem.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Resets the gem position and assigns a random type.
Gem.prototype.reset = function() {

    this.x = Math.floor(Math.random() * 6) * 60 + 10;
    this.y = Math.floor(Math.random() * 6) * 60 + 10;

    this.getGemType(Math.floor(Math.random() * 6) + 1);
};

// Creates the Selector class used for the menu
// Assigns the selector sprite, position.

var Selector = function() {

    this.sprite = "images/Selector.png";
    this.x = 0;
    this.y = 250;
    this.moveX = 0;

    // Keeps the engine running the menu functions instead of the game functions.
    this.menu = true;

    // Used to choose the player sprite
    this.selectImage = 0;

    // Array of player sprite choices.
    this.playerImages = [

        "images/char-princess-girl.png",
        "images/char-pink-girl.png",
        "images/char-horn-girl.png",
        "images/char-cat-girl.png",
        "images/char-boy.png"
        ];
};

Selector.prototype.render = function() {

    //Daws the Canvas Text for the Menu Header
    ctx.font = "36pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "red";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    ctx.fillText("Select a Champion", 250, 40);
    ctx.strokeText("Select a Champion", 250, 40);

    ctx.font = "16pt Impact";
    ctx.fillStyle = "white";
    ctx.lineWidth = 1;
    ctx.fillText("Use arrow keys and space bar", 250, 90);
    ctx.strokeText("Use arrow keys and space bar", 250, 90);


    //Draws the selector
    ctx.drawImage(Resources.get(this.sprite), this.x, 200);

    //Draws the 5 player sprites to the screen
    for( var numPlayers = 0; numPlayers < 5; numPlayers ++) {
        ctx.drawImage(Resources.get(this.playerImages[numPlayers]), numPlayers * 83, 200);
    }
};

// Updates the Selector position
Selector.prototype.update = function() {

    this.x += this.moveX;
    this.moveX = 0;
};

// Uses the event listener to handle keyboard input for moving the selector
// Limits the selctor movement
// Uses space to exit the menu and update the player sprite with the selection
Selector.prototype.handleInput = function(key) {

    switch(key)
    {
        case "right":
            this.moveX += 83;
            this.selectImage++;
            if(this.x === 332)
            {
                this.moveX = 0;
                this.selectImage=4;
            }
        break;

        case "left":
            this.moveX -= 83;
            this.selectImage-- ;
            if(this.x === 0)
            {
                this.moveX=0;
                this.selectImage=0;
            }
        break;

        case "space":
            this.menu = false;
            player.sprite = this.playerImages[this.selectImage];
        break;

        default:
            break;
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// number of enemies to start with
var totalEnemies = 5;
var allEnemies = [];

// add the enemies to the allEnemies array
// the counter determines which row the enemy appears on
for( var enemyCounter = 0; enemyCounter < totalEnemies; enemyCounter++ )
{
    // enemyCounter determines the row the bug appears on
    allEnemies.push( new Enemy( enemyCounter ) );
}

// Creates intances of the player, gem, and selectors.  Sets score to 0.
var selector = new Selector();
var player = new Player();

var gem = new Gem();
var score = 0;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    selector.handleInput(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
});
