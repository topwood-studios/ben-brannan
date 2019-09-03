import React from 'react';
import ProjectPreview from '../static/admin/preview-templates/ProjectPreview';

let CMS = null;
if (typeof window !== 'undefined') {
  CMS = require('netlify-cms-app'); // eslint-disable-line
}
// import CMS from 'netlify-cms-app';

// Templates

const NetlifyCMS = () => {
  React.useEffect(() => {
    CMS.registerPreviewTemplate("projects", ProjectPreview);
  }, [CMS]);

  return <div id="nc-root" />;
};

export default NetlifyCMS;
