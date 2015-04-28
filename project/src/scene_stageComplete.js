//This is the scene the player see upon stage or game completion

Ptero.scene_stageComplete = (function(){

	var buttonList;
	var isNewHigh;

	function cleanup() {
		buttonList.disable();
	}

	var isExiting;
	function init() {
		Ptero.audio.play('Ptero_Win_Music');
		Ptero.audio.play('drop_menu');
		Ptero.overlord.stopScript();
		isExiting = false;

		buttonList = new Ptero.ButtonList(Ptero.assets.json["btns_display"]);
		var btns = buttonList.namedButtons;
		
		btns["score"].text    = Ptero.score.getTotal().toString();
		btns["waves"].text    = Ptero.score.getWaves().toString();
		btns["kills"].text    = Ptero.score.getKills().toString();
		btns["caps"].text     = Ptero.score.getCaptures().toString();
		btns["bounties"].text = Ptero.score.getBounties().toString();
		btns["accuracy"].text = Math.floor(Ptero.score.getAccuracy()*100).toString();
		
		btns["continue"].onclick = function() {
			isExiting = true;
			cleanup();

			currWave = Ptero.overlord.waveNum;
			currStage = Ptero.background.name;
			currHealth = Ptero.player.health;

			Ptero.setScene(Ptero.scene_play);
			Ptero.player.health = currHealth;
			Ptero.setBackground(currStage);
			Ptero.background.exit();
			Ptero.background.playOutTrack();
			setTimeout(function(){
				Ptero.scene_play.switchBackground(Ptero.getNextBgName(currStage));
				console.log("switchbg "+ Ptero.background.name);
				Ptero.overlord.createWaveScript(currWave);
				Ptero.bountySize = Math.min(5, currWave+2);
				Ptero.refreshBounty();
			}, 3500);
		}; 

		btns["quit"].onclick = function() {
			Ptero.setScene(Ptero.scene_menu);
			Ptero.audio.stop('Ptero_Lose_Music');
			Ptero.audio.play('theme');
		};

		// enable controls after one second to prevent inadvertent selection if swipe actions spill over from the game
		setTimeout(function() {
			btns["continue"].enable();
			btns["quit"].enable();
		}, 1000);

		isNewHigh = Ptero.score.commitStats();
		if (!isNewHigh.score) {
			btns["highScore"].text = "continue?";
		}
	}

	function draw(ctx) {
		Ptero.deferredSprites.draw(ctx);
		ctx.fillStyle = "rgba(0,0,0,0.5)";
		ctx.fillRect(0,0,Ptero.screen.getWindowWidth(),Ptero.screen.getWindowHeight());
		if (!isExiting) {

			buttonList.draw(ctx);
		}
	}

	var time = 0;
	function update(dt) {
		time += dt;
		Ptero.overlord.update(dt);
	}

	return {
		init:init,
		draw:draw,
		update:update,
		cleanup: cleanup,
	};
})();