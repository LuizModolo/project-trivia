import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchApi } from '../actions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      token: {},
    };

    this.fetchTokenApi = this.fetchTokenApi.bind(this);
    this.sendTokenStorage = this.sendTokenStorage.bind(this);
  }

  componentDidMount() {
    this.fetchTokenApi();
  }

  async fetchTokenApi() {
    const { fetchDispatch } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request')
      .then((r) => r.json());
    this.setState({ token: response });
    this.sendTokenStorage();
    fetchDispatch(response);
  }

  sendTokenStorage() {
    const { token } = this.state;
    localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    return (
      <div>
        <Header />
        OI
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchDispatch: (token) => dispatch(fetchApi(token)),
});

Game.propTypes = {
  fetchDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
