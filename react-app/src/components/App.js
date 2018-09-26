import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css'

import Home from './Home';
import Play from './Play';
import Leaderboard from './Leaderboard';
import PastQuizzes from './PastQuizzes';
import ViewQuizzes from './ViewQuizzes';
import CreateQuiz from './CreateQuiz';
import DeleteQuiz from './DeleteQuiz';
import EditQuiz from './EditQuiz';
import ViewPeople from './ViewPeople';
import DeletePerson from './DeletePerson';
import ShowQuiz from './ShowQuiz';
import ViewQuizAdmin from './ViewQuizAdmin'
import LeaderboardGenre from './LeaderboardGenre'
import CreateQuizQuestions from './CreateQuizQuestions'
import EditQuizQuestions from './EditQuizQuestions'
import EditQuestion from './EditQuestion'

class App extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        firstname: "",
        lastname: "",
        username: "",
        emailid: "",
        city: "",
        password: "",
        },
      data: [],
      message: "",
      displayMessage: false,
    }
    this.handleSignin = this.handleSignin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.handleLoginUsername = this.handleLoginUsername.bind(this)
    this.handleLoginPassword = this.handleLoginPassword.bind(this)
    this.handleFirstname = this.handleFirstname.bind(this)
    this.handleLastname = this.handleLastname.bind(this)
    this.handleUsername = this.handleUsername.bind(this)
    this.handleEmailID = this.handleEmailID.bind(this)
    this.handleCity = this.handleCity.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleMessageRemove = this.handleMessageRemove.bind(this)
  }

  handleSignin(event) {
    event.preventDefault();
    if (this.state.formData.username == "" || this.state.formData.password == "") {
      this.setState({ message: "Empty fields are not allowed"});
      this.setState({ displayMessage: true });
    }
    fetch('http://127.0.0.1:8080/signin', {
      method: 'POST',
      body: JSON.stringify(this.state.formData)
    })
      .then(response => response.json().then(data => ({ status: response.status, data: data }))
        .then(res => {
          if (res.status == 200) {
            sessionStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem("username", res.data.username);
            sessionStorage.setItem("role", res.data.role);
            window.location.reload();
          }
          if (res.status == 201) {
            this.setState({ message: "Invalid Username. Please enter a correct Username."});
            this.setState({ displayMessage: true });
          }
          if (res.status == 202) {
            this.setState({ message: "Incorrect Password. Please enter your correct password" });
            this.setState({ displayMessage: true });
          }
        }));
  }

  handleSignup(event) {
    event.preventDefault();
    if (this.state.formData.firstname == "" || this.state.formData.lastname == "" || this.state.formData.username == "" || this.state.formData.emailid == "" || this.state.formData.city == "" || this.state.formData.password == "") {
      this.setState({ message: "Empty fields are not allowed"});
      this.setState({ displayMessage: true });
    }
    else {
    fetch('http://127.0.0.1:8080/signup', {
      method: 'POST',
      body: JSON.stringify(this.state.formData)
    })
      .then(response => response.json().then(data => ({ status: response.status, data: data }))
        .then(res => {
          if (res.status == 200) {
            sessionStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem("username", res.data.username);
            sessionStorage.setItem("role", res.data.role);
            window.location.reload();
          }
          if (res.status == 201) {
            this.setState({ message: "Username already exists. Please use another"});
            this.setState({ displayMessage: true });
          }
          if (res.status == 202) {
            this.setState({ message: "Email ID already exists. Please use another"});
            this.setState({ displayMessage: true });
          }
        }));
      }
  }

  handleLoginUsername(event) {
    this.state.formData.username = event.target.value
  }

  handleLoginPassword(event) {
    this.state.formData.password = event.target.value
  }

  handleFirstname(event) {
    this.state.formData.firstname = event.target.value
  }

  handleLastname(event) {
    this.state.formData.lastname = event.target.value
  }

  handleUsername(event) {
    this.state.formData.username = event.target.value
  }

  handleEmailID(event) {
    this.state.formData.emailid = event.target.value
  }

  handleCity(event) {
    this.state.formData.city = event.target.value
  }

  handlePassword(event) {
    this.state.formData.password = event.target.value
  }

  handleLogout() {
    sessionStorage.clear();
    window.location.reload();
  }

  handleMessageRemove() {
    this.setState({ displayMessage: false })
    this.setState({ message: ""})
  }

  render() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const notLoggedIn = !isLoggedIn;
    var role = sessionStorage.getItem("role")
    if (role == 1) {
      role = true
    }
    else {
      role = false
    }
    return (
      <div>
        {isLoggedIn &&
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={'/'}>QuizNow</Link>
                  </div>
                  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                      <li><Link to={'/Play'}>Play</Link></li>
                      <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                      <li><Link to={'/PastQuizzes'}>Past Quizzes</Link></li>
                      {role &&
                        <li className="dropdown">
                          <a href="#" data-toggle="dropdown" className="dropdown-toggle">Admin Mode <b className="caret"></b></a>
                          <ul className="dropdown-menu">
                            <li><Link to={'/ViewQuizzes'}>View Quizzes</Link></li>
                            <li><Link to={'/CreateQuiz'}>Create Quiz</Link></li>
                            <li><Link to={'/DeleteQuiz'}>Delete Quiz</Link></li>
                            <li><Link to={'/EditQuiz'}>Edit Quiz</Link></li>
                            <li><Link to={'/ViewPeople'}>View People</Link></li>
                            <li><Link to={'/DeletePerson'}>Delete User</Link></li>
                          </ul>
                        </li>
                      }
                    </ul>

                    <ul className="nav navbar-nav navbar-right">
                      <li><Link to={'/'} onClick={this.handleLogout}>Logout</Link></li>
                    </ul>
                  </div>
                </div>
              </nav>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/Play' component={Play} />
                <Route exact path='/Leaderboard' component={Leaderboard} />
                <Route exact path='/Leaderboard/:genre' component={LeaderboardGenre} />
                <Route exact path='/PastQuizzes' component={PastQuizzes} />
                <Route exact path='/Play/:id' component={ShowQuiz} />
                {role && <Route exact path='/ViewQuizzes' component={ViewQuizzes} />}
                {role && <Route exact path='/ViewQuizzes/:id' component={ViewQuizAdmin} />}
                {role && <Route exact path='/CreateQuiz' component={CreateQuiz} />}
                {role && <Route exact path='/CreateQuiz/:genre/:quiz_num' component={CreateQuizQuestions} />}
                {role && <Route exact path='/DeleteQuiz' component={DeleteQuiz} />}
                {role && <Route exact path='/EditQuiz' component={EditQuiz} />}
                {role && <Route exact path='/EditQuiz/:id' component={EditQuizQuestions} />}
                {role && <Route exact path='/EditQuestion/:id' component={EditQuestion} />}
                {role && <Route exact path='/ViewPeople' component={ViewPeople} />}
                {role && <Route exact path='/DeletePerson' component={DeletePerson} />}
              </Switch>
            </div>
          </Router>
        }
        {notLoggedIn &&
          <div>
            <div className="container">
              <div className="row">
                <div className="span12">
                  <div className="" id="loginModal">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                      <h3>Have an Account?</h3>
                    </div>
                    <div className="modal-body">
                      <div className="well">
                        <ul className="nav nav-tabs">
                          <li className="active" onClick={this.handleMessageRemove}><a href="#login" data-toggle="tab">Login</a></li>
                          <li onClick={this.handleMessageRemove}><a href="#create" data-toggle="tab">Create Account</a></li>
                        </ul>
                        <div id="myTabContent" className="tab-content">
                          <div className="tab-pane active in" id="login">
                            <form className="form-horizontal" onSubmit={this.handleSignin}>
                              <fieldset>
                                <div id="legend">
                                  <legend className="">Login</legend>
                                </div>
                                <div className="form-group">
                                  <label>Username</label>
                                  <input type="text" className="form-control" value={this.state.username} onChange={this.handleLoginUsername} />
                                </div>

                                <div className="form-group">
                                  <label>Password</label>
                                  <input type="password" className="form-control" value={this.state.password} onChange={this.handleLoginPassword} />
                                </div>
                                <input type="submit" className="btn btn-primary" value="Login"></input>
                              </fieldset>
                            </form>
                          </div>

                          <div className="tab-pane fade" id="create">
                            <form id="tab" className="form-horizontal" onSubmit={this.handleSignup}>
                              <fieldset>
                                <div id="legend">
                                  <legend className="">Register</legend>
                                </div>
                                <div className="form-group">
                                  <label>First Name</label>
                                  <input type="text" className="form-control" value={this.state.firstname} onChange={this.handleFirstname}></input>
                                </div>

                                <div className="form-group">
                                  <label>Last Name</label>
                                  <input type="text" className="form-control" value={this.state.lastname} onChange={this.handleLastname}></input>
                                </div>

                                <div className="form-group">
                                  <label>Username</label>
                                  <input type="text" className="form-control" value={this.state.username} onChange={this.handleUsername}></input>
                                </div>

                                <div className="form-group">
                                  <label>Email ID</label>
                                  <input type="text" className="form-control" value={this.state.emailid} onChange={this.handleEmailID}></input>
                                </div>

                                <div className="form-group">
                                  <label>City</label>
                                  <input type="text" className="form-control" value={this.state.city} onChange={this.handleCity}></input>
                                </div>

                                <div className="form-group">
                                  <label>Password</label>
                                  <input type="password" className="form-control" value={this.state.password} onChange={this.handlePassword}></input>
                                </div>
                                <input type="submit" className="btn btn-primary" value="Create Account"></input>
                              </fieldset>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {this.state.displayMessage && 
        <div>
          <h4 className="text-center">{this.state.message}</h4>
        </div>
        }
      </div>
    );
  }
}

export default App;
