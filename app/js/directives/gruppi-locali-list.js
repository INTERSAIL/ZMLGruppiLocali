angular.module("ZMLGruppiLocali")
    .directive("gruppiLocaliList", function(){
        return{
          restrict:"E",
          templateUrl: "templates/gruppi-locali-list.html",
          scope:{
            gruppiLocaliList:"=",
            selectedGruppoLocale:"=",
            editable:"="
          },
          controller: "gruppiLocaliListController"
        };
    });
