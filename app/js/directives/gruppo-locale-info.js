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

              scope.$watch('tmpGruppoLocale', function (newValue, oldValue) {
                  scope.listaAziendeLinkedToGL = [];
                  scope.filterAzienda = "";
              });


                  scope.$watch('tmpGruppoLocale.lista_ditte', function (newValue, oldValue) {
                      if(scope.tmpGruppoLocale != null) {
                          if (scope.tmpGruppoLocale.lista_ditte != null && scope.tmpGruppoLocale.lista_ditte != undefined) {
                              scope.listaAziendeLinkedToGL = [];

                              for (var i = 0; i < scope.tmpGruppoLocale.lista_ditte.length; i++) {
                                  var p = scope.tmpGruppoLocale.lista_ditte[i];
                                  p.linkedToGL = true;
                                  scope.listaAziendeLinkedToGL.push(p);
                              }
                          }
                          else if (scope.tmpGruppoLocale.lista_ditte == null || scope.tmpGruppoLocale.lista_ditte == undefined) {
                              scope.listaAziendeLinkedToGL = [];
                          }

                      }
                  });

                  scope.$watch('tmpGruppoLocale.InizioTurno', function (newValue, oldValue) {
                      if (scope.tmpGruppoLocale != null && scope.tmpGruppoLocale.InizioTurno != undefined) {
                          var newdate = new Date(scope.tmpGruppoLocale.InizioTurno);
                          var d = moment(newdate);
                          scope.tmpGruppoLocale.inizio_turno = d.format();
                          console.log(scope.tmpGruppoLocale.inizio_turno);
                      }
                  });

                  scope.$watch('tmpGruppoLocale.CambioTurno', function (newValue, oldValue) {
                      if (scope.tmpGruppoLocale != null && scope.tmpGruppoLocale.CambioTurno != undefined) {
                          var newdate = new Date(scope.tmpGruppoLocale.CambioTurno);
                          var d = moment(newdate);
                          scope.tmpGruppoLocale.cambio_turno = d.format();
                      }


                  });

                  scope.$watch('tmpGruppoLocale.FineTurno', function (newValue, oldValue) {
                      if (scope.tmpGruppoLocale != null && scope.tmpGruppoLocale.FineTurno != undefined) {
                          var newdate = new Date(scope.tmpGruppoLocale.FineTurno);
                          var d = moment(newdate);
                          scope.tmpGruppoLocale.fine_turno = d.format();
                      }
                  });

              scope.$watch('frmGruppoLocale.$valid', function(validity) {
                  scope.isValidGruppoLocale = validity;
              });
          }
        };
    });
