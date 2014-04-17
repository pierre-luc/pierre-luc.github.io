(function( root ){
    // "Import" des classes box2dweb
	var b2World = Box2D.Dynamics.b2World;
	var b2Vec2 = Box2D.Common.Math.b2Vec2;
	var b2AABB = Box2D.Collision.b2AABB;
	var b2BodyDef = Box2D.Dynamics.b2BodyDef;
	var b2Body = Box2D.Dynamics.b2Body;
	var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	var b2Fixture = Box2D.Dynamics.b2Fixture;
	var b2MassData = Box2D.Collision.Shapes.b2MassData;
	var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
	var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
	var b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;


	/**
	 * Constructeur
	 */
	Box2dUtils = function() {
		this.world = root.cellsGame.gip.world;
		this.SCALE = 30;    // Définir l'échelle
	}

	/**
	 * Classe Box2dUtils
	 */
	Box2dUtils.prototype = {
        createWorld : function(context) {
            // Créer le "monde" 2dbox
            world = new b2World(
            	//simule la gravité terrestre
				new b2Vec2(0, 0), // gravité
				//permet les objets inactifs d'être au repos (meilleurs performances)
				true               // doSleep
		    );
		 
			// Définir la méthode d'affichage du débug
			var debugDraw = new b2DebugDraw();
			// Définir les propriétés d'affichage du débug
			debugDraw.SetSprite(context);      // contexte
			debugDraw.SetFillAlpha(0.3);       // transparence
			debugDraw.SetLineThickness(1.0);   // épaisseur du trait
			// Affecter la méthode de d'affichage du débug au monde 2dbox
			debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
			debugDraw.SetDrawScale(30.0);       // échelle
			world.SetDebugDraw(debugDraw);
    		return world;
        },
        createBody : function(type, world, x, y, dimensions, fixed, userData) {
            // Créer un objet
            // Par défaut, l'objet est statique
		    if (typeof(fixed) == 'undefined') {
		        fixed = true;
		    }
		    // Créer l'élément Fixture
		    var fixDef = new b2FixtureDef();
		    fixDef.userData = userData;     // attribuer les propriétés spécifiques de l'objet
		    // Dessiner l'objet en fonction de son type : sa forme et ses dimensions
		    switch (type) {
		        case 'box':
		            fixDef.shape = new b2PolygonShape();
		            fixDef.shape.SetAsBox(dimensions.width / this.SCALE, dimensions.height / this.SCALE);
		            break;
		        case 'ball':
		            fixDef.shape = new b2CircleShape(dimensions.radius / this.SCALE);
		            break;
		    }
		    // Créer l'élément Body
		    var bodyDef = new b2BodyDef();
		    // Affecter la position à l'élément Body
		    bodyDef.position.x = x / this.SCALE;
			bodyDef.position.y = y / this.SCALE;
		    if (fixed) {
		        // élément statique
		        bodyDef.type = b2Body.b2_staticBody;
		    } else {
		        // élément dynamique
		        bodyDef.type = b2Body.b2_dynamicBody;
		        fixDef.density = 1.0;
		        fixDef.restitution = 0.5;
		    }
		    // Assigner l'élément fixture à l'élément body et l'ajouter au monde 2dbox
		    return world.CreateBody(bodyDef).CreateFixture(fixDef);
        },
        createBox : function(world, x, y, width, height, fixed, userData) {
            // Créer un objet "box"
            // Définir les dimensions de la box
		    var dimensions = {
		            width: width,
		            height: height
            };
		    // Appel à createBody()
		    return this.createBody('box', world, x, y, dimensions, fixed, userData);
        },
        createBall : function(world, x, y, radius, fixed, userData) {
            // Créer un objet "ball"
            // Définir les dimensions de la ball
		    var dimensions = {
		        radius: radius  
		    };
		    // Appel à createBody()
		    return this.createBody('ball', world, x, y, dimensions, fixed, userData);
		},
		createPlayer : function(world, x, y, radius, userData) {
		    // Créer le body player

		    var playerObject = this.createBall(world, x, y, radius, false, userData);
		    playerObject.GetBody().SetSleepingAllowed(false);   // l'objet player n'est pas autorisé à passer au repos
		    return playerObject;
		}
	}


})( window );