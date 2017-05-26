
var app = angular.module('userRegistrationList', ['ng-pagination','toastr']);
app.controller('userRegistrationListCtrl',function($scope,userRegistrationSer,toastr) {
    $scope.$emit('changeId', null);
   //选择
    $scope.selectList = function(event){
        angular.forEach($scope.registerLists,function(obj){
            obj._selectList = false
        });
        event._selectList = true;
        $scope.idList = event.id;
        //向父Ctrl传递事件
        $scope.$emit('changeId', $scope.idList);
    };
    //查看更多
    $scope.moreList = function(event){
        angular.forEach($scope.registerLists,function(obj){
            if(event.id!==obj.id){
                obj._moreList = false
            }
        });
        event._moreList = !event._moreList;
    };
    
    function activatePage(page) {
        var listData = {
            page:page
        }
        userRegistrationSer.listRegister(listData).then(function(response){
            if(response.data.code==0){
                $scope.registerLists = response.data.data
            }else{
                toastr.error( "请求超时，请联系管理员", '温馨提示');
            }
        });
    }
    $scope.abili = {
        itemsCount: 9, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };
    userRegistrationSer.countRegister().then(function(response){
        if(response.data.code == 0){
            $scope.abili.itemsCount = response.data.data;
        }else{
            toastr.error( "请求超时，请联系管理员", '温馨提示');
        }
    });
    //删除
    $scope.$on('deletedId',function(event,delid){
        angular.forEach($scope.registerLists,function(obj){
            if(obj.id == delid){
                obj._delete = true
            }
        })
    });
});
