import React from 'react';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import NavbarUser from "./NavbarUser";
import Gravatar from 'react-gravatar';

/** 
 Describe component here.        
 React Component 
 */
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserArea: false
    };

    this.toggleUserArea = this.toggleUserArea.bind(this);
    this.signInUser = this.signInUser.bind(this);
    this.signOutUser = this.signOutUser.bind(this);
  }

  toggleUserArea(e) {
    e.preventDefault();
    this.setState({showUserArea: !this.state.showUserArea})
  }

  signInUser(email, pw, cb){
    this.props.signInUser(email, pw, (message) => {
      this.setState({showUserArea: !this.state.showUserArea});
      cb(message);
    })
  }

  signOutUser(cb){
    this.props.signOutUser((message) => {
      this.setState({showUserArea: !this.state.showUserArea})
      cb(message);
    })
  }

  UserIcon(props){
    if (props.user.email) {
      return (
        <figure className='image'>
          <Gravatar email={props.user.email} size={32} rating="pg" className="is-rounded CustomAvatar-image" />
        </figure>
      )
    } else {
      return <FontAwesomeIcon icon={faUser} />
    }
  }

  /**
    Render the component
  */
  render() {
    return (
      <nav className="navbar is-dark" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            Ingusmat
          </Link>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/blog">
              blog
            </Link>
            <Link className="navbar-item" to="/music">
              music
            </Link>
            <Link className="navbar-item" to="/dev">
              dev
            </Link>
          </div>
          <div className="navbar-end">
            <Link className="navbar-item" to="/admin" onClick={this.toggleUserArea}>
              <this.UserIcon user={this.props.user} />
            </Link>
          </div>
        </div>
        <div className="navbar-user" style={{display: this.state.showUserArea ? 'block' : 'none' }}>
          <NavbarUser close={this.toggleUserArea} user={this.props.user} signInUser={this.signInUser} signOutUser={this.signOutUser} />
        </div>
      </nav>
    );
  }
}

export default Navbar;