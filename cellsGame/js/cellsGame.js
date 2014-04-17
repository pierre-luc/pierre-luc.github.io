(function(){

	console.log('cellsGame loaded');
	var cellsGame = {
		addHandler : function( name, func, data ) {
			if ( data ) {
				$(this).on( name, data, func );
			} else {
				$(this).on( name, func );
			}
		}
	};

	cellsGame.engine = {
		cycle : 0,
		cycleDelay : 1/2,
		paused : false,
		cycleTimer : function(){
			var self = this;
			setInterval( function(){
				if ( cellsGame.engine.paused ) {
					return;
				}

				cellsGame.engine.cycle++;
				var cells = cellsGame.engine.cells;
				for ( var i in cells ) {
					$( cells[ i ] ).trigger( 'newCycle' );
				}

				$( cellsGame ).trigger( 'newCycle' );
			}, self.cycleDelay * 1000 );
		},
		nbMaxCell : 5000,
		nbCell : 0,
		cells : {},
		world: {
			grid: null,
			rows: 10,
			cols: 10
		},

		init : function() {
			this.world.rows = cellsGame.grid.rowsCount;
			this.world.cols = cellsGame.grid.colsCount;

			this.world.grid = new Array();
			for (var i = 0; i < this.world.cols; i++) {
				this.world.grid[i] = new Array();
			}
		},

		run : function() {
			this.init();
			this.cycleTimer();
		}
	};

	cellsGame.init = function() {
		cellsGame.grid.init();
		cellsGame.engine.run();
		cellsGame.game.init();
	};


	cellsGame.game = {

		audio: {
			maxVolume: 1,
			down : function(volume, callback){
			    var factor  = 0.1,
			        speed   = 50,
			        audio = $('audio')[0];

			    if (volume > factor) {
			        setTimeout(function(){
			            cellsGame.game.audio.down((audio.volume -= factor), callback);         
			        }, speed);
			    } else {
			        (typeof(callback) !== 'function') || callback();
			    }
			},

			up : function(volume, callback){
			    var factor  = 0.1,
			        speed   = 50,
			        audio = $('audio')[0];

			    if (volume + factor < this.maxVolume) {
			        setTimeout(function(){
			            cellsGame.game.audio.up((audio.volume += factor), callback);         
			        }, speed);
			    } else {
			        (typeof(callback) !== 'function') || callback();
			    }
			},



			pause: function() {

				this.down($('audio')[0].volume, function(){});

			},

			play: function() {
				this.up($('audio')[0].volume, function(){});

			},

			switch: function() {

				if ( cellsGame.engine.paused ) {
					this.pause();
				} else {
					this.play();
				}
			}
		},

		init  : function() {

			$('#playButton').click(function(){
				cellsGame.engine.paused = !cellsGame.engine.paused;
				cellsGame.game.audio.switch();
			});

			
			$('#content').append('<audio loop>'
					 		   + 	'<source src="audio/ambiant.mp3" type="audio/mp3">'
							   + '</audio>');

			$(document).on('startGame', cellsGame.game.run);
		},
		run : function() {
			var cell;
			cellsGame.game.audio.play();

			var nbCells = 0;
			function createCell( n, c ) {
				if ( nbCells >= 100 ) {
					return;
				}
				nbCells++;

				$('#cellProperies_' + n + ' #buttons').toggle();
				if ( !c ) {
					var c = new Cell({
						properties : new CellProperties( {energy:3, life:3})
					});
				}

				cellsGame.grid.drawIn(c.getCoord().x + 1, 
									  c.getCoord().y + 1, 
									  new Array(Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)));

				var cycleChanged = function(e){
					$('#cell #cycle #cycleNumber').html( 'cycle n° ' + cellsGame.engine.cycle );
					$('#demography').html( 'Démographie : ' + cellsGame.engine.nbCell );
				};
				var divised = function( e, data ) {
					createCell( data.cell.getUniqid(), data.cell );
					cycleChanged();
				};
				c.addHandler( 'divised', divised );


				$('#cellProperies_' + n + ' #uniqid').html( 'ID : ' + c.getUniqid() );


				c.addHandler( 'dead', function(){
					cellsGame.grid.clearRect(c.getCoord().x + 1, c.getCoord().y + 1);
					nbCells--;
					cycleChanged();
				});

				$('#cellProperies_' + n + ' #toggle').click(function(){
					$('#cellProperies_' + n + ' #buttons').toggle();
				});

				var actions = [ 'incAge', 'division', 'incEnergy',
							    'decEnergy', 'incLife', 'decLife',
							    'incRegenLife', 'incRegenEnergy',
							    'decRegenLife', 'decRegenEnergy' ];
				
				$.each(actions, function(i, action) {
					$('#cellProperies_' + n + ' #' + action ).click(function(){c[ action ]();});	
				}); 

				return c;
			}


			var c = new Cell({
				properties : new CellProperties( {energy:3, life:3, lifetime: 1000})
			});

			var energyChanged = function(e){
				var max = c.getMaxEnergy(),
				    value   = c.getEnergy(),
				    regen = c.getRegenEnergy();

				$('#cell #energy').updateMaxValue( max );
				$('#cell #energy').updateValue( value );
				$('#cell #energy').updateRegen( regen );
			}
			c.addHandler( 'energyChanged', energyChanged );
			c.addHandler( 'regenEnergyChanged', energyChanged );
			energyChanged();
				
			var lifeChanged = function(e){
				var max = c.getMaxLife(),
				    value   = c.getLife(),
				    regen = c.getRegenLife();

				$('#cell #life').updateMaxValue( max );
				$('#cell #life').updateValue( value );
				$('#cell #life').updateRegen( regen );
			}
			c.addHandler( 'lifeChanged', lifeChanged );
			c.addHandler( 'regenLifeChanged', lifeChanged );
			lifeChanged();

			var cycleChanged = function(e){
				$('#cell #cycle #cycleNumber').html( 'cycle n° ' + cellsGame.engine.cycle );
				$('#demography').html( 'Démographie : ' + cellsGame.engine.nbCell );
			};
			cellsGame.addHandler( 'newCycle', cycleChanged );
			cycleChanged();


			var divised = function( e, data ) {
				createCell( data.cell.getUniqid(), data.cell );
				cycleChanged();
			};
			c.addHandler( 'divised', divised );
			c.division();
			cellsGame.engine.paused = false;
			$( '#cell #cycle' ).show();

			c.coord.x = Math.floor(Math.random() * cellsGame.grid.colsCount) + 1;
			c.coord.y = Math.floor(Math.random() * cellsGame.grid.rowsCount) + 1;

			cell = c;
			
			
		}
	};

	cellsGame.utils = {
		initClass : function( Class, me, attributs, param, source ) {
			if (source) {
				console.log( 'source = ' + source );
			}
			// initialisation par défaut
			for ( var i in attributs ) {
				me[ i ] = attributs[ i ];
			}

			// initialisation
			if ( param ) {
				for ( var i in attributs ) {
					if ( i in param ) {
						me[ i ] = param[ i ];
					}
				}
			}

			// initialisation listEvent
			for ( var i in attributs ) {
				if ( i != 'listEventAttribut' ) {
					for ( var k in attributs.listEventAttribut ) {
						var attr = attributs.listEventAttribut[ k ];
						var name = i + attr[ 0 ].toUpperCase() + attr.substring( 1, attr.length );
						me.listEvent[ name ] = name;
					}
				}
			}

			/*************************
			 *	Accesseurs par défaut
			 **************************/
			 /*
			if ( !Class.initialized ) {
				$.each(attributs, function(i, value) {
					var name = 'get' + i[0].toUpperCase() + i.substring(1, i.length);
					Class.prototype[ name ] = function() {
						return me[ i ];
					}
				}); 
				
				Class.initialized = true;
			}
			*/
		},
		uniqid : function() {
		    var ts = new String( new Date().getTime() ),
		        out = '';
		    for( var i = 0; i < ts.length; i += 2 ) {        
		       out += new Number( ts.substr( i, 2 ) ).toString( 36 );    
		    }
		    return ( 'd' + out );
		}
	};

	$(document).ready(function(){
		console.log('cellsGame.init()');
		cellsGame.init();
	});

	if (typeof window.cellsGame === "undefined") {
		window.cellsGame = cellsGame;
	}
})();