'use strict';

angular.module('AngFBApp.facebook', ['ngRoute', 'ngFacebook'])

//angulr router config
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'facebookCtrl'
  });
}])

//ngFacebook config
.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('1571215723198245');
  $facebookProvider.setPermissions('email, public_profile, user_posts, publish_actions, user_photos, user_about_me, user_friends, user_likes');
})

//Facebook SDK
.run(function($rootScope){
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
})



//controller for facebook.html
.controller('facebookCtrl', ['$scope','$facebook',function($scope, $facebook) {

  //login initial false
  $scope.isLoggedIn = false;

  //login
  $scope.login = function(){
    $facebook.login().then(function(){
      $scope.isLoggedIn = true;
      refresh();
    })
  }

  //logout
  $scope.logout = function(){
    $facebook.logout().then(function(){
      $scope.isLoggedIn = false;
      refresh();
    })
  }

  //refresh logs in pulls data from facebook and then reloads page
  function refresh(){
    $facebook.api("/me",{fields: 'id, name, first_name, last_name, age_range, link, gender, locale, email'}).then(function(response){
      $scope.welcomeMsg = "Welcome " + response.name;
      $scope.isLoggedIn = true;
      $scope.userInfo = response;
      $facebook.api('/me/picture').then(function(response){
        $scope.picture = response.data.url;
        $facebook.api('/me/permissions').then(function(response){
          $scope.permissions = response.data;
          $facebook.api('./me/posts').then(function(response){
            $scope.posts = response.data;
          })
        });
      });
    },
    function(err){
      $scope.welcomeMsg = "Please Log In.";
    });
  }

  //post status
  $scope.postStatus = function(){
    var myPost = this.myPost;
    console.log(myPost);
    $facebook.api('/me/feed', 'post', {message: myPost}).then(function(response){
      $scope.msg="Thanks for posting";
      console.log('here')
      refresh();
    });
  }

  //force function so that data loads
  refresh();

}]);
