/*
  StaticPageWithImage.js

  Child route of <Base> located at `/static`

  An example of a route with:
    - A static, pre-defined URL
    - No data dependencies
    - No children
    - Locally loaded image
*/

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './view-styles/StaticPageWithImage.css';

class StaticPageWithImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="static-plus-img-view">
        <h1>Static Page With Image</h1>
        <div className="img-wrapper">
          <img src="../../assets/react.png"></img>
        </div>
        <br />
        <Link to="/">{'< Back Home'}</Link>
      </div>
    );
  }
}

export default withRouter(connect()(StaticPageWithImage));
