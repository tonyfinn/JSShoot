/**
 * Implementation of subset-ish of Flash API needed for Kongregate tutorial.
 */

function Flap(fps, width, height, num_layers) {
	this.num_layers = num_layers || 10;
	this.fps = fps;
	this.objects = [];
	this.highest_layer = -1; // Nothing on stage.
	this.running = false;

	for(var i = 0; i < num_layers; i++) {
		this.objects[i] = [];
	}
	this.width = width;
	this.height = height;

	this.canvas = document.createElement("canvas");
	this.canvas.id = "flap-canvas";
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.context = this.canvas.getContext("2d");

	this.add = function(obj, layer) {
		this.objects[layer].push(obj);
		if(layer > this.highest_layer) {
			this.highest_layer = layer;
		}
	};
	this.remove = function(find_obj, layer) {
		// Go through every object and find if it is the searched for object. 
		// Does nothing if the object isn't in the scene.
		for (layer in this.objects) {
			for(check_obj in this.objects[layer]) {
				if(this.objects[layer][check_obj] == find_obj) {
					this.objects[layer].splice(check_obj, 1);
					return;	// Exit both loops
				}
			}
		}
	};
	this.getNextHighestDepth = function() {
		return this.highest_layer + 1;
	};
	this.mainLoop = function() {
		this.canvas.width = this.canvas.width; // Blank canvas.
		for(layer in this.objects) {	
			for(obj in this.objects[layer]) {
				this.objects[layer][obj].draw() // Draw previous frame.
				if(this.running) {
					this.objects[layer][obj].onEnterFrame(); // Process this frame
				}
				// Order reversed in case objects delete themselves.
			}
		}
	};
	this.drawObj = function(obj) {
		var x = obj._x;
		var y = obj._y;
		var image = obj._image;

		this.context.drawImage(image, x, y);
	};
	this.getContext = function() {
		return this.context;
	};
	this.hitTest = function(obj1, obj2) {
		var right1 = obj1._x + obj1._image.width;
		var right2 = obj2._x + obj2._image.width;
		var bottom1 = obj1._y + obj1._image.height;
		var bottom2 = obj2._y + obj2._image.height;

		if(bottom1 < obj2._y ||
			bottom2 < obj1._y ||
			right1 < obj2._x ||
			right2 < obj1._x) {
			return false;
		} else {
			return true;
		}

	};
	
	document.body.appendChild(this.canvas);
	
	this.beginLoop = function() {
		this.timeout = Math.round(1000 / fps);
		this.running = true;
		this.interval = setInterval(flapLoop, this.timeout);
	}
	
	this.stopLoop = function() {
		this.running = false;
		this.mainLoop(); // Run one last time to draw the results up to now.
		clearInterval(this.interval);
	}

}
function flapLoop() {
	_root.mainLoop();
}

Key = {
	SPACE: 32,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	keys: [],
	isDown: function(key) {
		return this.keys[key];
	},
	keydown: function(key) {
		this.keys[key] = true
	},
	keyup: function(key) {
		this.keys[key] = false;
	}
}
$(document).keydown(function(evt) {
	Key.keydown(evt.which);
});
$(document).keyup(function(evt) {
	Key.keyup(evt.which);
});

