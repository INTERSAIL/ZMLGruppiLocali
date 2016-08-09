angular.module("ZMLGruppiLocali")
    .controller("GruppiLocaliActionBarController", function($scope, ZMLGruppiLocaliHelper, Utils, cfpLoadingBar){

        $scope.refresh = function(gruppoSelectedBefore){
            ZMLGruppiLocaliHelper.listGruppiLocali({
                successFunction: function (data){
                    $scope.$parent.gruppiLocaliList = data;
                    $scope.$parent.selectedGruppoLocale = gruppoSelectedBefore == undefined ? data[0] : gruppoSelectedBefore;
                    $scope.$parent.tmpGruppoLocale = Utils.cloneGruppoLocale($scope.$parent.selectedGruppoLocale);
                    $scope.$parent.errors = null;
                    $scope.$parent.isValidGruppoLocale = false;
                },
                errorFunction: function (data) {
                    $scope.$parent.gruppiLocaliList = null;
                    $scope.$parent.selectedGruppoLocale = null;
                    $scope.$parent.tmpGruppoLocale = Utils.cleanTmpGruppoLocale();
                    $scope.$parent.tmpGruppoLocale.selectedMedicoId = -1;
                    $scope.$parent.errors = data;
                    $scope.$parent.isValidGruppoLocale = false;
                }
            }, cfpLoadingBar)
        };
        
        $scope.newGruppoLocale = function () {
            $scope.$parent.selectedGruppoLocale = null;
            var newGruppoLocale = {
                    "id":0,
                    "name":"",
                    "description":"",
                    "considera_tempi_viaggio":false,
                    "considera_ordine_ditte":true,
                    "visite_orario_cod": "",
                    "inizio_turno": null,
                    "cambio_turno": null,
                    "fine_turno":null,
                    "listaDitte":[]
            }
            $scope.$parent.editable = true;
            $scope.$parent.tmpGruppoLocale = Utils.cloneGruppoLocale(newGruppoLocale);
            $scope.$parent.tmpGruppoLocale.selectedMedicoId = -1;
        };

        $scope.editGruppoLocale = function(){
            if($scope.$parent.selectedGruppoLocale == null)
            {}
            else
            {
                $scope.$parent.editable = true;
                $scope.$parent.tmpGruppoLocale = Utils.cloneGruppoLocale($scope.$parent.selectedGruppoLocale);
                // qui setto il valore del medico associato al gruppo locale
                $scope.$parent.tmpGruppoLocale.selectedMedicoId = $scope.$parent.selectedGruppoLocale.lista_ditte != undefined && $scope.$parent.selectedGruppoLocale.lista_ditte.length > 0 ? $scope.$parent.selectedGruppoLocale.lista_ditte[0].medico_id : -1;
            }
        };

        $scope.saveGruppoLocale = function(){
          ZMLGruppiLocaliHelper.saveGruppoLocale($scope.$parent.tmpGruppoLocale,{
              successFunction: function(data){
                  $scope.$parent.editable = false;
                  $scope.refresh(data);
              },
              errorFunction: function (data) {
                  $scope.$parent.errors = data;

              }
          },cfpLoadingBar);
        };

        $scope.undoGruppoLocale = function(){
          $scope.$parent.editable = false;
          if($scope.$parent.selectedGruppoLocale == null || $scope.$parent.selectedGruppoLocale == undefined)
              $scope.$parent.selectedGruppoLocale =  $scope.$parent.gruppiLocaliList.length > 0 ? $scope.$parent.gruppiLocaliList[0] : null;
          if($scope.$parent.selectedGruppoLocale == null)
            $scope.$parent.tmpGruppoLocale = null;
          else
            $scope.$parent.tmpGruppoLocale = Utils.cloneGruppoLocale($scope.$parent.selectedGruppoLocale);

          $scope.$parent.isValidGruppoLocale = false;
        };

        $scope.deleteGruppoLocale = function(){
            $.confirm({
                title:'Attenzione',
                content: 'Stai per eliminare un Gruppo Locale. Vuoi procedere?',
                confirmButton: "Elimina",
                cancelButton: "Annulla",
                confirm: function(){
                    ZMLGruppiLocaliHelper.deleteGruppoLocale($scope.$parent.selectedGruppoLocale,{
                        successFunction: function(data){
                            $scope.$parent.selectedGruppoLocale = null;
                            Utils.cleanTmpGruppoLocale();
                            $scope.errors = null;
                            $scope.refresh();
                        },
                        errorFunction: function(data){

                        }
                    }, cfpLoadingBar);
                },
                cancel: function(){
                }
            });
        }
    });
