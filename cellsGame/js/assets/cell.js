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

		this.coord = {
			x : 0,
			y : 0
		}
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

	Cell.prototype.getCoord = function() {
		return this.coord;
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

		delete(root.cellsGame.engine.world.grid[this.coord.x][this.coord.y]);

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
		var x = this.coord.x;
		var y = this.coord.y;
		var coord = { x : x, y : y};
		var ran = Math.floor(Math.random() * 4) + 1;	

			switch(ran) {
				// droite haut gauche bas
				case 1:
					if ( x + 1 < root.cellsGame.engine.world.cols && !root.cellsGame.engine.world.grid[x + 1][y] ) {
						coord.x = x + 1;
						coord.y = y;		
					} else if ( y > 0 && !root.cellsGame.engine.world.grid[x][y - 1] ) {
						coord.x = x;
						coord.y = y - 1;
				    } else if ( x > 0 && !root.cellsGame.engine.world.grid[x - 1][y] ) {
						coord.x = x - 1;
						coord.y = y;		
					} else if ( y + 1 < root.cellsGame.engine.world.rows && !root.cellsGame.engine.world.grid[x][y + 1] ) {
						coord.x = x;
						coord.y = y + 1;		
					}	
				break;

				// gauche droite haut bas
				case 2:
					if ( x > 0 && !root.cellsGame.engine.world.grid[x - 1][y] ) {
						coord.x = x - 1;
						coord.y = y;		
					} else if ( x + 1 < root.cellsGame.engine.world.cols && !root.cellsGame.engine.world.grid[x + 1][y] ) {
						coord.x = x + 1;
						coord.y = y;		
					} else if ( y > 0 && !root.cellsGame.engine.world.grid[x][y - 1] ) {
						coord.x = x;
						coord.y = y - 1;		
					} else if ( y + 1 < root.cellsGame.engine.world.rows && !root.cellsGame.engine.world.grid[x][y + 1] ) {
						coord.x = x;
						coord.y = y + 1;		
					}	
				break;

				// gauche droite bas haut
				case 3:
					if ( x > 0 && !root.cellsGame.engine.world.grid[x - 1][y] ) {
						coord.x = x - 1;
						coord.y = y;		
					} else if ( x + 1 < root.cellsGame.engine.world.cols && !root.cellsGame.engine.world.grid[x + 1][y] ) {
						coord.x = x + 1;
						coord.y = y;		
					} else if ( y + 1 < root.cellsGame.engine.world.rows && !root.cellsGame.engine.world.grid[x][y + 1] ) {
						coord.x = x;
						coord.y = y + 1;		
					} else if ( y > 0 && !root.cellsGame.engine.world.grid[x][y - 1] ) {
						coord.x = x;
						coord.y = y - 1;		
					}

				break;

				// bas haut gauche droite
				case 4:
				default:
					if ( y > 0 && !root.cellsGame.engine.world.grid[x][y - 1] ) {
						coord.x = x;
						coord.y = y - 1;		
					} else if ( y + 1 < root.cellsGame.engine.world.rows && !root.cellsGame.engine.world.grid[x][y + 1] ) {
						coord.x = x;
						coord.y = y + 1;		
					} else if ( x > 0 && !root.cellsGame.engine.world.grid[x - 1][y] ) {
						coord.x = x - 1;
						coord.y = y;		
					} else if ( x + 1 < root.cellsGame.engine.world.cols && !root.cellsGame.engine.world.grid[x + 1][y] ) {
						coord.x = x + 1;
						coord.y = y;		
					}	
				break;
			}
			

			if (x != coord.x || y != coord.y) {
				var p = new CellProperties( this.properties.getAttributs() );
				p.regenLife = this.properties.getRegenLife();
				p.age = 0;
				p.life = p.maxLife / 2;
				var c = new Cell({properties: p});
				c.coord = coord;
				root.cellsGame.engine.world.grid[coord.x][coord.y] = c;
				$( this ).trigger( "divised", { cell : c } );
			}

	}

	if (typeof root.Cell === "undefined") {
		root.Cell = Cell;
	}
} )( window );