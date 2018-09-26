import React, { Component } from 'react';
import './App.css';

class ViewQuizAdmin extends Component {
    constructor() {
        super();
        this.state = {
            id: null,
            data: [],
        }
        this.displayQuestions = this.displayQuestions.bind(this);
    }

    componentDidMount() {
        this.state.id = this.props.match.params.id
        const request = new Request('http://127.0.0.1:8080/quiz/' + this.state.id);
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({ data: data }));
    }

    displayQuestions() {
        var html = [];
        var ans = "";
        for (var item in this.state.data) {
            if (this.state.data[item].ans1 == true)
                ans += "a "
            if (this.state.data[item].ans2 == true)
                ans += "b "
            if (this.state.data[item].ans3 == true)
                ans += "c "
            if (this.state.data[item].ans4 == true)
                ans += "d"
            html.push(<div><h3>{parseInt(item) + 1}) {this.state.data[item].question}</h3>
                <span className="badge badge-default">{this.state.data[item].type}</span>
                <h4>a) {this.state.data[item].op1}</h4>
                <h4>b) {this.state.data[item].op2}</h4>
                <h4>c) {this.state.data[item].op3}</h4>
                <h4>d) {this.state.data[item].op4}</h4>
                <h4><b>Correct Answer: {ans}</b></h4>
                <br></br>
            </div>);
            ans = "";
        }
        return html;
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Challenge</h1>
                </header>
                <div>{this.displayQuestions()}</div>
            </div>
        );
    }
}

export default ViewQuizAdmin;