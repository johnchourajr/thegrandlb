import CMS from 'netlify-cms'

import BasicPagePreview from './preview-templates/BasicPagePreview'

CMS.registerPreviewStyle('/styles.css')
CMS.registerPreviewTemplate('home', BasicPagePreview)
CMS.registerPreviewTemplate('about', BasicPagePreview)
CMS.registerPreviewTemplate('contact', BasicPagePreview)
CMS.registerPreviewTemplate('inquire', BasicPagePreview)
CMS.registerPreviewTemplate('tour', BasicPagePreview)
CMS.registerPreviewTemplate('events', BasicPagePreview)

CMS.registerPreviewTemplate('basics', BasicPagePreview)
CMS.registerPreviewTemplate('classic menu', BasicPagePreview)
CMS.registerPreviewTemplate('corporate menu', BasicPagePreview)
CMS.registerPreviewTemplate('milestone menu', BasicPagePreview)
CMS.registerPreviewTemplate('wedding menu', BasicPagePreview)
