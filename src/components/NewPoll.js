import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/questions';


export class NewPoll extends Component {
    static propTypes = {
      authedUser: PropTypes.string.isRequired,
      handleSaveQuestion: PropTypes.func.isRequired
    };
    state = {
      validSubmit: false,
      isLoading: false,
      option1: '',
      option2: ''
    };
    
    handleChange = (value) => {
        this.setState(() => ({
            [value.target.id]: value.target.value,
          }))
      };
    handleSubmit = e => {
      e.preventDefault();
      const { authedUser, handleSaveQuestion } = this.props;
      const { option1, option2 } = this.state;
  
      new Promise((res, rej) => {
        this.setState({ isLoading: true });
        handleSaveQuestion(option1, option2, authedUser);
        setTimeout(() => res('success'), 1000);
      }).then(() => {
        this.setState({
          option1: '',
          option2: ''
        });
        this.setState({ validSubmit: true });
      });
    };

    render(){
        if (this.state.validSubmit === true) {
            return <Redirect to="/" />;
          }
          const disabled = this.state.option1 === '' || this.state.option2 === '';

        
        return(
            <div className = 'newquestion'>
                <h3>
                Create a New poll
                </h3>
                <p>Complete the question:</p>
                <p>
                    <strong>Would you rather...</strong>
                </p>
                <form onSubmit={this.handleSubmit}>
                    <input
                        id ="option1"
                        type="text"
                        placeholder="Enter option one..."
                        value={this.state.option1}
                        onChange={(event) => this.handleChange(event)}
                    >
                    </input>
                    <br/>
                    or
                    <br/>
                    <input
                        id ="option2"
                        type="text"
                        placeholder="Enter option two..."
                        value={this.state.option2}
                        onChange={this.handleChange}
                    >
                    </input>
                    <br/>
                    <input disabled={disabled} className='submitnewques' type="submit" value="Add" />

                </form>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
      authedUser
    };
  }
  
  export default connect(
    mapStateToProps,
    { handleSaveQuestion }
  )(NewPoll);