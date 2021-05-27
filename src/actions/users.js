import { saveQuestionAnswer } from '../utils/api';
import { addAnswerToQuestion } from '../actions/questions';

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';

function addAnswerToUser(authedUser, quesid, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUser,
    quesid,
    answer
  };
}


export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function handleSaveQuestionAnswer(authedUser, quesid, answer) {
  return dispatch => {
    dispatch(addAnswerToUser(authedUser, quesid, answer));
    dispatch(addAnswerToQuestion(authedUser, quesid, answer));

    return saveQuestionAnswer(authedUser, quesid, answer).catch(e => {
      console.warn('Error in handleSaveQuestionAnswer:', e);
    });
  };
}
