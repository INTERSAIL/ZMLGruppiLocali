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
            $scope.$parent.tmpGruppoLocale = newGruppoLocale;
        };

        $scope.editGruppoLocale = function(){
            if($scope.$parent.selectedGruppoLocale == null)
            {}
            else
            {
                $scope.$parent.editable = true;
                $scope.$parent.tmpGruppoLocale = Utils.cloneGruppoLocale($scope.$parent.selectedGruppoLocale);
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
          $scope.$parent.tmpGruppoLocale = Utils.cloneGruppoLocale($scope.$parent.selectedGruppoLocale);
          $scope.$parent.isValidGruppoLocale = false;
        };

        $scope.deleteGruppoLocale = function(){
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
        }
    });
