package main

import (
	"fmt"
	"sort"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB
var err error

//User model
type User struct {
	ID        uint   `json:"id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	City      string `json:"city"`
	Username  string `json:"username"`
	EmailID   string `json:"emailid"`
	Points    uint   `json:"points"`
	Role      uint   `json:"role"` // 1 for admin and 0 for user
}

//Genre model
type Genre struct {
	ID          uint   `json:"id"`
	Genre_Name  string `json:"genre_name"`
	Num_Quizzes uint   `json:"num_quizzes"`
}

//Quiz model
type Quiz struct {
	ID            uint   `json:"id"`
	Genre         string `json:"genre"`
	Quiz_Num      uint   `json:"quiz_num"`
	Num_Questions uint   `json:"num_questions"`
}

//Question model
type Question struct {
	ID       uint   `json:"id"`
	Question string `json:"question"`
	Op1      string `json:"op1"`
	Op2      string `json:"op2"`
	Op3      string `json:"op3"`
	Op4      string `json:"op4"`
	Ans1     bool   `json:"ans1"`
	Ans2     bool   `json:"ans2"`
	Ans3     bool   `json:"ans3"`
	Ans4     bool   `json:"ans4"`
	Genre    string `json:"genre"`
	Quiz_Num uint   `json:"quiz_num"`
	Ques_Num uint   `json:"ques_num"`
}

//Points model
type Points struct {
	ID         uint   `json:"id"`
	Username   string `json:"username"`
	Genre      string `json:"genre"`
	Points     uint   `json:"points", gorm:"default:0"`
	Cur_Points uint   `json:"cur_points", gorm:"default:0"`
}

//History model
type History struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Genre    string `json:"genre"`
	Quiz_Num uint   `json:"quiz_num"`
	Score    uint   `json:"score"`
}

//Answer received
type Answer struct {
	Ans1 bool `json:"ans1"`
	Ans2 bool `json:"ans2"`
	Ans3 bool `json:"ans3"`
	Ans4 bool `json:"ans4"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&User{}, &Genre{}, &Quiz{}, &Question{}, &Points{}, &History{})

	// g1 := Genre{Genre_Name: "History", Num_Quizzes: 2}
	// g2 := Genre{Genre_Name: "Science", Num_Quizzes: 2}
	// db.Create(&g1)
	// db.Create(&g2)

	// u1 := User{Firstname: "Eesha", Lastname: "Dutta", Username: "ed", City: "Hyderabad", EmailID: "ed@gmail.com", Points: 0, Role: 1}
	// db.Create(&u1)
	// u2 := User{Firstname: "Indu", Lastname: "Dutta", Username: "indu", City: "Pune", EmailID: "in@gmail.com", Points: 0, Role: 0}
	// db.Create(&u2)

	// z1 := Quiz{Genre: "History", Quiz_Num: 1, Num_Questions: 5}
	// db.Create(&z1)
	// z2 := Quiz{Genre: "History", Quiz_Num: 2, Num_Questions: 5}
	// db.Create(&z2)
	// z3 := Quiz{Genre: "Science", Quiz_Num: 1, Num_Questions: 5}
	// db.Create(&z3)
	// z4 := Quiz{Genre: "Science", Quiz_Num: 2, Num_Questions: 5}
	// db.Create(&z4)

	// q1 := Question{Question: "WW1 began in which year?", Op1: "1923", Op2: "1938", Op3: "1917", Op4: "1914", Ans1: false, Ans2: false, Ans3: false, Ans4: true, Genre: "History", Quiz_Num: 1, Ques_Num: 1}
	// db.Create(&q1)
	// q2 := Question{Question: "Adolf Hitler was born in which country?", Op1: "France", Op2: "Germany", Op3: "Austria", Op4: "Hungary", Ans1: false, Ans2: true, Ans3: false, Ans4: false, Genre: "History", Quiz_Num: 1, Ques_Num: 2}
	// db.Create(&q2)
	// q3 := Question{Question: "JFK was assassinated in", Op1: "New York", Op2: "Austin", Op3: "Dallas", Op4: "Miami", Ans1: false, Ans2: false, Ans3: true, Ans4: false, Genre: "History", Quiz_Num: 1, Ques_Num: 3}
	// db.Create(&q3)
	// q4 := Question{Question: "Which of these are of Indian origin?", Op1: "Maulana Azad", Op2: "SC Bose", Op3: "Annie Besant", Op4: "Mahatma Gandhi", Ans1: true, Ans2: true, Ans3: false, Ans4: true, Genre: "History", Quiz_Num: 1, Ques_Num: 4}
	// db.Create(&q4)
	// q5 := Question{Question: "Which of these are Mughal emperors?", Op1: "Akbar", Op2: "Jengis Khan", Op3: "Shah Jahan", Op4: "Chandra Gupta Maurya", Ans1: true, Ans2: false, Ans3: true, Ans4: false, Genre: "History", Quiz_Num: 1, Ques_Num: 5}
	// db.Create(&q5)

	// q6 := Question{Question: "Babar declared himself as an emperor first at", Op1: "Samarkand", Op2: "Farghana", Op3: "Kabul", Op4: "Panipat", Ans1: false, Ans2: false, Ans3: false, Ans4: true, Genre: "History", Quiz_Num: 2, Ques_Num: 1}
	// db.Create(&q6)
	// q7 := Question{Question: "Which site of Harappan civilization is located in Haryana?", Op1: "Banawali", Op2: "Kalibanga", Op3: "Ropar", Op4: "Dhaulavira", Ans1: true, Ans2: false, Ans3: false, Ans4: false, Genre: "History", Quiz_Num: 2, Ques_Num: 2}
	// db.Create(&q7)
	// q8 := Question{Question: "Which of these were rulers of the maurya dynasty?", Op1: "ChandraGupta Maurya", Op2: "Bindusara", Op3: "Ashoka", Op4: "RudraGupta", Ans1: true, Ans2: true, Ans3: true, Ans4: false, Genre: "History", Quiz_Num: 2, Ques_Num: 3}
	// db.Create(&q8)
	// q9 := Question{Question: "Alexander the Great was from which country?", Op1: "Turkey", Op2: "Macedonia", Op3: "Greece", Op4: "Morocco", Ans1: false, Ans2: true, Ans3: false, Ans4: false, Genre: "History", Quiz_Num: 2, Ques_Num: 4}
	// db.Create(&q9)
	// q10 := Question{Question: "Who was the founder of Lodhi dynasty?", Op1: "Sikandar Lodhi", Op2: "Bahlol Lodhi", Op3: "Ibrahim Lodhi", Op4: "Daulat Khan Lodhi", Ans1: false, Ans2: true, Ans3: false, Ans4: false, Genre: "History", Quiz_Num: 2, Ques_Num: 5}
	// db.Create(&q10)

	// q11 := Question{Question: "Which of the following is not a primary contributor to the green house effect ? ", Op1: "Carbon Dioxide", Op2: "Carbon monoxide", Op3: "CFCs", Op4: "Methane", Ans1: false, Ans2: false, Ans3: true, Ans4: false, Genre: "Science", Quiz_Num: 1, Ques_Num: 1}
	// db.Create(&q11)
	// q12 := Question{Question: "The depletion in the Ozone layer is caused by", Op1: "Nitrous oxide", Op2: "Carbon Dioxide", Op3: "CFCs", Op4: "Methane", Ans1: false, Ans2: false, Ans3: true, Ans4: false, Genre: "Science", Quiz_Num: 1, Ques_Num: 2}
	// db.Create(&q12)
	// q13 := Question{Question: "Photovoltaic cell is related to?", Op1: "Geothermal energy", Op2: "Wind energy", Op3: "Nucear energy", Op4: "Solar energy", Ans1: false, Ans2: false, Ans3: false, Ans4: true, Genre: "Science", Quiz_Num: 1, Ques_Num: 3}
	// db.Create(&q13)
	// q14 := Question{Question: "Which of the following problems is created by noise pollution?", Op1: "Diarrhoea", Op2: "Hypertension", Op3: "Deafness", Op4: "Irritation", Ans1: false, Ans2: true, Ans3: true, Ans4: true, Genre: "Science", Quiz_Num: 1, Ques_Num: 4}
	// db.Create(&q14)
	// q15 := Question{Question: "Which of these conduct electricity?", Op1: "Gold", Op2: "Graphite", Op3: "Mica", Op4: "Copper", Ans1: true, Ans2: true, Ans3: false, Ans4: true, Genre: "Science", Quiz_Num: 1, Ques_Num: 5}
	// db.Create(&q15)

	// q16 := Question{Question: "The age of tree, in years, can be ascertained by", Op1: "weight", Op2: "height", Op3: "annular rings", Op4: "root", Ans1: false, Ans2: false, Ans3: true, Ans4: false, Genre: "Science", Quiz_Num: 2, Ques_Num: 1}
	// db.Create(&q16)
	// q17 := Question{Question: "Air is composed of", Op1: "gases", Op2: "water vapours", Op3: "light", Op4: "dust particles", Ans1: true, Ans2: true, Ans3: false, Ans4: true, Genre: "Science", Quiz_Num: 2, Ques_Num: 2}
	// db.Create(&q17)
	// q18 := Question{Question: "Fans, bulbs and tubes etc. in houses are fitted in", Op1: "Series", Op2: "Parallel", Op3: "Mixed", Op4: "Random", Ans1: false, Ans2: true, Ans3: false, Ans4: false, Genre: "Science", Quiz_Num: 2, Ques_Num: 3}
	// db.Create(&q18)
	// q19 := Question{Question: "The best conductor of electricity", Op1: "Gold", Op2: "Silver", Op3: "Mica", Op4: "Copper", Ans1: true, Ans2: false, Ans3: false, Ans4: false, Genre: "Science", Quiz_Num: 2, Ques_Num: 4}
	// db.Create(&q19)
	// q20 := Question{Question: "Which of the following is in liquid form at room temperature?", Op1: "Lithium", Op2: "Hydrogen", Op3: "Francium", Op4: "Gallium", Ans1: false, Ans2: false, Ans3: true, Ans4: true, Genre: "Science", Quiz_Num: 2, Ques_Num: 5}
	// db.Create(&q20)

	r := gin.Default()
	// r.GET("/people/:id", GetUser)
	// r.POST("/people", CreateUser)
	// r.PUT("/people/:id", UpdateUser)

	// only admin
	r.GET("/people/:username", GetPeople)
	r.DELETE("/people/:username/:id", DeleteUser)
	r.POST("/quiz/:username", CreateQuiz)
	r.DELETE("/quiz/:username/:genre/:quiz_num", DeleteQuiz)
	r.POST("/question/:username", CreateQuestion)
	r.DELETE("question/:username/:genre/:quiz_num/:question_num", DeleteQuestion)

	// any user
	r.GET("/genres", GetGenres)
	r.GET("/quiz/:genre", GetNumQuizzes)
	r.GET("/quiz/:genre/:quiz_num", GetQuiz)
	r.POST("/question/:username/:id", EvaluateQuestion)
	r.GET("/leaderboard", GetLeaderboard)
	r.GET("leaderboard/:genre", GetLeaderboardByGenre)

	r.Use((cors.Default()))
	r.Run(":8080")
}

//UpdateUser for admin
// func UpdateUser(c *gin.Context) {
// 	var user User
// 	id := c.Params.ByName("id")
// 	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
// 		c.AbortWithStatus(404)
// 		fmt.Println(err)
// 	}
// 	c.BindJSON(&user)
// 	db.Save(&user)
// 	c.Header("access-control-allow-origin", "*")
// 	c.JSON(200, user)
// }

//CreateUser for admin
// func CreateUser(c *gin.Context) {
// 	var user User
// 	c.BindJSON(&user)
// 	db.Create(&user)
// 	c.Header("access-control-allow-origin", "*")
// 	c.JSON(200, user)
// }

//GetUser for admin
// func GetUser(c *gin.Context) {
// 	id := c.Params.ByName("id")
// 	var user User
// 	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
// 		c.AbortWithStatus(404)
// 		fmt.Println(err)
// 	} else {
// 		c.Header("access-control-allow-origin", "*")
// 		c.JSON(200, user)
// 	}
// }

//GetPeople for admin
func GetPeople(c *gin.Context) {
	username := c.Params.ByName("username")
	var user User
	db.Where("username = ?", username).First(&user)
	if user.Role == 1 {
		var people []User
		if err := db.Find(&people).Error; err != nil {
			c.AbortWithStatus(404)
			fmt.Println(err)
		} else {
			c.Header("access-control-allow-origin", "*")
			c.JSON(200, people)
		}
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{username: "You're not an admin"})
	}
}

//DeleteUser for admin
func DeleteUser(c *gin.Context) {
	username := c.Params.ByName("username")
	var user User
	db.Where("username = ?", username).First(&user)
	if user.Role == 1 {
		id := c.Params.ByName("id")
		var user User
		d := db.Where("id = ?", id).Delete(&user)
		fmt.Println(d)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{"id #" + id: "deleted"})
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{username: "You're not an admin"})
	}
}

//CreateQuiz given genre, quiz_num, num_questions for admin
func CreateQuiz(c *gin.Context) {
	username := c.Params.ByName("username")
	var user User
	db.Where("username = ?", username).First(&user)
	if user.Role == 1 {
		var quiz Quiz
		c.BindJSON(&quiz)
		quiz.Num_Questions = 0
		db.Create(&quiz)
		var genre Genre
		if err := db.Where("genre_name = ?", quiz.Genre).First(&genre).Error; err != nil {
			// create genre
			genre.Genre_Name = quiz.Genre
			genre.Num_Quizzes = quiz.Quiz_Num
			db.Create(&genre)
		} else {
			// update genre
			genre.Num_Quizzes = quiz.Quiz_Num
			db.Save(&genre)
		}
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{username: "You're not an admin"})
	}
}

//DeleteQuiz given genre, quiz_num for admin
func DeleteQuiz(c *gin.Context) {
	username := c.Params.ByName("username")
	var user User
	db.Where("username = ?", username).First(&user)
	if user.Role == 1 {
		genre_name := c.Params.ByName("genre")
		quiz_num := c.Params.ByName("quiz_num")
		var quiz Quiz
		db.Where("genre = ?", genre_name).Where("quiz_num = ?", quiz_num).First(&quiz)
		num_questions := quiz.Num_Questions
		d := db.Where("genre = ?", genre_name).Where("quiz_num = ?", quiz_num).Delete(&quiz)

		var genre Genre
		db.Where("genre_name = ?", genre_name).First(&genre)
		genre.Num_Quizzes--
		db.Save(&genre)

		if num_questions > 0 {
			var question []Question
			db.Where("genre = ?", genre_name).Where("quiz_num = ?", quiz_num).Delete(&question)
		}

		fmt.Println(d)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{"quiz #" + quiz_num: "deleted"})
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{username: "You're not an admin"})
	}
}

// CreateQuestion for an existing quiz for admin
func CreateQuestion(c *gin.Context) {
	username := c.Params.ByName("username")
	var user User
	db.Where("username = ?", username).First(&user)
	if user.Role == 1 {
		var question Question
		c.BindJSON(&question)
		db.Create(&question)

		var quiz Quiz
		db.Where("Genre = ?", question.Genre).Where("Quiz_Num = ?", question.Quiz_Num).First(&quiz)
		quiz.Num_Questions++
		db.Save(&quiz)

		c.Header("access-control-allow-origin", "*")
		c.JSON(200, question)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{username: "You're not an admin"})
	}
}

// DeleteQuestion given genre, quiz_num, question_num for admin
func DeleteQuestion(c *gin.Context) {
	username := c.Params.ByName("username")
	var user User
	db.Where("username = ?", username).First(&user)
	if user.Role == 1 {
		genre := c.Params.ByName("genre")
		quiz_num := c.Params.ByName("quiz_num")
		ques_num := c.Params.ByName("question_num")
		var question Question
		d := db.Where("genre = ?", genre).Where("quiz_num = ?", quiz_num).Where("ques_num = ?", ques_num).Delete(&question)
		var quiz Quiz
		db.Where("genre = ?", genre).Where("quiz_num = ?", quiz_num).First(&quiz)
		quiz.Num_Questions--
		db.Save(&quiz)
		fmt.Println(d)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{"question #" + ques_num: "deleted"})
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, gin.H{username: "You're not an admin"})
	}
}

// --------------------------------------------------admin functions over-------------------------------------------------------------//

//GetGenres to retrieve all genres
func GetGenres(c *gin.Context) {
	var genre []Genre
	if err := db.Find(&genre).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, genre)
	}
}

// GetNumQuizzes using genre to get number of quizzes in each genre
func GetNumQuizzes(c *gin.Context) {
	genre := c.Params.ByName("genre")
	var quizzes Genre
	if err := db.Where("Genre_Name = ?", genre).First(&quizzes).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println(quizzes.Num_Quizzes)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quizzes)
	}
}

// GetQuiz for a quiz retirves all the questions for a quiz
func GetQuiz(c *gin.Context) {
	genre := c.Params.ByName("genre")
	quiz_num := c.Params.ByName("quiz_num")
	fmt.Println(genre)
	fmt.Println(quiz_num)
	var question []Question
	if err := db.Where("Genre = ?", genre).Where("Quiz_Num = ?", quiz_num).Find(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, question)
	}
}

// EvaluateQuestion given answer array
func EvaluateQuestion(c *gin.Context) {
	var answer Answer
	var question Question
	var quiz Quiz
	var point Points
	var user User

	id := c.Params.ByName("id")
	username := c.Params.ByName("username")
	c.BindJSON(&answer)
	db.Where("id = ?", id).First(&question)
	if err := db.Where("genre = ?", question.Genre).First(&point).Error; err != nil {
		//create user in points table
		point.Username = username
		point.Genre = question.Genre
		point.Points = 0
		point.Cur_Points = 0
		db.Create(&point)
	}
	db.Where("username = ?", username).First(&user)
	db.Where("genre = ?", question.Genre).Where("quiz_num = ?", question.Quiz_Num).First(&quiz)

	var flag uint
	flag = 0
	if answer.Ans1 != question.Ans1 {
		flag = 1
	}
	if answer.Ans2 != question.Ans2 {
		flag = 1
	}
	if answer.Ans3 != question.Ans3 {
		flag = 1
	}
	if answer.Ans4 != question.Ans4 {
		flag = 1
	}
	if question.Ques_Num == 1 {
		point.Cur_Points = 0
	}
	if flag == 0 {
		fmt.Println("Correct Answer")
		point.Points += 5
		user.Points += 5
		point.Cur_Points += 5
	} else {
		fmt.Println("Wrong Answer")
	}
	db.Save(&point)
	db.Save(&user)

	if question.Ques_Num == quiz.Num_Questions {
		var history History
		history.Username = user.Username
		history.Genre = question.Genre
		history.Quiz_Num = question.Quiz_Num
		history.Score = point.Cur_Points
		db.Create(&history)
		point.Cur_Points = 0
		db.Save(&point)
	}
}

//GetLeaderboard across all genres
func GetLeaderboard(c *gin.Context) {
	var user []User
	if err := db.Find(&user).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		sort.SliceStable(user, func(i, j int) bool {
			return user[i].Points > user[j].Points
		})
		c.JSON(200, user)
	}
}

//GetLeaderboardByGenre for a particular genre
func GetLeaderboardByGenre(c *gin.Context) {
	var user []Points
	genre := c.Params.ByName("genre")
	if err := db.Where("genre = ?", genre).Find(&user).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		sort.SliceStable(user, func(i, j int) bool {
			return user[i].Points > user[j].Points
		})
		c.JSON(200, user)
	}
}