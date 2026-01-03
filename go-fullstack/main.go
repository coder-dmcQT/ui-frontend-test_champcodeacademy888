package main

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"try.com/m/controller"
	"try.com/m/db"
)

//go:embed out/*
var staticFiles embed.FS

func main() {
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	go func() {
		log.Println("start sync database of sqlite")
		if err := db.InitDB(); err != nil {
			log.Println("init database failed:", err)
		} else {
			log.Println("init database success")
		}
	}()

	apiGroup := router.Group("/api")
	{
		apiGroup.POST("/login", controller.HandleUserLogin)
		apiGroup.GET("/logout", controller.HandleUserLogout)
		apiGroup.GET("/lessons", controller.GetLessons)
		apiGroup.GET("/lessons/take", controller.TakeLesson)
	}

	static, err := fs.Sub(staticFiles, "out")
	if err != nil {
		panic(err)
	}
	router.StaticFS("/web", http.FS(static))
	if err := router.Run(":12345"); err != nil {
		panic(err)
	}
	fmt.Println("Setup server success!")
}
