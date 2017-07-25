/*
  StaticPageWithDataDeps.js

  Child route of <Base> located at `/plusDataDeps`

  An example of a route with:
    - A static, pre-defined URL
    - Data dependencies, fetched on the server before rendering
    - No children
*/

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getApiData } from '../asyncActions.js';

import './view-styles/StaticPageWithDataDeps.css';

class StaticPageWithDataDeps extends React.Component {
  static loadData(store) {
    // this method is called in `loadRouteDependencies()` in /server/renderer.js
    // and will block the server from rendering until the data is returned...
    // it will throw a 500 if the data is not resolved or if there is a timeout

    // the client DOES NOT see this method at all
    return store.dispatch(getApiData());
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = this.props.apiData;
    return (
      <div className="static-data-view">
        <h1>Static Page + External Data</h1>
        {
          Object.keys(data).map((dataKey, i) => (
            <p key={i}>{dataKey} -- {data[dataKey]}</p>
          ))
        }
        <br />
        <Link to="/">{'< Back Home'}</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apiData: state.apiData,
});

export default withRouter(connect(mapStateToProps)(StaticPageWithDataDeps));
