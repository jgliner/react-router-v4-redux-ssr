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

  componentDidMount() {
    // CDM is only called on the CLIENT - if the situation calls for it, feel free
    // to use `document` or `window` objects here

    if (!Object.keys(this.props.apiData).length) {
      console.info('Client must fetch and render');
      // if the client needs to render this and the data does not exist,
      // fetch the data, then render...
      this.props.callApiFromClient();
    }
    else {
      console.info('No new data needed!');
    }
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

const mapDispatchToProps = (dispatch) => {
  return {
    callApiFromClient() {
      // dispatches async action (identical to the static loadData() function on the server)
      dispatch(getApiData());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StaticPageWithDataDeps));
