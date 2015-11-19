$(function () {


});

var app = angular.module("app",[]);
var c = app.controller("fcfsController",["$scope",function($scope){
    $scope.title = "Task manager";
    $scope.count=1;
    $scope.processes = [];
    $scope.process = {id:$scope.count,name:"proceso 1",tEjecutado:0,tService:10,tCome:0,tFin:0};
    $scope.running = false;
    $scope.timeRunning= 0;
    $scope.agregar = function(){
        if(validar($scope.process)){
            var p = angular.copy($scope.process);
            p.tFin = p.tCome;
            $scope.processes.push(p);
            $scope.process.id=++$scope.count;
            $scope.process.name = "proceso "+$scope.count;
            $scope.process.tCome = 0;
            $scope.process.tService = 10;
            $scope.process.tEjecutado = 0;
            //$scope.$apply();    
        }
    }
    function validar(process){
        var reg = /^\d+$/;
        if( reg.exec(process.tCome) && reg.exec(process.tService) && process.name.trim() != "")
            return true;
        return false;

    }
    $scope.eliminar= function(index){
        $scope.processes.splice(index,1);

    }
    $scope.$watch("processes",function(newValue){
        var chart = $('#container').highcharts();
        var names=[];
        var values = [];
        for(var i in newValue){
            names.push(newValue[i].name)
            values.push([parseInt(newValue[i].tCome), newValue[i].tFin] );
        }
        chart.xAxis[0].setCategories(names);
        chart.series[0].setData(values);
    },true);


    setInterval(function(){
        if($scope.running)
        {
            $scope.timeRunning++;
            var chart = $('#container').highcharts();
            var terminado = true;
            for(var i in $scope.processes){
                    if( $scope.processes[i].tEjecutado < $scope.processes[i].tService){
                        terminado = false;
                        $scope.processes[i].tEjecutado=  Math.max($scope.timeRunning - parseInt($scope.processes[i].tCome),0);
                        $scope.processes[i].tFin= parseInt($scope.processes[i].tCome) + $scope.processes[i].tEjecutado; 
                    }    
                    var val = [parseInt($scope.processes[i].tCome), $scope.processes[i].tFin];    
                   
                    console.log(val);
                    chart.series[0].data[i].update(val);
            }            

            if(terminado)
                $scope.running = false;
            $scope.$apply();
        }
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
                //max: 100, 
                min:0
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