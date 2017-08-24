import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './view-styles/StaticPage.css';

class StaticPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="static-view">
        <h1>Static Content</h1>
        <p>Foo bar baz qux quux corge</p>
        <br />
        <Link to="/">{'< Back Home'}</Link>
      </div>
    );
  }
}

export default withRouter(connect()(StaticPage));
