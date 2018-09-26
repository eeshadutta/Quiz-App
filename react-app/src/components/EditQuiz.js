import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class EditQuiz extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.state.id = this.props.match.params.id
        const request = new Request('http://127.0.0.1:8080/quiz');
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Edit a Quiz</h1>
                </header>

                <table className="table-hover">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Genre</th>
                            <th>Quiz Number</th>
                            <th>Number of questions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{this.state.data.map(function (item, key) {
                        return (
                            <tr key={key}>
                                <td>{key += 1}</td>
                                <td>{item.genre}</td>
                                <td>{item.quiz_num}</td>
                                <td>{item.num_questions}</td>
                                <td><Link to={`/EditQuiz/${item.id}`}>Edit</Link></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                
            </div>
        );
    }
}

export default EditQuiz;