(function(){
	var maxVel = 40;

	// Constructeur
	Player = function(scale) {
	    this.scale = scale;             // échelle
	    this.box2dUtils = new Box2dUtils(scale);    // instancier la classe utilitaire box2d
	    this.object = null;             // l'objet "physique" player
	}
	// classe player
	Player.prototype = {
	    // créer l'objet physique "player"
	    createPlayer : function(world, x, y, radius) {
	        this.object = this.box2dUtils.createPlayer(world, x, y, radius, 'player');
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
	}
}());