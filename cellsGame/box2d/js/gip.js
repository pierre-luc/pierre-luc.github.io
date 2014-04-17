(function( root ){
	    var box2dUtils;     // classe utilitaire
		var world;          // "monde" 2dbox
		var canvas;         // notre canvas
		var canvasWidth;    // largeur du canvas
		var canvasHeight;   // hauteur du canvas
		var context;        // contexte 2d
		var keys = [];      // evenements
		var SCALE = 30;
		var b = true;
		root.cellsGame.gip = {
			init : function() {
			    box2dUtils = new Box2dUtils();  // instancier la classe utilitaire
			 
			    // Récupérer la canvas, ses propriétés et le contexte 2d
			    canvas = $('#gipCanvas').get(0);
			    canvasWidth = parseInt(canvas.width);
			    canvasHeight = parseInt(canvas.height);
			    context = canvas.getContext('2d');
			 
			    world = box2dUtils.createWorld(context); // box2DWorld
				root.cellsGame.gip.world = world;
			 
			    /*// Créer 2 box statiques
			    staticBox = box2dUtils.createBox(world, 600, 450, 50, 50, true, 'staticBox');
			    staticBox2 = box2dUtils.createBox(world, 200, 250, 80, 30, true, 'staticBox2');
			    
			    // Créer 2 ball statiques
			    staticBall = box2dUtils.createBall(world, 50, 400, 50, true, 'staticBall');
			    staticBall2 = box2dUtils.createBall(world, 500, 150, 60, true, 'staticBall2');*/
			 



			    // Créer 30 éléments ball dynamiques de différentes tailles
				/*var b = null;
				var vel = null;
			    for (var i=0; i<30; i++) {
			        var radius = Math.random() * 25;
			        // Placer aléatoirement les objets dans le canvas
			        b = box2dUtils.createBall(world,
			                Math.random() * canvasWidth,
			                Math.random() * canvasHeight,
			                radius, false, 'ball'+i);
					vel = b.GetBody().GetLinearVelocity();
					vel.x = Math.random() * 75 - 75/2;
					vel.y = Math.random() * 75 - 75/2;
			    }*/



			 
			    /*// Créer 30 éléments box dynamiques de différentes tailles
			    for (var i=0; i<30; i++) {
			        var length = 45;
			        if (i < 10) {
			            length = 15;
			        } else if (i < 20) {
			            length = 30;
			        }
			        // Placer aléatoirement les objets dans le canvas
			        box2dUtils.createBox(world,
			                Math.random() * canvasWidth,
			                Math.random() * canvasHeight - 400,
			                length, length, false, 'ball'+i);
			    }*/

				// Créer le "sol" et le "plafond" de notre environnement physique
				ground = box2dUtils.createBox(world, 400, canvasHeight, 400, 0, true, 'ground');
				root.cellsGame.gip.
				ceiling = box2dUtils.createBox(world, 400, 0, 400, 0, true, 'ceiling');
				 
				// Créer les "murs" de notre environnement physique
				leftWall = box2dUtils.createBox(world, 0, canvasHeight, 0, canvasHeight, true, 'leftWall');
				leftWall = box2dUtils.createBox(world, canvasWidth, canvasHeight, 0, canvasHeight, true, 'leftWall');

			},
		 
			// Mettre à jour le rendu de l'environnement 2d
			update : function() {
			    // effectuer les simulations physiques et mettre à jour le canvas
			    world.Step(1 / 60,  10, 10);
			    world.DrawDebugData();
			    world.ClearForces();
				root.cellsGame.gip.handleInteractions();
			},

			// Gérer les interactions
			handleInteractions : function() {
				var player = root.cellsGame.gip.player;
			    // touche "haut"
			    if (keys[38]) {
			        player.jump();
			    } else if (keys[40]) {
					player.down();
				}
			    // touches "gauche" et "droite"
			    if (keys[37]) {
			        player.moveLeft();
			    } else if (keys[39]) {
			        player.moveRight();
			    }   
			},

			// appuyer sur une touche
			handleKeyDown : function(evt) {
			    keys[evt.keyCode] = true;
			},

			// relacher une touche
			handleKeyUp : function(evt) {
			    keys[evt.keyCode] = false;
			}
		};

	$(document).on('startGIP', function() {
		init();
	});
})( window );