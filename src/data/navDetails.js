// *********
// *********
// Nav Sections

export const homeNav = {
  name: 'Home',
  path: '/'
};

export const tourNav = {
  name: 'Tour',
  path: '/tour',
  subpages: [
    { name: 'Overview', path: '/tour' },
    { name: 'Interactive Map', path: '/tour/map' },
    { name: 'The Grand Ballroom', path: '/tour/grand-ballroom' },
    { name: 'The Catalina Room', path: '/tour/catalina-room' },
    { name: 'The Monarch Room', path: '/tour/monarch-room' },
    { name: 'The Garden Room', path: '/tour/garden-room' },
    { name: 'The Pacific Room', path: '/tour/pacific-room' },
    { name: 'The Board Room', path: '/tour/board-room' },
    { name: 'The Palm Terrace', path: '/tour/palm-terrace' }
  ]
};

export const eventsNav = {
  name: 'Events',
  path: '/events',
  subpages: [
    { name: 'Overview', path: '/events' },
    { name: 'For Weddings', path: '/events/weddings' },
    { name: 'For Business', path: '/events/business' },
    { name: 'For Milestones', path: '/events/milestones' }
  ]
};

export const menusNav = {
  name: 'Menus',
  path: '/menus',
  subpages: [
    { name: 'Overview', path: '/menus' },
    { name: 'Classic Menu', path: '/menus/classic' },
    { name: 'For Weddings', path: '/menus/weddings' },
    { name: 'For Business', path: '/menus/business' },
    { name: 'For Milestones', path: '/menus/milestones' }
  ]
};

export const orderNav = {
  name: 'Order Online↗︎',
  path: 'https://grandfb.square.site',
  externalPath: true
};

export const aboutNav = {
  name: 'About',
  path: '/about'
};

export const contactNav = {
  name: 'Contact',
  path: '/contact'
};

export const inquireNav = {
  name: 'Inquire',
  path: '/inquire'
};

export const privacyNav = {
  name: 'Privacy Policy',
  path: '/privacy'
};

export const twitterNav = {
  name: 'twitter',
  displayName: 'Twitter',
  path: '#'
};

export const facebookNav = {
  name: 'facebook',
  displayName: 'Facebook',
  path: 'https://www.facebook.com/TheGrandLB'
};

export const instagramNav = {
  name: 'instagram',
  displayName: 'Instagram',
  path: 'https://www.instagram.com/thegrandlb/'
};

// *********
// *********
// Nav Collections

export const moreNav = {
  name: 'More',
  path: '/about',
  subpages: [{ ...aboutNav }, { ...contactNav }, { ...inquireNav }]
};

export const mainNav = {
  left: [{ ...tourNav }, { ...eventsNav }],
  right: [{ ...menusNav }, { ...moreNav }]
};

export const footerNav = {
  left: [{ ...homeNav }, { ...tourNav }, { ...eventsNav }, { ...menusNav }],
  right: [{ ...aboutNav }, { ...contactNav }, { ...privacyNav }]
};

export const menuNav = [
  { ...homeNav },
  { ...tourNav },
  { ...eventsNav },
  { ...menusNav },
  { ...aboutNav },
  { ...contactNav },
  { ...inquireNav }
];

export const socialNav = [
  // { ...twitterNav },
  { ...facebookNav },
  { ...instagramNav }
];

export const subNav = {
  name: null,
  path: '',
  subpages: [{ ...aboutNav }, { ...contactNav }, { ...inquireNav }]
};

export const allNav = [
  { ...homeNav },
  { ...tourNav },
  { ...eventsNav },
  { ...menusNav },
  { ...subNav }
];
