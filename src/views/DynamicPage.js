import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getDynamicApiData } from '../asyncActions.js';

import './view-styles/DynamicPage.css';

class DynamicPage extends React.Component {
  static loadData(store, match) {
    return store.dispatch(getDynamicApiData(match.params.id));
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = this.props.dynamicApiData;
    return (
      <div className="dynamic-view">
        <h1>Dynamic Content - {this.props.match.params.id}</h1>
        <div className={`dynamic-view-shape shape-${data.shape}`}>
          <p>{data.word}</p>
        </div>
        <Link to="/">{'< Back Home'}</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedItem: state.selectedItem,
  dynamicApiData: state.dynamicApiData,
});

export default withRouter(connect(mapStateToProps)(DynamicPage));
