
describe('ChallengeController', function(){

  beforeEach(module('challengeApp'));


  describe('test-Test', function () {

    it('should prove unicorns exist', function () {
      expect(true).to.equal(true);
    });

  });

  // describe('create-challenge', function () {

  //   var CreateChallengeFactory, $httpBackend;

  //   beforeEach(inject(function (_CreateChallengeFactory_, _$httpBackend_) {
  //     CreateChallengeFactory = _CreateChallengeFactory_;
  //     $httpBackend = _$httpBackend_;
  //   }));

  //   it('creates the challenge on the server', function () {
  //     $httpBackend
  //     .expectPOST('/api/1/challenge', {
  //       'title':'testTitle', 
  //       'message':'testMessage',
  //       'participants':[{'id':2}],
  //       'wager':'testWager'
  //     })
  //     .respond(200);

  //     var succeeded;
  //     CreateChallengeFactory.postChallenge({
  //       'title':'testTitle', 
  //       'message':'testMessage',
  //       'participants':[{'id':2}],
  //       'wager':'testWager'
  //     }).then(function(){
  //       succeeded = true;
  //     });
  //     $httpBackend.flush();
  //     expect(succeeded).to.be.true;

      
  //   });

  // });


});