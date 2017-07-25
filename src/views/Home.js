import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './view-styles/Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-view">
        <h1>Home</h1>
        <br />
        <div>
          <Link to="/static">Static Page Example</Link>
          <Link to="/plusDataDeps">Static Route + External Data Example</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedItem: state.selectedItem,
});

export default withRouter(connect(mapStateToProps)(Home));
