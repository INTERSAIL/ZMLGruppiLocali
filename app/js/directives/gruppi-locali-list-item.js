angular.module("ZMLGruppiLocali")
    .directive("gruppiLocaliListItem", function(){
        return{
            restrict: "E",
            templateUrl: "templates/gruppi-locali-list-item.html",
            require: "^gruppiLocaliView",
            link: function(scope, element, args, parentController){
                element.on('click', function(){
                    scope.$apply(function () {
                        parentController.setSelectedGruppoLocale(scope.gruppoLocale);
                        parentController.loadGruppoLocale();
                    });

                });

                scope.isSelectedGruppoLocaleItem = function(gruppoLocale){
                    var selGruppoLocale = parentController.getSelectedGruppoLocale();
                    return (selGruppoLocale && selGruppoLocale.id == gruppoLocale.id);
                }
            }
        }
    });
