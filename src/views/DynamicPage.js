import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getDynamicApiData } from '../asyncActions.js';

import LoadingWrapper from '../component-utils/LoadingWrapper.js';

import './view-styles/DynamicPage.css';

class DynamicPage extends React.Component {
  constructor(props) {
    super(props);

    this.checkForClientRender = this.checkForClientRender.bind(this);
  }

  componentDidMount() {
    const clientRenders = this.checkForClientRender();
    if (clientRenders) {
      this.props.callApiFromClient(this.props.match.params.id);
    }
    else {
      console.log('No new data needed!');
    }
  }

  checkForClientRender() {
    return (
      !Object.keys(this.props.dynamicApiData).length ||
      this.props.match.params.id !== this.props.dynamicApiData.id
    );
  }

  render() {
    const data = this.props.dynamicApiData;
    const loading = this.checkForClientRender();
    return (
      <div className="dynamic-view">
        <h1>Dynamic Content - {this.props.match.params.id}</h1>
        <LoadingWrapper isLoading={loading}>
          <div className={`dynamic-view-shape shape-${data.shape}`}>
            <p>{data.word}</p>
          </div>
        </LoadingWrapper>
        <Link to="/">{'< Back Home'}</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dynamicApiData: state.dynamicApiData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    callApiFromClient(id) {

      dispatch(getDynamicApiData(id));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DynamicPage));
