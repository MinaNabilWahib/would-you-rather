import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Navigation extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.setAuthedUser(null);
  };

  render() {
    const { authedUser, users } = this.props;
    return (
      <nav className='navigation'>
        <ul className='menu'>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
          </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Poll
          </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
          </NavLink>
          </li>
          <li style={{ float: 'right' }}>
            <span className='user'>
              <img className='avatar'
              src={users[authedUser].avatarURL}
              alt={'user avatar'}
              />
              {users[authedUser].name}
           
            <button>
                logout
            </button>
            </span>
          </li>

        </ul>



      </nav>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    users
  };
}

export default connect(
  mapStateToProps,
  { setAuthedUser }
  )(Navigation)