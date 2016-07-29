angular.module("ZMLGruppiLocali")
    .controller("PopupPanelAziendeListController", function($scope, ZMLGruppiLocaliHelper, cfpLoadingBar){

        $scope.loadListaAziende = function(filtro){
            if(filtro.length >= 3)
            {
                ZMLGruppiLocaliHelper.listaDitte($scope.$parent.tmpGruppoLocale.id, filtro,{
                    successFunction: function(data){
                        $scope.listaAziende = data;
                        $scope.errors = null;
                    },
                    errorFunction: function(data){
                        $scope.listaAziende = null;
                        $scope.errors = data;
                    }
                }, cfpLoadingBar)
            }
        };
        
        this.addAziendaToTmpArray = function (azienda){
            $scope.tmpListaAziende.push(azienda);
        };

        this.removeAziendaToTmpArray = function(azienda){
            for (i=0; i < $scope.tmpListaAziende.length; i++)
            {
                var tmpAzienda = $scope.tmpListaAziende[i];
                if(tmpAzienda.id == azienda.id)
                {
                    $scope.tmpListaAziende.splice(i, 1);
                    break;
                }
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
