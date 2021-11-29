const SAVE_EMAIL = 'SAVE_EMAIL';
const GET_API = 'GET_API';
const NO_ANSWER = 'NO_ANSWER';
const CORRECT_ANSWER = 'CORRECT_ANSWER';
const GRAVATAR_IMG = 'GRAVATAR_IMG';
const GET_SCOREQUESTION = 'GET_SCOREQUESTION';

export const emailAction = (state) => ({ type: SAVE_EMAIL, state });

export const getApiAction = (json) => ({ type: GET_API, json });

export function fetchApi(token) {
  return (dispatch) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json().then((json) => dispatch(getApiAction(json))));
}

export const noAnswer = () => ({ type: NO_ANSWER });

export const correctAnswer = (score) => ({ type: CORRECT_ANSWER, score });

export const gravatarImgAction = (personalInfo) => ({ type: GRAVATAR_IMG, personalInfo });

export const getScoreAction = (score) => ({ type: GET_SCOREQUESTION, score });
