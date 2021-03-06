var app = angular.module('dimenEdit', ['toastr','ipCookie']);
app.controller('dimenEditCtrl', function($scope,$state,toastr,$stateParams,dimensionSer,ipCookie,$location){

    var dimensionData ={id: $stateParams.id};
    dimensionSer.getDimension(dimensionData).then(function(response){
        if(response.data.code == 0){
            $scope.editDimension = response.data.data
        }
    });

    //提交编辑
    $scope.dimensionAddFun = function(){
        var vm = $scope;
        dimensionSer.editDimension(vm.editDimension).then(function(response){
            if(response.data.code == 0){
                $state.go('root.organize.management.dimen.list');
                toastr.success( "已成功编辑", '温馨提示');
            }else if(response.data.code==403||response.data.code==401){
                toastr.error( "请登录用户,2秒后跳至登陆页面", '温馨提示');
                var absurl = $location.absUrl();
                ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes' });
                setTimeout(function(){
                    window.location.href='http://localhost/login'
                },2000)
            }
        });
    };
});





