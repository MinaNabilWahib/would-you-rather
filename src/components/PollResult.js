import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ProgressBar from "@ramonak/react-progress-bar";
import { styles } from '../utils/helpers';


export class PollResult extends Component {
    static propTypes = {
      history: PropTypes.object.isRequired,
      question: PropTypes.object.isRequired,
      user: PropTypes.object.isRequired
    };

    handleClick = () => {
        this.props.history.push('/');
      };

    render() {
        const { question, user } = this.props;
        const optionOneVotes = question.optionOne.votes.length;
        const optionTwoVotes = question.optionTwo.votes.length;
        const votesTotal = optionOneVotes + optionTwoVotes;
        const userVote = user.answers[question.id];

        let option1 = styles.secondary,
        option2 = styles.secondary;
        if (optionOneVotes > optionTwoVotes) {
            option1 = styles.primary;
        } else if (optionTwoVotes > optionOneVotes) {
            option2 = styles.primary;
        }

        return(
            <div className= 'result'>
                <h3 style={{ fontWeight: 'bold' }} >Would you rather</h3>
                <div className= 'optionone'>
                {userVote === 'optionOne' && <div style={{float : 'right' }} className = 'yourvote'>Your <br/> Vote </div>}
                <p style={{ fontWeight: 'bold' }}>{question.optionOne.text}</p>
                <ProgressBar 
                completed={((optionOneVotes / votesTotal) * 100).toFixed(2)} 
                bgColor = {option1.color}
                />
                {optionOneVotes} out of {votesTotal} votes
                </div>
                <div className= 'optiontwo'>
                {userVote === 'optionTwo' && <div style={{float : 'right'}} className = 'yourvote'>Your <br/> Vote </div>}
                <p style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</p>
                <ProgressBar 
                completed={((optionTwoVotes / votesTotal) * 100).toFixed(2)} 
                bgColor = {option2.color}
                />
                {optionTwoVotes} out of {votesTotal} votes
                </div>
                <button
                className='back'
                onClick={this.handleClick}
                >
                back
                </button>
            </div>

        )
    }
    

}

function mapStateToProps({ users, authedUser }) {
    const user = users[authedUser];
    return {
      user
    };
  }
  
  export default withRouter(connect(mapStateToProps)(PollResult));