(function (window) {
	'use strict';

	/**
	 * Takes a model and view and acts as the controller between them
	 *
	 * @constructor
	 * @param {object} model The model instance
	 * @param {object} view The view instance
	 */
	function Controller(model, view) {
		var self = this;
		self.model = model;
		self.view = view;
		self.view.InitEvents();
		self.view.Render();
    }

    // Controller.prototype.showAll = function () {
    //     var self = this;
    //     self.model.read(function (data) {
    //         self.view.Render();
    //     });
    // };

	/**
	 * Loads and initialises the view
	 *
	 * @param {string} '' | 'active' | 'completed'
	 */
	Controller.prototype.setView = function (locationHash) {
		var route = locationHash.split('/')[1];
		var page = route || '';
	};


	// Export to window
	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);
