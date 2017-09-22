var app = angular.module('departindex', [{
    files:[
        "root/file/departindex/_res/js/service.js"
    ]
}]);
app.controller('departindexCtrl',function ($scope,$state) {
    if ($state.current.url == '/departindex') {//默认加载列表
        $state.go('root.file.departindex.list[12]');
    }
    $scope.$emit('isVi',true);//判断是否出现搜索按钮
}).controller('departindexMenuCtrl',function($scope,$state,$rootScope,$location,departindexSer){
    var urlName = $state.current.url.split('/')[1].split('[')[0];
    $scope.menuClass = urlName.split('?')[0] + "Menu";
    $rootScope.$on('$locationChangeSuccess', function () {//url地扯改变或者刷新
        if($location.path().split('/').slice(-1)=='list[12]' && window.location.href.indexOf('id=') == -1){
            $scope.menuClass = 'listMenu';
        }
    });
    if (window.location.href.split('id=')[1]) {//如果是刷新进来的页面，没有经过list
        $scope.idList = window.location.href.split('id=')[1];
        if($location.search().name){
            $scope.menuClass = $location.search().name + 'Menu';
        }
    }
    $scope.menuCheck = function (name) {
        var buttonName = name;
        $scope.buttonShow = true;
        departindexSer.menuPermission(buttonName).then(function(response){
            if(response.data.code == 0 && response.data.data){
                $scope[buttonName] = true;
            }else{
                $scope[buttonName] = false;
            }
        });
        $scope.menuAdd = false;
    };
    //监听到父Ctrl后改变事件
    $scope.$on("listId", function(event, id){
        $scope.idList = id;
    });
    $scope.$on('pageId',function(event,flag){
        $scope.page = flag;
    });
    if(!$scope.page){
        $scope.page = $location.search().page;
    }
    $scope.list = function(){
        $scope.menuClass = 'listMenu';
        $scope.idList = '';
    };
    $scope.add = function(){
        $scope.menuClass = 'addMenu';
        $scope.idList = '';
    };
    $scope.delete = function(){
        if($scope.idList){
            $state.go('root.file.departindex.list[12]',{id:$scope.idList,name:'delete',page:$scope.page});
            $scope.menuClass = 'deleteMenu'
        }
    };
    $scope.month = function(){
        if($scope.idList){
            $state.go('root.file.departindex.month[12]',{id:$scope.idList,page:$scope.page});
            $scope.menuClass = 'monthMenu'
        }
    };
    $scope.edit = function(){
        if($scope.idList){
            $state.go('root.file.departindex.edit[12]',{id:$scope.idList,page:$scope.page});
            $scope.menuClass = 'editMenu'
        }
    };
    $scope.import = function(){
        $scope.menuClass = 'importMenu';
        $scope.idList = ''
    };
    $scope.export = function(){
        $scope.menuClass = 'exportMenu';
        $scope.idList = ''
    };
});

