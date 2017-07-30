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
    const parsedParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    const clientRenders = this.checkForClientRender(parsedParams);
    if (clientRenders) {
      console.log('Client must fetch and render');

      // this.props.match only refers to the URL matched during server rendering
      // therefore, on the client, use this.props.location when using router props
      this.props.callApiFromClient(parsedParams);
    }
    else {
      console.log('No new data needed!');
    }
  }

  checkForClientRender(parsedParams) {
    if (this.props.apiDataParams.length && parsedParams) {
      // if data already exists, but it doesn't match the route, need to fetch and re-render
      return this.props.sortOrder !== parsedParams.sort;
    }
    // just like in /src/views/StaticPageWithDataDeps, but we initialized with an Array
    // in /src/reducers, so object keys aren't necessary
    return this.props.apiDataParams.length === 0;
  }

  render() {
    const data = this.props.apiDataParams;
    const currentParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    const loading = this.checkForClientRender();
    console.log('All props for this view', this.props, loading)
    return (
      <div className="static-data-param-view">
        <h1>Static Page + External Data + Query Params</h1>
        <h3>{Object.keys(currentParams)} {currentParams.sort || '(no params)'}</h3>
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

const mapStateToProps = state => ({
  apiDataParams: state.apiDataParams,
  sortOrder: state.sortOrder,
  location: state.router.location,
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
