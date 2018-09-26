import React, { Component } from 'react';
import './App.css';

class DeletePerson extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectedOption: null,
      submitted: false,
      setMessage: false,
    }
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayPeople = this.displayPeople.bind(this);
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
      fetch('http://127.0.0.1:8080/people/' + sessionStorage.getItem("username") + '/' + this.state.selectedOption, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.status >= 200 && response.status < 300)
            this.setState({ submitted: true });
          this.setState({ selectedOption: null });
          this.setState({ setMessage: false});
          this.componentDidMount();
        });
  }

  displayPeople() {
    var html = [];
    for (var item in this.state.data) {
      if (this.state.data[item].username != sessionStorage.getItem("username")) {
        html.push(<tr>
          <td><input type="radio" value={this.state.data[item].id} checked={this.state.selectedOption == this.state.data[item].id} onChange={this.handleOptionChange}></input></td>
          <td>{this.state.data[item].firstname}</td>
          <td>{this.state.data[item].lastname}</td>
          <td>{this.state.data[item].username}</td>
          <td>{this.state.data[item].city}</td>
        </tr>)
      }
    }
    return html;
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
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>{this.displayPeople()}</tbody>
          </table><br></br>
          <input type="submit" value="Delete User" className="btn btn-default btn-lg"></input><br></br>
        </form>

        {this.state.submitted &&
          <div>
            <h5>User deleted successfully</h5>
          </div>
        }
        {this.state.setMessage && 
          <div>
            <h5>You cannot delete yourself</h5>
          </div>
        }
      </div>
    );
  }
}

export default DeletePerson;
