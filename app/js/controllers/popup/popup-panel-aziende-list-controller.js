angular.module("ZMLGruppiLocali")
    .controller("PopupPanelAziendeListController", function($scope, ZMLGruppiLocaliHelper, cfpLoadingBar, configuration){

        //nb. tmpListaAziende === listaAziendeLinkedToGL
        $scope.loadListaAziende = function(filtroNomeSede){
            if(filtroNomeSede == '')
            {
                 $scope.listaAllAziende = null;
            }
            else if(filtroNomeSede.length >= 3)
            {
                ZMLGruppiLocaliHelper.listaDitte($scope.$parent.tmpGruppoLocale.id, filtroNomeSede, $scope.$parent.tmpGruppoLocale.selectedMedicoId,{
                    successFunction: function(data){

                        $scope.listaAllAziende = data;

                        //controllo quelle che sono già collegate al gruppo locale
                        for(var i =0; i< $scope.tmpListaAziende.length; i++)
                        {
                            for(var k = 0; k<$scope.listaAllAziende.length; k++)
                            {
                                if($scope.listaAllAziende[k].id ==$scope.tmpListaAziende[i].id)
                                {
                                    $scope.listaAllAziende[k].linkedToGL = true;
                                }
                            }
                        }


                        $scope.errors = null;
                    },
                    errorFunction: function(data){
                        $scope.listaAllAziende = null;
                        $scope.errors = data;
                    }
                }, cfpLoadingBar)
            }
        };
        
        this.addAziendaToTmpArray = function (azienda){
            var somma = $scope.tmpGruppoLocale.SommaDurataTeorica + azienda.durata_teorica;
            if(somma > configuration.max_durata_totale)
            {
                $.confirm({
                    title:'Attenzione',
                    content: 'Aggiungendo questa azienda, la durata totale supera le 8 ore. Aggiungere ' + azienda.nome_sede + ' lo stesso?',
                    confirmButton: "Aggiungi",
                    cancelButton: "Annulla",
                    confirm: function(){
                        //azienda.linkedToGL = true;
                        azienda.ordine = $scope.tmpListaAziende.length;
                        $scope.tmpListaAziende.push(azienda);
                        if($scope.$parent.tmpGruppoLocale.selectedMedicoId == -1)
                            $scope.$parent.tmpGruppoLocale.selectedMedicoId = azienda.medico_id;

                        $scope.tmpGruppoLocale.SommaDurataTeorica = $scope.tmpGruppoLocale.SommaDurataTeorica + azienda.durata_teorica;
                        $scope.$parent.isAddActivated = true;
                    },
                    cancel: function(){
                    }
                });

            }
            else
            {
                //azienda.linkedToGL = true;
                azienda.ordine = $scope.tmpListaAziende.length;
                $scope.tmpListaAziende.push(azienda);
                if($scope.$parent.tmpGruppoLocale.selectedMedicoId == -1)
                    $scope.$parent.tmpGruppoLocale.selectedMedicoId = azienda.medico_id;

                $scope.tmpGruppoLocale.SommaDurataTeorica = $scope.tmpGruppoLocale.SommaDurataTeorica + azienda.durata_teorica;
                $scope.$parent.isAddActivated = true;
        }
        };

        // la funzione viene chiamata quando si deseleziona una ditta che era stata selezionata e quindi aggiunta nella lista
        // delle ditte da collegare al gruppo locale
        this.removeAziendaToTmpArray = function(azienda){
            $scope.$parent.isAddActivated = false;
            for (i=0; i < $scope.tmpListaAziende.length; i++)
            {
                var tmpAzienda = $scope.tmpListaAziende[i];
                if(tmpAzienda.id == azienda.id)
                {
                    $scope.tmpListaAziende.splice(i, 1);
                    break;
                }
            }

            if($scope.tmpListaAziende.length == 0) // se tmpListaAziende.lenght == 0, vuol dire che non ho aggiunto nulla dal pannello, ma anche che non ci sono ditte già collegate al gruppo locale
                $scope.$parent.tmpGruppoLocale.selectedMedicoId = -1;

            if($scope.tmpListaAziende.length > 0)
                for(var i = 0; i<$scope.tmpListaAziende.length; i++)
                {
                    if($scope.tmpListaAziende[i].linkedToGL == false)
                        $scope.$parent.isAddActivated = true;
                }
        };

        this.getArraySelectedAziende = function(){
            return $scope.tmpListaAziende;
        };

        this.isSelectedAzienda = function(azienda){
            if($scope.tmpListaAziende == null)
                return false;
            for (i=0; i < $scope.tmpListaAziende.length; i++)
            {
                var tmpAzienda = $scope.tmpListaAziende[i];
                if(tmpAzienda.id == azienda.id)
                {
                   return true;
                }
            }
            return false;
        };
    });
