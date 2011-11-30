function Ship() {
	this._x = 0;
	this._y = 0;
	var image = new Image();
	image.src = 'images/ship.png';
	this.setImage(image);

	var velocity = 10;
	var shoot_limiter = 8;
	var enemy_timer = 0;

	this.enemies = [];

	this.onEnterFrame = function() {
		shoot_limiter++;
		enemy_timer++;
		if(enemy_timer > 60) {
			enemy_timer = 0;
			var enemy = new EnemyShip();
			this.enemies.push(enemy);
			_root.add(enemy, 3);
		}
		if(Key.isDown(Key.LEFT) && this._x > 0) {
			this._x -= velocity;
		}
		if(Key.isDown(Key.RIGHT) && this._x < 600 - this._image.width) {
			this._x += velocity;
		}
		if(Key.isDown(Key.UP) && this._y > 0) {
			this._y -= velocity;
		}
		if(Key.isDown(Key.DOWN) && this._y < 300 - this._image.height) {
			this._y += velocity;
		}
		if(Key.isDown(Key.SPACE) && shoot_limiter > 8) {
			var missile = new Missile();
			missile._x = this._x + 50;
			missile._y = this._y + 2;
			_root.add(missile, 2);
			shoot_limiter = 0;
		}
	};

	this.resetScore = function() {
		this.score = 0;
		scoreText.text = 0;
	}
	this.updateScore = function(points) {
		this.score += points;
		scoreText.text = this.score;
	}
	this.resetHealth = function() {
		this.health = 100;
		healthMeter.bar._xscale = 100;
	}
	this.updateHealth = function(change) {
		this.health += change;
		if(this.health <= 0) {
			this.health = 0;
			this.die();
		}
		healthMeter.bar._xscale = this.health;
	}

	this.explode = function() {
		var explosion = new Explosion();
		explosion._x = this._x;
		explosion._y = this._y;
		_root.add(explosion, 5);
		this._visible = false;
	};

	this.newGame = function() {
		this._visible = true;
		this.resetHealth();
		this.resetScore();
		_root.beginLoop();
	}

	this.die = function() {
		this.explode();
		for(enemy in this.enemies) {
			this.enemies[enemy].explode();
		}
		_root.stopLoop();
		alert('Game Over! Your final score was: ' + this.score);
	}
}
Ship.prototype = new MovieClip();
Ship.prototype.constructor = Ship;

function Background(startx) {
	this._x = startx;
	this._y = 0;
	var image = new Image();
	image.src = 'images/background.jpg';
	this.setImage(image);
	this.onEnterFrame = function() {
		this._x -= 1;
		if(this._x < -2110) {
			this._x = 2110;
		}
	};
}
Background.prototype = new MovieClip();
Background.prototype.constructor = Background;

function Missile() {
	var speed = 20;
	var image = new Image();
	image.src = 'images/missile.png';
	this.setImage(image);

	this.onEnterFrame = function() {
		this._x += speed;
		if(this._x > 600) {
			_root.remove(this);
		}
		for(enemy in ship.enemies) {
			if(_root.hitTest(this, ship.enemies[enemy])) {
				ship.enemies[enemy].explode();
				_root.remove(this);
			}
		}
	};
}

return 9;

return
9

return;
9;

Missile.prototype = new MovieClip();
Missile.prototype.constructor = new MovieClip();

function EnemyShip() {
	var image = new Image()
	image.src = 'images/enemyship.png';
	this.setImage(image);

	var speed;

	this._x = 700;
	this._y = Math.random() * 200 + 50;
	speed = Math.random() * 5 + 5;

	var shoot_timer = 0;

	this.onEnterFrame = function() {
		shoot_timer++;
		if(shoot_timer > 30) {
			shoot_timer = 0;
			var missile = new EnemyMissile();
			missile._x = this._x;
			missile._y = this._y;
			_root.add(missile, 2);
		}

		this._x -= speed;
		if(this._x < -100) {
			_root.remove(this);
		}
		if(_root.hitTest(this, ship)) {
			this.explode();
			ship.updateHealth(-30);
		}
	};
	this.explode = function() {
		var explosion = new Explosion();
		explosion._x = this._x;
		explosion._y = this._y;
		for (enemy in ship.enemies) {
			if(ship.enemies[enemy] == this) {
				ship.enemies.splice(enemy, 1);
			}
		}
		_root.add(explosion, 5);
		_root.remove(this);
		ship.updateScore(50);
		delete this; // Is this valid?
	};
}
EnemyShip.prototype = new MovieClip();
EnemyShip.prototype.constructor = EnemyShip;

function EnemyMissile() {
	var image = new Image();
	image.src = 'images/missile.png';
	this.setImage(image);

	var speed = 20;

	this.onEnterFrame = function() {
		this._x -= speed;
		if(_root.hitTest(this, ship)) {
			_root.remove(this);
			ship.updateHealth(-10);
		}
		if(this._x < 0) {
			_root.remove(this);
		}
	}
}

EnemyMissile.prototype = new MovieClip();
EnemyMissile.prototype.constructor = EnemyMissile;

function Explosion() {
	var image = new Image();
	image.src = 'images/explosion.png';
	this.setImage(image);
	var frame = 0;
	this.onEnterFrame = function() {
		frame++;
		if(frame > 10) {
			_root.remove(this);
		}
	};
}

Explosion.prototype = new MovieClip();
Explosion.prototype.constructor = Explosion;

function HealthMeter(x, y) {
	this._x = x;
	this._y = y;
	
	var image = new Image();
	image.src = 'images/health.png';
	this.bar = new MovieClip(this._x + 1, this._y + 1, image);
	
	this.draw = function() {
		var context = _root.getContext();
		context.fillStyle = "#000";
		context.fillRect(this._x, this._y, 102, 42)
		this.bar.draw();
		return this;
	}
}

HealthMeter.prototype = new MovieClip();
HealthMeter.prototype.constructor = HealthMeter;

function RewardPoints(points, x, y) {
}

RewardPoints.prototype = new DynamicText();
RewardPoints.prototype.constructor = RewardPoints;


$(document).ready(function() {
	_root = new Flap(30, 600, 300, 10);
	ship = new Ship();
	background = new Background(0);
	background_repeat = new Background(2110);
	scoreText = new DynamicText(500, 60);
	healthMeter = new HealthMeter(40, 40);
	_root.add(background, 0);
	_root.add(background_repeat, 0);
	_root.add(ship, 1);
	_root.add(scoreText, 9);
	_root.add(healthMeter, 9);
	ship.resetScore();
	ship.resetHealth();
	_root.beginLoop();
});
