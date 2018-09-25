import React, { Component } from 'react';
import './App.css'

class LeaderboardGenre extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/leaderboard/' + this.props.match.params.genre);
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Leaderboard</h1>
                </header>
                
                <h3>{this.props.match.params.genre} Leaderboard</h3>
                <table className="table-hover">
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Username</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.data.map(function(item, key) {
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

export default LeaderboardGenre;