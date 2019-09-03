import React from 'react';
import CMS from 'netlify-cms-app';

// Templates
import ProjectPreview from '../static/admin/preview-templates/ProjectPreview';

const NetlifyCMS = () => {
  React.useEffect(() => {
    CMS.registerPreviewTemplate("projects", ProjectPreview);
  });

  return <div id="nc-root" />;
};

export default NetlifyCMS;
