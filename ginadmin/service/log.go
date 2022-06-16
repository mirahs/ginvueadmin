package service

import (
	"ginadmin/model"
	"ginadmin/util"
	"ginadmin/vo"
	"github.com/gin-gonic/gin"
	"log"
)


func LogLoginAdmUserGetWhere(ctx *gin.Context) (wheres [][]interface{}) {
	var voSearch vo.LogLoginSearch

	err := util.GinBindValid(ctx, &voSearch)
	if err != nil {
		log.Printf("log.LogLoginAdmUserGetWhere GinBindValid err:%v\n", err)
		return
	}

	if voSearch.Account != "" {
		if user, err := model.AUGetByAccount(voSearch.Account); err == nil && user.ID != 0 {
			wheres = append(wheres, []interface{}{"`adm_user_id`=?", user.ID})
		} else {
			wheres = append(wheres, []interface{}{"`adm_user_id`=?", 0})
		}
	}

	return
}
