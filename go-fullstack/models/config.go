package models

const (
	DBPath = "db.sqlite"
)

var DefaultUser = User{
	UserName: "admin",
	Password: "admin",
}

const TimeLayout = "2006-01-02T15:04:05Z"
