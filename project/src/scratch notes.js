var ranks = [];

var defaultValues = {
    "player_nam": 'player',
    "difficulty": 'easy',
    
    "high_score": 0,
    "high_waves": 0,
    "high_kills": 0,
    "high_captures": 0,
    "high_bounties": 0
};

for (i = 1; i < 6; i++) {
    ranks[i] = entries;
}
/*
var testScore = {
    "player_nam": 'Wheat',
    "difficulty": 'normal',
    
    "high_score": 9001,
    "high_waves": 3,
    "high_kills": 24,
    "high_captures": 3,
    "high_bounties": 1
};*/
//Check new highscore against saved, if higher append
//object to end of the array.
function addNewHigh(scoreObj) {
    for (i = 1; i < ranks.length; i++) {
        if (scoreObj.high_score > ranks[i].high_score) {
            ranks[ranks.length] = scoreObj;
            break;
        }
    }
};
/*
ranks[7] = {
    "player_nam": 'Lisa',
    "difficulty": 'hard',
    
    "high_score": 1337,
    "high_waves": 1,
    "high_kills": 9,
    "high_captures": 1,
    "high_bounties": 0
};*/
//////// 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort 
ranks.sort(function (a, b) {
  if (a.high_score < b.high_score) {
    return 1;
  }
  if (a.high_score > b.high_score) {
    return -1;
  }
  return 0;
});
////////////

ranks = ranks.slice(0, 5);
console.log(ranks);