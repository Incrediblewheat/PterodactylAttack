//version 1.2
Ptero.scene_highscore = (function(){

	var buttonList;

	function cleanup() {
		buttonList.disable();
	}

	function init() {

		buttonList = new Ptero.ButtonList(Ptero.assets.json["btns_highscore"]);

		var btns = buttonList.namedButtons;

		var ranks = Ptero.settings.rankGet();
		//TODO: highlight new score entry
		//TODO: make this elegant with a loop you dummy
		btns["player1"].text  = ranks[0].player_name;
		btns["difficulty1"].text = ranks[0].difficulty;
		btns["score1"].text = ranks[0].rankedScore.toString();

		btns["player2"].text  = ranks[1].player_name;
		btns["difficulty2"].text = ranks[1].difficulty;
		btns["score2"].text = ranks[1].rankedScore.toString();;

		btns["player3"].text  = ranks[2].player_name;
		btns["difficulty3"].text = ranks[2].difficulty;
		btns["score3"].text = ranks[2].rankedScore.toString();

		btns["player4"].text  = ranks[3].player_name;
		btns["difficulty4"].text = ranks[3].difficulty;
		btns["score4"].text = ranks[3].rankedScore.toString();

		btns["player5"].text  = ranks[4].player_name;
		btns["difficulty5"].text = ranks[4].difficulty;
		btns["score5"].text = ranks[4].rankedScore.toString();

	/*	btns["kills"].text    = Ptero.settings.get("high_kills").toString();
		btns["caps"].text     = Ptero.settings.get("high_captures").toString();
		btns["bounties"].text = Ptero.settings.get("high_bounties").toString();
    */
		btns["erase"].onclick = function() {
			Ptero.setScene(Ptero.scene_erasehighscore);
		};

		btns["settings"].onclick = function() {
			Ptero.setScene(Ptero.scene_options);
		};

		btns["trophy"].onclick = function() {
			//Ptero.setScene(Ptero.scene_highscore);
		};

		btns["localPhone"].onclick = function() {
			//do nothing for now
		};

		btns["gplus"].onclick = function() {
			//do nothing for now
		};

		btns["fb"].onclick = function() {
			//do nothing for now
		};
		var b = btns["back"];
		b.isClickDelay = true;
		b.onclick = function() {
			cleanup();
			Ptero.setScene(Ptero.scene_menu);
		};

		buttonList.enable();
	}

	function update(dt) {
	}

	function draw(ctx) {
		Ptero.deferredSprites.draw(ctx);
		buttonList.draw(ctx);
	}

	return {
		init: init,
		update: update,
		draw: draw,
		cleanup:cleanup,
	};

})();
