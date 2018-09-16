import CMS from 'netlify-cms'

import BasicPagePreview from './preview-templates/BasicPagePreview'

CMS.registerPreviewStyle('/styles.css')
CMS.registerPreviewTemplate('home', BasicPagePreview)
CMS.registerPreviewTemplate('tour', BasicPagePreview)
CMS.registerPreviewTemplate('tour template', BasicPagePreview)
CMS.registerPreviewTemplate('events', BasicPagePreview)
CMS.registerPreviewTemplate('events template', BasicPagePreview)
CMS.registerPreviewTemplate('menus', BasicPagePreview)
CMS.registerPreviewTemplate('menus template', BasicPagePreview)
CMS.registerPreviewTemplate('about', BasicPagePreview)
CMS.registerPreviewTemplate('contact', BasicPagePreview)
CMS.registerPreviewTemplate('inquire', BasicPagePreview)
