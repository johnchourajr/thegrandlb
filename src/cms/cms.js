import CMS from 'netlify-cms'

import BasicPagePreview from './preview-templates/BasicPagePreview'
import SiteDetailsPreview from './preview-templates/SiteDetailsPreview'

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
