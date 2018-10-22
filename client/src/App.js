import React, { Component } from 'react';
import './styles/main.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home';
import Blog from './pages/Blog';
import Music from './pages/Music';
import Dev from './pages/Dev';
import { userAuthenticate, userSignIn, userSignOut } from "./models/userManager";
import * as Cookies from 'es-cookie';
import Navbar from "./components/layout/Navbar";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    }

    this.signInUser = this.signInUser.bind(this);
    this.signOutUser = this.signOutUser.bind(this);
  }

  componentDidMount(){
    const token = Cookies.get('lt');
    if (token) {
      userAuthenticate(token, (message) => this.setState({user: message.user}));
    }
  }


  signInUser(email, pw, cb){
    console.log('app.js eventhandler')
    userSignIn(email, pw, (message) => {
      this.setState({user: message.user}, () => cb(message));
    })
  }

  signOutUser(cb) {
    userSignOut();
    this.setState({user: {}});
    cb();
  }

  render() {
    return (
      <Router user={this.props.user}>
        <div>
          <Navbar signOutUser={this.signOutUser} signInUser={this.signInUser} user={this.state.user}/>
          <Route
            exact path="/"
            render={(props) => <Home user={this.state.user} />}
          />
          <Route path="/blog/:date/:title" component={Blog} />
          <Route exact path="/blog/" component={Blog} />
          <Route path="/music/:item" component={Music} />
          <Route exact path="/music/" component={Music} />
          <Route path="/dev/:item" component={Dev} />
          <Route exact path="/Dev/" component={Dev} />
        </div>
      </Router>
    );
  }
}

export default App;
