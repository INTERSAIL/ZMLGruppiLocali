angular.module("ZMLGruppiLocali")
    .factory("ZMLGruppiLocaliHelper", function($http, configuration, HttpHelper){
        return{

            listGruppiLocali: function(handlers, progressBar){
              HttpHelper.http({method:'GET', url:configuration.gruppi_locali_controller_url}, handlers, progressBar);
            },

            readGruppoLocale: function(gruppoLocaleId, handlers, progressBar){
                HttpHelper.http({method:'GET', url: configuration.gruppi_locali_controller_url + gruppoLocaleId.toString()}, handlers, progressBar);
            },

            saveGruppoLocale: function(gruppoLocale, handlers, progressBar){
                if(gruppoLocale.id <= 0) //nuovo gruppo Locale
                {
                    HttpHelper.http({method:'POST', url:configuration.gruppi_locali_controller_url,headers:{'Content-Type':'application/json; charset=UTF-8'}, data:gruppoLocale}, handlers, progressBar);
                }
                else // gruppo locale esistente
                {
                    HttpHelper.http({method:'PUT', url:configuration.gruppi_locali_controller_url + gruppoLocale.id, headers:{'Content-Type':'application/json; charset=UTF-8'}, data:gruppoLocale}, handlers, progressBar);
                }
            },

            deleteGruppoLocale: function(gruppoLocale, handlers, progressBar){
                HttpHelper.http({ method: 'DELETE', url: configuration.gruppi_locali_controller_url + gruppoLocale.id.toString() }, handlers, progressBar);

            },
            
            listaDitte: function(gruppoLocaleId, nomeSede, medicoId, handlers, progressBar){
              HttpHelper.http({method:'GET', url:configuration.gruppi_locali_controller_url + gruppoLocaleId + '/listaditte', params:{filterNomeSede: nomeSede, filterMedicoId: medicoId}}, handlers, progressBar);
            }

        };
    });
