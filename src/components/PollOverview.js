import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export class PollOverview extends Component {
    static propTypes = {
      question: PropTypes.object.isRequired,
      unanswered: PropTypes.bool.isRequired
    };
    state = {
        viewPoll: false
      };
      handleClick = e => {
        this.setState(prevState => ({
          viewPoll: !prevState.viewPoll
        }));
      };
    render(){
        const { question, unanswered } = this.props;
        const btnContent = unanswered === true ? 'Answer Poll' : 'Results'

        if (this.state.viewPoll === true) {
            return <Redirect push to={`/questions/${question.id}`} />;
          }

          return (
              <div className='questionoverview'>
                <h5 style={{textalign:'left'}}>
                      Would you rather
                </h5>
                <p style={{ textalign: 'center' }}>
                      {question.optionOne.text}
                      <br />
                        or...
                </p>
                <button className='pollbtn'
                    onClick={this.handleClick}
                >
                    {btnContent}
                </button>
              </div>
          )
    }

}

export default PollOverview;