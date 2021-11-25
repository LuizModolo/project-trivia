const INITIAL_STATE = {
  jsonInfo: {},
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_API':
    return { ...state, jsonInfo: action.json };
  default:
    return state;
  }
};

export default gameReducer;
