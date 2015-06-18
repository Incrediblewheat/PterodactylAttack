
//This test version navigates to gameover and gameover_hs
Ptero.scene_gameover = (function(){

	var buttonList;
	var isNewHigh;

	function cleanup() {
		buttonList.disable();
	}

	var isExiting;
	function init() {
		if (Ptero.overlord.waveNum == Ptero.overlord.maxWave) {
			Ptero.audio.play('Ptero_Win_Music');
		}
		else {
			Ptero.audio.play('gameover');
		}
		Ptero.audio.play('drop_menu');
		Ptero.overlord.stopScript();
		isExiting = false;

		buttonList = new Ptero.ButtonList(Ptero.assets.json["btns_gameover"]);
		var btns = buttonList.namedButtons;

		btns["score"].text    = Ptero.score.getTotal().toString();
		btns["waves"].text    = Ptero.score.getWaves().toString();
		btns["kills"].text    = Ptero.score.getKills().toString();
		btns["caps"].text     = Ptero.score.getCaptures().toString();
		btns["bounties"].text = Ptero.score.getBounties().toString();
		btns["accuracy"].text = Math.floor(Ptero.score.getAccuracy()*100).toString();

		btns["quit"].onclick = function() {
			isExiting = true;
			cleanup();
			
			Ptero.setScene(Ptero.scene_gameover_hs);
		};

		// enable controls after one second to prevent inadvertent selection if swipe actions spill over from the game
		setTimeout(function() {
			btns["quit"].enable();
		}, 1000);
		
		//submit stats to highscore
		Ptero.score.commitStats(Ptero.score.getTotal());
	/*	if (!isNewHigh.score) {
			btns["highScore"].text = "continue?";
		} */
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