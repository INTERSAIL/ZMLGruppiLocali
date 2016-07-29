angular.module("ZMLGruppiLocali")
    .directive("gruppiLocaliActionBar", function(YesNoCancelDialog){
       return{
         restrict:"E",
         templateUrl:"templates/gruppi-locali-action-bar.html",
         scope:{
           imageClass: "@",
           editable: "="
            },
         controller:"GruppiLocaliActionBarController",
         link: function(scope, element, args, parentController){
             element.on('click','button.action-bar-button', function(){

                 var button = this;
                 var message = "";
                 var requiresUserChoice = false;
                 var functionToExecute = null;

                 if(button.classList.contains('refresh-button'))
                     functionToExecute = function(){scope.refresh();}
                 else if(button.classList.contains('add-button'))
                     functionToExecute = function(){scope.newGruppoLocale();}
                 else if(button.classList.contains('edit-button'))
                     functionToExecute = function(){scope.editGruppoLocale();}
                 else if(button.classList.contains('delete-button'))
                     functionToExecute = function(){scope.deleteGruppoLocale();}
                 else if(button.classList.contains('cancel-button'))
                     functionToExecute = function () {
                         message = "Sei sicuro di voler annullare le modifiche?";
                         requiresUserChoice = true;
                         scope.undoGruppoLocale();
                     }
                 else if (button.classList.contains('save-button'))
                     functionToExecute = function(){scope.saveGruppoLocale();}


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
       };
    });
