import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class Play extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
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
                    <h1 className="App-title">Quiz Topics</h1>
                </header>
                <table className="table-hover">
                    <thead>
                        <tr>
                            <th>Genre</th>
                            <th>Quiz Number</th>
                            <th>No of Questions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{this.state.data.map(function (item, key) {
                        return (
                            <tr key={key}>
                                <td>{item.genre}</td>
                                <td>{item.quiz_num}</td>
                                <td>{item.num_questions}</td>
                                <td><Link to={`/Play/${item.id}`}>Start Quiz</Link></td>
                            </tr>
                        )
                    }, this)}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default Play;