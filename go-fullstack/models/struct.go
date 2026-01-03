package models

import (
	"time"
)

type User struct {
	ID       uint64 `gorm:"primary_key;auto_increment" json:"id"`
	UserName string `json:"username" gorm:"column:username;not null"`
	Password string `json:"password" gorm:"column:password;not null"`
}

type Lesson struct {
	ID       string    `gorm:"primaryKey;column:id" json:"id"`
	Date     time.Time `gorm:"column:date" json:"date"`
	Type     string    `gorm:"column:type" json:"type"`
	Subject  string    `gorm:"column:subject" json:"subject"`
	Students string    `gorm:"column:students" json:"students"` // 存储为JSON字符串
	Tutor    *string   `gorm:"column:tutor" json:"tutor"`
	Status   string    `gorm:"column:status" json:"status"`
}

func (Lesson) TableName() string {
	return "lessons"
}
