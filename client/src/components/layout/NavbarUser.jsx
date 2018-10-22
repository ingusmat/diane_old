import React from 'react';

/** 
 Describe component here.        
 React Component 
 */
class NavbarUser extends React.Component {
  state = {
    email: '',
    password: '',
    showLoginForm: !this.props.user.username
  };

  onCancel(event) {
    event.preventDefault();
    this.setState({email: '', password: ''});
    this.props.close(event);
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('navbaruser eventhandler');
    this.props.signInUser(this.state.email, this.state.password, message => {
      console.log('signed in.');
      if (message.user.username) {
        this.setState({showLoginForm: false})
      }
    });
  }

  onSignOut(event) {
    event.preventDefault();
    this.props.signOutUser(() => {
      console.log('signed out');
      this.setState({showLoginForm: true});
    })
  }

  /**
    Render the component
  */
  render() {
    if (!this.state.showLoginForm) {
      return (
        <div>
          <h4 className="is-size-5">
            {this.props.user.userName}</h4>
          <nav>
            <ul>
              <li>New Post</li>
              <li>Analytics</li>
              <li><button onClick={this.onSignOut.bind(this)}>Log Out</button></li>
            </ul>
          </nav>
        </div>
      )
    } else {
      return (
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className='field'>
            <label className="label">Email</label>
            <div className="control">
              <input name="email" value={this.state.email} onChange={this.onChange.bind(this)} className="input" type="text"  />
            </div>
          </div>
          <div className='field'>
            <label className="label">Password</label>
            <div className="control">
              <input name="password" value={this.state.password} onChange={this.onChange.bind(this)} className="input" type="password" />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button type='submit' className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button onClick={this.onCancel.bind(this)} className="button is-text">Cancel</button>
            </div>
          </div>
        </form>
      );
    }
  }
}

export default NavbarUser;