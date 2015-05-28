/*This follows closely Ptero.settings. It sets up and stores the
top 10 best scores for a local scoreboard. Each highscore will
be ranked, and the values set for that playthrough will be saved
as well.*/
Ptero.scoreboard = (function(){
	
	var ranks;

	var defaultValues = {
		"name"		: 'player',
		"difficulty": 'easy',

		"high_score": 0,
		"high_waves": 0,
		"high_kills": 0,
		"high_captures": 0,
		"high_bounties": 0,
	};
	function entries() {
		if (!ranks) {
			ranks = {};
		}

		var name;
		for (name in defaultValues) {
			if (ranks[name] == undefined) {
				ranks[name] = defaultValues[name];
			}
		}
	};
	initValues();

	var key = "settings";

	return {
		clearHighScores: function() {
			values["high_score"] = 0;
			values["high_waves"] = 0;
			values["high_kills"] = 0;
			values["high_captures"] = 0;
			values["high_bounties"] = 0;
			this.save();
		},
		set: function(key,value) {
			values[key] = value;
			this.save();
		},
		get: function(key) {
			return values[key];
		},
		load: function() {
			values = null;
			try {
				values = JSON.parse(localStorage[key]);
			}
			catch (e) {
			}
			initValues();
			console.log(values);
		},
		save: function() {
			localStorage[key] = JSON.stringify(values);
		},
	};
})();