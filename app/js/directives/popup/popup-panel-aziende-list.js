angular.module("ZMLGruppiLocali")
    .directive("popupPanelAziendeList", function(){
        return{
          restrict:"E",
          transclude: true,
          templateUrl:"templates/popup/popup-panel-aziende-list.html",
          controller: "PopupPanelAziendeListController",
          scope:{
            tmpListaAziende: "=", //lista delle aziende collegate al gruppo locale + quelle che verranno aggiunte o tolte
            tmpGruppoLocale: "=",
            editable: "=",
            filterAzienda: "=",
          },
            link: function (scope, element, attrs){

                scope.$watch('filterAzienda', function(){
                    if(scope.filterAzienda == "")
                        scope.loadListaAziende(scope.filterAzienda);
                })
            }
        };
    });
