$( document ).ready( function(){

	function bar(max, value, maxChars) {
	var e='';
	var nC = value * maxChars / max;
	if (nC < maxChars) {
		nC -= 1;
	}
	for ( var i = 0; i < maxChars; i++){ 
		var color = 'lime';
		if (value * 100 / max <= 30 ) {
			color = 'red';
		} else if ( value * 100 / max <= 80) {
			color = 'orange';
		}
		e += ( i < nC ) ? '<span style="color: ' + color + ';">=</span>' : '&nbsp;';
	}
	return '[' + e + ']' + ' ' + value + "/" + max;
}

var nbCells = 0;
function createCell( n, c ) {
	if ( nbCells >= 100 ) {
		return;
	}
	nbCells++;
	/*$('#cellEnv').append(
		'<div class="bloc" id="cellProperies_' + n + '">'
	  +    '<div id="uniqid"></div>'
	  +    '<div id="age"></div>'
	  +    '<div id="life"></div>'
	  +    '<div id="energy"></div>'
			
	  +    '<div id="isAlive">Etat : En vie</div>'
	  +    '<br><br>'
	  +    '<button id="toggle">toggle</button>'
	  +    '<br>'
	  +    '<div id="buttons">'
	  + 	    '<button id="incAge">incAge</button>'
	  + 	    '<button id="division">division</button>'
	  +         '<br/>'
	  +		    '<button id="incEnergy">incEnergy</button>'
	  +		    '<button id="incLife">incLife</button>'
	  +		    '<button id="incRegenLife">incRegenLife</button>'
	  +		    '<button id="incRegenEnergy">incRegenEnergy</button>'
	  +		    '<br>'
	  +		    '<button id="decEnergy">decEnergy</button>'
	  +		    '<button id="decLife">decLife</button>'
	  +		    '<button id="decRegenLife">decRegenLife</button>'
	  +		    '<button id="decRegenEnergy">decRegenEnergy</button>'
	  +    '</div>'
	  +    '<br>'
      + '</div>'
	);*/

	/*
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
	*/


	$('#cellProperies_' + n + ' #buttons').toggle();
	if ( !c ) {
		var c = new Cell({
			properties : new CellProperties( {energy:3, life:3})
		});
		var radius = Math.random() * 25;
		var b = box2dUtils.createBall(world,
			Math.random() * cellWidth,
			Math.random() * cellHeight,
			radius, false, c);
		vel = b.GetBody.GetLinearVelocity();
		vel.x = Math.random() * 50 - 50/2;
		vel.y = Math.random() * 50 - 50/2;
	}


	var cycleChanged = function(e){
		$('#cell #cycle #cycleNumber').html( 'cycle n° ' + cellsGame.engine.cycle );
		$('#demography').html( 'Démographie : ' + cellsGame.engine.nbCell );
	};
	var divised = function( e, data ) {
		createCell( data.cell.getUniqid(), data.cell );
		cycleChanged();
	};
	c.addHandler( 'divised', divised );

	//$('#cellProperies_' + n + ' #uniqid').html( 'id : ' + c.getUniqid() );
	var ageChanged = function(e){
		$('#cellProperies_' + n + ' #age').html( 'AGE' + bar( c.getLifetime(), c.getAge(), 10) 
			+ ' +1/cycle');
	}
	c.addHandler( 'ageChanged', ageChanged );
	ageChanged();

	$('#cellProperies_' + n + ' #uniqid').html( 'ID : ' + c.getUniqid() );


	var energyChanged = function(e){
		$('#cellProperies_' + n + ' #energy').html( 'PE ' + bar( c.getMaxEnergy(), c.getEnergy(), 10) 
			+ ' +1/' + c.getRegenEnergy() + 's');
	}
	c.addHandler( 'energyChanged', energyChanged );
	c.addHandler( 'regenEnergyChanged', energyChanged );
	energyChanged();

	var lifeChanged = function(e){
		$('#cellProperies_' + n + ' #life').html( 'PV ' + bar( c.getMaxLife(), c.getLife(), 10) 
			
			+ ' +1/' + c.getRegenLife() + 's');
	}
	c.addHandler( 'lifeChanged', lifeChanged);
	c.addHandler( 'regenLifeChanged', lifeChanged );
	lifeChanged();

	c.addHandler( 'dead', function(){
		//$('#cellProperies_' + n ).css('opacity', '0.5');
		$('#cellProperies_' + n ).remove();
		$('#cellProperies_' + n + ' #isAlive').html( 'Etat : Morte' );
		$('#cellProperies_' + n + ' #buttons button').each(function(){
			$(this).attr('disabled', 'disabled');
		});
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


var cycleChanged = function(e){
	$('#cell #cycle #cycleNumber').html( 'cycle n° ' + cellsGame.engine.cycle );
	$('#demography').html( 'Démographie : ' + cellsGame.engine.nbCell );
};
cellsGame.addHandler( 'newCycle', cycleChanged );
cycleChanged();

//var c = createCell(0);
var cell;
var startGame = function() {
	//$( document ).trigger( 'startGIP' );
	window.cellsGame.gip.init();
	var c = new Cell({
		properties : new CellProperties( {energy:3, life:3, lifetime: 1000})
	});

	var player = null;  // joueur
	// Créer le player
	player = new Player(30);
	player.createPlayer(world, 25, 30, 20, c);

	// Désactiver les scrollings vertical lors d'un appui sur les touches directionnelles "haut" et "bas"
	document.onkeydown = function(event) {
	    return event.keyCode != 38 && event.keyCode != 40;
	}

	// Ajouter les listeners d'évènements
	window.addEventListener('keydown', window.cellsGame.gip.handleKeyDown);
	window.addEventListener('keyup', window.cellsGame.gip.handleKeyUp);
 
    // Exécuter le rendu de l'environnement 2d
    window.setInterval(window.cellsGame.gip.update, 1000 / 60);




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

	var divised = function( e, data ) {
		createCell( data.cell.getUniqid(), data.cell );
		cycleChanged();
	};
	c.addHandler( 'divised', divised );
	c.division();
	cellsGame.engine.paused = false;
	$( '#cell #cycle' ).show();
	cell = c;
}
$( '#cell #cycle' ).hide();
$ ( document ).on( 'startGame', startGame );

cellsGame.engine.paused = true;
$('#playButton').click(function(){
	cellsGame.engine.paused = !cellsGame.engine.paused;
});	
});
