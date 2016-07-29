angular.module("ZMLGruppiLocali")
    .directive("gruppiLocaliView", function(){
        return{
            restrict:"E",
            templateUrl: "templates/gruppi-locali-view.html",
            controller: "GruppiLocaliViewController",
            controllerAs: "GruppiLocaliViewCtrl"
        }
    });
