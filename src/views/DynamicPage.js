import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getApiData } from '../asyncActions.js';

import './view-styles/DynamicPage.css';

class DynamicPage extends React.Component {
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
      <div className="dynamic-view">
        <h1>Dynamic Content</h1>
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

export default withRouter(connect(mapStateToProps)(DynamicPage));
