angular.module("ZMLGruppiLocali")
    .config(function($routeProvider){
        $routeProvider
            .when('/zmlgruppilocali',{
                templateUrl:'templates/index.html'
            })
        .otherwise({
            redirectTo: '/zmlgruppilocali'
        })
    });
