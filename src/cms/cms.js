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

CMS.registerPreviewTemplate('basics', BasicPagePreview)
CMS.registerPreviewTemplate('basics appetizers', BasicPagePreview)
CMS.registerPreviewTemplate('basics mains', BasicPagePreview)
CMS.registerPreviewTemplate('basics mains shared', BasicPagePreview)
CMS.registerPreviewTemplate('basics sweets', BasicPagePreview)
CMS.registerPreviewTemplate('basics drinks', BasicPagePreview)
CMS.registerPreviewTemplate('classic menu', BasicPagePreview)
CMS.registerPreviewTemplate('corporate menu', BasicPagePreview)
CMS.registerPreviewTemplate('milestone menu', BasicPagePreview)
CMS.registerPreviewTemplate('wedding menu', BasicPagePreview)
