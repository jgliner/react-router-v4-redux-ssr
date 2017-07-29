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
    // CDM is only called on the CLIENT - if the situation calls for it, feel free
    // to use `document` or `window` objects here
    const clientRenders = this.checkForClientRender();
    if (clientRenders) {
      console.info('Client must fetch and render');
      // if the client needs to render this and the data does not exist,
      // fetch the data, then render...
      this.props.callApiFromClient();
    }
    else {
      console.info('No new data needed!');
    }
  }

  checkForClientRender() {
    return this.props.apiDataParams.length === 0;
  }

  render() {
    const data = this.props.apiDataParams;

    // the same criteria we used to check if the client side needed to fetch/render
    // is also used to see if the data is still loading - pass this status into
    // <LoadingWrapper> (located in /src/component-utils/LoadingWrapper.js)
    const loading = this.checkForClientRender();
    return (
      <div className="static-data-view">
        <h1>Static Page + External Data</h1>
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
    callApiFromClient() {
      // dispatches async action (identical to the static loadData() function on the server)
      dispatch(getApiDataWithParams());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StaticDataDepsParams));
