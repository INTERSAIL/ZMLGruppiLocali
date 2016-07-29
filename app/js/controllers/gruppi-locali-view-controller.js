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
                    $scope.selectedGruppoLocale = data[0];
                    $scope.tmpGruppoLocale = Utils.cloneGruppoLocale($scope.selectedGruppoLocale);
                    $scope.errors = null;
                    $scope.isValidGruppoLocale = false;
            },
            errorFunction: function (data) {
                    $scope.gruppiLocaliList = null;
                    $scope.selectedGruppoLocale = null;
                    $scope.tmpGruppoLocale = Utils.cleanTmpGruppoLocale();
                    $scope.errors = data;
                    $scope.isValidGruppoLocale = false;
            }
        }, cfpLoadingBar);



      /*  $http({method: 'GET', url:"test_json/gruppilocali.json"})
            .success(function(data){
                $scope.gruppiLocaliList = data;
                $scope.selectedGruppoLocale = data[0];
                $scope.tmpGruppoLocale = Utils.cloneGruppoLocale($scope.selectedGruppoLocale);
                $scope.errors = null;
            })
            .error(function(data){});
*/
        this.getSelectedGruppoLocale = function(){
                return $scope.selectedGruppoLocale;
        };

        this.setSelectedGruppoLocale = function (gruppoLocale) {
                $scope.selectedGruppoLocale = gruppoLocale;
                $scope.tmpGruppoLocale = Utils.cloneGruppoLocale(gruppoLocale);
        };
    });
