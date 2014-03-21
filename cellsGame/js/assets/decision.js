( function( root ){
	var Class = Decision = root.cellsGame.Decision = function( obj ) {
		var attributs = {
			
			listEvent  : {},
			listEventAttribut : [ 'changed' ]
		};
		root.cellsGame.utils.initClass( Class, this, attributs, obj);
		
	};


	/**************
	 *	Accesseurs
	 **************/
	
	/***************
	 *	Commandes
	 ***************/
	
	if (typeof root.Decision === "undefined") {
		root.Decision = Decision;
	}
} )( window );