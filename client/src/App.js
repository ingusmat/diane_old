import Page from './components/layout/Page';
import React, { Component } from 'react';
import './styles/main.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faCodepen, faTwitter, faLinkedin, faSoundcloud, faBandcamp } from '@fortawesome/free-brands-svg-icons'


class App extends Component {
  state = {users: []};

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <Page>
        <main>
          <div className="columns" style={{marginBottom: 0}}>
            <div className="column is-half" style={{paddingBottom: 0}}>
              <img src="/ingus-basement-office.png" />
            </div>
            <div className="column is-half" style={{paddingBottom: 0}}>
              <div class="homepage-main-bio">
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
          <div className="has-background-grey-li`ghter" >
            {this.state.users.map(user => (
                <div key={user.id}>{user.username}</div>
              )
            )}
          </div>
        </main>
      </Page>
    );
  }
}

export default App;
