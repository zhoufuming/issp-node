var app = angular.module('typeList', ['ng-pagination','toastr']);
app.controller('typeListCtrl',function($scope,typeSer,toastr,$stateParams,$state,$location){
    $scope.$emit('changeId', null);
    //删除
    //获取id
    
    if($stateParams.id){
        switch ($stateParams.name){
            case 'delete':
                $scope.delShow = true;
                break;
        }
    }
    $scope.cancel = function(){//取消删除
        $scope.delShow = false;
        $state.go('' +
            'root.biddingManagement.biddingType.list[12]',{id:null,name:null});
    };
    var count=0;
    $scope.delFn = function(){//确认删除

        var data = {
            id:$stateParams.id
        };
        typeSer.deletetype(data).then(function(response){
            if(response.data.code==0){
                count++;
                toastr.info( "信息已删除", '温馨提示');
                $scope.$emit('changeId', null);
                $scope.delShow = false;
                if(($scope.custom.itemsCount-count)%10){
                    $state.go('root.biddingManagement.biddingType.list[12]',{id:null,name:null});
                }else{
                    $state.go('root.biddingManagement.biddingType.list[12]',{id:null,name:null,page:$stateParams.page-1});
                }
                // $state.go('root.biddingManagement.websiteInfo.list[12]',{id:null,name:null});
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };
    function activatePage(page) {
        if($scope.typeLists)return;
        var listData = {
            page:page || 1
        };
        typeSer.typeList(listData).then(function(response){
            if(response.data.code==0){
                $scope.typeLists = response.data.data;
                if($stateParams.id){
                    angular.forEach($scope.typeLists,function(obj){
                        if(obj.id == $stateParams.id){
                            obj._selectList = true;
                        }
                    });
                    //向父Ctrl传递事件
                    $scope.$emit('changeId', $stateParams.id);
                }
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    }

    $scope.selectList = function(event){
        angular.forEach($scope.typeLists,function(obj){
                obj._selectList = false
        });
        event._selectList = true;
        $scope.idListd = event.id;
        //向父Ctrl传递事件
        $scope.$emit('changeId', $scope.idListd);
        $scope.$emit('page',$location.search().page);
    };
//分页
    $scope.custom = {
        itemsCount: 2, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };
    typeSer.counttype().then(function(response){
        if(response.data.code==0){
            $scope.custom.itemsCount = response.data.data;
            $scope.num = $stateParams.page*10>10?($stateParams.page-1)*10:null;
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }
    })
});

