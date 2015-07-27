angular.module('challengeApp', [
  'challengeApp.challenge',
  'challengeApp.createChallenge',
  'challengeApp.completedChallenges',
  'challengeApp.userChallenge',
  'challengeApp.services',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
    
  $urlRouterProvider.otherwise('/signin');
    
  $stateProvider
      // HOME STATES AND NESTED VIEWS ========================================
    .state('signin', {
      url: '/signin',
      templateUrl: 'angular/client/challengerApp/auth/signin.html',
    })

    .state('signout', {
      url: '/signout',
      controller: function($scope, $state) {
        $scope.logout();
        $state.go('signin');
      }
    })

    .state('completed', {
        url: '/completed',
        templateUrl: 'angular/client/challengerApp/completed.html',
        controller: 'completedChallengesController'
    })

    .state('create', {
        url: '/create',
        templateUrl: 'angular/client/challengerApp/create/create.html',
        controller: 'CreateChallengeController'
    })
    // Challenge PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('challenge', {
        url: '/challenge/:challengeId',
        templateUrl: 'angular/client/challengerApp/challenge/public.html',
        controller: 'ChallengeController'
        // views: {
        //     // the main template will be placed here (relatively named)
        //     'creator': { 
        //       templateUrl: 'challenge/creator.html',
        //       controller: 'ChallengeController'
        //     },

        //     // the child views will be defined here (absolutely named)
        //     'challenger': { 
        //       templateUrl: 'challenge/challenger.html', 
        //       controller: "ChallengeController"
        //     },

        //     'public': { 
        //       templateUrl: 'challenge/public.html',
        //       controller: "ChallengeController" 
        //   }
        // }
    })
    .state('challenge_list', {
      url: '/challenges',
      templateUrl: 'angular/client/challengerApp/challenge/list.html',
      controller: 'ChallengeListController'
    })

    .state('user', {
      url: '/user',
      templateUrl: 'angular/client/challengerApp/user/user.html',
      controller: 'UserChallengesController'
    });

}).controller('ChallengeAppController', function($scope, $state, Auth) {
  $scope.user = null;

  $scope.setCurrentUser = function() {
    Auth.getUserInfo().then(function(user) {
      $scope.user = user;
    }, function() {
      $state.go('signin');
    });
  };

  $scope.logout = function() {
    Auth.logout().then(function() {
      $scope.user = null;
    });
  };

  $scope.setCurrentUser();
}).filter('challengeFilter', function() {
  return function(input, accepted, started, complete, user) {
    user = (user !== undefined) ? parseInt(user) : undefined;
    accepted = (accepted !== undefined && user !==undefined) ? !!parseInt(accepted) : null;
    started = (started !== undefined) ? !!parseInt(started) : null;
    complete = (complete !== undefined) ? !!parseInt(complete): null;

    return input.filter(function(challenge) {
      var has_accepted = true;

      if (accepted !== null) {
        has_accepted = challenge.participants.some(function(participant) {
          return (participant.accepted === accepted && participant.id === user);
        });
      }

      return (
        ((challenge.started === started) || started === null) && ((challenge.complete === complete) || complete === null) && has_accepted
      );
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
