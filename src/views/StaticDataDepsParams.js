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
    // rr@v4 doesn't include a parsing library unfortunately
    // use qs or DIY
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

  componentDidUpdate(prevProps) {
    const parsedParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    if (this.props.location.search !== prevProps.location.search) {
      this.props.callApiFromClient(parsedParams);
      return true;
    }
    return +this.props.currentPage !== +parsedParams.page;
  }

  checkForClientRender(parsedParams) {
    if (Object.keys(this.props.apiDataWithParams).length && parsedParams) {
      // if data already exists, but it doesn't match the route, need to fetch and re-render
      return +this.props.currentPage !== +parsedParams.page;
    }
    return Object.keys(this.props.apiDataWithParams).length === 0;
  }

  render() {
    const parsedParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    const data = this.props.apiDataWithParams.data || [];
    const totalPages = +this.props.apiDataWithParams.totalPages;
    const page = +parsedParams.page;

    const loading = this.checkForClientRender(parsedParams);
    return (
      <div className="static-data-param-view">
        <h1>Static Page + External Data + Query Params</h1>
        <h3>{Object.keys(parsedParams)} {page}</h3>
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
            className={`page-prev ${page === totalPages ? 'hidden' : ''}`}
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
