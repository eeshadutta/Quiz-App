import React, { Component } from 'react';
import './App.css'

class Play extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            selectedOption: null,
            selectedA: null,
            selectedB: null,
            selectedC: null,
            selectedD: null,
            selectedQuestion: null,
            submitted: false,
            correct: false,
            points: 0,
            message: "",
            formData: {
                ans1: false,
                ans2: false,
                ans3: false,
                ans4: false,
            }
        }
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleQuizSelection = this.handleQuizSelection.bind(this);
        this.handleAChange = this.handleAChange.bind(this);
        this.handleBChange = this.handleBChange.bind(this);
        this.handleCChange = this.handleCChange.bind(this);
        this.handleDChange = this.handleDChange.bind(this);
        this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
        this.handleQuizSubmit = this.handleQuizSelection.bind(this);
    }

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/quiz');
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    handleOptionChange(event) {
        this.setState({ selectedOption: event.target.value });
    }

    handleAChange(event) {
        this.state.formData.ans1 = true;
        this.setState({ selectedA: event.target.value })
        this.setState({ selectedQuestion: event.target.value })
    }

    handleBChange(event) {
        this.state.formData.ans2 = true;
        this.setState({ selectedB: event.target.value })
        this.setState({ selectedQuestion: event.target.value })
    }

    handleCChange(event) {
        this.state.formData.ans3 = true;
        this.setState({ selectedC: event.target.value })
        this.setState({ selectedQuestion: event.target.value })
    }

    handleDChange(event) {
        this.state.formData.ans4 = true;
        this.setState({ selectedD: event.target.value })
        this.setState({ selectedQuestion: event.target.value })
    }

    handleQuizSelection(event) {
        event.preventDefault();
        const request = new Request('http://127.0.0.1:8080/quiz/' + this.state.selectedOption);
        fetch(request)
            .then(response => response.json().then(data => ({ status: response.status, data: data }))
                .then(res => {
                    if (res.status == 200) {
                        this.setState({ submitted: true });
                        this.setState({ selectedOption: null });
                        sessionStorage.setItem("displayQuiz", true)
                        sessionStorage.setItem("questions", JSON.stringify(res.data));
                        window.location.reload();
                    }
                    //this.setState({ selectedOption: null });
                }));
    }

    handleQuestionSubmit(event) {
        event.preventDefault();
        fetch('http://127.0.0.1:8080/question/' + sessionStorage.getItem("username") + '/' + this.state.selectedQuestion, {
            method: 'POST',
            body: JSON.stringify(this.state.formData),
        })
            .then(response => {
                if (response.status == 200)
                    this.setState({ correct: true });
                if (response.status == 201)
                    this.setState({ correct: false });
                this.setState({ selectedA: null });
                this.setState({ selectedB: null });
                this.setState({ selectedC: null });
                this.setState({ selectedD: null });
                this.state.formData.ans1 = false;
                this.state.formData.ans2 = false;
                this.state.formData.ans3 = false;
                this.state.formData.ans4 = false;
                if (this.state.correct) {
                    this.state.message = "Correct reply"
                    sessionStorage.setItem("points", sessionStorage.getItem("points") + 5)
                }
                else {
                    this.state.message = "Wrong reply"
                }
            })
    }

    handleQuizSubmit(event) {
        event.preventDefault();
        const request = new Request('http://127.0.0.1:8080/points/' + sessionStorage.getItem("username"));
        fetch(request)
            .then(response => response.json().then(data => ({ status: response.status, data: data }))
                .then(res => {
                    if (res.status == 200) {
                        sessionStorage.setItem("points", res.data.cur_points);
                        sessionStorage.setItem("displayPoints", true);
                    }
                    this.setState({ selectedOption: null });
                    this.setState({ selectedA: null });
                    this.setState({ selectedB: null });
                    this.setState({ selectedC: null });
                    this.setState({ selectedD: null });
                    this.state.formData.ans1 = false;
                    this.state.formData.ans2 = false;
                    this.state.formData.ans3 = false;
                    this.state.formData.ans4 = false;
                    sessionStorage.setItem("displayQuiz", false);
                    //window.location.reload();
                }));
    }

    render() {
        const displayQuiz = sessionStorage.getItem("displayQuiz");
        const displayPoints = sessionStorage.getItem("displayPoints");
        return (
            <div className="App">
                {!displayQuiz && !displayPoints &&
                    <div>
                        <header className="App-header">
                            <h1 className="App-title">Quiz Topics</h1>
                        </header>

                        <form onSubmit={this.handleQuizSelection}>
                            <table className="table-hover">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Genre</th>
                                        <th>Quiz Number</th>
                                    </tr>
                                </thead>
                                <tbody>{this.state.data.map(function (item, key) {
                                    return (
                                        <tr key={key}>
                                            <td><input type="radio" value={item.id} checked={this.state.selectedOption == item.id} onChange={this.handleOptionChange}></input></td>
                                            <td>{item.genre}</td>
                                            <td>{item.quiz_num}</td>
                                        </tr>
                                    )
                                }, this)}
                                </tbody>
                            </table>
                            <input type="submit" value="Start Quiz" className="btn btn-default"></input>
                        </form>
                    </div>
                }

                {displayQuiz && !displayPoints &&
                    <div>
                        <div>
                            <header className="App-header">
                                <h1 className="App-title">Challenge</h1>
                            </header>
                        </div>
                        <h1>Points: {this.state.points}</h1>
                        <div>{JSON.parse(sessionStorage.getItem("questions")).map(function (item, key) {
                            return (
                                <form onSubmit={this.handleQuestionSubmit}>
                                    <div key={key}>
                                        <h4>{item.question}</h4>
                                        <div className="radio"><label><input type="radio" value={item.id} checked={this.state.selectedA == item.id} onChange={this.handleAChange}></input>a) {item.op1}</label></div>
                                        <div className="radio"><label><input type="radio" value={item.id} checked={this.state.selectedB == item.id} onChange={this.handleBChange}></input>b) {item.op2}</label></div>
                                        <div className="radio"><label><input type="radio" value={item.id} checked={this.state.selectedC == item.id} onChange={this.handleCChange}></input>c) {item.op3}</label></div>
                                        <div className="radio"><label><input type="radio" value={item.id} checked={this.state.selectedD == item.id} onChange={this.handleDChange}></input>d) {item.op4}</label></div>
                                    </div>
                                    <input type="submit" value="Submit Question" className="btn btn-default"></input>
                                </form>
                            )
                        }, this)}
                        <button type="button"className="btn btn-block btn-primary" onClick={this.handleQuizSubmit}>Submit Quiz</button>
                            {/* <div className="formContainer">
                                <form onSubmit={this.handleQuizSubmit}>
                                    <input type="submit" value="Submit Quiz" className="btn btn-default"></input>
                                </form>
                            </div> */}
                        </div>
                        {/* <div className="formContainer">
                            <form onSubmit={this.handleQuizSubmit}>
                                <input type="submit" value="Submit Quiz" className="btn btn-default"></input>
                            </form>
                        </div> */}
                    </div>
                }

                {displayPoints && !displayQuiz &&
                    <div>
                        <h1>{sessionStorage.getItem("points")}</h1>
                    </div>
                }
            </div>
        );
    }
}

export default Play;