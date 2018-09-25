import React, { Component } from 'react';
import './App.css';

class DeletePerson extends Component {
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
    const request = new Request('http://127.0.0.1:8080/people/' + sessionStorage.getItem("username"));
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }

  handleOptionChange(event) {
    this.setState({ selectedOption: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://127.0.0.1:8080/people/' + sessionStorage.getItem("username") + this.state.selectedOption, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300)
          this.setState({ submitted: true });
        this.setState({ selectedOption: null });
        this.componentDidMount();
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a Person</h1>
        </header>

        <form onSubmit={this.handleSubmit}>
          <table className="table-hover">
            <thead>
              <tr>
                <th></th>
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
                  <td><input type="radio" value={item.id} checked={this.state.selectedOption == item.id} onChange={this.handleOptionChange}></input></td>
                  <td>{item.id}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.username}</td>
                  <td>{item.city}</td>
                </tr>
              )
            }, this)}
            </tbody>
          </table><br></br>
          <input type="submit" value="Delete User" className="btn btn-default btn-lg"></input><br></br>
        </form>

        {this.state.submitted &&
          <div>
            <h5>User deleted successfully</h5>
          </div>
        }
      </div>
    );
  }
}

export default DeletePerson;
