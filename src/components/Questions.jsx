import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Questions extends Component {
  render() {
    const { questionData, onClick, answersList } = this.props;
    return (
      <div>
        <h2 data-testid="question-category">{ questionData.category }</h2>
        <h3 data-testid="question-text">{ questionData.question }</h3>
        <div>
          { answersList.map((answer, index) => (answer === questionData.correct_answer ? (
            <Button
              key={ index }
              testId="correct-answer"
              onClick={ onClick }
              labelText={ answer }
            />)
            : (
              <Button
                key={ index }
                testId={ `wrong-answer-${index}` }
                onClick={ onClick }
                labelText={ answer }
              />)))}
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questionData: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
  answersList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Questions;
