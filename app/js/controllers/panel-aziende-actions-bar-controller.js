angular.module("ZMLGruppiLocali")
    .controller("PanelAziendeActionsBarController", function($scope){

        $scope.addAziendaToGr = function(){
            $('#popupListaAziendeModal').modal('show');
        };
    });
