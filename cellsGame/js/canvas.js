(function() {

	CanvasRenderingContext2D.prototype.dashedLine = function(x1, y1, x2, y2, dashLen) {
		if (typeof dashLen === 'undefined') dashLen = 2;
		this.moveTo(x1, y1);

		var dX = x2 - x1
		var dY = y2 - y1;
		var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
		var dashX = dX / dashes;
		var dashY = dY / dashes;

		var q = 0;
		while(q++ < dashes) {
			x1 += dashX;
			y1 += dashY;
			this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
		}
		this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
	};

	var grid = {
		context : null,
		gridWidthBegin : 0,
		gridWidthEnd : 0,
		gridHeightBegin : 0,
		gridHeightEnd : 0,
		ind : 5,
		rowsCount : 10,
		colsCount : 10,
		cellSelected : null
	};

	grid.init = function(c, r) {

		if (typeof c !== 'undefined') this.colsCount = c;
		if (typeof r !== 'undefined') this.rowsCount = r;

		var canvas = $('#cellEnv');

		var width = $(window).width();
		canvas.attr('width', width);
		var height = $(window).height() - $('#state').height();
		canvas.attr('height', height);
		//console.log('w : ' + width);
		//console.log('h : ' + height);

		this.context = canvas[0].getContext("2d");
		//jslint

		this.context.beginPath();
		var dottedInd = 0.5;

		if (Math.floor(width/this.colsCount) <= Math.floor(height/this.rowsCount)) {
			this.ind = Math.floor(width/this.colsCount);
		} else {
			this.ind = Math.floor(height/this.rowsCount);
		}



		//ce qui dépasse de la grille / 2
		/*this.gridWidthBegin = (width % this.ind)/2;
		this.gridWidthEnd = width - this.gridWidthBegin;
		this.gridHeightBegin = (height % this.ind)/2;
		this.gridHeightEnd = height - this.gridHeightBegin;*/
		this.gridWidthBegin = (width - this.colsCount*this.ind)/2;
		this.gridWidthEnd = width - this.gridWidthBegin;
		this.gridHeightBegin = (height - this.rowsCount*this.ind)/2;
		this.gridHeightEnd = height - this.gridHeightBegin;

		for (var i = this.gridWidthBegin; i <= this.gridWidthEnd; i += this.ind) {
			//this.context.moveTo(i, gridHeightBegin);
			//this.context.lineTo(i, gridHeightEnd);
			this.context.dashedLine(i, this.gridHeightBegin, i, this.gridHeightEnd, dottedInd);
			//console.log('i : ' + i + ', w : ' + this.gridWidthEnd + ', ind : ' + this.ind);
		}
		for (var j = this.gridHeightBegin; j <= this.gridHeightEnd; j += this.ind) {
			//this.context.moveTo(gridWidthBegin, j);
			//this.context.lineTo(gridWidthEnd, j);
			this.context.dashedLine(this.gridWidthBegin, j, this.gridWidthEnd, j, dottedInd);
		}
		this.context.closePath();

		this.context.strokeStyle = "white";
		this.context.lineWidth = 0.3;
		this.context.stroke();

		canvas.click(function (e) {
			var x = e.clientX;
			var y = e.clientY;

			var self = window.cellsGame.grid;

			if (x < self.gridWidthBegin || x >= self.gridWidthEnd || y < self.gridHeightBegin || y >= self.gridHeightEnd){
				self.cellSelected = null;
				return false;
			}

			var c = 0;
			var r = 0;

			c = Math.floor((x - self.gridWidthBegin) / self.ind) + 1;
			r = Math.floor((y - self.gridHeightBegin) / self.ind) + 1;

			self.cellSelected = {
				x : c,
				y : r
			}

			//console.log('c : ' + c + ', r : ' + r);
		});

		//this.rowsCount = (this.gridHeightEnd - this.gridHeightBegin) / this.ind;
		//this.colsCount = (this.gridWidthEnd - this.gridWidthBegin) / this.ind;
	}

	grid.drawIn = function(c, r, color) {
		if (typeof color === 'undefined') color = new Array('100', '100', '100');

		if (c > this.colsCount || c <= 0 || r > this.rowsCount || r <= 0) return false; 
		centerX = this.gridWidthBegin + (c-1)*this.ind + this.ind/2;
		centerY = this.gridHeightBegin + (r-1)*this.ind + this.ind/2;

		this.context.beginPath();
		this.context.arc(centerX, centerY, this.ind/2 - this.ind/15, 0, Math.PI*2, true);
		this.context.closePath();

		this.context.lineWidth = this.ind/20;
		this.context.fillStyle = 'rgba('+ color[0] +', '+ color[1] +', '+ color[2] +', .75)';
		this.context.strokeStyle = 'rgba(256, 256, 256, 1)';

		this.context.fill();
		this.context.stroke();
	}

	grid.drawProgressBar = function(cell) {
	//grid.drawProgressBar = function(coord, life, lifetime) {
		console.log('drawProgressBar');
		if (typeof cell === 'undefined') return false;

		var coords = cell.getCoord();
		if (coords.x >= this.colsCount || coords.x < 0 || coords.y > this.rowsCount || coords.y < 0) return false;
		centerX = this.gridWidthBegin + (coords.x)*this.ind + this.ind/2;
		centerY = this.gridHeightBegin + (coords.y)*this.ind + this.ind/2;

		//definie la forme à dessiner
		this.context.beginPath();
		this.context.arc(centerX, centerY, this.ind/2 - this.ind/15, 0, Math.PI/2, false);
		this.context.moveTo(centerX, centerY);
		this.context.closePath();

		//largueur du cercle
		this.context.lineWidth = this.ind/20;
		
		//couleur du cercle
		this.context.strokeStyle = 'white';

		progress = (cell.getAge() * Math.PI*2) / cell.getLifetime();

		this.context.beginPath();
		this.context.arc(centerX, centerY, this.ind/2 - this.ind/15, -Math.PI/2, progress - Math.PI/2, false);
		this.context.moveTo(centerX, centerY);
		this.context.closePath();

		if (progress >= Math.PI*2) {
			return false;
		} else if (progress >= (.8*cell.getLifetime() * Math.PI*2) / cell.getLifetime()) {
			this.context.strokeStyle = 'red';
		} else {
			this.context.strokeStyle = 'lime';
		}

		this.context.stroke();
	}

	grid.addProgressBar = function (cell) {
		var updateProgressBar = function(e) {
			grid.drawProgressBar(cell);
		}

		cell.addHandler('ageChanged', updateProgressBar);
		updateProgressBar();
	}

	grid.test = function() {
		var count = 0;
		//grid.context.save();
		for (var i = 0; i < grid.colsCount; i++) {
			for (var j = 0; j < grid.rowsCount; j++) {
				if (Math.floor(Math.random()*3) == 0) {
					count++;
					//grid.drawIn(i + 1, j + 1, new Array(100, 100, 200));
					grid.drawIn(i + 1, j + 1, new Array(Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)));
				}
			}
		}
		//grid.context.restore();
		console.log(count);
	}

	grid.clearRect = function(c, r) {
		var x = (c - 1) * this.ind + this.gridWidthBegin + 1;
		var y = (r - 1) * this.ind + this.gridHeightBegin + 1;
		var w = this.ind - 2;
		var h = this.ind - 2;
		grid.context.clearRect(x, y, h, w);
	}

	grid.run = function() {
		grid.init(15, 15);
		grid.test();
	}

	//$( document ).on( 'startGame', grid.run );
	//grid.run();

	window.cellsGame.grid = grid;
	console.log('grid loaded');

	$(window).resize(function() {
		grid.init();
	});
})();