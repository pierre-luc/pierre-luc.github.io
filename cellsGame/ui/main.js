
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
			caption = $( this ).attr( 'caption' );
		$( this ).append( '<div id="caption">' + caption + '</div>');
		$( this ).append( '<div id="levelQty"><div id="value"></div></div>');

		// création de l'écouteur sur l'élement
		$( this ).on( 'valueChanged', function(){
			var value = parseInt( $( this ).attr( 'value' ) );
			$( this ).find( '#value' ).css( 'width', value + '%' );
			$( this ).find( '#value' ).attr( 'level', levelColoration( value ) );
		});

		$( this ).updateValue( value );
	} );
} );