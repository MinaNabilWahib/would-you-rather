import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import Select from 'react-select';


const customStyles = {
    control: base => ({
      ...base,
      height: 50,
      minHeight: 35
    })
  };
export class Login extends Component {
    state = {
        loading: false,
      };
      handleLoading = () => {
        this.setState({ loading: true });
      };
      
      render(){
          return(
            <div className = 'login'>
                <h3>welcome to would you rather game</h3>
                <h3>please login using one of those users</h3>
                <ConnectedLoginForm onLoading={this.handleLoading}/>
            </div>
          )
      }

}
class LoginForm extends Component {
    static propTypes = {
        onLoading: PropTypes.func.isRequired
      };
      state = {
        value: ''
      };
      onChange = (value) => {
        this.setState(() => ({
            value: value,
          }))
      };
      
      
      handleSubmit = e => {
        e.preventDefault();
        const { onLoading, setAuthedUser } = this.props;
        const authedUser = this.state.value.value;
    
        new Promise((res, rej) => {
          onLoading();
          setTimeout(() => res(), 500);
        }).then(() => setAuthedUser(authedUser));
      };
      generateDropdownData = () => {
        const { users } = this.props;
    
        return users.map(user => ({
          key: user.id,
          label: <div><img className="avatar" src= {user.avatarURL} alt={user.name + 'picture'}/> {' '} {user.name}</div>,
          value: user.id,
          image: { avatar: true, src: user.avatarURL },
          name:user.name
        }));
      };
     
      render() {
        const { value} = this.state;
        return(

            <form onSubmit={this.handleSubmit}>
                    <label>
                        User:
                    </label>
                    <Select className = 'dropdownlogin'
                        value = {value}
                        options = {this.generateDropdownData()}
                        styles = {customStyles}
                        onChange ={(event)=>this.onChange(event)}
                        
                    />
                    <input type="submit" value="sign in" />
                </form>
        )

      }
}
const ConnectedLoginForm = connect(
    mapStateToProps,
    { setAuthedUser }
  )(LoginForm);
  

  function mapStateToProps({ users }) {
    return {
      users: Object.values(users)
    };
  }
  
  export default Login;