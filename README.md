# Quiz Now
An interactive Quizzing App built in ReactJS and Golang

- ##### Packages used in Go
  
    "github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/jinzhu/gorm/dialects/sqlite"
	"golang.org/x/crypto/bcrypt"

- ##### Installation
  
```bash
              go get -u -v github.com/gin-contrib/cors
              go get -u -v github.com/gin-gonic/gin
              go get -u -v github.com/jinzhu/gorm
              go get -u -v github.com/jinzhu/gorm/dialects/sqlite
              go get -u -v golang.org/x/crypto/bcrypt
```

## Featuress
* SignUp/Login for each user
* Multiple genres of quizzes possible
* SCQ and MCQ questions
* Overall leaderboard and genre-wise leaderboard
* Past attempted quizzes
* Admin privileges to atleast one user -
    * view all users
    * delete user
    * view, create and delete quizzes
    * edit a quiz-
        * create a new question
        * delete a question
        * edit a question
        * edit the options as well as the answer