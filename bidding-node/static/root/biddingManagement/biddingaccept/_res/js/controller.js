var app = angular.module('accept', [{
    files:[
        "root/biddingManagement/biddingaccept/_res/js/service.js",
    ]
}]);
app.controller('acceptCtrl',function ($scope,$state) {
    if ($state.current.url == '/biddingaccept') {//默认加载列表
        $state.go('root.biddingManagement.biddingaccept.list[12]')
    }
    $scope.$emit('isVi',true);//判断是否出现搜索按钮
}).controller('acceptMenuCtrl',function($scope,$state,$rootScope,$location,acceptSer){
    var urlName = $state.current.url.split('/')[1].split('[')[0];
    $scope.menuClass=urlName+"Menu";
    $rootScope.$on('$locationChangeSuccess', function () {//url地扯改变或者刷新
        if($location.path().split('/').slice(-1)=='list[12]' && window.location.href.indexOf('id=') == -1){
            $scope.menuClass = 'listMenu';
        }
    });
    if (window.location.href.split('id=')[1]) {//如果是刷新进来的页面，没有经过list
        $scope.idListd = window.location.href.split('id=')[1];
        if($location.search().name){
            $scope.menuClass = $location.search().name + 'Menu';
        }

    }
    $scope.menuCheck = function (name) {
        var buttonName = name;
        $scope.buttonShow = true;
        acceptSer.acceptPermission(buttonName).then(function(response){
            if(response.data.code == 0 && response.data.data){
                $scope[buttonName] = true;
            }else{
                $scope[buttonName] = false;
            }
        });
        $scope.menuAdd = false;
    };
    //监听到父Ctrl后改变事件
    $scope.$on("getId", function(event, msg){
       $scope.idListd = msg;
    });
    $scope.$on('pageId',function(event,flag){
        $scope.page = flag;
    });
    if(!$scope.page){
        $scope.page = $location.search().page;
    };
    $scope.delete = function(){
        if($scope.idListd){
            $state.go('root.biddingManagement.biddingaccept.list[12]',{id:$scope.idListd,name:'delete',page:$scope.page});
            $scope.menuClass = 'deleteMenu'
        }
    };

    $scope.edit = function(){
        if($scope.idListd){
            $state.go('root.biddingManagement.biddingaccept.edit[12]',{id:$scope.idListd,page:$scope.page});
            $scope.menuClass = 'editMenu';
        }
    };
    $scope.notification = function(){
        if($scope.idListd){
            $state.go('root.biddingManagement.biddingaccept.notification[12]',{id:$scope.idListd,page:$scope.page});
            $scope.menuClass = 'notificationMenu';
        }
    };
    $scope.list = function(){
        $scope.menuClass = 'listMenu'
    };
    $scope.add = function(){
        $scope.menuClass = 'addMenu';
        $scope.idListd = ''
    };
});
//自定义过滤
app.filter('cover', function(){
    return function (val) {
        var result;
        switch(val){
            case "INVITEDTENDERING":
                result = "邀请招标";
                break;
            case "OPENTENDERING":
                result = "公开招标";
                break;
            case "MOBILECOMMUNICATION":
                result = "移动通信";
                break;
            case "SOFTWAREDEVELOPMENT":
                result = "软件开发";
                break;
            case "INTELLIGENTSYSTEMINTEGRATION":
                result = "智能系统集成";
                break;
            case "PLANNINGMARKETINGSOLUTIONS":
                result = "策划与营销方案";
                break;
            case "THAW":
                result = "解冻";
                break;
            case "CONGEAL":
                result = "冻结";
                break;
            case "DELETE":
                result = "删除";
                break;
            case "NOACTIVE":
                result = "未激活";
                break;
            case "UNREVIEW":
                result = "未审核";
                break;
            case true:
                result = "是";
                break;
            case false:
                result = "否";
                break;
            case "UNTREATED":
                result = "未处理";
                break;
            case "TREATING":
                result = "在处理";
                break;
            case "TREATED":
                result = "已处理";
                break;
            case "TREATED-SOLVED":
                result = "已处理,解决了问题";
                break;
            case "TREATED-UNSOLVED":
                result = "已处理,但未解决问题";
                break;

        }
        return result;
    }
});
