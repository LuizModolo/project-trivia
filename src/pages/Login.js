import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Button from '../components/Button';

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
    const { history } = this.props;
    history.push('/game');
  }

  render() {
    const { name, email, inLoginButtonDisabled } = this.state;
    return (
      <div>
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
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
