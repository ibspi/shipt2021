var game = require("./playstate");
var statechange = require("./statechange");
var states = require("./gamestates").getStates();




game.init(5);
game.addStateChangeListener(statechange.changed);
game.addPlayer1("dummy");

game.init(5);
var ret =game.addPlayer2("dummy");
console.log(ret);
