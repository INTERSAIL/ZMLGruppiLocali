angular.module("ZMLGruppiLocali")
    .directive("panelAziende", function(){
        return{
            restrict: "E",
            templateUrl: "templates/panel-aziende.html",
            scope:{
                tmpGruppoLocale: "=",
                editable: "="
            },
            controller: "PanelAziendeController",
            require: "^gruppoLocaleInfo"
        };
    });
