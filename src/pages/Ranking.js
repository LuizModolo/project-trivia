import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';

class Ranking extends Component {
  constructor() {
    super();

    this.handleStartAgain = this.handleStartAgain.bind(this);
  }

  handleStartAgain() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Button
          testId="btn-go-home"
          onClick={ this.handleStartAgain }
          labelText="Jogar novamente"
        />
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Ranking;
