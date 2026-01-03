package db

import (
	"time"

	"try.com/m/models"
)

import (
	"encoding/json"
)

// getMockedLessons 生成模拟的课程数据
func getMockedLessons() []models.Lesson {

	lessons := []models.Lesson{
		{
			ID:       "L001",
			Date:     parseTime("2025-10-28T14:00:00Z"),
			Type:     "Historic",
			Subject:  "Minecraft Game Design - Level 1",
			Students: marshalJSON([]string{"Ethan", "Ava"}),
			Tutor:    strPtr("Sarah Tan"),
			Status:   "Completed",
		},
		{
			ID:       "L002",
			Date:     parseTime("2025-11-02T09:00:00Z"),
			Type:     "Historic",
			Subject:  "Roblox Coding Basics",
			Students: marshalJSON([]string{"Lucas"}),
			Tutor:    strPtr("Sarah Tan"),
			Status:   "Completed",
		},
		{
			ID:       "L003",
			Date:     parseTime("2025-11-05T16:00:00Z"),
			Type:     "Historic",
			Subject:  "Python for Kids - Introduction",
			Students: marshalJSON([]string{"Chloe", "Aaron"}),
			Tutor:    strPtr("Sarah Tan"),
			Status:   "Completed",
		},
		{
			ID:       "L004",
			Date:     parseTime("2025-11-08T10:00:00Z"),
			Type:     "Upcoming",
			Subject:  "Minecraft Redstone Logic",
			Students: marshalJSON([]string{"Emma", "Noah"}),
			Tutor:    strPtr("Sarah Tan"),
			Status:   "Confirmed",
		},
		{
			ID:       "L005",
			Date:     parseTime("2025-11-09T15:00:00Z"),
			Type:     "Upcoming",
			Subject:  "Roblox Game Design - Level 2",
			Students: marshalJSON([]string{"Ryan", "Mia"}),
			Tutor:    strPtr("Sarah Tan"),
			Status:   "Confirmed",
		},
		{
			ID:       "L006",
			Date:     parseTime("2025-11-10T12:00:00Z"),
			Type:     "Upcoming",
			Subject:  "Website Design for Beginners",
			Students: marshalJSON([]string{"Olivia"}),
			Tutor:    strPtr("Sarah Tan"),
			Status:   "Confirmed",
		},
		{
			ID:       "L007",
			Date:     parseTime("2025-11-12T11:00:00Z"),
			Type:     "Available",
			Subject:  "Python for Kids - Game Projects",
			Students: marshalJSON([]string{}),
			Tutor:    nil,
			Status:   "Available",
		},
		{
			ID:       "L008",
			Date:     parseTime("2025-11-13T17:00:00Z"),
			Type:     "Available",
			Subject:  "Roblox Game Design - Level 1",
			Students: marshalJSON([]string{}),
			Tutor:    nil,
			Status:   "Available",
		},
		{
			ID:       "L009",
			Date:     parseTime("2025-11-14T10:00:00Z"),
			Type:     "Available",
			Subject:  "Minecraft AI Coding Adventure",
			Students: marshalJSON([]string{}),
			Tutor:    nil,
			Status:   "Available",
		},
		{
			ID:       "L010",
			Date:     parseTime("2025-11-15T09:00:00Z"),
			Type:     "Upcoming",
			Subject:  "Python Automation for Kids",
			Students: marshalJSON([]string{"Elijah"}),
			Tutor:    strPtr("Sarah Tan"),
			Status:   "Confirmed",
		},
		{
			ID:       "L011",
			Date:     parseTime("2025-11-25T09:10:00Z"),
			Type:     "Today",
			Subject:  "C++ Mastery Course",
			Students: marshalJSON([]string{"Allan Walker"}),
			Tutor:    strPtr("Tokio Quicker"),
			Status:   "Confirmed",
		},
	}

	return lessons
}

// 辅助函数
func parseTime(timeStr string) time.Time {
	t, err := time.Parse(models.TimeLayout, timeStr)
	if err != nil {
		// 如果解析失败，使用当前时间
		return time.Now()
	}
	return t
}

func marshalJSON(data interface{}) string {
	bytes, err := json.Marshal(data)
	if err != nil {
		return "null"
	}
	return string(bytes)
}

func strPtr(s string) *string {
	return &s
}
