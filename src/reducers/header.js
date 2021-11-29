const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const headerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_EMAIL':
    return { ...state,
      player: { ...state.player,
        gravatarEmail: action.state.email,
        name: action.state.name } };

  case 'NO_ANSWER':
    return { ...state,
      player: { ...state.player,
        assertions: Number(state.player.assertions) + 0,
        score: Number(state.player.score) + 0,
      } };

  case 'CORRECT_ANSWER':
    return { ...state,
      player: { ...state.player,
        assertions: Number(state.player.assertions) + 1,
        score: Number(state.player.score) + Number(action.score),
      } };

  case 'CLEAR_INFO':
    return { ...state,
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      } };

  default:
    return state;
  }
};

export default headerReducer;
