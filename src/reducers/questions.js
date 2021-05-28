import { 
  RECEIVE_QUESTIONS,
  ADD_ANSWER_TO_QUESTION,
  ADD_QUESTION
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
      case ADD_QUESTION:
          const { question } = action;
    
          return {
            ...state,
            [question.id]: question
          };
    default :
      return state
  }
}