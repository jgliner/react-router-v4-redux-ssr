/*
  StaticDataDepsParams.js

  Child route of <Base> located at `/dataDepsParams`

  An example of a route with:
    - A static, pre-defined URL
    - Data dependencies, fetched on the server before rendering
    - No children
    - Query params
*/

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'qs';

import { getApiDataWithParams } from '../asyncActions.js';

import LoadingWrapper from '../component-utils/LoadingWrapper.js';

import './view-styles/StaticDataDepsParams.css';

class StaticDataDepsParams extends React.Component {
  static loadData(store, match, url, params) {
    // see /src/views/StaticPageWithDataDeps for more info on this

    return store.dispatch(getApiDataWithParams(params));
  }

  constructor(props) {
    super(props);

    this.checkForClientRender = this.checkForClientRender.bind(this);
  }

  componentDidMount() {
    const clientRenders = this.checkForClientRender();

    if (clientRenders) {
      console.log('Client must fetch and render');

      // this.props.match only refers to the URL matched during server-rendering
      // therefore, on the client, use this.props.location when using router props
      const parsedParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      this.props.callApiFromClient(parsedParams);
    }
    else {
      console.log('No new data needed!');
    }
  }

  checkForClientRender() {
    // just like in /src/views/StaticPageWithDataDeps, but we initialized with an Array
    // in /src/reducers, so object keys aren't necessary
    return this.props.apiDataParams.length === 0;
  }

  render() {
    const data = this.props.apiDataParams;

    const loading = this.checkForClientRender();
    return (
      <div className="static-data-view">
        <h1>Static Page + External Data + Query Params</h1>
        <LoadingWrapper isLoading={loading}>
          <div>
            {
              data.map((item, i) => (
                <p key={i}>{item}</p>
              ))
            }
          </div>
        </LoadingWrapper>
        <br />
        <Link to="/">{'< Back Home'}</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  apiDataParams: state.apiDataParams,
});

const mapDispatchToProps = (dispatch) => {
  return {
    callApiFromClient(params) {
      // dispatches async action (identical to the static loadData() function on the server)
      dispatch(getApiDataWithParams(params));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StaticDataDepsParams));
