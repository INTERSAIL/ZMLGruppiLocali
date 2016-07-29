angular.module("ZMLGruppiLocali")
    .factory('OperationInProgressPanel', [function() {

        return {
            showGrayedLayout: function () {
                $("body").append('<div id="operazioneInCorso" class="operation_in_progress_panel"> <div style="height: 50%"></div> <div class="col-lg-12"><div class="col-lg-4"></div><div class="operation_in_progress_panel_text  col-lg-4">OPERAZIONE IN CORSO....<br>ATTENDERE</div><div class="col-lg-4"></div></div> </div>');
            },
            hideGrayedLayout: function () {
                $("body #operazioneInCorso").remove();
            }
        };
    }]);
