var app = app = {};
(function($, undefined) {
	"use strict";
	
	app.Events = {
		ready: function() {
			app.defaults.init();
		},
		
		/*load: function() {

		}*/
	},
	
	app.defaults = {
		init: function() {
			this.startDefaults();
		}
	}
	
	/* Initialize.
	--------------------------------------------------------------------------------*/
	$(document).ready(app.Events.ready);
})(jQuery);