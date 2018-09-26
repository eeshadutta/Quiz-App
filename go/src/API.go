package main

import (
	"fmt"
	"sort"
	"strconv"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"golang.org/x/crypto/bcrypt"
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
	Emailid   string `json:"emailid"`
	Password  string `json:"password"`
	Points    uint64 `json:"points"`
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
	Type     string `json:"type"`
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
}

//Points model
type Points struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Genre    string `json:"genre"`
	Points   uint64 `json:"points", gorm:"default:0"`
}

//History model
type History struct {
	ID        uint   `json:"id"`
	Username  string `json:"username"`
	Genre     string `json:"genre"`
	Quiz_Num  uint   `json:"quiz_num"`
	Score     uint64 `json:"score"`
	Timestamp string `json:"timestamp"`
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
		panic(err)
	}
	defer db.Close()

	db.AutoMigrate(&User{}, &Genre{}, &Quiz{}, &Question{}, &Points{}, &History{})

	// g1 := Genre{Genre_Name: "History", Num_Quizzes: 2}
	// g2 := Genre{Genre_Name: "Science", Num_Quizzes: 2}
	// db.Create(&g1)
	// db.Create(&g2)

	// z1 := Quiz{Genre: "History", Quiz_Num: 1, Num_Questions: 5}
	// db.Create(&z1)
	// z2 := Quiz{Genre: "History", Quiz_Num: 2, Num_Questions: 5}
	// db.Create(&z2)
	// z3 := Quiz{Genre: "Science", Quiz_Num: 1, Num_Questions: 5}
	// db.Create(&z3)
	// z4 := Quiz{Genre: "Science", Quiz_Num: 2, Num_Questions: 5}
	// db.Create(&z4)

	// q1 := Question{Question: "WW1 began in which year?", Type: "scq", Op1: "1923", Op2: "1938", Op3: "1917", Op4: "1914", Ans1: false, Ans2: false, Ans3: false, Ans4: true, Genre: "History", Quiz_Num: 1}
	// db.Create(&q1)
	// q2 := Question{Question: "Adolf Hitler was born in which country?", Type: "scq", Op1: "France", Op2: "Germany", Op3: "Austria", Op4: "Hungary", Ans1: false, Ans2: true, Ans3: false, Ans4: false, Genre: "History", Quiz_Num: 1}
	// db.Create(&q2)
	// q3 := Question{Question: "JFK was assassinated in", Type: "scq", Op1: "New York", Op2: "Austin", Op3: "Dallas", Op4: "Miami", Ans1: false, Ans2: false, Ans3: true, Ans4: false, Genre: "History", Quiz_Num: 1}
	// db.Create(&q3)
	// q4 := Question{Question: "Which of these are of Indian origin?", Type: "mcq", Op1: "Maulana Azad", Op2: "SC Bose", Op3: "Annie Besant", Op4: "Mahatma Gandhi", Ans1: true, Ans2: true, Ans3: false, Ans4: true, Genre: "History", Quiz_Num: 1}
	// db.Create(&q4)
	// q5 := Question{Question: "Which of these are Mughal emperors?", Type: "mcq", Op1: "Akbar", Op2: "Jengis Khan", Op3: "Shah Jahan", Op4: "Chandra Gupta Maurya", Ans1: true, Ans2: false, Ans3: true, Ans4: false, Genre: "History", Quiz_Num: 1}
	// db.Create(&q5)

	// q6 := Question{Question: "Babar declared himself as an emperor first at", Type: "scq", Op1: "Samarkand", Op2: "Farghana", Op3: "Kabul", Op4: "Panipat", Ans1: false, Ans2: false, Ans3: false, Ans4: true, Genre: "History", Quiz_Num: 2}
	// db.Create(&q6)
	// q7 := Question{Question: "Which site of Harappan civilization is located in Haryana?", Type: "scq", Op1: "Banawali", Op2: "Kalibanga", Op3: "Ropar", Op4: "Dhaulavira", Ans1: true, Ans2: false, Ans3: false, Ans4: false, Genre: "History", Quiz_Num: 2}
	// db.Create(&q7)
	// q8 := Question{Question: "Which of these were rulers of the maurya dynasty?", Type: "mcq", Op1: "ChandraGupta Maurya", Op2: "Bindusara", Op3: "Ashoka", Op4: "RudraGupta", Ans1: true, Ans2: true, Ans3: true, Ans4: false, Genre: "History", Quiz_Num: 2}
	// db.Create(&q8)
	// q9 := Question{Question: "Alexander the Great was from which country?", Type: "scq", Op1: "Turkey", Op2: "Macedonia", Op3: "Greece", Op4: "Morocco", Ans1: false, Ans2: true, Ans3: false, Ans4: false, Genre: "History", Quiz_Num: 2}
	// db.Create(&q9)
	// q10 := Question{Question: "Who was the founder of Lodhi dynasty?", Type: "scq", Op1: "Sikandar Lodhi", Op2: "Bahlol Lodhi", Op3: "Ibrahim Lodhi", Op4: "Daulat Khan Lodhi", Ans1: false, Ans2: true, Ans3: false, Ans4: false, Genre: "History", Quiz_Num: 2}
	// db.Create(&q10)

	// q11 := Question{Question: "Which of the following is not a primary contributor to the green house effect ? ", Type: "scq", Op1: "Carbon Dioxide", Op2: "Carbon monoxide", Op3: "CFCs", Op4: "Methane", Ans1: false, Ans2: false, Ans3: true, Ans4: false, Genre: "Science", Quiz_Num: 1}
	// db.Create(&q11)
	// q12 := Question{Question: "The depletion in the Ozone layer is caused by", Type: "scq", Op1: "Nitrous oxide", Op2: "Carbon Dioxide", Op3: "CFCs", Op4: "Methane", Ans1: false, Ans2: false, Ans3: true, Ans4: false, Genre: "Science", Quiz_Num: 1}
	// db.Create(&q12)
	// q13 := Question{Question: "Photovoltaic cell is related to?", Type: "scq", Op1: "Geothermal energy", Op2: "Wind energy", Op3: "Nucear energy", Op4: "Solar energy", Ans1: false, Ans2: false, Ans3: false, Ans4: true, Genre: "Science", Quiz_Num: 1}
	// db.Create(&q13)
	// q14 := Question{Question: "Which of the following problems is created by noise pollution?", Type: "mcq", Op1: "Diarrhoea", Op2: "Hypertension", Op3: "Deafness", Op4: "Irritation", Ans1: false, Ans2: true, Ans3: true, Ans4: true, Genre: "Science", Quiz_Num: 1}
	// db.Create(&q14)
	// q15 := Question{Question: "Which of these conduct electricity?", Type: "mcq", Op1: "Gold", Op2: "Graphite", Op3: "Mica", Op4: "Copper", Ans1: true, Ans2: true, Ans3: false, Ans4: true, Genre: "Science", Quiz_Num: 1}
	// db.Create(&q15)

	// q16 := Question{Question: "The age of tree, in years, can be ascertained by", Type: "scq", Op1: "weight", Op2: "height", Op3: "annular rings", Op4: "root", Ans1: false, Ans2: false, Ans3: true, Ans4: false, Genre: "Science", Quiz_Num: 2}
	// db.Create(&q16)
	// q17 := Question{Question: "Air is composed of", Type: "mcq", Op1: "gases", Op2: "water vapours", Op3: "light", Op4: "dust particles", Ans1: true, Ans2: true, Ans3: false, Ans4: true, Genre: "Science", Quiz_Num: 2}
	// db.Create(&q17)
	// q18 := Question{Question: "Fans, bulbs and tubes etc. in houses are fitted in", Type: "scq", Op1: "Series", Op2: "Parallel", Op3: "Mixed", Op4: "Random", Ans1: false, Ans2: true, Ans3: false, Ans4: false, Genre: "Science", Quiz_Num: 2}
	// db.Create(&q18)
	// q19 := Question{Question: "The best conductor of electricity", Type: "scq", Op1: "Gold", Op2: "Silver", Op3: "Mica", Op4: "Copper", Ans1: true, Ans2: false, Ans3: false, Ans4: false, Genre: "Science", Quiz_Num: 2}
	// db.Create(&q19)
	// q20 := Question{Question: "Which of the following is in liquid form at room temperature?", Type: "mcq", Op1: "Lithium", Op2: "Hydrogen", Op3: "Francium", Op4: "Gallium", Ans1: false, Ans2: false, Ans3: true, Ans4: true, Genre: "Science", Quiz_Num: 2}
	// db.Create(&q20)

	r := gin.Default()
	r.POST("/signup", Signup)
	r.POST("/signin", Signin)
	r.GET("/points/:username", GetUserPoints)

	// only admin
	r.GET("/people/:username", GetPeople)
	r.DELETE("/people/:username/:id", DeleteUser)
	r.POST("/quiz/:username", CreateQuiz)
	r.DELETE("/quiz/:username/:id", DeleteQuiz)
	r.POST("/question/:username", CreateQuestion)
	r.DELETE("/question/:username/:id", DeleteQuestion)
	r.PUT("/question/:id", UpdateQuestion)
	r.GET("/question/:id", GetQuestion)

	// any user
	r.GET("/quizdetails/:id", GetQuizDetails)
	r.GET("/quiz", GetAllQuiz)
	r.GET("/genres", GetGenres)
	r.GET("/quizzes/:genre", GetNumQuizzes)
	r.GET("/quiz/:id", GetQuiz)
	r.GET("/leaderboard", GetLeaderboard)
	r.GET("/leaderboard/:genre", GetLeaderboardByGenre)
	r.GET("/history/:username", GetHistory)
	r.GET("/quizevaluate/:username/:id/:points", EvaluateQuiz)

	r.Use((cors.Default()))
	r.Run(":8080")
}

//Signup user
func Signup(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	var existinguser User
	if err := db.Where("username = ?", user.Username).First(&existinguser).Error; err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(201, gin.H{user.Username: "already exists. Try another"})
	} else if err := db.Where("emailid = ?", user.Emailid).First(&existinguser).Error; err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(202, gin.H{user.Emailid: "already exists. Try another"})
	} else {
		user.Points = 0
		user.Role = 0
		hashedPwd, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
		user.Password = string(hashedPwd)
		db.Create(&user)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, user)
	}
}

//Signin user
func Signin(c *gin.Context) {
	var user User
	var existinguser User
	c.BindJSON(&user)
	if err := db.Where("username = ?", user.Username).First(&existinguser).Error; err != nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(201, gin.H{user.Username: "does not exist"})
	} else {
		if err = bcrypt.CompareHashAndPassword([]byte(existinguser.Password), []byte(user.Password)); err != nil {
			c.Header("access-control-allow-origin", "*")
			c.JSON(202, gin.H{user.Username: "incorrect password"})
		} else {
			c.Header("access-control-allow-origin", "*")
			c.JSON(200, existinguser)
		}
	}
}

//GetUserPoints for any user
func GetUserPoints(c *gin.Context) {
	username := c.Params.ByName("username")
	var user Points
	if err := db.Where("username = ?", username).First(&user).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, user)
	}
}

// -----------------------------------------------------admin functions--------------------------------------------------------------//

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
		c.JSON(201, gin.H{username: "You're not an admin"})
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
		c.JSON(201, gin.H{username: "You're not an admin"})
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
		var existingquiz Quiz
		if e := db.Where("genre = ?", quiz.Genre).Where("quiz_num = ?", quiz.Quiz_Num).First(&existingquiz).Error; e == nil {
			c.Header("access-control-allow-origin", "*")
			c.JSON(202, existingquiz)
		} else {
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
		}
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(201, gin.H{username: "You're not an admin"})
	}
}

//DeleteQuiz given genre, quiz_num for admin
func DeleteQuiz(c *gin.Context) {
	username := c.Params.ByName("username")
	var user User
	db.Where("username = ?", username).First(&user)
	if user.Role == 1 {
		id := c.Params.ByName("id")
		var quiz Quiz
		db.Where("id = ?", id).First(&quiz)
		genre_name := quiz.Genre
		quiz_num := quiz.Quiz_Num
		num_questions := quiz.Num_Questions
		d := db.Where("genre = ?", genre_name).Where("quiz_num = ?", quiz_num).Delete(&quiz)

		var genre Genre
		db.Where("genre_name = ?", genre_name).First(&genre)
		if genre.Num_Quizzes > 0 {
			genre.Num_Quizzes--
		}
		db.Save(&genre)

		if num_questions > 0 {
			var question []Question
			db.Where("genre = ?", genre_name).Where("quiz_num = ?", quiz_num).Delete(&question)
		}

		fmt.Println(d)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(201, gin.H{username: "You're not an admin"})
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
		c.JSON(201, gin.H{username: "You're not an admin"})
	}
}

// DeleteQuestion given genre, quiz_num, question_num for admin
func DeleteQuestion(c *gin.Context) {
	username := c.Params.ByName("username")
	var user User
	db.Where("username = ?", username).First(&user)
	if user.Role == 1 {
		id := c.Params.ByName("id")
		var question Question
		var q Question
		db.Where("id = ?", id).First(&q)
		d := db.Where("id = ?", id).Delete(&question)
		genre := q.Genre
		quiz_num := q.Quiz_Num
		var quiz Quiz
		db.Where("genre = ?", genre).Where("quiz_num = ?", quiz_num).First(&quiz)
		quiz.Num_Questions--
		db.Save(&quiz)
		fmt.Println(d)
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, q)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(201, gin.H{username: "You're not an admin"})
	}
}

//GetQuestion for viewing
func GetQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	var question Question
	db.Where("id = ?", id).First(&question)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, question)
}

//UpdateQuestion while editing
func UpdateQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	var question Question
	if err := db.Where("id = ?", id).First(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&question)
	db.Save(&question)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, question)
}

// --------------------------------------------------admin functions over-------------------------------------------------------------//

//GetQuizDetails for a quiz
func GetQuizDetails(c *gin.Context) {
	id := c.Params.ByName("id")
	var quiz Quiz
	db.Where("id = ?", id).First(&quiz)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, quiz)
}

//GetAllQuiz to get all the quizes
func GetAllQuiz(c *gin.Context) {
	var quiz []Quiz
	if err := db.Find(&quiz).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quiz)
	}
}

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
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quizzes)
	}
}

// GetQuiz for a quiz retirves all the questions for a quiz
func GetQuiz(c *gin.Context) {
	id := c.Params.ByName("id")
	var quiz Quiz
	db.Where("id = ?", id).First(&quiz)
	genre := quiz.Genre
	quiz_num := quiz.Quiz_Num
	var question []Question
	if err := db.Where("genre = ?", genre).Where("quiz_num = ?", quiz_num).Find(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, question)
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

// GetHistory function
func GetHistory(c *gin.Context) {
	var points []History
	username := c.Params.ByName("username")
	if err := db.Where("username = ?", username).Find(&points).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		sort.SliceStable(points, func(i, j int) bool {
			return points[i].Timestamp > points[j].Timestamp
		})
		c.JSON(200, points)
	}
}

// EvaluateQuiz function
func EvaluateQuiz(c *gin.Context) {
	// update total user points, points table, history
	id := c.Params.ByName("id") //quiz id
	username := c.Params.ByName("username")
	p := c.Params.ByName("points")
	points, _ := strconv.ParseUint(p, 10, 64)
	currentTime := time.Now()
	var user User
	var quiz Quiz
	var history History
	var point Points

	db.Where("username = ?", username).First(&user)
	db.Where("id = ?", id).First(&quiz)

	user.Points += points
	db.Save(&user)

	history.Username = user.Username
	history.Genre = quiz.Genre
	history.Quiz_Num = quiz.Quiz_Num
	history.Score = points
	history.Timestamp = currentTime.Format("2006-01-02 15:04:05")
	db.Save(&history)

	if err := db.Where("genre = ?", quiz.Genre).First(&point).Error; err != nil {
		//create user in points table
		point.Username = user.Username
		point.Genre = quiz.Genre
		point.Points = points
		db.Create(&point)
	} else {
		point.Points += points
		db.Save(&point)
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, point)
}
