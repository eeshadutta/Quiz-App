import React, { Component } from 'react';
import './App.css';

class DeleteQuiz extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            selectedOption: null,
            submitted: false,
        }
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/quiz');
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    handleOptionChange(event) {
        this.setState({ selectedOption: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://127.0.0.1:8080/quiz/' + sessionStorage.getItem("username") + '/' + this.state.selectedOption, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.status == 200)
                    this.setState({ submitted: true });
                this.setState({ selectedOption: null });
                this.componentDidMount();
            })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Delete a Quiz</h1>
                </header>
                <form onSubmit={this.handleSubmit}>
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
                    </table><br></br>
                    <input type="submit" value="Delete Quiz" className="btn btn-default btn-lg"></input><br></br>
                </form>

                {this.state.submitted &&
                    <div>
                        <h5>Successfully Deleted Quiz</h5>
                    </div>
                }
            </div>
        )
    }
}

export default DeleteQuiz;