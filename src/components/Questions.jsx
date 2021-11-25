import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import { noAnswer, correctAnswer } from '../actions';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 30,
      score: 0,
      isButtonDisabled: false,
    };

    this.clickAnswer = this.clickAnswer.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
    this.changeBorderColor = this.changeBorderColor.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.cronometerInterval = setInterval(() => {
      this.setState((previous) => ({ seconds: previous.seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(_props, previous) {
    const { noAnswerDispatch } = this.props;
    const MIN_SECONDS = 0;
    if (previous.seconds === MIN_SECONDS) {
      // Quando chegar em 30, Resposta errada. Sem pontuacao.
      this.disabledButton();
      noAnswerDispatch();
    }
  }

  componentWillUnmount() {
    clearInterval(this.cronometerInterval);
  }

  disabledButton() {
    this.setState({
      isButtonDisabled: true,
    });
  }

  changeBorderColor(target) {
    const { classList } = target;
    if (classList.contains('wrong-answer2')) {
      classList.add('wrong-answer2');
    } else {
      classList.add('correct-answer2');
    }
  }

  clickAnswer({ target }) {
    const { seconds, score } = this.state;
    const { questionData, noAnswerDispatch, correctAnswerDispatch } = this.props;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const scoreBase = 10;
    if (target.className === 'wrong-answer') {
      noAnswerDispatch();
      this.changeBorderColor(target);
    } else if (questionData.difficulty === 'hard') {
      this.setState({
        score: scoreBase + (Number(seconds) * hard),
      }, correctAnswerDispatch(Number(score)));
      this.changeBorderColor(target);
    } else if (questionData.difficulty === 'medium') {
      this.setState({
        score: scoreBase + (Number(seconds) * medium),
      }, correctAnswerDispatch(Number(score)));
      this.changeBorderColor(target);
    } else {
      this.setState({
        score: scoreBase + (Number(seconds) * easy),
      }, correctAnswerDispatch(Number(score)));
      this.changeBorderColor(target);
    }
  }

  render() {
    const { questionData, onClick, answersList } = this.props;
    const { isButtonDisabled } = this.state;
    return (
      <div>
        <h2 data-testid="question-category">{ questionData.category }</h2>
        <h3 data-testid="question-text">{ questionData.question }</h3>
        <div>
          { answersList.map((answer, index) => (answer === questionData.correct_answer ? (
            <Button
              className="correct-answer"
              key={ index }
              testId="correct-answer"
              onClick={ this.clickAnswer }
              labelText={ answer }
              disabled={ isButtonDisabled }
            />)
            : (
              <Button
                className="wrong-answer"
                key={ index }
                testId={ `wrong-answer-${index}` }
                onClick={ this.clickAnswer }
                labelText={ answer }
                disabled={ isButtonDisabled }
              />)))}
          <Button
            onClick={ onClick }
            labelText="Próxima"
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  noAnswerDispatch: () => dispatch(noAnswer()),
  correctAnswerDispatch: (score) => dispatch(correctAnswer(score)),
});

Questions.propTypes = {
  questionData: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
  answersList: PropTypes.arrayOf(PropTypes.string).isRequired,
  noAnswerDispatch: PropTypes.func.isRequired,
  correctAnswerDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Questions);
