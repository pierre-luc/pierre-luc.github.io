(function( root ){
	var maxVel = 40;

	// Constructeur
	var Class = Player = root.cellsGame.Player = function( obj ) {
	    this.scale = obj;             // échelle
	    this.box2dUtils = new Box2dUtils(this.scale);    // instancier la classe utilitaire box2d
	    this.object = null;             // l'objet "physique" player
	}

	var self = this;

	// classe player
	Player.prototype.createPlayer = function(world, x, y, radius, userData) {
		if (typeof root.cellsGame.gip.player == 'undefined') {
			this.object = this.box2dUtils.createPlayer(world, x, y, radius, userData);
			root.cellsGame.gip.player = this;
		}
	}

	Player.prototype.jump = function () {
		var vel = this.object.GetBody().GetLinearVelocity();
		if (vel.y > -maxVel+5 / this.scale) {
			vel.y += -5 / this.scale;
		} else {
			vel.y = 0 / this.scale;
		}
	}

	Player.prototype.down = function () {
		var vel = this.object.GetBody().GetLinearVelocity();
		if (vel.y < maxVel-5 / this.scale) {
			vel.y += 5 / this.scale;
		} else {
			vel.y = maxVel / this.scale;
		}
	}

	Player.prototype.moveRight = function () {
		var vel = this.object.GetBody().GetLinearVelocity();
		if (vel.x < maxVel-5 / this.scale) {
			vel.x += 5 / this.scale;
		} else {
			vel.x = maxVel / this.scale;
		}
	}

	Player.prototype.moveLeft = function () {
		var vel = this.object.GetBody().GetLinearVelocity();
		if (vel.x > -maxVel+5 / this.scale) {
			vel.x += -20 / this.scale;
		} else {
			vel.x = 0 / this.scale;
		}
	}

	/*Player.prototype = {
	    // créer l'objet physique "player"
	    createPlayer : function(world, x, y, radius, userData) {
	        this.object = this.box2dUtils.createPlayer(world, x, y, radius, userData);
	    },

	    // Sauter
		jump : function() {
		    var vel = this.object.GetBody().GetLinearVelocity();
			if (vel.y > -maxVel+5 / this.scale) {
				vel.y += -5 / this.scale;
			} else {
				vel.y = 0 / this.scale;
			}
		},
	    // Descendre
		down : function() {
		    var vel = this.object.GetBody().GetLinearVelocity();
			if (vel.y < maxVel-5 / this.scale) {
				vel.y += 5 / this.scale;
			} else {
				vel.y = maxVel / this.scale;
			}
		},
		// Effectuer un déplacement vers la droite
		moveRight : function() {
		    var vel = this.object.GetBody().GetLinearVelocity();
			if (vel.x < maxVel-5 / this.scale) {
				vel.x += 5 / this.scale;
			} else {
				vel.x = maxVel / this.scale;
			}
		},
		// Effectuer un déplacement vers la gauche
		moveLeft : function() {
		    var vel = this.object.GetBody().GetLinearVelocity();
			if (vel.x > -maxVel+5 / this.scale) {
				vel.x += -20 / this.scale;
			} else {
				vel.x = 0 / this.scale;
			}
		}
	}*/
})( window );