import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getApiData } from '../asyncActions.js';

import './view-styles/StaticPageWithDataDeps.css';

class StaticPageWithDataDeps extends React.Component {
  static loadData(store) {
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
  selectedItem: state.selectedItem,
  apiData: state.apiData,
});

export default withRouter(connect(mapStateToProps)(StaticPageWithDataDeps));
