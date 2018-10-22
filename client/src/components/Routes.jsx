import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../pages/Home';
import Blog from '../pages/Blog';
import Music from '../pages/Music';
import Dev from '../pages/Dev';

/** 
 Describe component here.        
 React Component 
 */
class Routes extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
        Render the component
      */
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/blog/:date/:title" component={Blog} />
          <Route exact path="/blog/" component={Blog} />
          <Route path="/music/:item" component={Music} />
          <Route path="/dev/:item" component={Dev} />
        </div>
      </Router>
    );
  }
}

export default Routes;