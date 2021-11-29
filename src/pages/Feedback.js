import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { playerData } = this.props;
    const scoreResult = 3;
    return (
      <div>
        <Header />
        { playerData.assertions >= scoreResult
          ? <p data-testid="feedback-text">Mandou bem!</p>
          : <p data-testid="feedback-text">Podia ser melhor...</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerData: state.headerReducer.player,
});

Feedback.propTypes = {
  playerData: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Feedback);
