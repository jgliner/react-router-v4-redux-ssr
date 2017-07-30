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
    if (this.props.apiDataWithParams.length && parsedParams) {
      // if data already exists, but it doesn't match the route, need to fetch and re-render
      return +this.props.currentPage !== +parsedParams.page;
    }
    // just like in /src/views/StaticPageWithDataDeps, but we initialized with an Array
    // in /src/reducers, so object keys aren't necessary
    return this.props.apiDataWithParams.length === 0;
  }

  render() {
    const data = this.props.apiDataWithParams;
    const currentParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    const page = +currentParams.page;

    const loading = this.checkForClientRender();
    return (
      <div className="static-data-param-view">
        <h1>Static Page + External Data + Query Params</h1>
        <h3>{Object.keys(currentParams)} {page}</h3>
        <br />
        <br />
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
        <div className="static-data-param-page-nav">
          <Link
            className={`page-prev ${page === 1 ? 'hidden' : ''}`}
            to={`/dataDepsParams?page=${page - 1}`}
          >
            {'<<'}
          </Link>
          <span> {page} </span>
          <Link
            className={`page-prev ${page === data.totalPages ? 'hidden' : ''}`}
            to={`/dataDepsParams?page=${page + 1}`}
          >
            {'>>'}
          </Link>
        </div>
        <br />
        <br />
        <Link to="/">{'< Back Home'}</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apiDataWithParams: state.apiDataWithParams,
  currentPage: state.currentPage,
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
