import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Navigation from './Navigation'
import Home from './Home'
import { Login } from './Login'

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
              <Route path='/' exact component={Home} />
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