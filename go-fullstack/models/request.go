package models

type GetLessonRequestParams struct {
	Type      string `json:"type" form:"type" binding:"required"`
	StartDate string `json:"startDate,omitempty" form:"startDate"`
	EndDate   string `json:"endDate,omitempty" form:"endDate"`
}

type UserLoginData struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type UserTakeLessonRequest struct {
	Username string `form:"username" json:"username"`
	ID       string `form:"id" json:"id"`
}
