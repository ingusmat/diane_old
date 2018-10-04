import React from 'react';
import Navbar from './Navbar';

/** 
 Describe component here.        
 React Component 
 */
class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
        Render the component
      */
  render() {
    return (
      <div>
        <Navbar/>
          {this.props.children}
      </div>
    );
  }
}

export default Page;