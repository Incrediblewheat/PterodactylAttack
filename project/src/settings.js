
Ptero.settings = (function(){

	var values;
	var defaultValues = {
		"soundOn": true,
		"musicOn": true,
		"vibrateOn": true,
		"tutorialOn": true,
		"netSide": 'left',
		"high_score": 0,
		"high_waves": 0,
		"high_kills": 0,
		"high_captures": 0,
		"high_bounties": 0
	};

	function initValues() {
		if (!values) {
			values = {};
		}

		var name;
		for (name in defaultValues) {
			if (values[name] == undefined) {
				values[name] = defaultValues[name];
			}
		}
	}
	initValues();

	var rankStorage;
	var localRanks = [];
	var defaultScores = {
		"rankedScore": 0,
		"rankedWaves": 0,
		"rankedKills": 0,
		"rankedCaptures": 0,
		"rankedBounties": 0,
		"difficulty": 'normal',
		"player_name": '1-3-2014'
	//	"rankNum": 0
	};

	function initRanks() {
		if (!localRanks) {
			localRanks = [];
		} 
		var n;
		for (i = 0; i < 5; i++) {
			if (localRanks[i] == undefined) {
				localRanks[i] = defaultScores;
				n = i+1;
		//		localRanks[i].rankNum = (n.toString() + ". ");
			}
		}
	}
	initRanks();

	var key = "settings";

	return {
		clearHighScores: function() {
			localRanks = null;
			initRanks();
			this.rankSave();
		},
		set: function(key,value) {
			values[key] = value;
			this.save();
		},
		get: function(key) {
			return values[key];
		},
		rankSet: function(newRanks) {
			localRanks = newRanks;
			this.rankSave();
		},
		rankGet: function() {
			return localRanks;
		},
		rankLoad: function() {
			localRanks = null;
			try {
				localRanks = JSON.parse(localStorage.getItem('localScores'));
			}
			catch (e) {
			}
			initRanks();
		},
		rankSave: function() {
			localStorage.setItem('localScores', JSON.stringify(localRanks));
		},
		load: function() {
			values = null;
			try {
				values = JSON.parse(localStorage[key]);
			}
			catch (e) {
			}
			initValues();
	//		console.log(values);
		},
		save: function() {
			localStorage[key] = JSON.stringify(values);
		},
		enableSound: function(on) {
			values['soundOn'] = on;
			Ptero.audio.setSoundVolume(this.getSoundVolume());
			this.save();
		},
		enableMusic: function(on) {
			values['musicOn'] = on;
			Ptero.audio.setMusicVolume(this.getMusicVolume());
			this.save();
		},
		enableVibrate: function(on) {
			values['vibrateOn'] = on;
			this.save();
		},
		enableTutorial: function(on) {
			values['tutorialOn'] = on;
			this.save();
		},
		setNetSide: function(side) {
			values['netSide'] = side;
			this.save();
		},
		isSoundEnabled: function() {
			return values['soundOn'];
		},
		getSoundVolume: function() {
			return values['soundOn'] ? 1 : 0;
		},
		isMusicEnabled: function() {
			return values['musicOn'];
		},
		isVibrateEnabled: function() {
			return values['vibrateOn'];
		},
		isTutorialEnabled: function() {
			return values['tutorialOn'];
		},
		getMusicVolume: function() {
			return values['musicOn'] ? 1 : 0;
		},
		getNetSide: function() {
			return values['netSide'];
		},
	};
})();
