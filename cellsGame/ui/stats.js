(function($){
	$.fn.updateChart = function( coord ) {
		var data = cellsGame.stats.chart.data,
			opts = cellsGame.stats.chart.opts;
		var dataChart = data.main[0].data;
		if ( dataChart[ dataChart.length - 1].y != coord.y ) {
			data.main[0].data.push( coord )
			var type = 'line';
			var myChart = new xChart(type, data, '#stats #chart', opts);
			$( this ).trigger( 'chartUpdated' );
		}
	};
})(jQuery);

$( document ).ready( function(){
	var tt = document.createElement('div'),
	    leftOffset = -(~~$('html').css('padding-left').replace('px', '') + ~~$('body').css('margin-left').replace('px', '')),
        topOffset = -32;
		tt.className = 'ex-tooltip';
	
	document.body.appendChild(tt);

	cellsGame.stats = {};

	var data = {
	  "xScale": "ordinal",
	  "yScale": "ordinal",
	  "main": [
	    {
	      "className": ".pizza",
	      "data": [
	        {
	          "x": "0",
	          "y": 0
	        }
	      ]
	    }
	  ]
	};
	var opts = {
	  "dataFormatX": function (x) { return x; /*d3.time.format('%S').parse(x);*/ },
	  "tickFormatX": function (x) { return x; },
	  "mouseover": function (d, i) {
	    var pos = $(this).offset();
	    $(tt).text('Démographie: ' + d.y)
	      .css({top: topOffset + pos.top, left: pos.left + leftOffset})
	      .show();
	  },
	  "mouseout": function (x) {
	    $(tt).hide();
	  }
	};
	var myChart = new xChart('line', data, '#stats #chart', opts);

	cellsGame.stats.chart = {
		data : data,
		opts : opts
	};

	var cycleChanged = function(e){
		$('#stats #chart').updateChart({x: '' + cellsGame.engine.cycle, y: cellsGame.engine.nbCell});
	};
	cellsGame.addHandler( 'newCycle', cycleChanged );

} );