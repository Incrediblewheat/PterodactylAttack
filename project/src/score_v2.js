
Ptero.score = (function(){

	function zeroPad(numDigits,number) {
		var result = (""+number);
		var len = result.length;
		var i;
		for (i=len; i<numDigits; i++) {
			result = "0" + result;
		}
		return result;
	}
	
	var highScore;

	var total = 0;

	var waves;
	var kills;
	var hits;
	var misses;
	var captures;
	var bounties;
	var failedBounties;

	function commitStats(lastScore) {
		//checks score against top 5, commmits if a new high
		//then sorts and truncates to keep a max of 5 ranks.
		var ranks = Ptero.settings.rankGet();

		for (i = 1; i < ranks.length; i++) {
        	if (lastScore > ranks[i].rankedScore) {
        	   ranks[ranks.length] = {  
					"rankedScore": this.getTotal(),
					"rankedWaves": this.getWaves(),
					"rankedKills": this.getKills(),
					"rankedCaptures": this.getCaptures(),
					"rankedBounties": this.getBounties(),
					"difficulty": 'easy',
					"player_name": 'player'
				};
        	    break;
        	}
        }

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort 
		ranks.sort(function (a, b) {
  			if (a.rankedScore < b.rankedScore) {
			    return 1;
  			}
  			if (a.rankedScore > b.rankedScore) {
    			return -1;	
  			}
  			return 0;
		});
		////////
		ranks = ranks.slice(0, 5);
		for (i in ranks.length) {
			n = i+1;
			ranks[i].rankNum = (n.toString() + ". ");
		}
		Ptero.settings.rankSet(ranks);
	};

	return {
		printState: function() {
			console.log("SCORE:::::::::::");
			console.log(kills,'kills');
			console.log(hits,'hits');
			console.log(misses,'misses');
			console.log(this.getAccuracy(), 'accuracy');
			console.log(bounties,'bounties');
			console.log(failedBounties,'failedBounties');	
			console.log("::::::::::::::::");
		},
		addWaves: function(delta) {
			waves += delta;
		},
		addKills: function(delta) {
			kills += delta;
		},
		addHits: function(delta) {
			hits += delta;
		},
		addMisses: function(delta) {
			misses += delta;
		},
		addCaptures: function(delta) {
			captures += delta;
		},
		addBounties: function(delta) {
			bounties += delta;
		},
		addFailedBounties: function(delta) {
			failedBounties += delta;
		},
		getWaves: function() {
			waves = Ptero.overlord.waveNum +1;
			return waves;
		},
		getKills: function() {
			return kills;
		},
		getHits: function() {
			return hits;
		},
		getMisses: function() {
			return misses;
		},
		getCaptures: function() {
			return captures;
		},
		getBounties: function() {
			return bounties;
		},
		getAccuracy: function() {
			var total = hits + misses;
			return (total == 0) ? 0 : hits/total;
		},
		reset: function() {
			total = 0;
			waves = 0;
			kills = 0;
			hits = 0;
			misses = 0;
			captures = 0;
			bounties = 0;
			failedBounties = 0;
		},
		update: function(dt) {
		},
		getScoreStr: function() {
			return zeroPad(7,total);
		},
		getLives: function() {
			return zeroPad(1, Ptero.player.lives);
		},
		addPoints: function(value) {
			total += value;
		},
		setTotal: function(value) {
			total = value;
		},
		getTotal: function() {
			return total;
		},
		commitStats:commitStats,
	};
})();