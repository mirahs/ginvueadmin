package api

import (
	"ginadmin/common"
	"ginadmin/dto"
	"ginadmin/model"
	"ginadmin/service"
	"ginadmin/util/page"
	"github.com/gin-gonic/gin"
	"github.com/unknwon/com"
	"log"
	"net/http"
)


// LogAdmUserLoginGet 获取管理员登录日志
func LogAdmUserLoginGet(ctx *gin.Context) {
	var logs []*model.LogAdmUserLogin

	wheres := service.LogLoginAdmUserGetWhere(ctx)
	preloads := [][]interface{}{{"AdmUser"}}
	orders := []string{"`id` DESC"}

	count, err := page.Page(&page.Param{Ctx: ctx, Db: model.Db, Datas: &logs, Wheres: wheres, Preloads: preloads, Orders: orders})
	if err != nil {
		log.Printf("log.LogLoginAdmUserGet Page err:%v\n", err)
		common.RespFailed(ctx, http.StatusInternalServerError, common.ErrDb)
		return
	}

	common.RespSuccess(ctx, gin.H{"count": count, "datas": dto.ToLogLoginAdmUsers(logs)})
}

// LogAdmUserLoginDelete 删除管理员登录日志
func LogAdmUserLoginDelete(ctx *gin.Context) {
	id := uint32(com.StrTo(ctx.Params.ByName("id")).MustInt64())
	if id <= 0 {
		common.RespFailed(ctx, http.StatusBadRequest, common.ErrParamFailed)
		return
	}

	model.LogAdmUserDelete(id)

	common.RespSuccess(ctx, nil)
}
