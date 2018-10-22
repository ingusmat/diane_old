import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faCodepen, faTwitter, faLinkedin, faSoundcloud, faBandcamp } from '@fortawesome/free-brands-svg-icons'

/** 
 Describe component here.        
 React Component 
 */
class Home extends React.Component {
  state = {users: []};

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  /**
    Render the component
  */
  render() {
    return (
      <main>
        <div className="columns" style={{marginBottom: 0}}>
          <div className="column is-half" style={{paddingBottom: 0}}>
            {/*<img src="/ingus-basement-office.png" />*/}
          </div>
          <div className="column is-half" style={{paddingBottom: 0}}>
            <div className="homepage-main-bio">
              <h1 className="is-size-2 has-text-weight-bold">Ingus Mat Burleson</h1>
              <h2 className="is-size-4 has-text-grey-light has-text-weight-bold">Web Developer<br />Javascript Afficianado<br />Occasional Rocker and Roller</h2>
              <div className="homepage-main-bio-social">
                <ul>
                  <li><a href="http://github.com/ingusmat"><FontAwesomeIcon icon={faGithub} /></a></li>
                  <li><a href="https://codepen.io/ingusmat/"><FontAwesomeIcon icon={faCodepen} /></a></li>
                  <li><a href="https://www.twitter.com/ingusmat"><FontAwesomeIcon icon={faTwitter} /></a></li>
                  <li><a href="https://www.linkedin.com/in/matthewburleson/"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                  <li><a href="https://ingusmat.bandcamp.com"><FontAwesomeIcon icon={faBandcamp} /></a></li>
                  <li><a href="https://soundcloud.com/ingusmat/"><FontAwesomeIcon icon={faSoundcloud} /></a></li>
                </ul>
              </div>
            </div>
          </div>

        </div>
        <div style={{backgroundColor: '#58c0d8'}}>
          <div className="container">
            <p>Hi, I'm Ingus</p>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;