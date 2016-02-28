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
  $facebookProvider.setPermissions('email','public_profile','user_posts','publish_actions','user_photos');
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

//controller
.controller('facebookCtrl', [function() {

}]);
