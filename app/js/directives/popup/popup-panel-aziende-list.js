angular.module("ZMLGruppiLocali")
    .directive("popupPanelAziendeList", function(){
        return{
          restrict:"E",
          transclude: true,
          templateUrl:"templates/popup/popup-panel-aziende-list.html",
          controller: "PopupPanelAziendeListController",
          scope:{
            tmpListaAziende: "=",
            tmpGruppoLocale: "="
          },
            link: function (scope, element, attrs){

               // scope.loadListaAziende();
                /*$http({method: 'GET', url:"test_json/listaAziende.json"})
                    .success(function(data){
                        scope.listaAziende = data;
                        scope.errors = null;
                    })
                    .error(function(data){});
*/
            }
        };
    });
