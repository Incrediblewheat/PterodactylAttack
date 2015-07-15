//version 1.2
Ptero.scene_gameover_hs = (function(){

	var buttonList;

	function cleanup() {
		buttonList.disable();
	}

	function init() {
		Ptero.audio.play('score');
		
		buttonList = new Ptero.ButtonList(Ptero.assets.json["btns_gameover_hs"]);
		var btns = buttonList.namedButtons;

		isExiting = false;
		var ranks = Ptero.settings.rankGet();
		//TODO: highlight new score entry
		//TODO: make this elegant with a loop you dummy
		btns["player1"].text  = ranks[0].player_name;
		btns["difficulty1"].text = ranks[0].difficulty;
		btns["score1"].text = ranks[0].rankedScore.toString();

		btns["player2"].text  = ranks[1].player_name;
		btns["difficulty2"].text = ranks[1].difficulty;
		btns["score2"].text = ranks[1].rankedScore.toString();

		btns["player3"].text  = ranks[2].player_name;
		btns["difficulty3"].text = ranks[2].difficulty;
		btns["score3"].text = ranks[2].rankedScore.toString();

		btns["player4"].text  = ranks[3].player_name;
		btns["difficulty4"].text = ranks[3].difficulty;
		btns["score4"].text = ranks[3].rankedScore.toString();

		btns["player5"].text  = ranks[4].player_name;
		btns["difficulty5"].text = ranks[4].difficulty;
		btns["score5"].text = ranks[4].rankedScore.toString();

		btns["localPhone"].onclick = function() {
			//do nothing for now
		};

		btns["gplus"].onclick = function() {
			//do nothing for now
		};

		btns["fb"].onclick = function() {
			//do nothing for now
		};
		btns["quit"].onclick = function() {
			isExiting = true;
			cleanup();
			Ptero.audio.fadeOut('score', 1.5);
			Ptero.background.exit();
			Ptero.background.playOutTrack();
			setTimeout(function(){
				Cocoon.Ad.showInterstitial();
				setTimeout(function(){
					Ptero.setScene(Ptero.scene_menu);
					Ptero.audio.play('theme');
				},500);
			}, 3500);

		};

		buttonList.enable();		
	}

	function update(dt) {
	}

	function draw(ctx) {
		Ptero.deferredSprites.draw(ctx);
		ctx.fillStyle = "rgba(0,0,0,0.5)";
		ctx.fillRect(0,0,Ptero.screen.getWindowWidth(),Ptero.screen.getWindowHeight());
		if (!isExiting) {
			buttonList.draw(ctx);
		}
	}

	return {
		init: init,
		update: update,
		draw: draw,
		cleanup:cleanup,
	};

})();
