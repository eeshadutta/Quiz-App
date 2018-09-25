import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Leaderboard extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            counter: 0,
            genre: [],
        }
    }

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/leaderboard');
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
        const req = new Request('http://127.0.0.1:8080/genres')
        fetch(req)
            .then(response => response.json())
            .then(data => this.setState({ genre: data }));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Leaderboard</h1>
                </header>

                <table className="table-hover">
                    <thead>
                        <th>Serial No.</th>
                        <th>Genre</th>
                        <th></th>
                    </thead>
                    <tbody>{this.state.genre.map(function (item, key) {
                        return (
                            <tr key={key}>
                                <td>{key += 1}</td>
                                <td>{item.genre_name}</td>
                                <td><Link to={`/Leaderboard/${item.genre_name}`}>View Leaderboard</Link></td>
                            </tr>
                        )
                    }, this)}
                    </tbody>
                </table>
                <br></br><br></br><br></br>
                
                <h3>Overall Leaderboard</h3>
                <table className="table-hover">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Username</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.data.map(function (item, key) {
                        return (
                            <tr key={key}>
                                <td>{key += 1}</td>
                                <td>{item.username}</td>
                                <td>{item.points}</td>
                            </tr>
                        )
                    }, this)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Leaderboard;