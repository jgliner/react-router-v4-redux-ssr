/*
  Home.js

  Child route of <Base> located at `/`
*/

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './view-styles/Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Ok to use `<Link>` here now, since the parent component (`<Base>`)
    // contains all router logic
    return (
      <div className="home-view">
        <h1>Home</h1>
        <br />
        <div>
          <Link to="/static">Static Page Example</Link>
          <Link to="/plusDataDeps">Static Route + External Data Example</Link>
          <br />
          <Link to="/dynamic/1">Dynamic Page (Populated with <span>/1</span>)</Link>
          <Link to="/dynamic/2">Dynamic Page (Populated with <span>/2</span>)</Link>
          <Link to="/dynamic/3">Dynamic Page (Populated with <span>/3</span>)</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(Home));
