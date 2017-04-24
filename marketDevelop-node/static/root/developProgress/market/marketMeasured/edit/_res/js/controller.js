var app = angular.module('measuredEdit', ['toastr']);
app.controller('measuredEditCtrl', function($scope, measuredSer,$stateParams,$state,toastr){
    var measuredData ={measuredId: $stateParams.id};

    //获取ID
    measuredSer.findMeasuredId(measuredData).then(function(response){
        if(response.data.code=='0'){
            $scope.editMeasured= response.data.data;
        }else if (response.data.code==403){
            toastr.error( "请登录用户", '温馨提示');
        }

    });


    //编辑点击提交
    $scope.MeasuredEditFun = function(){

        var vm = $scope;
        var data = {
            id:vm.editMeasured.id,
            type : vm.editMeasured.type,
            course : vm.editMeasured.course,
            capital : vm.editMeasured.capital,
            staffCost : vm.editMeasured.staffCost,
            equipmentCost : vm.editMeasured.equipmentCost,
            carCost : vm.editMeasured.carCost,
            staff : vm.editMeasured.staff,
            equipment : vm.editMeasured.equipment,
            car : vm.editMeasured.car,
            remark : vm.editMeasured.remark
        };
        measuredSer.measuredEdit(data).then(function(response){
            console.log(response);
            if(response.data.code == 0){
                $state.go('root.developProgress.market.marketMeasured.list');
                toastr.success( "编辑成功", '温馨提示');
            }else if(response.data.code == 403){
                toastr.error( "请登录用户", '温馨提示');
            }
        });

    };
});





