/*global app, $on */
(function () {
    'use strict';


    function PixiGame(name) {
        this.storage = new app.Store(name);
        this.model = new app.Model(this.storage);
        this.template = new app.Template();
        this.view = new app.View();
        this.controller = new app.Controller(this.model, this.view);
    }

    var pixiGame = new PixiGame('pixi-test');

    function setView() {
        pixiGame.controller.setView(document.location.hash);
    }



    $on(window, 'load', setView);
    $on(window, 'hashchange', setView);
})();
