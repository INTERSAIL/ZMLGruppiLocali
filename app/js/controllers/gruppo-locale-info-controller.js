angular.module("ZMLGruppiLocali")
    .controller("GruppoLocaleInfoController", function($scope){
        // lista aziende da aggiungere al gruppo locale
        $scope.listaAziende = [];

        $scope.removeAziendaFromGL = function(azienda){
           for (var i=0; i < $scope.tmpGruppoLocale.lista_ditte.length; i++)
           {
               var tmpAzienda = $scope.tmpGruppoLocale.lista_ditte[i];
               if(tmpAzienda.id == azienda.id)
               {
                   $scope.tmpGruppoLocale.lista_ditte[i].elaborare = -1;
                  // $scope.tmpGruppoLocale.listaDitte.splice(i, 1);
                   if($scope.listaAziende.indexOf(tmpAzienda) > -1)
                       $scope.listaAziende.splice($scope.listaAziende.indexOf(tmpAzienda),1);
                   break;
               }


           }
        }

        $scope.closeModal = function(){
            for(var i=0; i<$scope.listaAziende.length; i++)
            {
                if( $scope.tmpGruppoLocale.lista_ditte.indexOf($scope.listaAziende[i]) > -1)
                    console.log("azienda presente"); // se l'azienda no
                else
                    $scope.listaAziende[i].splice(i,1); // se la ditta è stata solo selezionata ma mai aggiunta all'elenco di base, la tolgo da quelle selezionate

            }
        };

        $scope.addListaAziendeToGL = function(){
            for(var i=0; i<$scope.listaAziende.length; i++)
            {
                if($scope.tmpGruppoLocale.lista_ditte == null || $scope.tmpGruppoLocale.lista_ditte == undefined)
                    $scope.tmpGruppoLocale.lista_ditte =[];

                if( $scope.tmpGruppoLocale.lista_ditte.indexOf($scope.listaAziende[i]) > -1)
                    console.log("azienda già presente");
                else
                {
                    $scope.listaAziende[i].elaborare = 1;
                    $scope.tmpGruppoLocale.lista_ditte.push($scope.listaAziende[i]);
                }

            }

            $('#popupListaAziendeModal').modal('hide');
        }
    });
