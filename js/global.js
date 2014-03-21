$(document).ready(function(){


	var ALPHA = {};

		ALPHA.container = $('#container .item');

		ALPHA.container.each(function(){
			var $el = $(this);
				if ( this.id !== 'item-model' ) {
					$el.remove();
					var data = {
						title: $el.attr('title'),
						id: $el.attr('id'),
						subtitle: $el.attr('subtitle'),
						href: ($el.attr('href'))?($el.attr('href')):('#' + this.id),
						color: $el.attr('color')
					};
					var article = $('#item-model').html();
						article = '<article class="item {{color}}">' + article + '</article>';
						article = Mustache.render( article, data );

					$('#container').append( article );

					var last = $('#container').children().last();
					last.contents('#second-col').contents('#text').html( $el.html() );
				}
		});
		
		ALPHA.menu = {
			el : $('#container #menu')
		};

		ALPHA.menu.init = function() {
			var self  = this;
			if ( this.el.length > 0 ) {

				this.oTop = this.el.offset().top;

				$(window).scroll( function() {
					  if ( self.oTop - 10 <= $(window).scrollTop() ) {
					  	$('#container').attr('fixed', 'true');
					  } else {
					  		$('#container').attr('fixed', 'false');
					  		$('#container').removeAttr('fixed');
					  }
				});
			}
			var el_menu = this.el;
			el_menu.contents('#toggle').click(function(){
				if ( typeof el_menu.attr('open') !== 'undefined' ) {
					el_menu.removeAttr('open');
				} else {
					el_menu.attr('open', 'true');
				}
			});

			el_menu.contents('ul').click(function(){
				el_menu.removeAttr('open');
			});
		}

		ALPHA.scrollup = {};
		ALPHA.scrollup.init = function() {
			$(window).scroll(function(){
	            if ($(this).scrollTop() > 100) {
	                $('.scrollup').fadeTo(50, 0.5);
	            } else {
	                $('.scrollup').fadeTo(50, 0);
	            }
	        }); 
	 
	        $('.scrollup').click(function(){
	            $("html, body").animate({ scrollTop: 0 }, 600);
	            return false;
	        });
		}

		ALPHA.run = function() {
			this.menu.init();
			this.scrollup.init();
		}

		ALPHA.run();
		var article_select = null;
		var scrolltop = $(window).scrollTop();
		
		var currentArticle= null;

		$(window).scroll(function(){
			var articles = $('#container #content .article');
		
			var sens = (scrolltop - $(window).scrollTop() >= 0)?0:1;
			scrolltop = $(window).scrollTop();
			
			var t = [];

			articles.each(function(){
				var el = this;
				el.oTop = $(this).offset().top;
				
				
				var delta =  el.oTop - $(window).scrollTop();
				if ( ( delta + $(this).height() > 0 ) && (delta < $(window).height() ) ) {
					
					if ( article_select !== el.id ) {
						article_select = el.id;
						t.push( el.id );
					}
					
				}
			});
			if ( currentArticle !== t[ sens ]) {
				if ( typeof t[ sens ] === 'undefined' ) {
					if ( typeof t[ 0 ] !== 'undefined' ) {
						currentArticle = t[ 0 ];
					}
				} else {
					currentArticle = t[ sens ];
				}

				var item = $('#menu_' + currentArticle);
				$('#menu_' + currentArticle).addClass('select');
				$('#menu ul li').each(function(){
					if ( $(this).attr('id') !== item.attr('id') ) {
						$(this).removeClass('select');
					}
				});
			}
		});
		

		var badgeModel= $('#badge-model');
		var badge = $('#badges article').each(function(){
			var $el = $(this);
			if ( this.id !== 'badge-model' ) {
					$el.remove();
					var data = {
						name: $el.attr('id'),
						caption: ($el.attr('caption')?($el.attr('caption')):(this.id)),
					};
					var article = null;
					if ( $el.attr('href') ) {
						data.href = $el.attr('href');
					    article = $('#badge-model').html();
					} else {
					    article = $('#badge-model a').html();
					}
					article = Mustache.render( article, data );

					$('#badges').append( article );

				}
		});

		var linkModel = $('#link-model');		
		var links = $('.item #links').each(function(){
			var self = $(this);
				self.contents('article').each(function(){
					var $el = $(this);
					if ( this.id !== 'link-model' ) {
							$el.remove();
							var data = {
								title: $el.attr('title'),
								id: $el.attr('id'),
								href: ($el.attr('href'))?($el.attr('href')):('#' + this.id),
							};
							var article = $('#link-model').html();
								article = '<article class="link">' + article + '</article>';
								article = Mustache.render( article, data );

							self.append( article );

							var last = self.children().last();
							last.contents('#description').html( $el.html() );
							console.log($el.attr('browsers'));
							var browsers = $el.attr('browsers').split(',');
							for (i in browsers) {
								last.contents('#compatible').contents('.navigator').append('<li id="' + browsers[i].trim() + '"></li>')
							}
						}
				});
			
		}); 






		var link = $('#links .link').each(function(){
			var self = $(this);
			$(this).contents('#title').click(function(){
				if ( self.attr('open') ) {
					self.removeAttr('open');
				} else {
					self.attr('open', 'true');
				}
			});
		});
});