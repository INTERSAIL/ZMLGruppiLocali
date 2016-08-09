angular.module("ZMLGruppiLocali")
    .controller("GruppiLocaliViewController", function ($scope, $http, Utils, ZMLGruppiLocaliHelper,cfpLoadingBar) {

        $scope.selectedGruppoLocale = null;
        $scope.tmpGruppoLocale ={};
        $scope.editable = false;
        $scope.isValidGruppoLocale = false;
        $scope.gruppiLocaliList = null;
        $scope.errors = null;
        this.loadGruppoLocale =function(){ZMLGruppiLocaliHelper.readGruppoLocale($scope.selectedGruppoLocale.id,{
                successFunction: function(data){
                        $scope.selectedGruppoLocale = data;
                        $scope.tmpGruppoLocale = Utils.cloneGruppoLocale($scope.selectedGruppoLocale);
                        $scope.errors = null;
                        $scope.isValidGruppoLocale = false;
                },
                errorFunction: function(data){
                        $scope.selectedGruppoLocale = null;
                        $scope.tmpGruppoLocale = Utils.cleanTmpGruppoLocale();
                        $scope.errors = data;
                        $scope.isValidGruppoLocale = false;
                }
        },
        cfpLoadingBar)};

         ZMLGruppiLocaliHelper.listGruppiLocali({
            successFunction: function (data){
                    $scope.gruppiLocaliList = data;
                    $scope.errors = null;
                    $scope.selectedGruppoLocale = data[0];

                    ZMLGruppiLocaliHelper.readGruppoLocale($scope.selectedGruppoLocale.id, {
                            successFunction: function(data){
                                    $scope.selectedGruppoLocale = data;
                                    $scope.tmpGruppoLocale = Utils.cloneGruppoLocale($scope.selectedGruppoLocale);
                                    $scope.isValidGruppoLocale = false;
                            },
                            errorFunction: function(data){
                                    $scope.errors = null;
                                    $scope.tmpGruppoLocale = null;
                                    $scope.isValidGruppoLocale = false;
                            }
                    }, cfpLoadingBar);
            },
            errorFunction: function (data) {
                    $scope.gruppiLocaliList = null;
                    $scope.selectedGruppoLocale = null;
                    $scope.tmpGruppoLocale = Utils.cleanTmpGruppoLocale();
                    $scope.errors = data;
                    $scope.isValidGruppoLocale = false;
            }
        }, cfpLoadingBar);

        this.getSelectedGruppoLocale = function(){
                return $scope.selectedGruppoLocale;
        };

        this.setSelectedGruppoLocale = function (gruppoLocale) {
                $scope.selectedGruppoLocale = gruppoLocale;
                $scope.tmpGruppoLocale = Utils.cloneGruppoLocale(gruppoLocale);
        };

    this.deleteGruppoLocale = function(){
            ZMLGruppiLocaliHelper.deleteGruppoLocale($scope.selectedGruppoLocale,{
                    successFunction: function(data){
                            $scope.selectedGruppoLocale = null;
                            Utils.cleanTmpGruppoLocale();
                            $scope.errors = null;
                            $scope.refresh();
                    },
                    errorFunction: function(data){

                    }
            }, cfpLoadingBar);
    }
    });
