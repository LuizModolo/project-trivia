import React, { Component } from 'react';
import Header from '../components/Header';

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
    const response = await fetch('https://opentdb.com/api_token.php?command=request')
      .then((r) => r.json());
    this.setState({ token: response });
    this.sendTokenStorage();
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

export default Game;
