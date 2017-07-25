import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './view-styles/DynamicPage.css';

class DynamicPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dynamic-view">
        <h1>Dynamic Content</h1>
        <p>Foo bar baz qux quux corge</p>
        <br />
        <Link to="/">{'< Back Home'}</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedItem: state.selectedItem,
});

export default withRouter(connect(mapStateToProps)(DynamicPage));
