// *********
// *********
// Nav Sections

export const homeNav = {
  name: "Home", path: "/",
}

export const tourNav = {
  name: "Tour", path: "/tour",
  subpages: [
    { name: "Overview", path: "/tour" },
    { name: "Interactive Map", path: "/tour/map" },
    { name: "The Grand Ballroom", path: "/tour/grand-ballroom" },
    { name: "The Catalina Room", path: "/tour/catalina-room" },
    { name: "The Monarch Room", path: "/tour/monarch-room" },
    { name: "The Garden Room", path: "/tour/garden-room" },
    { name: "The Pacific Room", path: "/tour/pacific-room" },
    { name: "The Board Room", path: "/tour/board-room" },
    { name: "The Palm Courtyard", path: "/tour/palm-courtyard" },
  ]
}

export const eventsNav = {
  name: "Events", path: "/events",
  subpages: [
    { name: "Overview", path: "/events" },
    { name: "For Weddings", path: "/events/weddings" },
    { name: "For Business", path: "/events/business" },
    { name: "For Milestones", path: "/events/milestones" },
  ]
}

export const menusNav = {
  name: "Menus", path: "/menus",
  subpages: [
    { name: "Overview", path: "/menus" },
    { name: "Classic Menu", path: "/menus/classic" },
    { name: "Weddings Menu", path: "/menus/weddings" },
    { name: "Business Menu", path: "/menus/business" },
    { name: "Milestones Menu", path: "/menus/milestones" },
  ]
}

export const aboutNav = {
  name: "About", path: "/about",
}

export const contactNav = {
  name: "Contact", path: "/contact",
}

export const inquireNav = {
  name: "Inquire", path: "/inquire",
}

export const twitterNav = {
  name: "twitter", path: "#",
}

export const facebookNav = {
  name: "facebook", path: "#",
}

export const instagramNav = {
  name: "instagram", path: "#",
}



// *********
// *********
// Nav Collections

export const mainNav = {
  left: [
    { ...tourNav },
    { ...eventsNav },
  ],
  right: [
    { ...menusNav },
    { ...aboutNav },
  ]
}

export const footerNav = {
  left: [
    { ...tourNav },
    { ...eventsNav },
    { ...menusNav },
    { ...aboutNav },
  ],
  right: [
    { ...contactNav },
    { ...inquireNav },
  ]
}

export const menuNav = [
  { ...homeNav },
  { ...tourNav },
  { ...eventsNav },
  { ...menusNav },
  { ...aboutNav },
  { ...contactNav },
  { ...inquireNav },
]

export const socialNav = [
  { ...twitterNav },
  { ...facebookNav },
  { ...instagramNav },
]

export const subNav = {
  name: null, path: '',
  subpages: [
    { ...aboutNav },
    { ...contactNav },
    { ...inquireNav },
  ]
}

export const allNav = [
  { ...homeNav },
  { ...tourNav },
  { ...eventsNav },
  { ...menusNav },
  { ...subNav },
]
