import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

class EditQuizQuestions extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            quiz: [],
            genre: "",
            quiz_num: "",
            createQues: false,
            marked_ans: [],
            message: null,
            setMessage: false,
            formData: {
                question: "",
                op1: "",
                op2: "",
                op3: "",
                op4: "",
                ans1: false,
                ans2: false,
                ans3: false,
                ans4: false,
                genre: "",
                quiz_num: "",
                type: "",
            },
        }
        this.displayQuestions = this.displayQuestions.bind(this);
        this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
        this.createQuestionSubmit = this.createQuestionSubmit.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
        this.handleAChange = this.handleAChange.bind(this)
        this.handleBChange = this.handleBChange.bind(this)
        this.handleCChange = this.handleCChange.bind(this)
        this.handleDChange = this.handleDChange.bind(this)
        this.handleQChange = this.handleQChange.bind(this)
        this.handleTChange = this.handleTChange.bind(this)
        this.handleCheckboxSelection = this.handleCheckboxSelection.bind(this)
        this.handleEditQuestion = this.handleEditQuestion.bind(this);
    }

    componentDidMount() {
        sessionStorage.setItem("quizEditingID", this.props.match.params.id);
        const request = new Request('http://127.0.0.1:8080/quiz/' + this.props.match.params.id);
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));

        const req = new Request('http://127.0.0.1:8080/quizdetails/' + this.props.match.params.id);
        fetch(req)
        .then(response => response.json())
        .then(data => this.setState({ quiz: data }));
    }

    handleDeleteQuestion(event) {
        event.preventDefault();
        fetch('http://127.0.0.1:8080/question/' + sessionStorage.getItem("username") + '/' + event.target.value, {
            method: 'DELETE',
        })
        window.location.reload();
    }

    handleEditQuestion(event) {
        const link = '/EditQuestion/' + event.target.value;
        this.props.history.push(link)
    }

    createQuestionSubmit() {
        this.setState({ createQues: true });
    }

    handleAChange(event) {
        this.state.formData.op1 = event.target.value
    }

    handleBChange(event) {
        this.state.formData.op2 = event.target.value
    }

    handleCChange(event) {
        this.state.formData.op3 = event.target.value
    }

    handleDChange(event) {
        this.state.formData.op4 = event.target.value
    }

    handleQChange(event) {
        this.state.formData.question = event.target.value
    }

    handleTChange(event) {
        this.state.formData.type = event.target.value
    }

    handleCheckboxSelection(event) {
        this.state.marked_ans[parseInt(event.target.name)] = event.target.checked;
    }

    createQuestion(event) {
        event.preventDefault();
        this.state.formData.genre = this.state.quiz.genre
        this.state.formData.quiz_num = this.state.quiz.quiz_num
        var i = 1;
        if (this.state.marked_ans[1] == true) {
            this.state.formData.ans1 = true
        }
        if (this.state.marked_ans[2] == true) {
            this.state.formData.ans2 = true
        }
        if (this.state.marked_ans[3] == true) {
            this.state.formData.ans3 = true
        }
        if (this.state.marked_ans[4] == true) {
            this.state.formData.ans4 = true
        }
        if (this.state.formData.question == "" || this.state.formData.op1 == "" || this.state.formData.op2 == "" || this.state.formData.op3 == "" || this.state.formData.op4 == "" || this.state.formData.type == "") {
            this.setState({ setMessage: true });
            this.setState({ message: "Empty fields not allowed." });
        }
        else {
            fetch('http://127.0.0.1:8080/question/' + sessionStorage.getItem("username"), {
                method: 'POST',
                body: JSON.stringify(this.state.formData),
            });
            this.setState({ setMessage: false });
            window.location.reload();
        }
    }

    displayQuestions() {
        var html = [];
        var ans = "";
        for (var item in this.state.data) {
            this.state.genre = this.state.data[item].genre;
            this.state.quiz_num = this.state.data[item].quiz_num;
            if (this.state.data[item].ans1 == true)
                ans += "a "
            if (this.state.data[item].ans2 == true)
                ans += "b "
            if (this.state.data[item].ans3 == true)
                ans += "c "
            if (this.state.data[item].ans4 == true)
                ans += "d"
            html.push(<div><h4>{this.state.data[item].question}</h4>
                <span className="badge badge-info">{this.state.data[item].type}</span>                    
                <h5>a) {this.state.data[item].op1}</h5>
                <h5>b) {this.state.data[item].op2}</h5>
                <h5>c) {this.state.data[item].op3}</h5>
                <h5>d) {this.state.data[item].op4}</h5>
                <h6><b>Correct Answer: {ans}</b></h6>
                <button type="button" value={this.state.data[item].id} onClick={this.handleDeleteQuestion}>Delete</button>
                <button type="button" value={this.state.data[item].id} onClick={this.handleEditQuestion}>Edit</button>
                <br></br>
            </div>);
            ans = "";
        }
        return html;
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Edit Quiz</h1>
                </header>
                <div>{this.displayQuestions()}</div>
                <br></br><br></br>
                <button type="button" className="btn btn-default btn-lg" onClick={this.createQuestionSubmit}>Create Question</button><br></br>

                {this.state.createQues &&
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <form onSubmit={this.createQuestion}>
                                    <div className="form-group">
                                        <h3>Question:</h3>
                                        <input type="text" className="form-control" value={this.state.question} onChange={this.handleQChange} />
                                    </div><br></br>
                                    <div className="form-group">
                                        <h3>Type:</h3>
                                        <h5>"scq" for single correct and "mcq" for multiple correct</h5>
                                        <input type="text" className="form-control" value={this.state.type} onChange={this.handleTChange} />
                                    </div><br></br>
                                    <h4>Options: </h4>
                                    <div className="form-group">
                                        <div className="row">
                                            <input type="checkbox" className="custom-control custom-checkbox custom-control-input" name="1" onChange={this.handleCheckboxSelection}></input>
                                            <input type="text" className="form-control-inline" value={this.state.op1} onChange={this.handleAChange} />
                                        </div>
                                    </div><br></br>
                                    <div className="form-group">
                                        <div className="row">
                                            <input type="checkbox" className="custom-control custom-checkbox custom-control-input" name="2" onChange={this.handleCheckboxSelection}></input>
                                            <input type="text" className="form-control-inline" value={this.state.op2} onChange={this.handleBChange} />
                                        </div>
                                    </div><br></br>
                                    <div className="form-group">
                                        <div className="row">
                                            <input type="checkbox" className="custom-control custom-checkbox custom-control-input" name="3" onChange={this.handleCheckboxSelection}></input>
                                            <input type="text" className="form-control-inline" value={this.state.op3} onChange={this.handleCChange} />
                                        </div>
                                    </div><br></br>
                                    <div className="form-group">
                                        <div className="row">
                                            <input type="checkbox" className="custom-control custom-checkbox custom-control-input" name="4" onChange={this.handleCheckboxSelection}></input>
                                            <input type="text" className="form-control-inline" value={this.state.op4} onChange={this.handleDChange} />
                                        </div>
                                    </div><br></br><br></br>
                                    <button type="submit" className="btn btn-default btn-lg">Create Question</button>
                                </form>
                                <br></br><br></br>
                                {this.state.setMessage &&
                                    <h4>{this.state.message}</h4>
                                }
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                }
            </div>
        );
    }
}

export default EditQuizQuestions;