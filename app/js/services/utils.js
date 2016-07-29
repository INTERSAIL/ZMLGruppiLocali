angular.module("ZMLGruppiLocali")
    .factory('Utils', function(){
        return{
            cloneGruppoLocale: function(gruppoLocale2){

                var gr = jQuery.extend(true, {},gruppoLocale2);
                gr.InizioTurno = new Date(gruppoLocale2.inizio_turno);
                gr.CambioTurno = new Date(gruppoLocale2.cambio_turno);
                gr.FineTurno = new Date(gruppoLocale2.fine_turno);

                return gr;

            },

            cleanTmpGruppoLocale: function(){
                return null;
            }
        }

    });
