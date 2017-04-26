var app = angular.module('directionAdd', ['toastr']);
app.controller('directionAddCtrl', function($scope, directionSer,$stateParams,$state,toastr){

    // var typeId={'_includes':['id','type']};
    directionSer.courseGetType().then(function(response){
        console.log(response);
        if(response.data.code==0){
            $scope.courseType = response.data.data
        } else if(response.data.code == 403){
            toastr.error("请登录用户", '温馨提示');
        }
    });
    //添加
    $scope.courseAddFun = function(){
        var vm = $scope;
        // vm.course.typeId = vm.courseGetType.typeId;
        // vm.course.typeName = vm.courseGetType.typeName;
        directionSer.coursedAdd(vm.course).then(function(response){
            console.log(response)
            if(response.data.code == 0){
                $state.go('root.developProgress.other.directionSubjects.list');
                toastr.success("已成功添加", '温馨提示');
            }else if(response.data.code==403){
                toastr.error( "请登录用户", '温馨提示');
            }
        });

    };

});




