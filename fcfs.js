$(function () {

    $('#container').highcharts({

        chart: {
            type: 'columnrange',
            inverted: false
            
        },

        title: {
            text: 'Temperature variation by month'
        },

        subtitle: {
            text: 'Observed in Vik i Sogn, Norway'
        },

        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        yAxis: {
            title: {
                text: 'Temperature ( °C )'
            }
        },

        tooltip: {
            valueSuffix: '°C'
        },

        plotOptions: {
            columnrange: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return this.y + '°C';
                    }
                }
            }
        },

        legend: {
            enabled: false
        },

        series: [{
            name: 'Temperatures',
            data: [
            [-9.7, 9.4],
            [-8.7, 6.5],
            [-3.5, 9.4],
            [-1.4, 19.9],
            [0.0, 22.6],
            [2.9, 29.5],
            [9.2, 30.7],
            [7.3, 26.5],
            [4.4, 18.0],
            [-3.1, 11.4],
            [-5.2, 10.4],
            [-13.5, 9.8]
            ]
        }]

    });



});

var app = angular.module("app",[]);
app.controller("fcfsController",["$scope",function($scope){
    $scope.title = "FCFS";
    $scope.count=1;
    $scope.processes = [];
    $scope.process = {id:$scope.count};
    $scope.agregar = function(){
        if(validar($scope.process)){
            $scope.processes.push(angular.copy($scope.process));
            $scope.process.name = "";
            $scope.process.id=++$scope.count;
            $scope.process.tCome = 0;
            $scope.process.tService = 0;
            $scope.$apply();    
        }
    }
    function validar(process){
        var reg = /^\d+$/;
        if( reg.exec(process.tCome) && reg.exec(process.tService) && process.name.trim() != "")
            return true;
        return false;

    }

}]);