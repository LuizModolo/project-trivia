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
      // score: 0,
      isButtonDisabled: false,
      isButtonNextDisabled: true,
      isBorderWithColor: false,
    };

    this.clickAnswer = this.clickAnswer.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
    this.changeBorderColor = this.changeBorderColor.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
    this.sendPlayerInfotStorage = this.sendPlayerInfotStorage.bind(this);
    this.disabledNextButton = this.disabledNextButton.bind(this);
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
      this.changeBorderColor();
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

  disabledNextButton() {
    this.setState({
      isButtonNextDisabled: false,
    });
  }

  setInitialState() {
    this.setState({
      seconds: 30,
      isButtonDisabled: false,
      isBorderWithColor: false,
      isButtonNextDisabled: true,
    });
  }

  changeBorderColor() {
    this.setState({
      isBorderWithColor: true,
    });
  }

  sendPlayerInfotStorage() {
    const { playerData } = this.props;
    localStorage.setItem('state', JSON.stringify(playerData));
  }

  calculateScore(difficulty) {
    const { seconds } = this.state;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const scoreBase = 10;
    let score = 0;
    if (difficulty === 'hard') {
      score = (scoreBase + (Number(seconds) * hard));
    } else if (difficulty === 'medium') {
      score = (scoreBase + (Number(seconds) * medium));
    } else {
      score = (scoreBase + (Number(seconds) * easy));
    }
    return score;
  }

  async clickAnswer({ target }) {
    const { questionData, noAnswerDispatch, correctAnswerDispatch } = this.props;
    if (target.className === 'wrong-answer') {
      await noAnswerDispatch();
      this.sendPlayerInfotStorage();
      this.changeBorderColor();
      this.disabledButton();
    } else {
      const score = this.calculateScore(questionData.difficulty);
      await correctAnswerDispatch(score);
      this.sendPlayerInfotStorage();
      this.changeBorderColor();
      this.disabledButton();
    }
    this.disabledNextButton();
  }

  render() {
    const { questionData, onClick, answersList } = this.props;
    const { isButtonDisabled, isBorderWithColor,
      isButtonNextDisabled, seconds } = this.state;
    return (
      <div>
        <h2 data-testid="question-category">{ questionData.category }</h2>
        <h3 data-testid="question-text">{ questionData.question }</h3>
        <p>{ seconds }</p>
        <div>
          { answersList.map((answer, index) => (answer === questionData.correct_answer ? (
            <Button
              className={ isBorderWithColor ? 'correct-answer2' : 'correct-answer' }
              key={ index }
              testId="correct-answer"
              onClick={ this.clickAnswer }
              labelText={ answer }
              disabled={ isButtonDisabled }
            />)
            : (
              <Button
                className={ isBorderWithColor ? 'wrong-answer2' : 'wrong-answer' }
                key={ index }
                testId={ `wrong-answer-${index}` }
                onClick={ this.clickAnswer }
                labelText={ answer }
                disabled={ isButtonDisabled }
              />)))}
          { !isButtonNextDisabled && <Button
            onClick={ () => { this.setInitialState(); onClick(); } }
            labelText="Próxima"
            testId="btn-next"
          /> }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  noAnswerDispatch: () => dispatch(noAnswer()),
  correctAnswerDispatch: (score) => dispatch(correctAnswer(score)),
});

const mapStateToProps = (state) => ({
  playerData: state.headerReducer,
});

Questions.propTypes = {
  questionData: PropTypes.shape().isRequired,
  onClick: PropTypes.func.isRequired,
  answersList: PropTypes.arrayOf(PropTypes.string).isRequired,
  noAnswerDispatch: PropTypes.func.isRequired,
  correctAnswerDispatch: PropTypes.func.isRequired,
  playerData: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
