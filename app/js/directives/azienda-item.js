angular.module("ZMLGruppiLocali")
    .directive("aziendaItem", function(){
        return{
          restrict:"E",
          templateUrl: "templates/azienda-item.html",
          require: "^panelAziende",
          link: function (scope, element, attrs, parentController){

              element.on("click",function(){
                  scope.$apply(function () {
                      parentController.setSelectedAzienda(scope.azienda);
                  });
              });

              scope.isSelectedAziendaItem = function(azienda){
                  var selAzienda = parentController.getSelectedAzienda();
                  return (selAzienda && selAzienda.id == azienda.id);
              }
        }
        };
    });
