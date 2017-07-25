/*
  StaticPage.js

  Child route of <Base> located at `/static`

  An example of a route with:
    - A static, pre-defined URL
    - No data dependencies
    - No children
*/

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './view-styles/StaticPage.css';

class StaticPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
