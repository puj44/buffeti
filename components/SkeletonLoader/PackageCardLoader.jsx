import React from "react";

function PackageCardLoader() {
  return (
    <div className="skeleton pdp">
      <div className="shimmer-wrapper">
        <div className="shimmer"></div>
        <div className="w-full h-full contents ">
          <div className="shimmer-text"></div>
          <div className="shimmer-text"></div>
        </div>
      </div>
    </div>
  );
}

export default PackageCardLoader;
