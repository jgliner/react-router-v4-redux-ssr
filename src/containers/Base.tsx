/*
  Base.tsx

  The "root" component that persists throughout the app,
  contains client router logic
*/

import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';

import BaseRoutes from '../routing/BaseRoutes';

import './container-styles/Base.css';

interface IProps extends DispatchProp<any>, RouteComponentProps<any> {

}

class Base extends React.Component<IProps> {
  private renderCount: number;

  // No data to fetch, no static method needed
  constructor(props: IProps) {
    super(props);

    // good for debugging - avoid excessive rendering
    this.renderCount = 0;
  }

  render() {
    this.renderCount++;
    console.log('RENDERS:', this.renderCount)

    // --> /src/routing/BaseRoutes.ts
    return (
      <div className="app-base">
        <h1>Base</h1>
        <BaseRoutes {...this.props} />
      </div>
    );
  }
}

export default withRouter(connect()(Base));
