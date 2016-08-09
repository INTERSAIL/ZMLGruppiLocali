angular.module("ZMLGruppiLocali")
    .directive("gruppoLocaleInfo", function(){
        return{
          restrict: "E",
          templateUrl: "templates/gruppo-locale-info.html",
          scope:{
            tmpGruppoLocale:"=",
            editable:"=",
            isValidGruppoLocale: "="
          },
          controller: "GruppoLocaleInfoController",
          controllerAs: "GruppoLocaleInfoCtrl",
          link: function(scope, element, attrs){

              scope.$watch('tmpGruppoLocale.lista_ditte', function(newValue, oldValue){

                  if(scope.tmpGruppoLocale.lista_ditte != null && scope.tmpGruppoLocale.lista_ditte != undefined)
                  {
                      scope.listaAziendeLinkedToGL =[];

                      for(var i=0; i<scope.tmpGruppoLocale.lista_ditte.length; i++)
                      {
                          var p = scope.tmpGruppoLocale.lista_ditte[i];
                          p.linkedToGL = true;
                          scope.listaAziendeLinkedToGL.push(p);
                      }
                  }
                  else if(scope.tmpGruppoLocale.lista_ditte == null || scope.tmpGruppoLocale.lista_ditte == undefined)
                  {
                      scope.listaAziendeLinkedToGL = [];
                  }

              });



              scope.$watch('tmpGruppoLocale.InizioTurno', function(newValue, oldValue){
                  if(scope.tmpGruppoLocale.InizioTurno != undefined) {
                      var n = scope.tmpGruppoLocale.InizioTurno.getHours() +1; // aggiungo un'ora altrimenti quando converte si perde un'ora.. si può risolvere in altro modo il problema??
                      var newdate = new Date( scope.tmpGruppoLocale.InizioTurno);
                      newdate.setHours(n);
                      scope.tmpGruppoLocale.inizio_turno = newdate.toISOString();
                  }
              });

              scope.$watch('tmpGruppoLocale.CambioTurno', function(newValue, oldValue){
                  if(scope.tmpGruppoLocale.CambioTurno != undefined){
                      var n = scope.tmpGruppoLocale.CambioTurno.getHours() +1;
                      var newdate = new Date( scope.tmpGruppoLocale.CambioTurno);
                      newdate.setHours(n);
                      scope.tmpGruppoLocale.cambio_turno = newdate.toISOString();
                  }


              });

              scope.$watch('tmpGruppoLocale.FineTurno', function(newValue, oldValue){
                  if(scope.tmpGruppoLocale.FineTurno != undefined){
                      var n = scope.tmpGruppoLocale.FineTurno.getHours() +1;
                      var newdate = new Date( scope.tmpGruppoLocale.FineTurno);
                      newdate.setHours(n);
                      scope.tmpGruppoLocale.fine_turno = newdate.toISOString();
                  }
              });

              scope.$watch('frmGruppoLocale.$valid', function(validity) {
                  scope.isValidGruppoLocale = validity;
              });
          }
        };
    });
