import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css'

class EditQuestion extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            marked_ans: [],
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
                quiz_num: 0,
                type: "",
            },
            addNew: false,
            ans: "",
        }
        this.handleAChange = this.handleAChange.bind(this)
        this.handleBChange = this.handleBChange.bind(this)
        this.handleCChange = this.handleCChange.bind(this)
        this.handleDChange = this.handleDChange.bind(this)
        this.handleQChange = this.handleQChange.bind(this)
        this.handleTChange = this.handleTChange.bind(this)
        this.handleCheckboxSelection = this.handleCheckboxSelection.bind(this)
        this.editQuestion = this.editQuestion.bind(this)
        this.handleDone = this.handleDone.bind(this)
    }

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/question/' + this.props.match.params.id);
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
        console.log(this.state.data)
        this.state.formData.question = this.state.data.question
        this.state.formData.op1 = this.state.data.op1
        this.state.formData.op2 = this.state.data.op2
        this.state.formData.op3 = this.state.data.op3
        this.state.formData.op4 = this.state.data.op4
        this.state.formData.genre = this.state.data.genre
        this.state.formData.quiz_num = this.state.data.quiz_num
        console.log(this.state.ans);
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
        console.log(this.state.marked_ans)
    }

    editQuestion(event) {
        event.preventDefault();
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
        if (this.state.formData.ans1 == false && this.state.formData.ans2 == false && this.state.formData.ans3 == false && this.state.formData.ans4 == false) {
            this.state.formData.ans1 = this.state.data.ans1
            this.state.formData.ans2 = this.state.data.ans2
            this.state.formData.ans3 = this.state.data.ans3
            this.state.formData.ans4 = this.state.data.ans4
        }
        if (this.state.formData.type == "") this.state.formData.type = this.state.data.type;
        if (this.state.formData.op1 == "") this.state.formData.op1 = this.state.data.op1;
        if (this.state.formData.op2 == "") this.state.formData.op2 = this.state.data.op2;
        if (this.state.formData.op3 == "") this.state.formData.op3 = this.state.data.op3;
        if (this.state.formData.op4 == "") this.state.formData.op4 = this.state.data.op4;

        console.log(this.state.formData)
        fetch('http://127.0.0.1:8080/question/' + this.props.match.params.id, {
            method: 'PUT',
            body: JSON.stringify(this.state.formData),
        });
        this.setState({ addNew: true })
    }

    handleDone() {
        const link = '/EditQuiz/' + sessionStorage.getItem("quizEditingID")
        this.props.history.push(link);
    }

    render() {
        this.state.ans = "";
        if (this.state.data.ans1 == true) this.state.ans += "a "
        if (this.state.data.ans2 == true) this.state.ans += "b "
        if (this.state.data.ans3 == true) this.state.ans += "c "
        if (this.state.data.ans4 == true) this.state.ans += "d"
        console.log(this.state.ans)
        console.log(this.state.data)
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Edit Question</h1>
                </header>
                <div>
                    <h3>Original Question</h3>
                    <h4>{this.state.data.question}</h4>
                    <span className="badge badge-info">{this.state.data.type}</span>                    
                    <h5>a) {this.state.data.op1}</h5>
                    <h5>b) {this.state.data.op2}</h5>
                    <h5>c) {this.state.data.op3}</h5>
                    <h5>d) {this.state.data.op4}</h5>
                    <h5><b>Correct Answer: {this.state.ans}</b></h5><br></br><br></br>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="form-horizontal">
                            <form onSubmit={this.editQuestion}>
                                <div className="form-group">
                                    <h4>Question:</h4>
                                    <input type="text" className="form-control" value={this.state.question} onChange={this.handleQChange} />
                                </div>
                                <div className="form-group">
                                    <h4>Type:</h4>
                                    <h5>"scq" for single correct and "mcq" for multiple correct</h5>
                                    <input type="text" className="form-control" value={this.state.type} onChange={this.handleTChange} />
                                </div>
                                <h5>Options: </h5>
                                <h5>(Please check all those boxes which are correct answer)</h5>
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
                                <button type="submit" className="btn btn-default btn-lg">Edit Question</button>
                            </form>
                            <br></br><br></br>
                            {this.state.setMessage &&
                                <h4>{this.state.message}</h4>
                            }
                            {this.state.addNew &&
                                <div>
                                    <h4>Question edited successfully</h4>
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

export default EditQuestion;