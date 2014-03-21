( function( root ){
	// constructeur
	var Class = CellProperties = root.cellsGame.CellProperties = function( obj ) {
		if ( obj.uniqid ) {
			delete( obj['uniqid'] );
		}
		var attributs = this.attributs = {
			uniqid    : root.cellsGame.utils.uniqid(),
			// age de la cellule
			age       : 0,
			// niveau courant de vie de la cellule
			life      : 30,
			// niveau de vie maximal
			maxLife   : 100,
			// durée de vie de la cellule
			lifetime  : 10,
			// niveau courant d'énergie
			energy    : 15,
			// niveau d'énergie maximal
			maxEnergy : 27,
			/* temps en secondes pour gagner un points d'énergie supplémentaire
			 * si le niveau d'énergie est strictement inférieur à maxEnergy 
			 */
			regenEnergy : 2,
			/* temps en secondes pour gagner un points de vie supplémentaire
			 * si le niveau de vie est strictement inférieur à maxLife
			 * et si le niveau d'énergie est égal à maxEnergy
			 */
			regenLife : 5,
			// nombre de points ADN
			adn       : 3,
			// taile de la cellule
			size      : 10,
			// vitesse de déplacement de la cellule
			speed     : 5,
			listEvent : {},
			listEventAttribut : [ 'changed' ]
		};
		root.cellsGame.utils.initClass( Class, this, attributs, obj );

		CellProperties.prototype.getUniqid = function() {
			return this.uniqid;
		}
		CellProperties.prototype.getAttributs = function() {
			return this.attributs;
		}
		CellProperties.prototype.getAge = function() {
			return this.age;
		}
		CellProperties.prototype.getLife = function() {
			return this.life;
		}
		CellProperties.prototype.getLifetime = function() {
			return this.lifetime;
		}
		CellProperties.prototype.getMaxLife = function() {
			return this.maxLife;
		}
		CellProperties.prototype.getEnergy = function() {
			return this.energy;
		}
		CellProperties.prototype.getMaxEnergy = function() {
			return this.maxEnergy;
		}
		CellProperties.prototype.getRegenEnergy = function() {
			return this.regenEnergy;
		}
		CellProperties.prototype.getRegenLife= function() {
			return this.regenLife;
		}
		CellProperties.prototype.getAdn = function() {
			return this.adn;
		}
		CellProperties.prototype.getSize = function() {
			return this.size;
		}
		CellProperties.prototype.getSpeed = function() {
			return this.speed;
		}
		CellProperties.prototype.getListEvent = function() {
			return this.listEvent;
		}
		CellProperties.prototype.getListEventAttribut = function() {
			return this.listEventAttribut;
		}

		var self = this;
		this.regenEnergyTimerFunction = function(){
			if ( root.cellsGame.engine.paused ) {
				return;
			}
			if ( self.getEnergy() < self.getMaxEnergy() ) {
				self.incEnergy();
			}
		};
		this.regenEnergyTimer = setInterval(this.regenEnergyTimerFunction, this.regenEnergy * 1000);

		this.regenLifeTimerFunction = function(){
			if ( root.cellsGame.engine.paused ) {
				return;
			}
			if ( self.getEnergy() == self.getMaxEnergy() 
					&& self.getLife() < self.getMaxLife() ) {
				
				self.incLife();
			}
		};
		this.regenLifeTimer = setInterval(this.regenLifeTimerFunction, this.regenLife * 1000);

	};

	/*************
	 *	Mutateurs
	 *************/
	CellProperties.prototype.setMaxLife = function( maxLife ) {
		if ( maxLife < 0 ) {
			throw "CellProperties : maxLife < 0";
		}
		this.maxLife = maxLife;
	};
	CellProperties.prototype.setLife = function( life ) {
		if ( life < 0 || life > this.maxLife ) {
			throw "CellProperties : life < 0 || life > lifetime";
		}
		this.life = life;
		this.firePropertyChanged( 'life' );
	};
	CellProperties.prototype.setLifetime = function( lifetime ) {
		if ( lifetime < 0 ) {
			throw "CellProperties : lifetime < 0";
		}
		this.lifetime = lifetime;
	};
	CellProperties.prototype.setEnergy = function( energy ) {
		if ( energy < 0 || energy > this.maxEnergy ) {
			throw "CellProperties : energy < 0 || energy > maxEnergy";
		}
		this.energy = energy;
		this.firePropertyChanged( 'energy' );
	};
	CellProperties.prototype.setMaxEnergy = function( maxEnergy ) {
		if ( maxEnergy < 0 ) {
			throw "CellProperties : maxEnergy < 0";
		}
		this.maxEnergy = maxEnergy;
	}

	CellProperties.prototype.setADN = function( adn ) {
		if ( adn < 0 ) {
			throw "Erreur : adn < 0";
		}
		this.adn = adn;
	}


	/*************
	 *	Commandes
	 *************/
	CellProperties.prototype.destroy = function() {
		//*
		for ( var i in this.listEvent ) {
			$(this).off( i );
		}
		//*/
		clearInterval( this.regenEnergyTimer );
		clearInterval( this.regenLifeTimer );
	}

	CellProperties.prototype.addHandler = function( name, func ) {
		$(this).on( name, func );
	}

	CellProperties.prototype.firePropertyChanged = function ( prop ) {
		var name = prop + "Changed";
		$(this).trigger( name );
	}

	CellProperties.prototype.incAge = function() {
		if ( this.age >= this.lifetime ) {
			throw "this.age >= this.lifetime";
		}
		this.age++;
		this.firePropertyChanged( 'age' );
	}

	CellProperties.prototype.incEnergy = function() {
		if ( this.energy < this.maxEnergy ) {
			this.energy++;
		} else {
			this.incLife();
		}
		this.firePropertyChanged( 'energy' );
	};

	CellProperties.prototype.decEnergy = function() {
		if ( this.energy > 0 ) {
			this.energy--;
		}
		this.firePropertyChanged( 'energy' );
	};

	CellProperties.prototype.incLife = function() {
		if ( this.life < this.maxLife ) {
			this.life++;
		}
		this.firePropertyChanged( 'life' );
	};

	CellProperties.prototype.decLife = function() {
		if ( this.life > 0 ) {
			this.life--;
		} else {
			this.decEnergy();
		}
		this.firePropertyChanged( 'life' );
	};

	CellProperties.prototype.incRegenEnergy = function() {
		clearInterval( this.regenEnergyTimer );
		this.regenEnergy++;
		this.regenEnergyTimer = setInterval(this.regenEnergyTimerFunction, this.regenEnergy * 1000);
		this.firePropertyChanged( 'regenEnergy' );
	}

	CellProperties.prototype.decRegenEnergy = function() {
		if ( this.regenEnergy <= 1 ) {
			throw 'CellProperties : regenEnergy <= 0';
		}
		clearInterval( this.regenEnergyTimer );
		this.regenEnergy--;
		this.regenEnergyTimer = setInterval(this.regenEnergyTimerFunction, this.regenEnergy * 1000);
		this.firePropertyChanged( 'regenEnergy' );
	}

	CellProperties.prototype.incRegenLife = function() {
		clearInterval( this.regenLifeTimer );
		this.regenLife++;
		this.regenLifeTimer = setInterval(this.regenLifeTimerFunction, this.regenLife * 1000);
		this.firePropertyChanged( 'regenLife' );
	}

	CellProperties.prototype.decRegenLife = function() {
		if ( this.regenLife <= 1 ) {
			throw 'CellProperties : regenLife <= 0';
		}
		clearInterval( this.regenLifeTimer );
		this.regenLife--;
		this.regenLifeTimer = setInterval(this.regenLifeTimerFunction, this.regenLife * 1000);
		this.firePropertyChanged( 'regenLife' );
	}

	if (typeof root.CellProperties === "undefined") {
		root.CellProperties = CellProperties;
	}
} )( window );