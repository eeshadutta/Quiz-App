import React, { Component } from 'react';
import './App.css';

class EditQuiz extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            selectedOption: null,
            submitted: false,
            quizSelection: false,
            selectedQuestion: null,
        }
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleQuizSelection = this.handleQuizSelection.bind(this);
        this.handleEditQuestion = this.handleEditQuestion.bind(this);
        // this.handleOptionForEditQuestion = this.handleOptionForEditQuestion.bind(this);
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

    handleQuizSelection(event) {
        event.preventDefault();
        const request = new Request('http://127.0.0.1:8080/quiz/' + this.state.selectedOption);
        fetch(request)
            .then(response => response.json().then(data => ({ status: response.status, data: data }))
                .then(res => {
                    if (res.status == 200) {
                        this.setState({ quizSelection: true });
                        this.setState({ selectedOption: null });
                        sessionStorage.setItem("displayQuizEditing", true);
                        sessionStorage.setItem("questionsEditing", JSON.stringify(res.data));
                        window.location.reload();
                    }
                    this.setState({ selectedOption: null });
                }));
    }

    handleEditQuestion(event) {
        event.preventDefault();
        console.log(event.target.value);
        this.state.selectedQuestion = event.target.value;
        console.log(this.state.selectedQuestion);
        sessionStorage.setItem("displayQuizEditing", false);
        sessionStorage.setItem("displayQuestionEditing", true);
        console.log(sessionStorage.getItem("displayQuizEditing"));
        console.log(sessionStorage.getItem("displayQuestionEditing"));
        //window.location.reload();
    }

    render() {
        const displayQuizEditing = sessionStorage.getItem("displayQuizEditing");
        const displayQuestionEditing = sessionStorage.getItem("displayQuestionEditing");
        console.log(displayQuizEditing);
        console.log(displayQuestionEditing);
        return (
            <div className="App">
                {!displayQuizEditing && !displayQuestionEditing &&
                    <div>
                        <header className="App-header">
                            <h1 className="App-title">Edit a Quiz</h1>
                        </header>
                        <form onSubmit={this.handleQuizSelection}>
                            <table className="table-hover">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Serial No.</th>
                                        <th>Genre</th>
                                        <th>Quiz Number</th>
                                        <th>Number of questions</th>
                                    </tr>
                                </thead>
                                <tbody>{this.state.data.map(function (item, key) {
                                    return (
                                        <tr key={key}>
                                            <td><input type="radio" value={item.id} checked={this.state.selectedOption == item.id} onChange={this.handleOptionChange}></input></td>
                                            <td>{key += 1}</td>
                                            <td>{item.genre}</td>
                                            <td>{item.quiz_num}</td>
                                            <td>{item.num_questions}</td>
                                        </tr>
                                    )
                                }, this)}
                                </tbody>
                            </table>
                            <input type="submit" value="Edit Quiz" className="btn btn-default"></input>
                        </form>
                    </div>
                }

                {displayQuizEditing && !displayQuestionEditing &&
                    <div>
                        <div>
                            <header className="App-header">
                                <h1 className="App-title">Edit a Quiz</h1>
                            </header>
                        </div>
                        <div>{JSON.parse(sessionStorage.getItem("questionsEditing")).map(function (item, key) {
                            return (
                                <div key={key}>
                                    <h4>{item.question}</h4>
                                    <h6>a) {item.op1}</h6>
                                    <h6>b) {item.op2}</h6>
                                    <h6>c) {item.op3}</h6>
                                    <h6>d) {item.op4}</h6>
                                    <button type="button" value={item.id} className="btn btn-default" onClick={this.handleEditQuestion}>Edit Question</button>
                                </div>
                            )
                        }, this)}
                        </div>
                    </div>
                }

                {!displayQuizEditing && displayQuestionEditing &&
                    <div>
                        <div>
                            <header className="App-header">
                                <h1 className="App-title">Edit a Quiz</h1>
                            </header>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default EditQuiz;