const SAVE_EMAIL = 'SAVE_EMAIL';
const GET_API = 'GET_API';

export const emailAction = (state) => ({ type: SAVE_EMAIL, state });

export const getApiAction = (json) => ({ type: GET_API, json });

export function fetchApi(token) {
  return (dispatch) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((json) => dispatch(getApiAction(json)));
}
