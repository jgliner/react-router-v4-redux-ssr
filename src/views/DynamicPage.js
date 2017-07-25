/*
  DynamicPage.js

  Child route of <Base> located at `/dynamic/:id`

  An example of a route with:
    - A dynamic URL that specifies params for `/dynamic`
    - Data dependencies, fetched on the server before rendering
    - No children

  Will 404 if `/dynamic` is requested without an id
*/

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getDynamicApiData } from '../asyncActions.js';

import './view-styles/DynamicPage.css';

class DynamicPage extends React.Component {
  static loadData(store, match) {
    // See /src/views/StaticPageWithDataDeps for details on `static loadData()`

    // On the server, this is passed `react-router-config`'s matching URL
    // From here, we can extract `:id` via `match.params`
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
  dynamicApiData: state.dynamicApiData,
});

export default withRouter(connect(mapStateToProps)(DynamicPage));
