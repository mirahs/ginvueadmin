package route

import (
	"ginadmin/api"
	"ginadmin/middleware"
	"github.com/gin-gonic/gin"
)


func initAuth(group *gin.RouterGroup) {
	auth := group.Group("auth")

	auth.POST("login", api.AdmUserLogin)
	auth.POST("logout", api.AdmUserLogout)

	authAuth := auth.Group("")
	authAuth.Use(middleware.Auth())
	{
		authAuth.POST("login_token", api.AdmUserLoginToken)
	}
}
