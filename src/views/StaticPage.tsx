/*
  StaticPage.tsx

  Child route of <Base> located at `/static`

  An example of a route with:
    - A static, pre-defined URL
    - No data dependencies
    - No children
*/

import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';

import './view-styles/StaticPage.css';

interface IProps extends DispatchProp<any>, RouteComponentProps<any> {
  // location: history.Location;
}

class StaticPage extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="static-view">
        <h1>Static Content</h1>
        <p>Foo bar baz qux quux corge</p>
        <br />
        <Link to="/">{'< Back Home'}</Link>
      </div>
    );
  }
}

export default withRouter(connect()(StaticPage));
