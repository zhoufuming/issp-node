var app = angular.module('resultEdit', ['toastr','angularjs-dropdown-multiselect']);
app.controller('resultEditCtrl', function($scope, resultSer,$state,toastr,$stateParams){
    $scope.areaData= [];
    $scope.stringSettings = {template : '{{option}}', smartButtonTextConverter(skip, option) { return option; }};
    resultSer.listResultProjects().then(function(response){
        if(response.data.code == 0){
            $scope.proData = response.data.data;
        }
    });
    //查询所有地区
    resultSer.listResultArea().then(function(response){
        if(response.data.code == 0){
            $scope.areaData = response.data.data;
        }
    });
    $scope.objLists = [];
    $scope.addMail = function(){
        $scope.objLists.push($scope.sendUsers);
        $scope.sendUsers = '';
    };
    $scope.emails = ['个人邮箱','公邮','自由录入'];
    //编辑
    //获取值
    var resultId = {id : $stateParams.id};
    resultSer.getEditResultById(resultId).then(function(response){
        if(response.data.code==0){
            $scope.editInfo = response.data.data;
        }else{
            toastr.error(response.data.msg, '温馨提示');
        }
    });
    $scope.resultEditFun = function(){
        var vm = $scope;
        vm.editInfo.sendUsers = $scope.objLists;
        resultSer.editResult(vm.editInfo).then(function(response){
            if(response.data.code == 0){
                $state.go('root.assessment.result.list[12]');
                toastr.success("已成功添加", '温馨提示');
            }else{
                toastr.error(response.data.msg, '温馨提示');
            }
        });
    };
    $scope.dbSend = function (index) {
        $scope.objLists.splice(index,1);
    }
});





