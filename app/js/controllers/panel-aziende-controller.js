angular.module("ZMLGruppiLocali")
    .controller("PanelAziendeController", function($scope){

        this.setSelectedAzienda = function(azienda){
            $scope.selectedAzienda = azienda;
        };

        this.getSelectedAzienda = function(){
          return $scope.selectedAzienda;
        };
        
        this.removeAziendaFromGL = function(azienda){
            $scope.$parent.removeAziendaFromGL($scope.selectedAzienda);
            $scope.selectedAzienda = null;
        }
    });
