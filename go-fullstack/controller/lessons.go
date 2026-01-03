package controller

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"try.com/m/db"
	"try.com/m/models"
)

func TakeLesson(context *gin.Context) {
	var prams models.UserTakeLessonRequest
	if err := context.ShouldBindQuery(&prams); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Println("request params is ", prams)
	err := db.TakeLessonHandle(&prams)
	if err != nil {
		context.JSON(200, gin.H{"error": err.Error(), "code": 0})
		return
	}
	context.JSON(200, gin.H{"data": "Taken success!", "code": 200})
}

func GetLessons(context *gin.Context) {
	var params models.GetLessonRequestParams

	if err := context.ShouldBindQuery(&params); err != nil {
		context.JSON(200, gin.H{
			"code": 0,
			"msg":  "Request parameter is not fit!",
		})
		return
	}
	data, err := db.GetAllLessons(&params)
	if err != nil {
		context.JSON(200, gin.H{
			"code": 0,
			"msg":  "Get all lessons failed! " + err.Error(),
		})
		return
	}
	responseData := make([]map[string]interface{}, len(data))
	for i, lesson := range data {
		// 解析 Students
		var students []string
		if lesson.Students != "" {
			err = json.Unmarshal([]byte(lesson.Students), &students)
			if err != nil {
				context.JSON(200, gin.H{
					"code": 0,
					"msg":  "Get all students failed! " + err.Error(),
				})
				return
			}
		}

		responseData[i] = map[string]interface{}{
			"id":       lesson.ID,
			"date":     lesson.Date,
			"type":     lesson.Type,
			"subject":  lesson.Subject,
			"students": students, // 这里是数组了
			"tutor":    lesson.Tutor,
			"status":   lesson.Status,
		}
	}
	context.JSON(200, gin.H{
		"code": 200,
		"data": responseData,
	})
}
