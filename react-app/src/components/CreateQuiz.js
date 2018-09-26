import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class CreateQuiz extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            formData: {
                genre: "",
                quiz_num: 0,
                num_questions: 0,
            },
            setMessage: false,
            message: "Quiz already exists",
        }
        this.handleGenre = this.handleGenre.bind(this)
        this.handleQuizNumber = this.handleQuizNumber.bind(this)
        this.handleNumberQuestions = this.handleNumberQuestions.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleGenre(event) {
        this.state.formData.genre = event.target.value
    }

    handleQuizNumber(event) {
        this.state.formData.quiz_num = parseInt(event.target.value)
    }

    handleNumberQuestions(event) {
        this.state.formData.num_questions = parseInt(event.target.value)
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http:///127.0.0.1:8080/quiz/' + sessionStorage.getItem("username"), {
            method: 'POST',
            body: JSON.stringify(this.state.formData),
        })
            .then(response => {
                if (response.status == 200) {
                    this.setState({ setMessage: false })
                    sessionStorage.setItem("num_questions", this.state.formData.num_questions)
                    const link = '/CreateQuiz/' + this.state.formData.genre + '/' + this.state.formData.quiz_num
                    this.props.history.push(link)
                }
                if (response.status == 202) {
                    this.setState({ setMessage: true })
                }
            });
    }

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/quiz');
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Create a Quiz</h1>
                </header>

                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h3>Create a New Quiz</h3>
                        <div className="form-horizontal">
                            <form>
                                <div className="form-group">
                                    <label>Genre</label>
                                    <input type="text" className="form-control" value={this.state.genre} onChange={this.handleGenre} />
                                </div>
                                <div className="form-group">
                                    <label>Quiz Number</label>
                                    <input type="text" className="form-control" value={this.state.quiz_num} onChange={this.handleQuizNumber} />
                                </div>
                                
                                <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Create Quiz</button>
                            </form>
                            {this.state.setMessage &&
                                <h4>{this.state.message}</h4>
                            }
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <br></br><br></br><br></br>
                <div>
                    <h3>Existing quizzes</h3>
                    <table className="table-hover">
                        <thead>
                            <tr>
                                <th>Serial No.</th>
                                <th>Genre</th>
                                <th>Quiz Number</th>
                            </tr>
                        </thead>
                        <tbody>{this.state.data.map(function (item, key) {
                            return (
                                <tr key={key}>
                                    <td>{key += 1}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.quiz_num}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

export default CreateQuiz;