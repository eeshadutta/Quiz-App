import React, { Component } from 'react';
import './App.css';

class ViewPeople extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/' + sessionStorage.getItem("username"));
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All People</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function (item, key) {
            return (
              <tr key={key}>
                <td>{item.id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.username}</td>
                <td>{item.city}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewPeople;
