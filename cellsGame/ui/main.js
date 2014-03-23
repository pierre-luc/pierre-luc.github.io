
/* afin de bien séparer le comportement et la vue, la création 
d'un plugin jquery est utilisée pour ajouter des méthodes
aux élements graphique de l'ui. Ainsi les notify sont bien créés
lors de chaque appel de méthode sur les éléments de l'ui. */
(function( $ ){
	$.fn.updateValue = function( v ){
		
		// si l'élément est une barre de niveau
		if ( $( this ).attr( 'class' ) == 'property' ){
			 $( this ).attr( 'value', v );
			 $( this ).trigger( 'valueChanged' );
		}		
	};

	$.fn.updateRegen = function( v ){
		
		// si l'élément est une barre de niveau
		if ( $( this ).attr( 'class' ) == 'property' ){
			 $( this ).attr( 'regen', v );
			 $( this ).trigger( 'regenChanged' );
		}		
	};

	$.fn.updateMaxValue = function( v ){
		
		// si l'élément est une barre de niveau
		if ( $( this ).attr( 'class' ) == 'property' ){
			 $( this ).attr( 'max-value', v );
			 $( this ).trigger( 'valueChanged' );
		}		
	};
})( jQuery )



$( document ).ready( function(){
	$('#game #content').attr("tabindex",-1).focus();
	// fonction de coloration des barres de niveau.
	function levelColoration( level ) {
		if ( level < 30 ) {
			return 'low';
		} else if ( level < 60 ) {
			return 'middle';
		}
		return 'high';
	}

	// construction des barres de niveau, par exemple pour l'énergie
	$( '.property' ).each( function(){
		
		var value = parseInt( $( this ).attr( 'value' ) ),
			maxValue = parseInt( $( this ).attr( 'max-value' ) ),
			caption = $( this ).attr( 'caption' ),
			regen = $( this ).attr( 'regen' );
		$( this ).append( '<div id="caption">' + caption + '</div>');
		if ( regen ) {
			$( this ).append( '<div id="regen"></div>' );
		}
		$( this ).append( '<div id="levelQty"><div id="currency"></div><div id="value"></div></div>');

		// création de l'écouteur sur l'élement pour le changement de value
		$( this ).on( 'valueChanged', function(){
			var value = parseInt( $( this ).attr( 'value' ) ),
			    maxValue = parseInt( $( this ).attr( 'max-value' ) );
			$( this ).find( '#value' ).css( 'width', ( value * 100 / maxValue ) + '%' );
			$( this ).find( '#value' ).attr( 'level', levelColoration( value ) );
			$( this ).find( '#currency' ).html( value + ' / ' + maxValue );
		});
		// initialisation de value
		$( this ).updateValue( value );

		/**
		 * si la barre d'énergie possède un champs regen, alors
		 * création de l'écouteur associé au changement de valeur de cet attribut
		 */
		if ( regen ) {
			$( this ).on( 'regenChanged', function(){
				var regen = $( this ).attr( 'regen' );
				$( this ).find( '#regen' ).html( '+1 / ' + regen + 's' );
			});
			$( this ).updateRegen( regen );
		}
	} );
	
	$( '#game #start' ).css( {
		top : ( $( '#game' ).height() / 2 - $( '#game #start' ).height() / 2 ) + 'px'
	} );

	$( '#game #start' ).click( function(){
		$( '#game' ).attr( 'started' , '' );
		$( document ).trigger( 'startGame' );
	} );
} );