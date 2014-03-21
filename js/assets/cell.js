/**
	Classe cellule

*/
( function( root ){
	var Class = Cell = root.cellsGame.Cell = function( obj ) {
		var attributs = {
			uniqid     : root.cellsGame.utils.uniqid(),
			properties : (obj) ? null : new CellProperties(),
			listEvent  : { dead          : 'dead', 
					       divised       : 'divised',
					       energyChanged : 'energyChanged',
					       ageChanged    : 'ageChanged',
					       newCycle      : 'newCycle' },
			listEventAttribut : [ 'changed' ]
		};
		root.cellsGame.utils.initClass( Class, this, attributs, obj);

		root.cellsGame.engine.nbCell++;
		root.cellsGame.engine.cells[ this.uniqid ] = this;

		var self = this;
		
		this.addHandler( 'dead', function(){
			self.destroy();
		});

		this.addHandler( 'energyChanged', function(){
			if ( self.isDead() ) {
				$( self ).trigger( 'dead' );
			}
		});

		this.addHandler( 'ageChanged', function(){
			if ( self.isDead() ) {
				$( self ).trigger( 'dead' );
				return;
			}
			var lifetime = self.getLifetime();
			if ( self.getAge() * 100 / lifetime >= 70 ) {
				var rand = parseInt( Math.random( 0, lifetime ) * lifetime );
				if ( rand < lifetime / 3 ) {
					self.division();
				}
			}
		});


		this.addHandler( 'newCycle', function(){
			self.incAge();
		});
	};


	/**************
	 *	Accesseurs
	 **************/
	Cell.prototype.getListEvent = function() {
	 	return this.listEvent;
	}

	Cell.prototype.getUniqid = function() {
	 	return this.uniqid;
	}
	Cell.prototype.getAge = function() {
		return this.properties.getAge();
	};
	Cell.prototype.getLife = function() {
		return this.properties.getLife();
	};
		
	Cell.prototype.getMaxLife = function() {
		return this.properties.getMaxLife();
	};
	Cell.prototype.getEnergy = function() {
		return this.properties.getEnergy();
	};
	Cell.prototype.getLifetime = function() {
		return this.properties.getLifetime();
	};
	Cell.prototype.getADN = function() {
		return this.properties.getADN();
	};
	Cell.prototype.getMaxEnergy = function() {
		return this.properties.getMaxEnergy();
	};

	Cell.prototype.getRegenEnergy = function() {
		return this.properties.getRegenEnergy();
	}

	Cell.prototype.getRegenLife = function() {
		return this.properties.getRegenLife();
	}

	Cell.prototype.getAge = function() {
		return this.properties.getAge();
	}



	/***************
	 *	Commandes
	 ***************/
	Cell.prototype.destroy = function() {
		this.properties.destroy();

		// suppression des écouteurs
		for ( var i in this.listEvent ) {
			$(this).off( i );
		}
		if ( root.cellsGame.engine.nbCell > 0) {
			root.cellsGame.engine.nbCell--;
		}

		delete( root.cellsGame.engine.cells[ this.uniqid ] );

	}
	Cell.prototype.addHandler = function( name, func ) {

		if ( name in this.properties.getListEvent() ) {
			this.properties.addHandler( name, func );
		} else if ( name in this.getListEvent() ) {
			$( this ).on( name, func );
		}
	};

	Cell.prototype.isDead = function() {
		var p = this.properties;
		return (p.getEnergy() == 0
			&& p.getLife() == 0)
			|| p.getAge() == p.getLifetime();
	}

	Cell.prototype.isAlive = function() {
		return !this.isDead();
	}

	Cell.prototype.incAge = function() {
		if ( this.isDead() ) { 
			throw "Cell : La cellule est morte : action impossible.";
		}
		this.properties.incAge();
	};

	Cell.prototype.incEnergy = function() {
		if ( this.isDead() ) { 
			throw "Cell : La cellule est morte : action impossible.";
		}
		this.properties.incEnergy();
	};

	Cell.prototype.decEnergy = function() {
		if ( this.isDead() ) { 
			throw "Cell : La cellule est morte : action impossible.";
		}
		this.properties.decEnergy();
	};

	Cell.prototype.incLife = function() {
		if ( this.isDead() ) { 
			throw "Cell : La cellule est morte : action impossible.";
		}
		this.properties.incLife();
	};

	Cell.prototype.decLife = function() {
		if ( this.isDead() ) { 
			throw "Cell : La cellule est morte : action impossible.";
		}
		this.properties.decLife();
	};

	Cell.prototype.incRegenLife = function() {
		if ( this.isDead() ) { 
			throw "Cell : La cellule est morte : action impossible.";
		}
		this.properties.incRegenLife();
	}

	Cell.prototype.decRegenLife = function() {
		if ( this.isDead() ) { 
			throw "Cell : La cellule est morte : action impossible.";
		}
		this.properties.decRegenLife();
	}

	Cell.prototype.incRegenEnergy = function() {
		if ( this.isDead() ) { 
			throw "Cell : La cellule est morte : action impossible.";
		}
		this.properties.incRegenEnergy();
	}

	Cell.prototype.decRegenEnergy = function() {
		if ( this.isDead() ) { 
			throw "Cell : La cellule est morte : action impossible.";
		}
		this.properties.decRegenEnergy();
	}

	Cell.prototype.division = function() {
		if ( this.isDead() ) { 
			throw "Cell : La cellule est morte : action impossible.";
		}
		if ( root.cellsGame.engine.nbCell >= root.cellsGame.engine.nbMaxCell ) {
			return;
		}
		var p = new CellProperties( this.properties.getAttributs() );
		p.regenLife = this.properties.getRegenLife();
		p.age = 0;
		p.life = p.maxLife / 2;
		var c = new Cell({properties: p});
		$( this ).trigger( "divised", { cell : c } );
	}

	if (typeof root.Cell === "undefined") {
		root.Cell = Cell;
	}
} )( window );