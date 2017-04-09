/*global qs, qsa, $on, $parent, $delegate */

(function (window) {
    'use strict';

    var WIDTH = 800,
        HEIGHT = 600,
        PAD = 100;


    function View() {
        this.createAppContainer();

        setInterval(() => {
            this.addFigure();
        }, 1000);


        this.pixiApp.ticker.add((delta) => {
            this.container.children.forEach(this.updatePosition);
        });
    }


    View.prototype.pixiApp = new PIXI.Application(WIDTH, HEIGHT);
    
    View.prototype.renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT, {
        view: qs('#scene-box')
    });
    View.prototype.container = new PIXI.Container();


    View.prototype.createAppContainer = function() {

        this.container.interactive = true;
        this.container.buttonMode = true;
        this.container.id = 'container';

        this.container.on('pointerdown', (e) => {
        //  this.pixiApp.stage.on('pointertap', (e) => {

            if(e.target.id == "circle") {
                console.log("Circle clicked");
                e.stopPropagation();
            } else {
                console.log("container clicked");
                this.addFigure(e.data.originalEvent.clientX, e.data.originalEvent.clientY);
            }
        });


        //Rectangle for make container with rectangle size
        var rectangle = new PIXI.Graphics();
        rectangle.beginFill(0xFFFFFF);
        rectangle.drawRect(0, 0, WIDTH, HEIGHT);

        this.container.addChild(rectangle);

        var that = this;
        (function animate() {
            that.renderer.render(that.container);
            requestAnimationFrame(animate);
        })();
    };


    View.prototype.addFigure = function(posX, posY) {
        var circle = new PIXI.Graphics(),
            radius = Math.floor(Math.random() * (this.renderer.height/8 - 1)) + 1,
            posX = posX || Math.floor(Math.random() * (this.renderer.width - 1)) + 1,
            posY = posY || Math.floor(Math.random() * (this.renderer.height - 1)) + 1;

        var speed = 200.0; //px per second
        circle.vx = 0;
        circle.vy = speed / 60.0;

        // circle.update = this.updatePosition;

        circle.beginFill(0xFF3300);
        circle.lineStyle(4, 0xffd900, 1);
        circle.drawCircle(posX, posY, radius);

        // CLICK event for figure
        circle.interactive = true;
        circle.buttonMode = true;
        circle.id = "circle";
        circle.on('click', (e) => {
            e.target.destroy();
        });
        this.container.addChild(circle);
    };


    View.prototype.updatePosition = function(figure) {
        // figure.x += figure.vx;
        figure.y += figure.vy;

        if (figure.y > HEIGHT + PAD) {
            figure.y -= HEIGHT + 2 * PAD;
        }

    };



    // Export to window
    window.app = window.app || {};
    window.app.View = View;
}(window));
