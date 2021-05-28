import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Navigation from './Navigation'
import Home from './Home'
import Login  from './Login'
import UserCard from './UserCard';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <div className = 'App'>
        {authedUser === null ?
          (
            <Route  render = {() =>(
              <Login/>
            )}
            />
          ) : (
            <div  >

              <Navigation/>
              <div>
                <Switch>
                  <Route path='/' exact component={Home} />
                  <Route path="/questions/:question_id" component={UserCard} />
                </Switch>
              
              </div>
            </div>
           
          )
          }
          
        
        </div>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}
export default connect(
  mapStateToProps)(App)