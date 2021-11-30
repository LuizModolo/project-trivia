import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';
import { clearAction } from '../actions';
import Footer from '../components/Footer';

class Feedback extends Component {
  constructor() {
    super();

    this.handleStartAgain = this.handleStartAgain.bind(this);
    this.handleBtnRanking = this.handleBtnRanking.bind(this);
  }

  handleStartAgain() {
    const { history, clearDispatch } = this.props;
    clearDispatch();
    history.push('/');
  }

  handleBtnRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { playerData } = this.props;
    const scoreResult = 3;
    return (
      <div className="feedbackFull">
        <Header />
        <div className="feedbackBody">
          <div className="feedbackTitle">
            { playerData.assertions >= scoreResult
              ? <p data-testid="feedback-text">Mandou bem!</p>
              : <p data-testid="feedback-text">Podia ser melhor...</p>}
          </div>
          <div className="feedbackContent">
            <p>
              Sua pontuação foi:
              {' '}
              <span data-testid="feedback-total-score">{ playerData.score }</span>
            </p>
            <p>
              Você acertou
              {' '}
              <span data-testid="feedback-total-question">{ playerData.assertions }</span>
              {' '}
              questões!
            </p>
            <div className="feedbackBtn">
              <Button
                testId="btn-ranking"
                onClick={ this.handleBtnRanking }
                labelText="Ver Ranking"
              />
              <Button
                testId="btn-play-again"
                onClick={ this.handleStartAgain }
                labelText="Jogar novamente"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearDispatch: () => dispatch(clearAction()),
});

const mapStateToProps = (state) => ({
  playerData: state.headerReducer.player,
});

Feedback.propTypes = {
  playerData: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  clearDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
