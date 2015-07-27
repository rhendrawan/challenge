
describe('ChallengeController', function(){

  beforeEach(module('challengeApp'));


  describe('test-Test', function () {

    it('should prove unicorns exist', function () {
      expect(true).to.equal(true);
    });

  });

  describe('create-challenge', function () {

    var CreateChallengeFactory, CreateChallengeController, $httpBackend;

    beforeEach(inject(function (_CreateChallengeFactory_, _CreateChallengeController_, _$httpBackend_) {
      CreateChallengeFactory = _CreateChallengeFactory_;
      CreateChallengeController = _CreateChallengeController_;
      $httpBackend = _$httpBackend_;
    }));

    it('creates the challenge and responds with challenge ID', function () {
      $httpBackend
      .expectPOST('/api/1/challenge', {
        'title':'testTitle', 
        'message':'testMessage',
        'participants':[{'id':2}],
        'wager':'testWager'
      })
      .respond(200, {'id':2});

      var challengeID;
      CreateChallengeFactory.postChallenge({
        'title':'testTitle', 
        'message':'testMessage',
        'participants':[{'id':2}],
        'wager':'testWager'
      }).then(function(res){
        challengeID = res.id;
      });
      $httpBackend.flush();
      expect(challengeID).to.equal(2);

      
    });

    // use sinon.spy to make sure 'CreateChallengeFactory.postChallenge' is called when
    // CreateChallengeController.postChallenge runs

  });


});