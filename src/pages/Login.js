import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Button from '../components/Button';
import { emailAction } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      inLoginButtonDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLoginButton = this.handleLoginButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  // Função base retirada do course
  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleLoginButton());
  }

  handleLoginButton() {
    const { name, email } = this.state;
    if (email && name) {
      this.setState({ inLoginButtonDisabled: false });
    } else {
      this.setState({ inLoginButtonDisabled: true });
    }
  }

  handleClick() {
    const { history, emailDispatch } = this.props;
    const { name, email } = this.state;
    const obj = { player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    } };
    localStorage.setItem('state', JSON.stringify(obj));
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
    emailDispatch(this.state);
    history.push('/game');
  }

  handleSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, email, inLoginButtonDisabled } = this.state;
    return (
      <div className="login-back">
        <div className="login-page">
          <img
            src="https://i.ibb.co/Q8vnj3V/logo-Millionaire.png"
            alt="logo-Millionaire"
            border="0"
          />
          <Input
            testId="input-player-name"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            placeholder="Nome"
          />
          <Input
            testId="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="E-mail"
          />
          <Button
            labelText="Jogar"
            testId="btn-play"
            disabled={ inLoginButtonDisabled }
            onClick={ this.handleClick }
          />
          <Button
            labelText="Configurações"
            testId="btn-settings"
            onClick={ this.handleSettings }
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  { emailDispatch: (state) => dispatch(emailAction(state)) });

Login.propTypes = {
  history: PropTypes.shape().isRequired,
  emailDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
