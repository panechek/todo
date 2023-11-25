import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceleton: React.FC = () => (
    <ContentLoader 
    speed={2}
    width={200}
    height={35}
    viewBox="0 0 196 30"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="4" ry="4" width="200" height="30" />
  </ContentLoader>
);

export default Sceleton;