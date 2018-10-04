import React from 'react';

/** 
 Describe component here.        
 React Component 
 */
class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
        Render the component
      */
  render() {
    return (
      <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="#">
            Ingusmat
          </a>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="#">
              blog
            </a>
            <a className="navbar-item" href="#">
              music
            </a>
            <a className="navbar-item" href="#">
              work
            </a>
          </div>
          <div className="navbar-end">
            <a className="navbar-item" href="#">
              user
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;