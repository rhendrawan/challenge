angular.module('challengeApp.userChallenge', [])

.controller('UserChallengesController', function ($scope, ChallengeFactory) {
  $scope.challenges = [];

  $scope.getUserChallenges = function() {
    ChallengeFactory.getUserChallenges().then(function(challenges) {
      $scope.challenges = challenges;
    });
  };
  $scope.getUserChallenges();
}).filter('challengeFilter', function() {
  return function(input, accepted, started, complete, user) {
    user = (user !== undefined) ? parseInt(user) : undefined;
    accepted = (accepted !== undefined && user !==undefined) ? !!parseInt(accepted) : null;
    started = (started !== undefined) ? !!parseInt(started) : false;
    complete = (complete !== undefined) ? !!parseInt(complete): false;

    return input.filter(function(challenge) {
      var has_accepted;

      if (accepted !== null) {
        has_accepted = challenge.participants.some(function(participant) {
          return (participant.accepted === accepted && participant.id === user);
        });
      } else {
        has_accepted = true;
      }

      return (challenge.started === started && challenge.complete === complete && has_accepted);
    });
  };
}).directive('challengeTable', function() {
  return {
    'scope': {
      'challenges': '=',
      'user': '@',
      'accepted': '@',
      'started': '@',
      'complete': '@',
      'caption': '@'
    },
    'restrict': 'E',
    'templateUrl': '/angular/client/challengerApp/user/challengeTable.html'
  };
});
