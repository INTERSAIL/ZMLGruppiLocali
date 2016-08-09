angular.module("ZMLGruppiLocali")
    .controller("PanelAziendeController", function($scope){

        this.setSelectedAzienda = function(azienda){
            $scope.tmpGruppoLocale.selectedAzienda = azienda;
        };

        this.getSelectedAzienda = function(){
          return $scope.tmpGruppoLocale.selectedAzienda;
        };
        
        this.removeAziendaFromGL = function(azienda){
            $scope.$parent.removeAziendaFromGL($scope.tmpGruppoLocale.selectedAzienda);
            $scope.tmpGruppoLocale.selectedAzienda = null;
        };

        this.getAziendaByOrder = function(ordine){
            for(var i =0; i<$scope.tmpGruppoLocale.lista_ditte.length; i++)
            {
                if($scope.tmpGruppoLocale.lista_ditte[i].ordine == ordine)
                    return $scope.tmpGruppoLocale.lista_ditte[i];
            }

            return null;
        };

        this.getListaDitte = function () {
            return $scope.tmpGruppoLocale.lista_ditte;
        }
    });
