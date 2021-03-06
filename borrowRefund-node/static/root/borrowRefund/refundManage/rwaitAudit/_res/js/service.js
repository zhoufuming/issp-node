var app = angular.module('rwaitAuditServe',[]);
app.factory('rwaitAuditSer',function ($http) {
    return {
        menuPermission:menuPermission,
        allList:allList,
        allCount:allCount,
        getOneById1:getOneById,
        congelByOperate:congelByOperate,
        chargerAudit:chargerAudit,
        auditDetailList:auditDetailList,
        viewSigning:viewSigning
    };
    //菜单权限
    function menuPermission(data) {
        return $http.get('/borrowRefund/refundManage/'+data);
    }
    //列表
    function allList(data) {
        return $http.get('/refundManage/rwaitAudit/list',{
            params:data
        })
    }
    //分页
    function allCount(data){
        return $http.get('/refundManage/rwaitAudit/count',{
            params:data
        })
    }
    //id编辑
    function getOneById(data) {
        return $http.get('/refundManage/applyRecord/getOneById',{
            params:data
        })
    }
    //审核详情
    function auditDetailList(data) {
        return $http.post('/refundManage/applyRecord/auditDetail',data)
    }
    //负责人审核
    function chargerAudit(data){
        return $http.post('/refundManage/rwaitAudit/chargerAudit',data)
    }
    //冻结
    function congelByOperate(data) {
        return $http.post('/refundManage/rwaitAudit/congel',data)
    }
    //附件列表
    function viewSigning(data){
        return $http.get('/applyRecord/listFile',{params:data})
    }
});
