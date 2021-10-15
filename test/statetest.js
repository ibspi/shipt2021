var game = require("./../playstate");
var statechange = require("./../statechange");
const states = require("./../gamestates").getStates();

var assert = require('assert');
describe('game state tests', function() {

 describe('should notify listeners', function (){


        it('statechange should react', function(){
            game.init(2);
             game.addStateChangeListener(statechange.changed);
            game.addPlayer1("dummy");
            assert.equal(statechange.getLastMessage().currentState, states.WAITFORPLAYER2);

            game.addPlayer2("dummy1");
            assert.equal(statechange.getLastMessage().currentState, states.READY);

            game.addGoalP1();
            game.addGoalP1();

            assert.equal(statechange.getLastMessage().currentState, states.WAITFORPLAYER1);

        });
    });

  describe('should be transitional', function() {


    it('give initial state', function() {
        game.init(5);
      assert.equal(game.getWholeState().currentState , states.WAITFORPLAYER1);
      assert.equal(game.getWholeState().firstPlayer , null);
      assert.equal(game.getWholeState().secondPlayer , null);
      assert.deepEqual(game.getWholeState().goals , [0,0]);


    });

    it('should not transit to ready', function (){
        assert.equal(game.getWholeState().currentState , states.WAITFORPLAYER1);
        console.log(game.getWholeState().currentState);
        assert.equal(game.addPlayer2("dummy"), false);
        assert.equal(game.getWholeState().currentState , states.WAITFORPLAYER1);


    });

    it('should  transit to waitforplayer2', function (){
        assert.equal(game.addPlayer1("dummy"), true);
        assert.equal(game.getWholeState().currentState , states.WAITFORPLAYER2);

    });
    it('should not  transit to away 1', function (){
        assert.equal(game.addPlayer1("dummy"), false);
        assert.equal(game.getWholeState().currentState , states.WAITFORPLAYER2);

    });

    it('should not  transit to away b/c same player', function (){
        assert.equal(game.addPlayer2("dummy"), false);
        assert.equal(game.getWholeState().currentState , states.WAITFORPLAYER2);

    });
    it('should   transit to ready', function (){
        assert.equal(game.addPlayer2("dummy2"), true);
        assert.equal(game.getWholeState().currentState , states.READY);

    });

    it('should be able to add goals ', function (){
        assert.equal(game.addGoalP1(), true);
        assert.equal(game.getWholeState().currentState, states.READY);
        assert.equal(game.addGoalP2(), true);
        assert.equal(game.getWholeState().currentState , states.READY);

        assert.equal(game.addGoalP2(), true);
        assert.equal(game.getWholeState().currentState , states.READY);

        assert.equal(game.addGoalP2(), true);
        assert.equal(game.getWholeState().currentState , states.READY);

        assert.equal(game.addGoalP2(), true);
        assert.equal(game.getWholeState().currentState , states.READY);

        assert.equal(game.addGoalP2(), true);
        assert.equal(game.getWholeState().currentState, states.WAITFORPLAYER1);

    });
  });


});