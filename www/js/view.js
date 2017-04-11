/*global qs, qsa, $on, $parent, $delegate */

(function (window) {
    'use strict';

    var WIDTH = 800,
        HEIGHT = 600,
        QUANTITY = 1,
        GRAVITY = 100.0,
        SQUARE = 0,
        COUNTER = 0;

    function View() {

        this.$counterValue = qs(".counterValue");
        this.$squareValue = qs(".squareValue");
        this.$gravityValue = qs("#gravityValue");
        this.$quantityValue = qs("#quantityValue");

    }
    View.prototype.pixiApp = new PIXI.Application(WIDTH, HEIGHT);


    View.prototype.renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT, {
        view: qs('#scene-box')
    });
    View.prototype.container = new PIXI.Container();
    
    View.prototype.InitEvents = function() {

        qs('#gravity .minusGravity').addEventListener("click", () => {
            this.updateGravity("minus");
        });
        qs('#gravity .plusGravity').addEventListener("click", () => {
            this.updateGravity("plus");
        });


        qs(".minusQuantity").addEventListener("click", () => {
            this.updateQuantity("minus");
        });
        qs(".plusQuantity").addEventListener("click", () => {
            this.updateQuantity("plus");
        });
        this.$quantityValue.innerHTML = QUANTITY;
        this.$gravityValue.innerHTML = GRAVITY;

    };



    View.prototype.Render = function() {

        this.container.interactive = true;
        this.container.buttonMode = true;
        this.container.id = 'container';

        this.container.on('pointerdown', (e) => {
            if(e.target.id == "circle") {
                console.log("Circle clicked");
                e.stopPropagation();
            } else {
                console.log("container clicked");
                this.addFigure(e.data.originalEvent.clientX, e.data.originalEvent.clientY);
            }
        });

        //Rectangle for make container with rectangle size and possible to have event on click with bubbling
        var rectangle = new PIXI.Graphics();
        rectangle.beginFill(0xFFFFFF);
        rectangle.drawRect(0, 0, WIDTH, HEIGHT);
        this.container.addChild(rectangle);

        var that = this;
        (function animate() {
            that.renderer.render(that.container);
            requestAnimationFrame(animate);
        })();

        // Add figures to the scene each 1sec
        setInterval(() => {
            for(var i =0; i < QUANTITY; i++) {
                this.addFigure();
            }
        }, 1000);

        //Update position of the figures according ticker
        this.pixiApp.ticker.add((delta) => {
            this.container.children.forEach(this.updatePosition);
        });
    };


    View.prototype.addFigure = function(posX, posY) {
        var circle = new PIXI.Graphics(),
            radius = Math.floor(Math.random() * (this.renderer.height/8 - 10)) + 10,
            posX = posX || Math.floor(Math.random() * (this.renderer.width - 1)) + 1,
            posY = posY || 0,
            sqr = Math.PI * Math.pow(radius, 2);

        circle.vx = 0;
        circle.vy = 100.0 / 60.0;

        circle.beginFill(0xFF3300);
        circle.lineStyle(4, 0xffd900, 1);
        circle.drawCircle(posX, posY, radius);

        // CLICK event for figure
        circle.interactive = true;
        circle.buttonMode = true;
        circle.id = "circle";

        circle.on('click', (e) => {
            e.target.destroy();
            this.updateStats("minus", sqr);
        });
        this.container.addChild(circle);
        this.updateStats("plus", sqr);

    };


    View.prototype.updatePosition = function(figure) {
        if(figure.id == "circle") {
            figure.y += GRAVITY / 60.0;
        }
    };


    View.prototype.updateGravity = function(way) {
        if(way == "minus" && GRAVITY > 50) {
            GRAVITY -= 50;
        } else if (way == "plus") {
            GRAVITY += 50;
        }
        this.$gravityValue.innerHTML = GRAVITY;
    };


    View.prototype.updateQuantity = function(way) {
        if(way == "minus" && QUANTITY > 1) {
            QUANTITY -= 1;
        } else if (way == "plus") {
            QUANTITY += 1;
        }
        this.$quantityValue.innerHTML = QUANTITY;
    };


    View.prototype.updateStats = function(way, sqr) {
        if(way == "minus" && COUNTER > 0) {
            COUNTER--;
            SQUARE -= sqr;
        } else if (way == "plus") {
            COUNTER += 1;
            SQUARE += sqr;
        }
        this.$counterValue.innerHTML = COUNTER;
        this.$squareValue.innerHTML = parseInt(SQUARE);
    };

    // Export to window
    window.app = window.app || {};
    window.app.View = View;
}(window));
