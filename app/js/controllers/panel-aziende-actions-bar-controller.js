angular.module("ZMLGruppiLocali")
    .controller("PanelAziendeActionsBarController", function($scope){

        $scope.refreshGruppoLocaleListaAziende = function () {
            // ha senso fare il refresh solo della lista delle aziende legate al gruppo locale?
        };

        $scope.addAziendaToGr = function(){
                $('#popupListaAziendeModal').modal('show');
        };

     /*   $scope.removeAziendaFromGr = function(){
            // ho selezionato una riga
            if($scope.$parent.selectedAzienda == null)
            {
                //avviso di selezionare qualcosa oppure abilito il pulsante solo quando è selezionato qualcosa   
            }
            else
            {
                // la rimuovo dall'array del gruppo su cui sto lavorando
                for (i=0; i < $scope.$parent.tmpGruppoLocale.listaDitte.length; i++)
                {
                    var tmpAzienda = $scope.$parent.tmpGruppoLocale.listaDitte[i];
                    if(tmpAzienda.id == $scope.$parent.selectedAzienda.id)
                    {
                        $scope.$parent.tmpGruppoLocale.listaDitte.splice(i, 1);
                        break;
                    }
                }

            }
            
        };*/
    });
