import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'qs';

import { getApiDataWithParams } from '../asyncActions.js';

import LoadingWrapper from '../component-utils/LoadingWrapper.js';

import './view-styles/StaticDataDepsParams.css';

class StaticDataDepsParams extends React.Component {
  constructor(props) {
    super(props);

    this.checkForClientRender = this.checkForClientRender.bind(this);
  }

  componentDidMount() {
    const parsedParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    const clientRenders = this.checkForClientRender(parsedParams);
    if (clientRenders) {
      console.log('Client must fetch and render');
      this.props.callApiFromClient(parsedParams);
    }
    else {
      console.log('No new data needed!');
    }
  }

  componentDidUpdate(prevProps) {
    const parsedParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    if (prevProps.location.search !== this.props.location.search) {

      this.props.callApiFromClient(parsedParams);
    }
    return +this.props.currentPage !== +parsedParams.page;
  }

  checkForClientRender(parsedParams) {
    if (Object.keys(this.props.apiDataWithParams).length && parsedParams) {
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
      dispatch(getApiDataWithParams(params));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StaticDataDepsParams));
