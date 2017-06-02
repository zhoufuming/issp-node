var app = angular.module('app', ['ngVerify','ipCookie',
    'indexSerModule'
]);
app.controller('rootCtrl', function ($scope,$rootScope,$state,ipCookie,$location,rootSer) {
    if ($state.current.url == '/root') {//默认加载列表
        $state.go('root.business');
    }
     $scope.username = ipCookie('username');
    if($scope.username==undefined){
        $scope.username="登录用户"
    }else {
        $scope.logined=true;
    }

    $scope.login = function(){
        var absurl = $location.absUrl();
        ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes',domain:'issp.bjike.com' });
        location.href="http://localhost/login";//部署到线上时要改为登录域名
    };
    $scope.logout = function(){
       var absurl = {absurl:$location.absUrl()};
        rootSer.userLogout(absurl).then(function(response){
            if(response.data.code==0){
                ipCookie.remove("username");
                location.href="http://localhost/user/logout"
            }
        })
    }

    //搜索功能
    $scope.isClick = false;
    $scope.searchToggle = function(){
        $scope.isClick = !$scope.isClick;
        //父 Ctrl 监听到事件，向下广播
        $scope.$broadcast('iSsearch',$scope.isClick)
    }
     $scope.$on('isVi',function(event,msg){
        $scope.isView = msg;
    });
})
