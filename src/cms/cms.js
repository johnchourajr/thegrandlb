import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import BasicPagePreview from './preview-templates/BasicPagePreview'
import SiteDetailsPreview from './preview-templates/SiteDetailsPreview'

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewStyle('/styles.css')
CMS.registerPreviewTemplate('siteDetails', SiteDetailsPreview)
CMS.registerPreviewTemplate('tourPages', BasicPagePreview)

// CMS.registerPreviewTemplate('basics', BasicPagePreview)
// CMS.registerPreviewTemplate('basicsAppetizers', BasicPagePreview)
// CMS.registerPreviewTemplate('basicsMains', BasicPagePreview)
// CMS.registerPreviewTemplate('basicsMainsShared', BasicPagePreview)
// CMS.registerPreviewTemplate('basicsSweets', BasicPagePreview)
// CMS.registerPreviewTemplate('basicsDrinks', BasicPagePreview)
// CMS.registerPreviewTemplate('classicMenu', BasicPagePreview)
// CMS.registerPreviewTemplate('corporateMenu', BasicPagePreview)
// CMS.registerPreviewTemplate('milestoneMenu', BasicPagePreview)
// CMS.registerPreviewTemplate('weddingMenu', BasicPagePreview)
