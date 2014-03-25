(function(){
    var box2dUtils;     // classe utilitaire
	var world;          // "monde" 2dbox
	var canvas;         // notre canvas
	var canvasWidth;    // largeur du canvas
	var canvasHeight;   // hauteur du canvas
	var context;        // contexte 2d
	var player = null;  // joueur
	var keys = [];      // evenements
	var SCALE = 30;
	var b = true;
	 
	// Initialisation
	$(document).ready(function() {
	    init();
	});
	 
	// Lancer à l'initialisation de la page
	this.init = function() {
	    box2dUtils = new Box2dUtils();  // instancier la classe utilitaire
	 
	    // Récupérer la canvas, ses propriétés et le contexte 2d
	    canvas = $('#gipCanvas').get(0);
	    canvasWidth = parseInt(canvas.width);
	    canvasHeight = parseInt(canvas.height);
	    context = canvas.getContext('2d');
	 
	    world = box2dUtils.createWorld(context); // box2DWorld
	 
	    /*// Créer 2 box statiques
	    staticBox = box2dUtils.createBox(world, 600, 450, 50, 50, true, 'staticBox');
	    staticBox2 = box2dUtils.createBox(world, 200, 250, 80, 30, true, 'staticBox2');
	 
	    // Créer 2 ball statiques
	    staticBall = box2dUtils.createBall(world, 50, 400, 50, true, 'staticBall');
	    staticBall2 = box2dUtils.createBall(world, 500, 150, 60, true, 'staticBall2');*/
	 
	    // Créer 30 éléments ball dynamiques de différentes tailles
		var b = null;
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
	    }
	 
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
		ground = box2dUtils.createBox(world, 400, canvasHeight - 10, 400, 10, true, 'ground');
		ceiling = box2dUtils.createBox(world, 400, -5, 400, 1, true, 'ceiling');
		 
		// Créer les "murs" de notre environnement physique
		leftWall = box2dUtils.createBox(world, -5, canvasHeight, 1, canvasHeight, true, 'leftWall');
		leftWall = box2dUtils.createBox(world, canvasWidth + 5, canvasHeight, 1, canvasHeight, true, 'leftWall');

		// Créer le player
        player = new Player(SCALE);
        player.createPlayer(world, 25, canvasHeight-30, 20);

		// appuyer sur une touche
		this.handleKeyDown = function(evt) {
		    keys[evt.keyCode] = true;
		}
		// relacher une touche
		this.handleKeyUp = function(evt) {
		    keys[evt.keyCode] = false;
		}

		// Désactiver les scrollings vertical lors d'un appui sur les touches directionnelles "haut" et "bas"
		document.onkeydown = function(event) {
		    return event.keyCode != 38 && event.keyCode != 40;
		}

		// Ajouter les listeners d'évènements
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
	 
	    // Exécuter le rendu de l'environnement 2d
	    window.setInterval(update, 1000 / 60);
	}

	// Gérer les interactions
	this.handleInteractions = function() {
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
	}
	 
	// Mettre à jour le rendu de l'environnement 2d
	this.update = function() {
	    // effectuer les simulations physiques et mettre à jour le canvas
		if (b) {
			b = false;
			for (var i in world.GetBodyList()) {
				console.log(i);
			}
		}
	    world.Step(1 / 60,  10, 10);
	    world.DrawDebugData();
	    world.ClearForces();
		handleInteractions();
	}
}());