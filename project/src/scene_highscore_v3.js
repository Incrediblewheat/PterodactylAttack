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
		btns["player"+"1"].text  = ranks[0].player_name;
		btns["player1"].font = "redscorefont";
		btns["difficulty1"].text = ranks[0].difficulty;
		btns["player"+"2"].text  = ranks[0].player_name;
		btns["player2"].font = "whitescorefont";
		btns["difficulty2"].text = ranks[0].difficulty;
		btns["player"+"3"].text  = ranks[0].player_name;
		btns["player3"].font = "whitescorefont";
		btns["difficulty3"].text = ranks[0].difficulty;
		btns["player"+"4"].text  = ranks[0].player_name;
		btns["player4"].font = "whitescorefont";
		btns["difficulty4"].text = ranks[0].difficulty;
		btns["player"+"5"].text  = ranks[0].player_name;
		btns["player5"].font = "whitescorefont";
		btns["difficulty5"].text = ranks[0].difficulty;
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
