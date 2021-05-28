import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';

const trophyColor = ['yellow', 'grey', 'orange'];

export class Leaderboard extends Component {
    static propType = {
        leaderboardData: PropType.array.isRequired
      };
    render() {
        const { leaderboardData } = this.props;
        
        return(
            <div className='leaderboard'>
                {leaderboardData.map((user, idx) => (
                    <div className= 'leadercard' key = {idx}>
                        <div className='useravatar'>
                            <img className='avatar2' src={user.avatarURL} alt={user.name +'image'}/>
                        </div>
                        <div className='username'>
                            {user.name}
                            <div classname='trophy' style = {{color : trophyColor[idx],float : 'right'}}>{idx+1}</div>
                        </div>
                        <div className = 'answeredquestion'>
                            Answered questions {'  :  '} {user.answerCount}
                        </div>
                        <div className = 'createdquestion'>
                            
                            Created questions  {'  :  '}  {user.questionCount}
                    
                        </div>
                        <div className='totalscore'>
                            <h5>
                                score
                            </h5>
                            <h5 className='score'>
                            {user.questionCount + user.answerCount}
                            </h5>
                        </div>
                    </div>
                ))}
            </div>

        )

    }
}

function mapStateToProps({ users }) {
    const leaderboardData = Object.values(users)
      .map(user => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answerCount: Object.values(user.answers).length,
        questionCount: user.questions.length,
        total: Object.values(user.answers).length + user.questions.length
      }))
      .sort((a, b) => a.total - b.total)
      .reverse()
      .slice(0, 3);
    console.log('leaderboardData', leaderboardData);
    return {
      leaderboardData
    };
  }
  
export default connect(mapStateToProps)(Leaderboard);