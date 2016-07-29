angular.module("ZMLGruppiLocali")
    .directive("popupListAziendaItem", function(){
        return{
            restrict:"E",
            templateUrl:"templates/popup/popup-list-azienda-item.html",
            require: "^popupPanelAziendeList",
            link: function(scope, element, attr, parentController)
            {
                  element.on("dblclick", function(){
                    if(parentController.isSelectedAzienda(scope.azienda)){
                        //remove azienda from tmpArray
                        scope.$apply(function () {
                        parentController.removeAziendaToTmpArray(scope.azienda);
                        // decoloro la riga
                        });
                    }

                    else
                    {
                        //aggiungi azienda al tmpArray
                        scope.$apply(function () {
                        parentController.addAziendaToTmpArray(scope.azienda);
                        //coloro la riga
                    });
                    }
                });

                scope.isSelectedAziendaItem = function(azienda){
                    return parentController.isSelectedAzienda(azienda);
                }
            }
        };
    });
