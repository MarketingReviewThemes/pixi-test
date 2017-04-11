(function () {
    'use strict';


    function PixiGame(name) {
        this.model = new app.Model();
        this.view = new app.View();
        this.controller = new app.Controller(this.model, this.view);
    }

    var pixiGame = new PixiGame('pixi-test');


})();
