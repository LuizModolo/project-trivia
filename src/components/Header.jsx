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
    const convertG = md5(userData.email).toString();
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
            alt="teste"
            data-testid="header-profile-picture"
          />
          <p
            data-testid="header-player-name"
          >
            { userData.user }
          </p>
        </div>
        <div>
          <p
            data-testid="header-score"
          >
            0
          </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  userData: PropTypes.shape().isRequired,
  email: PropTypes.string,
  user: PropTypes.string,
};

Header.defaultProps = {
  email: 'example@test.com',
  user: 'Default User',
};

const mapStateToProps = (state) => (
  { userData: state.headerReducer }
);

export default connect(mapStateToProps, null)(Header);
