(function(){
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
		cycleDelay : 1/10,
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

		run : function() {
			this.cycleTimer();
		}
	};

	cellsGame.init = function() {
		cellsGame.engine.run();
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

	cellsGame.init();

	if (typeof window.cellsGame === "undefined") {
		window.cellsGame = cellsGame;
	}
})();