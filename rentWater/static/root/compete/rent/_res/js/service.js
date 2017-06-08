var app = angular.module('rentServer',[]);
app.factory('rentSer',function ($http) {
    return {
        rentAdd:rentAdd,
        rentUpload:rentUpload,
        rentArea:rentArea,
        rentId:rentId,
        rentEdit:rentEdit,
        rentCount:rentCount,
        rentDelete:rentDelete,
        rentSummary:rentSummary,
        rentList : rentList,
        moneyProject:moneyProject,
        moneyGroup:moneyGroup
    };
    //添加
    function rentAdd(data){
        return $http.post('/rentAdd/add',data)
    }
    //上传附件
    function rentUpload(){
        return $http.get('/rentUpload/upload')
    };
    //获取地区
    function rentArea(data){
        return $http.get('/rentArea/area',{
            params:data
        })
    }
    //一个房租缴费
    function rentId(data){
        return $http.get('/rentId/id',{
            params:data
        })
    }
    //编辑
    function rentEdit(data){
        return $http.post('/rentEdit/edit',data)
    }
    //房租总条数
    function rentCount(data){
        return $http.get('/rentCount/count',{
            params:data
        })
    }
    //删除
    function rentDelete(data){
        return $http.get('/rentDelete/delete',{
            params:data
        })
    }
    //汇总
    function rentSummary(data){
        return $http.get('/rentSummary/summary',{
            params:data
        })
    }
    //列表
    function rentList(data) {
        return $http.get('/rentList/list',{
            params:data
        })
    }
    //项目分析
    function moneyProject(data){
       return $http.post('/moneyProject/Project',data)
    }
    //项目组分析
    function moneyGroup(data){
       return $http.post('/moneyGroup/Group',data)
    }
});
