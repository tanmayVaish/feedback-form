import React from "react";
import Context from "../store/context.js";
import "./styles/Response.css"; // Assuming you have a CSS file for styling
import withHeader from "../HOCs/withHeader";

class Response extends React.Component {
  static contextType = Context;

  render() {
    const { response } = this.context;

    const question = response ? response.questions : [];
    const choices = response ? response.choices : [];

    return (
      <div className="custom-feedback-display">
        <h2>Feedback Summary</h2>
        <h3>Thank you for your precious time.</h3>
        <div className="custom-questions-container">
          {question?.map((question, index) =>
            question ? (
              <div key={index} className="custom-question-wrapper">
                <h3>{question}</h3>
                <p>{choices[index]}</p>
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  }
}

export default withHeader(Response);
