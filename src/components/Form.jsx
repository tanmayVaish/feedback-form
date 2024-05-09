import React from "react";
import "./styles/Form.css";
import Context from "../store/context.js";
import withHeader from "../HOCs/withHeader";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Button, CircularProgress } from "@material-ui/core";

class Form extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      choices: [],
    };
  }

  handleRadioChange = (index, value) => {
    const updatedChoices = [...this.state.choices];
    console.log(this.state.choices);
    updatedChoices[index] = value;
    this.setState({ choices: updatedChoices });
  };

  handleSubmit = () => {
    const contextData = this.context;
    const { questions, choices } = this.state;

    contextData.setContext({
      data: contextData.data,
      setContext: contextData.setContext,
      response: {
        questions,
        choices,
      },
    });
  };

  render() {
    const { data } = this.context;

    const feedbackQuestions = data ? data.feedbackQuestions : [];
    const choices = this.state.choices;

    return (
      <div className="form-container-wrapper">
        <div className="form-container">
          <h2>Please Rate your Feedback</h2>

          {data === null || data === undefined ? (
            <div>
              <h2>Loading...</h2>
              <CircularProgress />
            </div>
          ) : (
            <div className="questions-container">
              {feedbackQuestions.map((question, index) => (
                <div
                  key={index}
                  style={
                    index % 2 === 0
                      ? { backgroundColor: "#f2f2f2" }
                      : { backgroundColor: "white" }
                  }
                  className="question-wrapper"
                >
                  <FormLabel component="legend" className="question-label">
                    {question}
                  </FormLabel>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="questions"
                      name={`questions-${index}`}
                      row
                      value={choices[index] || ""}
                      onChange={(event) => {
                        this.handleRadioChange(index, event.target.value);
                        const updatedQuestions = [...this.state.questions];
                        updatedQuestions[index] = question;
                        this.setState({ questions: updatedQuestions });
                      }}
                    >
                      {data.choices[index].map((choice, choiceIndex) => (
                        <FormControlLabel
                          key={choiceIndex}
                          value={choice}
                          control={<Radio />}
                          label={choice}
                          className="choice-label"
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              ))}
            </div>
          )}
        </div>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
      </div>
    );
  }
}
export default withHeader(Form);
