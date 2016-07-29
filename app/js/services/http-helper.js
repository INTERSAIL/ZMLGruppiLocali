angular.module('ZMLGruppiLocali')
    .factory('HttpHelper', function($http, OperationInProgressPanel){
        return{
            //handlers è un array di funzioni che possono essere utilizzate qui dentro
            http: function(httpParameters, handlers, progressBar){
                progressBar.start();
                OperationInProgressPanel.showGrayedLayout();
                $http(httpParameters)
                    .success(function(data, status, headers, config){
                        progressBar.complete();
                        OperationInProgressPanel.hideGrayedLayout();
                        if(handlers && handlers.hasOwnProperty('successFunction'))
                            handlers.successFunction(data);

                    })
                    .error(function(data, status, headers, config){
                        progressBar.complete();
                        OperationInProgressPanel.hideGrayedLayout();
                        if(handlers && handlers.hasOwnProperty('errorFunction'))
                            handlers.errorFunction(data);
                    });
            }
        };
    });
