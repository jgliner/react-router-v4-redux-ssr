import React from 'react';

function LoadingWrapper({ isLoading, children }) {
  return isLoading ? (
    <div>LOADING...</div>
  ) : children;
}

export default LoadingWrapper;
