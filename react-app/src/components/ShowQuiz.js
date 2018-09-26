import React, { Component } from 'react';
import './App.css';

class ShowQuiz extends Component {
    constructor() {
        super();
        this.state = {
            id: null,
            data: [],
            num_questions: 0,
            marked_ans: [],
            correct_ans: [],
            points: 0,
            submitted: false,
        }
        this.displayQuestions = this.displayQuestions.bind(this);
        this.handleCheckboxSelection = this.handleCheckboxSelection.bind(this);
        this.handleQuizSubmit = this.handleQuizSubmit.bind(this);
    }

    componentDidMount() {
        this.state.id = this.props.match.params.id
        const request = new Request('http://127.0.0.1:8080/quiz/' + this.state.id);
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    displayQuestions() {
        var html = []
        var i = 0
        this.state.num_questions = this.state.data.length
        for (i = 0; i < 4 * this.state.num_questions; i++) {
            this.state.marked_ans[i] = false
        }
        var j = 0;
        for (i = 0; i < this.state.num_questions; i++) {
            this.state.correct_ans[j++] = this.state.data[i].ans1;
            this.state.correct_ans[j++] = this.state.data[i].ans2;
            this.state.correct_ans[j++] = this.state.data[i].ans3;
            this.state.correct_ans[j++] = this.state.data[i].ans4;
        }
        i = 0;
        for (var item in this.state.data) {
            html.push(<div><h4>{parseInt(item) + 1}) {this.state.data[item].question}</h4>
                <span className="badge badge-info">{this.state.data[item].type}</span>
                <div className="checkbox"><label><input type="checkbox" name={i++} onChange={this.handleCheckboxSelection} />a) {this.state.data[item].op1}</label></div>
                <div className="checkbox"><label><input type="checkbox" name={i++} onChange={this.handleCheckboxSelection} />b) {this.state.data[item].op2}</label></div>
                <div className="checkbox"><label><input type="checkbox" name={i++} onChange={this.handleCheckboxSelection} />c) {this.state.data[item].op3}</label></div>
                <div className="checkbox"><label><input type="checkbox" name={i++} onChange={this.handleCheckboxSelection} />d) {this.state.data[item].op4}</label></div><br></br>
            </div>);
        }
        return html;
    }

    handleCheckboxSelection(event) {
        this.state.marked_ans[event.target.name] = event.target.checked;
    }

    handleQuizSubmit() {
        var i = 0;
        for (i = 0; i < 4 * this.state.num_questions; i += 4) {
            var flag = 0;
            var j = 0;
            for (j = 0; j < 4; j++) {
                if (this.state.marked_ans[i + j] != this.state.correct_ans[i + j])
                    flag = 1;
            }
            if (flag == 0) {
                this.state.points += 5
            }
        }

        const request = new Request('http://127.0.0.1:8080/quizevaluate/' + sessionStorage.getItem("username") + '/' + this.state.id + '/' + this.state.points);
        fetch(request)
            .then(response => response.json())
        
        this.setState({ submitted: true })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Challenge</h1>
                </header>
                <div>{this.displayQuestions()}
                </div>
                <button type="button" className="btn btn-default" onClick={this.handleQuizSubmit}>Submit Quiz</button>

                {this.state.submitted && 
                    <div>
                        <h2>You Scored: </h2>
                        <h3>{this.state.points}</h3>
                    </div>
                }
            </div>
        );
    }
}

export default ShowQuiz;