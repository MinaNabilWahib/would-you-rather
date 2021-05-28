import React, { Component } from 'react';
import { connect } from 'react-redux';
import PollQuestion from './PollQuestion';
import PollResult from './PollResult';
import PollTeaser from './PollOverview';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';


const pollTypes = {
    POLL_TEASER: 'POLL_TEASER',
    POLL_QUESTION: 'POLL_QUESTION',
    POLL_RESULT: 'POLL_RESULT'
  };


  const PollContent = props => {
    const { pollType, question, unanswered } = props;
  
    switch (pollType) {
      case pollTypes.POLL_TEASER:
        return <PollTeaser question={question} unanswered={unanswered} />;
      case pollTypes.POLL_QUESTION:
        return <PollQuestion question={question} />;
      case pollTypes.POLL_RESULT:
        return <PollResult question={question} />;
      default:
        return;
    }
  };
  
  export class UserCard extends Component {
    static propTypes = {
        question: PropTypes.object.isRequired,
        author: PropTypes.object.isRequired,
        pollType: PropTypes.string.isRequired,
        unanswered: PropTypes.bool,
        question_id: PropTypes.string
      };

      render(){
        const { author, question, pollType, badPath, unanswered = null } = this.props;
        if (badPath === true) {
          return <Redirect to="/questions/bad_id" />;
        }
        return (
            <div>
                
                <div className='card'>
                        <div className="authorname">
                            {author.name} asks:
                        </div>
                        <div className='authoravatar'>
                            <img className='avatar2' src={author.avatarURL} alt={author.name +'image'}/>
                        </div>
                        <div className= 'cardcontent'>
                            <PollContent
                                pollType={pollType}
                                question={question}
                                unanswered={unanswered}
                            />
                        </div>

                </div>
            </div>
        )
      }
  }

function mapStateToProps(
    { users, questions, authedUser },
    { match, question_id }
  ) {
    let  author, question, pollType ,badPath = false;;
    if (question_id !== undefined) {
      question = questions[question_id];
      author = users[question.author];
      pollType = pollTypes.POLL_TEASER;
    } else {
      const { question_id } = match.params;
      question = questions[question_id];
      const user = users[authedUser];

      if (question === undefined) {
        badPath = true;
      } else {
          author = users[question.author];
          pollType = pollTypes.POLL_QUESTION;
          if (Object.keys(user.answers).includes(question.id)) {
            pollType = pollTypes.POLL_RESULT;
          }
        }

      }

    return {
      badPath,
      question,
      author,
      pollType
    };
  }
  
  export default connect(mapStateToProps)(UserCard);