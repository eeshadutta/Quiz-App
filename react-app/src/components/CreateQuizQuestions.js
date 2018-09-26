import React, { Component } from 'react';
import './App.css';

class CreateQuizQuestions extends Component {
    constructor() {
        super();
        this.state = {
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
            marked_ans: [],
            addNew: false,
            setMessage: false,
            message: "",
        }
        this.handleAChange = this.handleAChange.bind(this)
        this.handleBChange = this.handleBChange.bind(this)
        this.handleCChange = this.handleCChange.bind(this)
        this.handleDChange = this.handleDChange.bind(this)
        this.handleQChange = this.handleQChange.bind(this)
        this.handleTChange = this.handleTChange.bind(this)
        this.createQuestion = this.createQuestion.bind(this)
        this.addNewQuestion = this.addNewQuestion.bind(this)
        this.handleCheckboxSelection = this.handleCheckboxSelection.bind(this)
        this.handleDone = this.handleDone.bind(this)
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
        this.state.formData.genre = this.props.match.params.genre
        this.state.formData.quiz_num = parseInt(this.props.match.params.quiz_num)
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
        if (this.state.formData.question == "" || this.state.formData.op1 == "" || this.state.formData.op2 == "" || this.state.formData.op3 == "" || this.state.formData.op4 == "") {
            this.setState({ setMessage: true });
            this.setState({ message: "Empty fields not allowed." });
        }
        else {
            fetch('http://127.0.0.1:8080/question/' + sessionStorage.getItem("username"), {
                method: 'POST',
                body: JSON.stringify(this.state.formData),
            });
            this.setState({ addNew: true });
            this.setState({ setMessage: false });
        }
    }

    addNewQuestion() {
        this.setState({ addNew: false });
        window.location.reload()
    }

    handleDone() {
        const link = '/CreateQuiz'
        this.props.history.push(link)
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Create a Question</h1>
                </header>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="form-horizontal">
                            <form onSubmit={this.createQuestion}>
                                <div className="form-group">
                                    <h3>Question:</h3>
                                    <input type="text" className="form-control" value={this.state.question} onChange={this.handleQChange} />
                                </div><br></br><br></br>
                                <div className="form-group">
                                    <h3>Type:</h3><h5>"scq" for single correct and "mcq" for multiple correct</h5>
                                    <input type="text" className="form-control" value={this.state.type} onChange={this.handleTChange} />
                                </div><br></br><br></br>
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
                            {this.state.addNew &&
                                <div>
                                    <h4>Question added successfully</h4>
                                    <button type="button" onClick={this.addNewQuestion} className="btn btn-default">Add Another Question</button><br></br><br></br>
                                </div>
                            }
                            <button type="button" className="btn btn-default btn-lg btn-block" onClick={this.handleDone}>Done</button>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        );
    }
}

export default CreateQuizQuestions;