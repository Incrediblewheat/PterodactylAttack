Ptero.scene_gameover = (function(){

	var buttonList;
	var isNewHigh;

	function cleanup() {
		buttonList.disable();
	}

	var isExiting;
	function init() {
		Ptero.audio.play('Ptero_Lose_Music');
		Ptero.audio.play('drop_menu');
		Ptero.overlord.stopScript();
		isExiting = false;

		if (Ptero.player.lives == 0){

			buttonList = new Ptero.ButtonList(Ptero.assets.json["btns_gameover"]);
			var btns = buttonList.namedButtons;
		}
		else{
			buttonList = new Ptero.ButtonList(Ptero.assets.json["btns_continue"]);
			var btns = buttonList.namedButtons;

			btns["replay"].onclick = function() {
			isExiting = true;
			cleanup();
			Ptero.audio.fadeOut('Ptero_Lose_Music',1.0);
			setTimeout(function(){
				currWave = Ptero.overlord.waveNum;
				currStage = Ptero.background.name;
				Ptero.setScene(Ptero.scene_play);
				Ptero.scene_play.switchBackground(currStage);
				Ptero.overlord.createWaveScript(currWave);
				console.log("Level Name: "+ Ptero.background.name);
			}, 0);
		};
		}
		
		btns["score"].text    = Ptero.score.getTotal().toString();
		btns["waves"].text    = Ptero.score.getWaves().toString();
		btns["kills"].text    = Ptero.score.getKills().toString();
		btns["caps"].text     = Ptero.score.getCaptures().toString();
		btns["bounties"].text = Ptero.score.getBounties().toString();
		btns["accuracy"].text = Math.floor(Ptero.score.getAccuracy()*100).toString();


		btns["quit"].onclick = function() {
			Ptero.setScene(Ptero.scene_menu);
			Ptero.audio.stop('Ptero_Lose_Music');
			Ptero.audio.play('theme');
		};

		// enable controls after one second to prevent inadvertent selection if swipe actions spill over from the game
		setTimeout(function() {
			if (Ptero.player.lives == 0){
			}
			else{
				btns["replay"].enable();
			}	
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
