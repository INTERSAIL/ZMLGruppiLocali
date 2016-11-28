angular.module("ZMLGruppiLocali")
    .controller("PanelAziendeController", function($scope){

        this.setSelectedAzienda = function(azienda){
            $scope.tmpGruppoLocale.selectedAzienda = azienda;
        };

        this.getSelectedAzienda = function(){
          return $scope.tmpGruppoLocale.selectedAzienda;
        };
        
        this.removeAziendaFromGL = function(azienda){

            var n_ordine = $scope.tmpGruppoLocale.selectedAzienda.ordine; // mi tengo da parte l'ordine della ditta che sto togliendo dall'elenco
            $scope.$parent.removeAziendaFromGL($scope.tmpGruppoLocale.selectedAzienda);

            //aggiornare la proprietà ordine di tutte le aziende contenute nella lista
            for (var i = 0; i<$scope.tmpGruppoLocale.lista_ditte.length; i++)
            {
                var tmpAzienda = $scope.tmpGruppoLocale.lista_ditte[i];
                if(tmpAzienda.id != $scope.tmpGruppoLocale.selectedAzienda.id)
                {
                    if(tmpAzienda.ordine > n_ordine)
                    {
                        tmpAzienda.ordine--; // se trovo un ditta che ordine > dell'ordine dell'attività che ho appena tolto decremento il suo valore di 1
                        tmpAzienda.elaborare = tmpAzienda.elaborare == 0 ? 2 : tmpAzienda.elaborare;
                    }
                }
            }

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
        };

        this.getMaxOrdineInListaDitte = function(){
            var max = -1;
            for(var i=0; i< $scope.tmpGruppoLocale.lista_ditte.length; i++)
            {
                if($scope.tmpGruppoLocale.lista_ditte[i].ordine > max)
                    max = $scope.tmpGruppoLocale.lista_ditte[i].ordine;
            }

            return max;
        };
    });
