import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import { clearAction } from '../actions';

class Ranking extends Component {
  constructor() {
    super();

    this.handleStartAgain = this.handleStartAgain.bind(this);
    this.getRankingFromStorage = this.getRankingFromStorage.bind(this);
  }

  getRankingFromStorage() {
    const minusOne = -1;
    const one = 1;
    const zero = 0;
    const originalRanking = JSON.parse(localStorage.getItem('ranking'));
    originalRanking.sort((a, b) => {
      if (a.score > b.score) return minusOne;
      if (a.score < b.score) return one;
      return zero;
    });
    return originalRanking;
  }

  handleStartAgain() {
    const { history, clearDispatch } = this.props;
    clearDispatch();
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { this.getRankingFromStorage().map((player, index) => (
          <div key="index">
            <img src={ player.picture } alt="foto do jogador" />
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </div>
        )) }
        <Button
          testId="btn-go-home"
          onClick={ this.handleStartAgain }
          labelText="Jogar novamente"
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearDispatch: () => dispatch(clearAction()),
});

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
  clearDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
