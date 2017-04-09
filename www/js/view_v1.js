/*global qs, qsa, $on, $parent, $delegate */

(function (window) {
        'use strict';


    
    function View() {
        this.getAppView();

        setInterval(() => {
            this.addFigure();
        }, 1000);


        // this.pixiApp.ticker.add((delta) => {
        //     this.addFigure();
        // });


    }


    View.prototype.renderer = PIXI.autoDetectRenderer(800, 600, {
        view: qs('#scene-box')
    });
    View.prototype.container = new PIXI.Container(800, 600);

    View.prototype.getAppView = function() {

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


        //Rectangle for make container bigger
        var rectangle = new PIXI.Graphics();
        rectangle.beginFill(0xFFFFFF);
        rectangle.drawRect(0, 0, 800, 800);

        this.container.addChild(rectangle);

        var that = this;
        (function animate() {
            that.renderer.render(that.container);
            requestAnimationFrame(animate);
        })();

        // Click on scene

        // this.pixiApp.view.interactive = true;
        // this.pixiApp.view.addEventListener("click", (e) => {
        //     console.log(e);
        //     this.addFigure(e.clientX, e.clientY);
        // });
    };


    View.prototype.addFigure = function(posX, posY) {
        var circle = new PIXI.Graphics(),
            radius = Math.floor(Math.random() * (this.renderer.height/8 - 1)) + 1,
            posX = posX || Math.floor(Math.random() * (this.renderer.width - 1)) + 1,
            posY = posY || Math.floor(Math.random() * (this.renderer.height - 1)) + 1;

        circle.beginFill(0xFF3300);
        circle.lineStyle(4, 0xffd900, 1);
        circle.drawCircle(posX, posY, radius);

        // CLICK event for figure
        circle.interactive = true;
        circle.buttonMode = true;
        circle.id = "circle";
        circle.on('click', (e) => {
            circle.destroy();
        });
        this.container.addChild(circle);
    };



    // Export to window
    window.app = window.app || {};
    window.app.View = View;
}(window));
