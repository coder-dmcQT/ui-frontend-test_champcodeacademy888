package db

import (
	"fmt"
	"time"

	"try.com/m/models"
)

func GetUserByUsername(username string) (*models.User, error) {
	var user models.User
	result := DB.Where("username = ?", username).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

// GetAllLessons 获取所有课程
func GetAllLessons(lessonParams *models.GetLessonRequestParams) ([]models.Lesson, error) {
	var lessons []models.Lesson

	query := DB.Model(&models.Lesson{})

	// 类型筛选（可选）
	if lessonParams.Type != "" {
		query = query.Where("type = ?", lessonParams.Type)
	}

	// 日期筛选逻辑
	startDateProvided := lessonParams.StartDate != ""
	endDateProvided := lessonParams.EndDate != ""

	if startDateProvided && endDateProvided {
		// 两个日期都提供：范围查询
		startTime, err1 := time.Parse(models.TimeLayout, lessonParams.StartDate)
		endTime, err2 := time.Parse(models.TimeLayout, lessonParams.EndDate)

		if err1 == nil && err2 == nil {
			endTime = endTime.Add(23*time.Hour + 59*time.Minute + 59*time.Second)
			query = query.Where("date BETWEEN ? AND ?", startTime, endTime)
		}
	} else if startDateProvided {
		// 只提供开始日期：大于等于开始日期
		startTime, err := time.Parse(models.TimeLayout, lessonParams.StartDate)
		if err == nil {
			query = query.Where("date >= ?", startTime)
		}
	} else if endDateProvided {
		// 只提供结束日期：小于等于结束日期
		endTime, err := time.Parse(models.TimeLayout, lessonParams.EndDate)
		if err == nil {
			endTime = endTime.Add(23*time.Hour + 59*time.Minute + 59*time.Second)
			query = query.Where("date <= ?", endTime)
		}
	}

	result := query.Order("date DESC").Find(&lessons)
	return lessons, result.Error
}

func TakeLessonHandle(params *models.UserTakeLessonRequest) error {
	query := `
        UPDATE lessons SET students = json_insert(students, '$[#]', ?)
        WHERE id = ? AND NOT EXISTS (
            SELECT 1 FROM json_each(lessons.students)
            WHERE json_each.value = ?
        )
    `
	result := DB.Exec(query, params.Username, params.ID, params.Username)
	fmt.Println(result)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return fmt.Errorf("you have already taken lesson")
	}
	return nil
}
