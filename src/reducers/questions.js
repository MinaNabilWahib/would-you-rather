import { 
  RECEIVE_QUESTIONS,
  ADD_ANSWER_TO_QUESTION

} from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
      case ADD_ANSWER_TO_QUESTION:
        const { authedUser, quesid, answer } = action;
  
        return {
          ...state,
          [quesid]: {
            ...state[quesid],
            [answer]: {
              ...state[quesid][answer],
              votes: state[quesid][answer].votes.concat(authedUser)
            }
          }
        };
    default :
      return state
  }
}