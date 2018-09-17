export const tourNav = {
  name: "Tour", path:  "/tour",
}

export const tourMapNav = {
  name: "Interactive Map", path:  "/tour/map",
}

export const eventsNav = {
  name: "Events", path:  "/events",
}

export const menusNav = {
  name: "Menus", path:  "/menus",
}

export const aboutNav = {
  name: "About", path:  "/about",
}

export const contactNav = {
  name: "Contact", path:  "/contact",
}

export const inquireNav = {
  name: "Inquire", path:  "/inquire",
}

export const mainNav = [
  { ...tourNav },
  { ...eventsNav },
  { ...menusNav },
  { ...aboutNav },
]

export const subNav = [
  { ...contactNav },
  { ...inquireNav },
]
