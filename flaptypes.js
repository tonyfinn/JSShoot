function MovieClip(x, y, image, rotation) {
	this._x = x || 0;
	this._y = y || 0;
	this._alpha = 128;
	this._visible = true;
	this._xscale = 100;
	this._yscale = 100;
	this._rotation = rotation || 0;

	this.setImage = function(image) {
		this._image = image;
		if(this._image != null) {
			this._normalheight = this._image.height;
			this._normalwidth = this._image.width;
		}
	}
	this.setImage(image);
	this.draw = function() {
		if(this._visible) {
			var context = _root.getContext();
			context.globalAlpha = this._alpha / 128;
			context.rotate(this._rotation * (Math.PI / 180));
			height = Math.floor(this._normalheight * (this._yscale / 100));
			width = Math.floor(this._normalwidth * (this._xscale / 100));
			context.drawImage(this._image, this._x, this._y, width, height);
			context.globalAlpha = 1.0;
		}
		return this;
	};
	this.onEnterFrame = function() {
		// Stub, override if nessecary.
	}
	this.hitTest = function(target) {
		return _root.hitTest(this, target);
	};
}
function DynamicText(x, y, font) {
	this.text = "";
	this._x = x || 0;
	this._y = y || 0;
	this._visible = true;
	this._alpha = 128;
	this._font = font || "12px sans-serif";

	this.draw = function() {
		if(this._visible) {
			var context = _root.getContext();
			context.globalAlpha = this._alpha / 128;
			context.rotate(0); // Reset rotation
			context.fillText(this.text, this._x, this._y);
			context.globalAlpha = 1.0;
		}
		return this;
	};
	this.onEnterFrame = function() {
		// Deliberately empty.S
	}
}
