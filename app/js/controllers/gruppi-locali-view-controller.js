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
                },
                errorFunction: function(data){
                        $scope.selectedGruppoLocale = null;
                        $scope.tmpGruppoLocale = Utils.cleanTmpGruppoLocale();
                        $scope.errors = data;
                }
        },
        cfpLoadingBar)};

         ZMLGruppiLocaliHelper.listGruppiLocali({
            successFunction: function (data){
                    $scope.gruppiLocaliList = data;
                    if(data == null || data.length == 0)
                    {
                        $scope.selectedGruppoLocale = null;
                        $scope.errors = null;
                        $scope.tmpGruppoLocale = null;
                    }
                    else {
                    $scope.errors = null;
                    $scope.selectedGruppoLocale = data[0];



                    ZMLGruppiLocaliHelper.readGruppoLocale($scope.selectedGruppoLocale.id, {
                            successFunction: function(data){
                                    $scope.selectedGruppoLocale = data;
                                    $scope.tmpGruppoLocale = Utils.cloneGruppoLocale($scope.selectedGruppoLocale);
                            },
                            errorFunction: function(data){
                                    $scope.errors = null;
                                    $scope.tmpGruppoLocale = null;
                            }
                    }, cfpLoadingBar);
                    }

            },
            errorFunction: function (data) {
                    $scope.gruppiLocaliList = null;
                    $scope.selectedGruppoLocale = null;
                    $scope.tmpGruppoLocale = Utils.cleanTmpGruppoLocale();
                    $scope.errors = data;
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
