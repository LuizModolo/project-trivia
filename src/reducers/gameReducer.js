const INITIAL_STATE = {
  jsonInfo: {},
  ranking: { player: { name: '', score: 0, picture: '' } },
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_API':
    return { ...state, jsonInfo: action.json };

  case 'GRAVATAR_IMG':
    return { ...state,
      ranking: { player: {
        name: action.personalInfo.nameUser,
        score: 0,
        picture: action.personalInfo.imgUser } } };

  case 'GET_SCOREQUESTION':
    return { ...state,
      ranking: { ...state.ranking,
        player: {
          ...state.ranking.player,
          score: Number(action.score) } } };

  default:
    return state;
  }
};

export default gameReducer;
