angular.module("ZMLGruppiLocali")
    .directive("panelAziendeList", function () {
        return{
            restrict:"E",
            templateUrl: "templates/panel-aziende-list.html",
            scope:{
                aziendeList: "=",
                editable: "="
            },
            controller: "PanelAziendeListController"
        }
    });
