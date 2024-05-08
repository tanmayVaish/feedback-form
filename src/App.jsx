import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Context from "./store/context.js";
import Form from "./components/Form.jsx";

class App extends Component {
  state = {
    data: null,
    setData: this.setData,
  };

  componentDidMount() {
    fetch(
      "https://brijfeedback.pythonanywhere.com/api/get-feedback-questions/?unitID=1"
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          data: json,
        });
      });
  }

  setData = (data) => {
    this.setState({ data });
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        <div className="App">
          <Header />
          <Form />
        </div>
      </Context.Provider>
    );
  }
}

export default App;
