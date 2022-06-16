package route

import (
	"ginadmin/conf"
	"ginadmin/middleware"
	"github.com/gin-gonic/gin"
)


func Init() *gin.Engine {
	gin.SetMode(conf.App.GinMode)

	var engine *gin.Engine
	if conf.App.GinMode == gin.DebugMode {
		engine = gin.Default()
	} else {
		engine = gin.New()
		engine.Use(gin.Recovery())
	}

	initRoute(engine)

	return engine
}


func initRoute(engine *gin.Engine) {
	engine.Use(middleware.Cors())

	v1 := engine.Group("v1")

	initAuth(v1)

	initAdmUser(v1)
	initLog(v1)
}
