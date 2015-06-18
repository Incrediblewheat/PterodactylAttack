
Ptero.Player = function() {
	this.maxHealth = 8;
	this.initHealth = 4;

	this.maxLives = 5;
	this.lives = 3;
	console.log("LIVES", this.lives);

	this.initBounty = 0;
	this.maxBounty = 5;

	this.reset();
	this.setGod(false);
};

Ptero.Player.prototype = {

	toggleGod: function() {
		this.setGod(!this.isGod);
	},
	setGod: function(on) {
		if (!navigator.isCocoonJS) {
			var elm = document.getElementById('god-state');
			if (elm) {
				elm.innerHTML = on ? "ON" : "OFF";
			}
		}
		this.isGod = on;
	},
	reset: function() {
		this.health = this.initHealth;
		this.bounty = this.initBounty;
	},
	earnHealth: function(hp) {
		this.health = Math.min(this.maxHealth, this.health+hp);
	},
	earnLives: function(oneUp) {
		this.lives = Math.min(this.lives+oneUp, this.maxLives);
		this.bounty = this.initBounty;
		console.log("1UP, Lives :" +this.lives);
	},
	//Upon earning bounties the player's bounty bar fills. When max bounties are caught
	//the player gets an extra life and the bounty bar resets.
	earnBounty: function(inc) {
		this.bounty += inc;

		if (this.bounty == this.maxBounty) {
			this.earnLives(1);
		}
	//	console.log("Bountybar: " +this.bounty, "/" +this.maxBounty);
	},
	applyDamage: function(dmg) {
		if (this.isGod) {
			dmg = 0;
		}

		if (this.health > 0) {
			if (Ptero.settings.isVibrateEnabled()) {
				navigator.vibrate && navigator.vibrate(200);
			}
			Ptero.screen.shake();
			if (this.health >= 4) {
				Ptero.audio.play('hurt1');
			}
			else if (this.health == 3) {
				Ptero.audio.play('hurt2');
			}
			else if (this.health == 2) {
				Ptero.audio.play('hurt3');
			}
			else if (this.health == 1) {
				Ptero.audio.play('hurt4');
			}
			Ptero.audio.play('damage');
			this.health -= dmg;
			if (this.health <= 0) {
				this.die();
			}
		}
	},
	die: function() {
		this.lives -= 1;
		console.log("Lives Remaining: " + this.lives);
		this.health = this.initHealth;
	},
};
