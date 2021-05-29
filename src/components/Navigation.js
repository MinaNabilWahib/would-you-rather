import React, { Component } from 'react';
import { NavLink ,withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import PropTypes from 'prop-types';


class Navigation extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };
  handleLogout = e => {
    e.preventDefault();
    this.props.history.push('/');
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
            <ul className='userinfo'>
              <li>
              <img className='avatar'
                      src={users[authedUser].avatarURL}
                      alt={'user avatar'}
                      />
                      {users[authedUser].name} 
              </li>
              <li>
                  <button className='logout' onClick={this.handleLogout}>
                    logout
                </button>
              </li>
            </ul>
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

export default withRouter(connect(
  mapStateToProps,
  { setAuthedUser }
  )(Navigation))