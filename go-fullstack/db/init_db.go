package db

import (
	"errors"
	"fmt"
	"log"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"try.com/m/models"
)

var DB *gorm.DB

func InitDB() error {
	db, err := gorm.Open(sqlite.Open(models.DBPath), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		return fmt.Errorf("InitDB err: %v", err)
	}
	DB = db
	if err = db.AutoMigrate(&models.User{}, &models.Lesson{}); err != nil {
		return fmt.Errorf("InitDB err: %v", err)
	}
	if err = insertInitialData(db); err != nil {
		return fmt.Errorf("InitDB err: %v", err)
	}
	return nil
}

func insertUser(db *gorm.DB) error {
	// 检查用户是否已存在
	var count int64
	if err := db.Model(&models.User{}).Where("username = ?", models.DefaultUser.UserName).Count(&count).Error; err != nil {
		return err
	}

	if count == 0 {
		user := models.User{
			UserName: models.DefaultUser.UserName,
			Password: models.DefaultUser.Password,
		}
		if err := db.Create(&user).Error; err != nil {
			return fmt.Errorf("创建用户失败: %w", err)
		}
		log.Printf("用户 '%s' 已创建", user.UserName)
	}

	return nil
}

func insertInitialData(db *gorm.DB) error {
	// 使用事务
	return db.Transaction(func(tx *gorm.DB) error {
		// 1. 插入用户数据
		if err := insertUser(tx); err != nil {
			return err
		}

		// 2. 插入课程数据
		if err := insertLessons(tx); err != nil {
			return err
		}

		return nil
	})
}

func insertLessons(db *gorm.DB) error {
	lessons := getMockedLessons()

	for _, lesson := range lessons {
		// 检查课程是否已存在
		var existing models.Lesson
		if err := db.Where("id = ?", lesson.ID).First(&existing).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				// 课程不存在，创建新记录
				if err := db.Create(&lesson).Error; err != nil {
					return fmt.Errorf("创建课程 %s 失败: %w", lesson.ID, err)
				}
			} else {
				return err
			}
		}
	}

	log.Printf("成功处理 %d 条课程数据", len(lessons))
	return nil
}
