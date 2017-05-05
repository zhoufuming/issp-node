var app = angular.module('operationList', ['ng-pagination','toastr']);
app.controller('operationListCtrl',function($scope,operationSer,toastr){
    $scope.$emit('changeId', null);

    $scope.selectList = function(event){
        angular.forEach($scope.operationLists,function(obj){
                obj._selectList = false
        });
        event._selectList = true;
        //向父Ctrl传递事件
        $scope.$emit('changeId', event.id);
    };


    //分页
    $scope.custom = {
        itemsCount: 1,//总条数
        take: 10,        //每页显示
        activatePage: activatePage
    };


    function activatePage(page) {
        var listData = {
            page:page
        }
        operationSer.listOperation(listData).then(function(response){
            if(response.data.code==0){
                $scope.operationLists = response.data.data
            }else{
                toastr.error( "请求超时，请联系管理员", '温馨提示');
            }
        })
    }
    operationSer.countOperation().then(function(response){
        if(response.data.code==0){
            $scope.custom.itemsCount = response.data.data;
        }else{
            toastr.error( "请求超时，请联系管理员", '温馨提示');
        }
    })


    $scope.$on('deletedId',function(event,delid){
       angular.forEach($scope.operationLists,function(obj){
        if(obj.id == delid){
            obj._delete = true
        }
       })
    });
    //冻结
    $scope.$on('congealId',function(event,conid){
        angular.forEach($scope.operationLists,function(obj){
            if(obj.id == conid){
                obj.status = 'CONGEAL';
                obj._selectList = false;
            }
        })
    });

    //解冻
    $scope.thaw = function(event){
        var data = {
            id :event.id
        };
        operationSer.thawOperation(data).then(function(response){
            if(response.data.code==0){
                event.status = "THAW"
            }else if(response.data.code==403){
                toastr.error( "请登录用户", '温馨提示');
            }

        })
    }
});


