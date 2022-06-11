import React from "react";

import ContentLoader from "react-content-loader";

const SearchList = (): JSX.Element => (
  <ContentLoader viewBox="0 0 750 700">
    {/* Only SVG shapes */}
    <rect x="24" y="0" rx="4" ry="4" width="702" height="50" />
    <rect x="24" y="60" rx="4" ry="4" width="702" height="50" />
    <rect x="24" y="120" rx="4" ry="4" width="702" height="50" />
    <rect x="24" y="180" rx="4" ry="4" width="702" height="50" />
    <rect x="24" y="240" rx="4" ry="4" width="702" height="50" />
    <rect x="24" y="300" rx="4" ry="4" width="702" height="50" />
    <rect x="24" y="360" rx="4" ry="4" width="702" height="50" />
  </ContentLoader>
);

export default SearchList;
