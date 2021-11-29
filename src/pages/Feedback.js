import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Button from '../components/Button';

class Feedback extends Component {
  constructor() {
    super();

    this.handleStartAgain = this.handleStartAgain.bind(this);
    this.handleBtnRanking = this.handleBtnRanking.bind(this);
  }

  handleStartAgain() {
    const { history } = this.props;
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
      <div>
        <Header />
        { playerData.assertions >= scoreResult
          ? <p data-testid="feedback-text">Mandou bem!</p>
          : <p data-testid="feedback-text">Podia ser melhor...</p>}
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
    );
  }
}

const mapStateToProps = (state) => ({
  playerData: state.headerReducer.player,
  // headerReducer: state.headerReducer,
});

Feedback.propTypes = {
  playerData: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  // headerReducer: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Feedback);
