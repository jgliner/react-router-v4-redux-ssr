/*
  DynamicPage.tsx

  Child route of <Base> located at `/dynamic/:id`

  An example of a route with:
    - A dynamic URL that specifies params for `/dynamic`
    - Data dependencies, fetched on the server before rendering
    - No children

  Will 404 if `/dynamic` is requested without an id
*/

import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getDynamicApiData } from '../asyncActions';

import LoadingWrapper from '../component-utils/LoadingWrapper';

import './view-styles/DynamicPage.css';

interface IProps {
  callApiFromClient: Function;
  dynamicApiData: any;
}

class DynamicPage extends React.Component<IProps & RouteComponentProps<any>> {
  static loadData(store, match) {
    // See /src/views/StaticPageWithDataDeps for details on `static loadData()`

    // On the server, this is passed `react-router-config`'s matching URL
    // From here, we can extract `:id` via `match.params`
    return store.dispatch(getDynamicApiData(match.params.id));
  }

  constructor(props) {
    super(props);

    this.checkForClientRender = this.checkForClientRender.bind(this);
  }

  componentDidMount() {
    const clientRenders = this.checkForClientRender();
    if (clientRenders) {
      // if the client needs to render this and the data does not exist,
      // fetch the data, then render
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

    // the same criteria we used to check if the client side needed to fetch/render
    // is also used to see if the data is still loading
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

const mapStateToProps = (state): Partial<IProps> => ({
  dynamicApiData: state.dynamicApiData,
});

const mapDispatchToProps = (dispatch): Partial<IProps> => {
  return {
    callApiFromClient(id) {
      // dispatches async action (identical to the static loadData() function on the server)
      dispatch(getDynamicApiData(id));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DynamicPage));
