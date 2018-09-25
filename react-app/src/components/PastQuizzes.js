import React, { Component } from 'react';
import './App.css'

class PastQuizzes extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/history/' + sessionStorage.getItem("username"));
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Your Previous Challenges</h1>
                </header>

                <table className="table-hover">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Date</th>
                            <th>Genre</th>
                            <th>Quiz Number</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.data.map(function (item, key) {
                        return (
                            <tr key={key}>
                                <td>{key += 1}</td>
                                <td>{item.timestamp}</td>
                                <td>{item.genre}</td>
                                <td>{item.quiz_num}</td>
                                <td>{item.score}</td>
                            </tr>
                        )
                    })}

                    </tbody>
                </table>
            </div>
        )
    }
}

export default PastQuizzes;