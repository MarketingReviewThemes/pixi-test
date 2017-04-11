(function (window) {
    'use strict';

    function Controller(model, view) {
        view.InitEvents();
        view.Render();
    }

    window.app = window.app || {};
    window.app.Controller = Controller;
})(window);
