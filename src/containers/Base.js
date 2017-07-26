/*
  Base.js

  The "root" component that persists throughout the app,
  contains client router logic
*/

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BaseRoutes from '../routing/BaseRoutes.js';

import './container-styles/Base.css';

class Base extends React.Component {
  // No data to fetch, no static method needed
  constructor(props) {
    super(props);

    // good for debugging - avoid excessive rendering
    this.renderCount = 0;
  }

  render() {
    this.renderCount++;
    console.log('RENDERS:', this.renderCount)

    // --> /src/routing/BaseRoutes.js
    return (
      <div className="app-base">
        <h1>Base</h1>
        <BaseRoutes location={this.props.location} />
      </div>
    );
  }
}

export default withRouter(connect()(Base));
