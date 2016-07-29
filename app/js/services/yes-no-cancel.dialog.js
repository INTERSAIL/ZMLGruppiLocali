angular.module("ZMLGruppiLocali")
    .factory('YesNoCancelDialog', ['OperationInProgressPanel', function(OperationInProgressPanel) {

        return {
            openDialog: function(message, handlers) {
                OperationInProgressPanel.showGrayedLayout();
                var dialog = $('<div style="z-index:100;">' + message + '</div>').dialog({
                    dialogClass: 'no-close', // questa classe viene usata nel CSS per nascondere il pulsante di chiusura in alto a destra
                    buttons: {
                        "Si": function() {
                            dialog.dialog('close');
                            OperationInProgressPanel.hideGrayedLayout();
                            if (handlers && handlers.hasOwnProperty("yesFunction"))
                                handlers.yesFunction();
                        },
                        "No": function() {
                            dialog.dialog('close');
                            OperationInProgressPanel.hideGrayedLayout();
                            if (handlers && handlers.hasOwnProperty("noFunction"))
                                handlers.noFunction();
                        },
                        "Annulla": function() {
                            dialog.dialog('close');
                            OperationInProgressPanel.hideGrayedLayout();
                            if (handlers && handlers.hasOwnProperty("cancelFunction"))
                                handlers.cancelFunction();
                        }
                    }
                });
            }
        };
    }]);
