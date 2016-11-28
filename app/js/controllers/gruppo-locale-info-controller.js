angular.module("ZMLGruppiLocali")
    .controller("GruppoLocaleInfoController", function($scope){

        // listaAziendeLinkedToGL = array delle liste che attualmente collegate al gruppo locale. Contiene
        // sia le ditte che sono state passate dal server (quindi salvate sul db) sia quelle che vengono aggiunte dal pannello
        // e che devono essere ancora salvate sul db. E' un array di passaggio tra la lista totale e quella collegata al gruppo locale
        $scope.listaAziendeLinkedToGL = [];

        //il metodo setta la proprietà elaborare = -1 per la ditta che deve essere tolta dal gruppo locale e
        // aggiorna l'array di passaggio listaAziendeLinkedToGL
        $scope.removeAziendaFromGL = function(azienda){
           for (var i=0; i < $scope.tmpGruppoLocale.lista_ditte.length; i++)
           {
               var tmpAzienda = $scope.tmpGruppoLocale.lista_ditte[i];
               if(tmpAzienda.id == azienda.id)
               {
                   tmpAzienda.linkedToGL = false;
                   tmpAzienda.elaborare = -1;
                   tmpAzienda.ordine = -1;
                   // aggiorno l'array di passaggio
                   if($scope.listaAziendeLinkedToGL.indexOf(tmpAzienda) > -1)
                       $scope.listaAziendeLinkedToGL.splice($scope.listaAziendeLinkedToGL.indexOf(tmpAzienda),1);

                   break;
               }
           }
            if($scope.listaAziendeLinkedToGL.length == 0)
                $scope.$parent.tmpGruppoLocale.selectedMedicoId = -1;
        };

        $scope.closeModal = function(){
            for(var i=0; i<$scope.listaAziendeLinkedToGL.length; i++)
            {
                if( $scope.tmpGruppoLocale.lista_ditte.indexOf($scope.listaAziendeLinkedToGL[i]) > -1)
                    console.log("azienda presente"); // se l'azienda no
                else{
                    $scope.listaAziendeLinkedToGL[i].linkedToGL = false;
                    $scope.listaAziendeLinkedToGL.splice(i,1); // se la ditta è stata solo selezionata ma mai aggiunta all'elenco di base, la tolgo da quelle selezionate
                }


            }
        };

        $scope.addListaAziendeToGL = function(){
            for(var i=0; i<$scope.listaAziendeLinkedToGL.length; i++)
            {
                if($scope.tmpGruppoLocale.lista_ditte == null || $scope.tmpGruppoLocale.lista_ditte == undefined)
                    $scope.tmpGruppoLocale.lista_ditte =[];

                var tmpAzienda = $scope.listaAziendeLinkedToGL[i];
                tmpAzienda.linkedToGL = true;

                if( $scope.tmpGruppoLocale.lista_ditte.indexOf(tmpAzienda) > -1)
                {
                    //la ditta è già presente nella lista_ditte. Caso: ho aggiunto una ditta (ma non ho salvato) e poi l'ho rimossa. Successivamente l'ho riaggiunta)
                    var tmpAzienda1 =  $scope.tmpGruppoLocale.lista_ditte[$scope.tmpGruppoLocale.lista_ditte.indexOf(tmpAzienda)];
                    if(tmpAzienda1.elaborare == -1)
                    {
                        tmpAzienda.elaborare = 1;
                        tmpAzienda1.elaborare = 1;
                    }
                }
                else
                {
                    tmpAzienda.elaborare = 1;
                    $scope.tmpGruppoLocale.lista_ditte.push(tmpAzienda);
                }

            }

            $scope.isAddActivated = false;
            $('#popupListaAziendeModal').modal('hide');
        }
    });
