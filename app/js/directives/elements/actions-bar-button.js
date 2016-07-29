angular.module("ZMLGruppiLocali")
    .directive("actionsBarButton", function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/elements/actions-bar-button.html',
            scope: {
                imageClass: "@",
                tooltip: "@",
                visible: "=",
                enabled: "="
            },
            link: function(scope, element, attrs) {
                element.find("button.action-bar-button").addClass(scope.imageClass);
            }
        };
    });
