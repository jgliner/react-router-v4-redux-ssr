/*
  LoadingWrapper.tsx

  Standalone "dumb" component that either returns a loading message,
  or the children located within `<LoadingWrapper>` tags based on the status
  passed in
*/

import * as React from 'react';

function LoadingWrapper({ isLoading, children }) {
  return isLoading ? (
    <div>LOADING...</div>
  ) : children;
}

export default LoadingWrapper;
