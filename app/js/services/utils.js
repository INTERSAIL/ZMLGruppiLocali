angular.module("ZMLGruppiLocali")
    .factory('Utils', function(){
        return{
            cloneGruppoLocale: function(gruppoLocale2){
                var gr = jQuery.extend(true, {},gruppoLocale2);
                gr.InizioTurno = new Date(gruppoLocale2.inizio_turno);
                gr.CambioTurno = new Date(gruppoLocale2.cambio_turno);
                gr.FineTurno = new Date(gruppoLocale2.fine_turno);

                gr.selectedAzienda = null;
                gr.SommaDurataTeorica = 0; // somma totale delle durate teoriche delle ditte associate al gruppo locale. Espressa in minuti
                if(gr.lista_ditte != null && gr.lista_ditte != undefined)
                    for(var i=0; i<gr.lista_ditte.length; i++)
                    {
                        gr.SommaDurataTeorica = gr.SommaDurataTeorica + gr.lista_ditte[i].durata_teorica;
                    }
                return gr;
            },

            cleanTmpGruppoLocale: function(){
                return null;
            }
        }

    });
