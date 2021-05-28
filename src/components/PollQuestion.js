import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleSaveQuestionAnswer } from '../actions/users';

export class PollQuestion extends Component {
    static propTypes = {
      authedUser: PropTypes.string.isRequired,
      handleSaveQuestionAnswer: PropTypes.func.isRequired,
      question: PropTypes.object.isRequired
    };
    state = {
      value: '',

    };
  
    handleChange = (value) => {
      this.setState(() => ({
          value: value,
        }))
    };
    handleSubmit = e => {
      e.preventDefault();
      if (this.state.value !== '') {
        const { authedUser, question, handleSaveQuestionAnswer } = this.props;
        handleSaveQuestionAnswer(authedUser, question.id, this.state.value);
      }
    };

    render() {
        const { question } = this.props;
        
        return(
            <div className = 'pollquestion'>
                <h4>
                   would you rather 
                </h4>
                <form className= 'pollform' onSubmit={this.handleSubmit}> 
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                value="optionOne"
                                checked={this.state.value === 'optionOne'}
                                onChange={(event) => this.handleChange(event.target.defaultValue)}
                            />
                            {question.optionOne.text}
                        </label>
                    </div>
                    <br />
                    <div className="radio">
                        <label>
                            <input
                                type="radio"
                                value="optionTwo"
                                checked={this.state.value === 'optionTwo'}
                                onChange={(event) => this.handleChange(event.target.defaultValue)}
                            />
                            {question.optionTwo.text}
                        </label>
                    </div>
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }

    
}
function mapStateToProps({ authedUser }, { match }) {
    return {
      authedUser
    };
  }
  
  export default connect(
    mapStateToProps,
    { handleSaveQuestionAnswer }
  )(PollQuestion);

