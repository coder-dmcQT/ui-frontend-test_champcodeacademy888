package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"try.com/m/db"
	"try.com/m/models"
)

func HandleUserLogout(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{
		"code": 200,
		"data": nil,
	})
}

func HandleUserLogin(context *gin.Context) {
	var user models.UserLoginData
	if err := context.ShouldBind(&user); err != nil {
		context.JSON(200, gin.H{
			"code":  0,
			"error": "User data passing is wrong!",
		})
		return
	}
	userFound, err := db.GetUserByUsername(user.Username)
	if err != nil {
		context.JSON(200, gin.H{
			"code":  0,
			"error": "Error occurred when trying get user by username! " + err.Error(),
		})
		return
	}
	if userFound == nil {
		context.JSON(200, gin.H{
			"code":  0,
			"error": "User not found!",
		})
		return
	}
	context.JSON(200, gin.H{
		"code": 200,
		"data": userFound,
	})
}
