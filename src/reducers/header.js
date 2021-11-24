const INITIAL_STATE = {
  email: '',
  user: '',
};

const headerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_EMAIL':
    return { ...state, email: action.state.email, user: action.state.name };
  default:
    return state;
  }
};

export default headerReducer;
