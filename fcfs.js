$(function () {


});

var app = angular.module("app",[]);
var c = app.controller("fcfsController",["$scope",function($scope){
    $scope.title = "FCFS";
    $scope.count=1;
    $scope.processes = [];
    $scope.process = {id:$scope.count,name:"proceso 1"};
    $scope.agregar = function(){
        if(validar($scope.process)){
            var p = angular.copy($scope.process);
            p.tInicio = 0;
            p.tFin = 10;
            $scope.processes.push(p);
            $scope.process.id=++$scope.count;
            $scope.process.name = "proceso "+$scope.count;
            $scope.process.tCome = 0;
            $scope.process.tService = 0;
            //$scope.$apply();    
        }
    }
    function validar(process){
        var reg = /^\d+$/;
        if( reg.exec(process.tCome) && reg.exec(process.tService) && process.name.trim() != "")
            return true;
        return false;

    }
    $scope.$watch("processes",function(newValue){
        var chart = $('#container').highcharts();
        var names=[];
        var values = [];
        for(var i in newValue){
            names.push(newValue[i].name)
            values.push([newValue[i].tInicio, newValue[i].tFin]);
        }
        chart.xAxis[0].setCategories(names);
        chart.series[0].setData(values);
    },true);
    setInterval(function(){
        console.log("update!");
        var chart = $('#container').highcharts();
        for(var i in $scope.processes){
            console.log("x");
            $scope.processes[i].tFin++;
            $scope.processes[i].tInicio++;
            chart.series[0].data[i].update([$scope.processes[i].tInicio, $scope.processes[i].tFin]);
        }
        $scope.$apply();
    },1000);

}]).directive("hcColumnrange", function(){
    return {
        scope: {
          items: '='
        },
        template: '<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto">',
        link: function(scope, element, attrs){
            $('#container').highcharts({
                chart: {
                    type: 'columnrange',
                    inverted: false,
                },
                title: {
                    text: 'Procesos'
                },
                
                xAxis: {
                    categories: ['Jan']
                },
                yAxis: {
                    title: {
                        text: 'Tiempo (s)'
                    },
                    max: 100
                },
                tooltip: {
                    valueSuffix: 's'
                },
                plotOptions: {
                    columnrange: {
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                return this.y + 's';
                            }
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: 'Procesos',
                    data: [
                    [-9.7, 9.4],
                    
                    ]
                }]
            });
            

        }
}

})