angular.module("ZMLGruppiLocali")
    .directive("panelAziendeActionsBar", function(YesNoCancelDialog){
        return{
            restrict: "E",
            templateUrl: "templates/panel-aziende-actions-bar.html",
            scope:{
                imageClass: "@",
                editable: "="
            },
            controller: "PanelAziendeActionsBarController",
            require: "^panelAziende",
            link: function(scope, element, args, parentController){
                element.on('click','button.action-bar-button', function(){

                    var button = this;
                    var message = "";
                    var requiresUserChoice = false;
                    var functionToExecute = null;

                    if(button.classList.contains('add-button'))
                        functionToExecute = function(){scope.addAziendaToGr();}
                    else if(button.classList.contains('delete-button'))
                        functionToExecute = function(){parentController.removeAziendaFromGL();}

                    // creo l'oggetto necessario al YesNoCancelDialog
                    var yncHandlers = {
                        // la yesFunction esegue l'azione relativa al pulsante premuto
                        "yesFunction" : function() {
                            scope.$apply(function() { // per aggiornare l'interfaccia è necessario chiamare il $apply
                                functionToExecute();
                            });
                        },
                        "noFunction": function() {},
                        "cancelFunction": function() {}
                    };
                    // se richiede una decisione dell'utente, mostro il dialog, altrimenti chiamo subito la yesFunction
                    if (requiresUserChoice)
                        YesNoCancelDialog.openDialog(message, yncHandlers);
                    else yncHandlers.yesFunction();



                });

            }
        }
    });
