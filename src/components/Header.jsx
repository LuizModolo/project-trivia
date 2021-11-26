import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.getGravatar = this.getGravatar.bind(this);
  }

  getGravatar() {
    const { userData } = this.props;
    const convertG = md5(userData.gravatarEmail).toString();
    const srcImg = `https://www.gravatar.com/avatar/${convertG}`;
    return srcImg;
  }

  render() {
    const { userData } = this.props;
    return (
      <div>
        <div>
          <img
            src={ this.getGravatar() }
            alt="sua foto"
            data-testid="header-profile-picture"
          />
          <p
            data-testid="header-player-name"
          >
            { userData.name }
          </p>
        </div>
        <div>
          <p
            data-testid="header-score"
          >
            { userData.score }
          </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  userData: PropTypes.shape().isRequired,
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
};

Header.defaultProps = {
  gravatarEmail: 'example@test.com',
  name: 'Default User',
};

const mapStateToProps = (state) => (
  { userData: state.headerReducer.player }
);

export default connect(mapStateToProps, null)(Header);
