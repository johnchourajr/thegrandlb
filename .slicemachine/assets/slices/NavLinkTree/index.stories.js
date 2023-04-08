import MyComponent from '../../../../slices/NavLinkTree';

export default {
  title: 'slices/NavLinkTree'
}


export const _Default = () => <MyComponent slice={{"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"link_title":"diagram","link_source":{"link_type":"Web","url":"https://slicemachine.dev"}},"id":"_Default","slice_type":"nav_link_tree"}} />
_Default.storyName = ''

export const _WithChildren = () => <MyComponent slice={{"variation":"withChildren","version":"sktwi1xtmkfgx8626","items":[{"child_link_title":"composed","child_link_source":{"link_type":"Web","url":"http://twitter.com"}}],"primary":{"link_title":"basis","link_source":{"link_type":"Web","url":"http://google.com"}},"id":"_WithChildren","slice_type":"nav_link_tree"}} />
_WithChildren.storyName = ''

export const _ForMenus = () => <MyComponent slice={{"variation":"forMenus","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"link_title":"effect","link_source":{"link_type":"Web","url":"https://slicemachine.dev"}},"id":"_ForMenus","slice_type":"nav_link_tree"}} />
_ForMenus.storyName = ''
