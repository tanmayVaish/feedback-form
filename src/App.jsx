import React, { Component } from "react";
import "./App.css";
import Context from "./store/context.js";
import Form from "./components/Form.jsx";
import Response from "./components/Response.jsx";

class App extends Component {
  state = {
    data: null,
    response: null,
    isFormSubmitted: false,
    setData: this.setData,
  };

  static contextType = Context;

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

  setContext = (input) => {
    this.setState({
      ...input,
      isFormSubmitted: true,
    });
  };

  render() {

    const { isFormSubmitted } = this.state;

    return (
      <Context.Provider
        value={{
          data: this.state.data,
          setContext: this.setContext,
          response: this.state.response,
        }}
      >
        <div className="App">{isFormSubmitted ? <Response /> : <Form />}</div>
      </Context.Provider>
    );
  }
}

export default App;
