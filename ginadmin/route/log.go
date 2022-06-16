package route

import (
	"ginadmin/api"
	"ginadmin/middleware"
	"github.com/gin-gonic/gin"
)


func initLog(group *gin.RouterGroup) {
	user := group.Group("log")
	user.Use(middleware.Auth())
	{
		user.GET("login/adm_user", api.LogAdmUserLoginGet)
		user.DELETE("login/adm_user/:id", api.LogAdmUserLoginDelete)
	}
}
