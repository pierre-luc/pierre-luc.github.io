$(document).ready(function(){
	$('.badge').each(function(){
		html = '<div class="wrapper">' 
			  +	  '<div class="circle left"></div>' 
			  +   '<div class="circle right"></div>'
			  + '</div>';


		var level = parseInt( $(this).attr('level') );
		var dataTitle = $(this).attr('data-title');
		if ( typeof dataTitle !== 'undefined' ) {
			html += "<div id='title'>" + dataTitle + "</div>";
		}
		switch( level ) {
			case 1 :
				html += "<div id='lvl'>Apprentissage</div>";
			break;
			case 2 :
				html += "<div id='lvl'>Débutant</div>";
			break;
			case 3 :
				html += "<div id='lvl'>Intermédiare</div>";
			break;
			case 4 :
				html += "<div id='lvl'>Bon niveau</div>";
			break;
			case 5 :
				html += "<div id='lvl'>Expert</div>";
			break;
			default:
		}
		$(this).append( html );
	});

	function levelToString( lvl ) {
		var str = '';
		switch( lvl ) {
			case 1 :
				return "Apprentissage";
			break;
			case 2 :
				return "Débutant";
			break;
			case 3 :
				return "Intermédiare";
			break;
			case 4 :
				return "Bon niveau";
			break;
			case 5 :
				return "Expert";
			break;
			default:
		}
		return str;
	}

	$('.competence').each(function(){
		var self = $(this);
		var title = self.attr('data-title');
		
		var lvl = parseFloat( self.attr('data-level') );
		var int_lvl = parseInt( lvl );
		var ratio = lvl - int_lvl;
		var max = parseInt( self.attr('data-level-max') );

		self.append('<div class="rating"></div>');
		self.append('<div id="title">' + title + '</div>')

		$(this).find('.rating').each(function(){
			var h = $(this).css('height').split('px')[0];
			
			for ( i = 0; i < int_lvl; i++ ) {
				$(this).append('<div class="star"></div>');
			}
			var bg = max - int_lvl;
			if ( ratio > 0 ) {
				$(this).append('<div class="star" style="width:' + (h * ratio) + 'px; margin-right: ' + (h - h * ratio) + 'px;"></div>')
				bg--;
			}
			for ( i = 0; i < bg; i++ ) {
				$(this).append('<div class="star-bg"></div>');
			}
		});
	});
});
	