import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div>
        <div>
          <img
            src={ caminho }
            alt={ caminho }
            data-testid="header-profile-picture"
          />
          <p
            data-testid="header-player-name"
          >
            { nome }
          </p>
        </div>
        <div>
          <p
            data-testid="header-score"
          >
            { numero }
          </p>
        </div>
      </div>
    );
  }
}

export default Header;
