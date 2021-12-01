import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { gravatarImgAction } from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.getGravatar = this.getGravatar.bind(this);
  }

  getGravatar() {
    const { userData, gravatarImgDispatch } = this.props;
    const convertG = md5(userData.gravatarEmail).toString();
    const srcImg = `https://www.gravatar.com/avatar/${convertG}`;
    const personalInfo = { nameUser: userData.name, imgUser: srcImg };
    gravatarImgDispatch(personalInfo);
    return srcImg;
  }

  render() {
    const { userData } = this.props;
    return (
      <div className="headerFull">
        <div className="headerProfile">
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
        <div className="headerScore">
          <h3>Score</h3>
          <div>
            <p
              data-testid="header-score"
            >
              { userData.score }
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  userData: PropTypes.shape().isRequired,
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  gravatarImgDispatch: PropTypes.func.isRequired,
};

Header.defaultProps = {
  gravatarEmail: 'example@test.com',
  name: 'Default User',
};

const mapDispatchToProps = (dispatch) => ({
  gravatarImgDispatch: (personalInfo) => dispatch(gravatarImgAction(personalInfo)),
});

const mapStateToProps = (state) => (
  { userData: state.headerReducer.player }
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
