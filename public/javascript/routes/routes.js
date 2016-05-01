app.config(function($routeProvider) {

  $routeProvider
  .when('/movies', { // INDEX
    templateUrl: 'javascript/templates/home.html',
    controller: 'HomeController',
  })
  .when('/movies/:id', { // SHOW
    templateUrl: 'javascript/templates/show.html',
    controller: 'ShowController',
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireAuth();
      }]
    }
  })
  .otherwise({ redirectTo: '/movies' });
});

app.run(function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, next, previous, error){
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED"){
      $location.path('/');
    }
  })
});
