angular.module("ZMLGruppiLocali")
    .directive("aziendaItem", function(){
        return{
          restrict:"E",
          templateUrl: "templates/azienda-item.html",
          scope:{
            azienda:"=",
            editable:"="
          },
          require: "^panelAziende",
          link: function (scope, element, attrs, parentController){

              element.on("click",function(){
                  scope.$apply(function () {
                      console.log("ordine:" + scope.azienda.ordine);
                      parentController.setSelectedAzienda(scope.azienda);
                  });
              });
              
              scope.hideButton = function(azienda){
                  var max = parentController.getMaxOrdineInListaDitte();
                  if(max == azienda.ordine)
                      return true;
                  else
                      return false;
              };

              //la funzione non cambia l'ordine dell'array ma solo il valore della proprietà ordine
              scope.moveUp = function(azienda){
                  var aziendaPrev = parentController.getAziendaByOrder(azienda.ordine - 1);
                  aziendaPrev.ordine = aziendaPrev.ordine + 1;
                  azienda.ordine = azienda.ordine - 1;

                  aziendaPrev.elaborare = aziendaPrev.elaborare == 0 ? 2 : aziendaPrev.elaborare;
                  azienda.elaborare = azienda.elaborare == 0 ? 2 : azienda.elaborare;

              };

              //la funzione non cambia l'ordine dell'array ma solo il valore della proprietà ordine
              scope.moveDown = function(azienda){
                  var aziendaNext = parentController.getAziendaByOrder(azienda.ordine +1);
                  aziendaNext.ordine = aziendaNext.ordine - 1;
                  azienda.ordine = azienda.ordine + 1;

                  aziendaNext.elaborare = aziendaNext.elaborare == 0 ? 2 : aziendaNext.elaborare;
                  azienda.elaborare = azienda.elaborare == 0 ? 2 : azienda.elaborare;
              };

              scope.isSelectedAziendaItem = function(azienda){
                  var selAzienda = parentController.getSelectedAzienda();
                  if(selAzienda == null || selAzienda == undefined)
                      return false;
                  
                  return (selAzienda && selAzienda.id == azienda.id);
              }
        }
        };
    });
