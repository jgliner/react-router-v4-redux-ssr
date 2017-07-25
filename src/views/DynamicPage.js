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

  componentDidMount() {
    const clientRenders = (
      !Object.keys(this.props.dynamicApiData).length ||
      this.props.match.params.id !== this.props.dynamicApiData.id
    );
    if (clientRenders) {
      console.info('Client must fetch and render');
      // if the client needs to render this and the data does not exist,
      // fetch the data, then render
      this.props.callApiFromClient(this.props.match.params.id);
    }
    else {
      console.info('No new data needed!');
    }
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

const mapDispatchToProps = (dispatch) => {
  return {
    callApiFromClient(id) {
      // dispatches async action (identical to the static loadData() function on the server)
      dispatch(getDynamicApiData(id));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DynamicPage));
