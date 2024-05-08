import React from "react";
import "./styles/Form.css";
import Context from "../store/context.js";

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
      question: [],
      choices: [],
    };
  }

  render() {
    const { data } = this.context;

    const feedbackQuestions = data ? data.feedbackQuestions : [];
    const choices = data ? data.choices : [];

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
                      name="questions"
                      // value={value}
                      // onChange={handleChange}
                      row
                    >
                      {choices[index].map((choice, choiceIndex) => (
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
        <Button variant="contained" color="secondary" size="large">
          Submit
        </Button>
      </div>
    );
  }
}
export default Form;
