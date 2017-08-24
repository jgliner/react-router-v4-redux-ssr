import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getApiData } from '../asyncActions.js';

import LoadingWrapper from '../component-utils/LoadingWrapper.js';

import './view-styles/StaticPageWithDataDeps.css';

class StaticPageWithDataDeps extends React.Component {
  static loadData(store) {
    return store.dispatch(getApiData());
  }

  constructor(props) {
    super(props);

    this.checkForClientRender = this.checkForClientRender.bind(this);
  }

  componentDidMount() {
    const clientRenders = this.checkForClientRender();
    if (clientRenders) {
      console.log('Client must fetch and render');
      this.props.callApiFromClient();
    }
    else {
      console.log('No new data needed!');
    }
  }

  checkForClientRender() {
    return !Object.keys(this.props.apiData).length;
  }

  render() {
    const data = this.props.apiData;
    const loading = this.checkForClientRender();
    return (
      <div className="static-data-view">
        <h1>Static Page + External Data</h1>
        <LoadingWrapper isLoading={loading}>
          <div>
            {
              Object.keys(data).map((dataKey, i) => (
                <p key={i}>{dataKey} -- {data[dataKey]}</p>
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
  apiData: state.apiData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    callApiFromClient() {

      dispatch(getApiData());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StaticPageWithDataDeps));
