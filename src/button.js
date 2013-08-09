
Ptero.Button = function(a) {

	// get billboard or build a new one from the given size
	this.billboard = a.billboard || (
		new Ptero.Billboard(a.width/2, a.height/2, a.width, a.height, 1)
	);

	var hudPos = a.hudPos && Ptero.screen.screenToSpace({
			x: a.hudPos.x * Ptero.screen.getWidth(),
			y: a.hudPos.y * Ptero.screen.getHeight(),
	});

	this.isEnabled = false;

	// get position or calculate it from the given anchor and margin.
	this.pos = a.pos || hudPos || (function(){
		var size = this.billboard.getScreenSize();
		var w = size.w;
		var h = size.h;

		// make sure margin has x and y components
		var margin = a.margin || 0;
		if (typeof margin == "number") {
			margin = { x: margin, y: margin };
		}

		// get screen position of topleft corner
		var screenPos = Ptero.hud.getAnchoredScreenPos(
			a.anchor.x, a.anchor.y,
			w, h,
			margin.x, margin.y);

		// get screen position of midpoint
		screenPos.x += w/2;
		screenPos.y += h/2;

		// return space position
		return Ptero.screen.screenToSpace(screenPos);
	}).call(this);
	this.onclick = a.onclick;
	this.ontouchstart = a.ontouchstart;
	this.ontouchend = a.ontouchend;
	this.ontouchenter = a.ontouchenter;
	this.ontouchleave = a.ontouchleave;

	// Create touch handler
	var that = this;
	this.touchHandler = (function(){
		var startInside = false;
		var lastX,lastY;
		function isInside(x,y) {
			return that.billboard.isInsideScreenRect(x,y,that.pos);
		}
		var startIndex = null;
		return {
			start: function(x,y,i) {
				if (startIndex != null) {
					return;
				}

				startInside = isInside(x,y);
				lastX = x;
				lastY = y;
				if (startInside) {
					startIndex = i;
					that.ontouchstart && that.ontouchstart(x,y);
				}
				else {
					startIndex = null;
				}
			},
			move: function(x,y,i) {
				if (startIndex != i) {
					return;
				}

				lastX = x;
				lastY = y;
				if (startInside) {
					if (isInside(x,y,i)) {
						that.ontouchenter && that.ontouchenter(x,y);
					}
					else {
						that.ontouchleave && that.ontouchleave(x,y);
					}
				}
			},
			end: function(x,y,i) {
				if (startIndex != i) {
					return;
				}

				if (startInside) {
					if (isInside(lastX,lastY)) {
						that.onclick && that.onclick();
					}
					that.ontouchend && that.ontouchend(x,y);
				}

				startIndex = null;
			},
			cancel: function(x,y,i) {
			},
		};
	})();
};
Ptero.Button.prototype = {
	enable: function() {
		if (!this.isEnabled) {
			Ptero.input.addTouchHandler(this.touchHandler);
			this.isEnabled = true;
		}
	},
	disable: function() {
		if (this.isEnabled) {
			Ptero.input.removeTouchHandler(this.touchHandler);
			this.isEnabled = false;
		}
	},
};

Ptero.SpriteButton = function(a) {
	this.sprite = a.sprite;
	a.billboard = a.sprite.billboard;

	var ontouchstart = a.ontouchstart;
	var ontouchend = a.ontouchend;
	var ontouchenter = a.ontouchenter;
	var ontouchleave = a.ontouchleave;

	var origScale = a.sprite.billboard.scale;
	var focusScale = origScale * 1.1;
	function setScale(s) {
		a.sprite.billboard.scale = s;
	}
	
	a.ontouchstart = function() {
		ontouchstart && ontouchstart();
		setScale(focusScale);
	};
	a.ontouchend = function() {
		ontouchend && ontouchend();
		setScale(origScale);
	};
	a.ontouchenter = function() {
		ontouchenter && ontouchenter();
		setScale(focusScale);
	};
	a.ontouchleave = function() {
		ontouchleave && ontouchleave();
		setScale(origScale);
	};

	Ptero.Button.call(this,a);
};
Ptero.SpriteButton.prototype = newChildObject(Ptero.Button.prototype, {
	draw: function(ctx) {
		this.sprite.draw(ctx,this.pos);
	},
});

Ptero.TextButton = function(a) {

	// get font size and css font string
	this.fontSize = a.fontSize || Ptero.hud.getBaseTextSize();
	this.font = this.fontSize + "px " + a.font;

	// get other font related vars
	this.textColor = a.textColor;
	this.text = a.text;
	this.textAlign = a.textAlign;
	this.pad = (function(){
		var pad = a.pad || 0;
		if (typeof pad == "number") {
			pad = { x:pad, y:pad };
		}
		return pad;
	})();

	// calculate width and height if fitting around text
	a.fitText && (function(){
		var ctx = Ptero.screen.getCtx();
		var h = this.fontSize*1.25;

		ctx.font = this.font;
		a.width = ctx.measureText(a.text).width + 2*this.pad.x;

		//a.width = a.text.length * h;
		a.height = h + 2*this.pad.y;
	}).call(this);

	Ptero.Button.call(this,a);
}
Ptero.TextButton.prototype = newChildObject(Ptero.Button.prototype, {
	draw: function(ctx) {
		ctx.font = this.font;
		ctx.textBaseline = "middle";
		ctx.textAlign = this.textAlign;

		var rect = this.billboard.getScreenRect(this.pos);
		if (Ptero.painter.isDebugOutline()) {
			ctx.strokeStyle = "#0F0";
			ctx.strokeRect(rect.x,rect.y,rect.w,rect.h);
		}
		var y = rect.centerY;

		// get x position
		var x;
		switch(this.textAlign) {
			case "left": x = rect.x+this.pad.x; break;
			case "right": x = rect.x+rect.w-this.pad.x; break;
			case "center": x = rect.centerX; break;
			default: throw("unrecognized text alignment "+this.textAlign);
		}

		// draw shadow first
		var r = 2;
		ctx.fillStyle = "#000";
		ctx.fillText(this.text, x+r,y+r);

		// draw text
		ctx.fillStyle = this.textColor;
		ctx.fillText(this.text, x,y);
	},
});
