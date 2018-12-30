import classicMenu from '../../data/menus/classic-menu'
import corporateMenu from '../../data/menus/corporate-menu'
import milestoneMenu from '../../data/menus/milestone-menu'
import weddingMenu from '../../data/menus/wedding-menu'

export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    var intlCode = (match[1] ? '+1 ' : '')
    return [intlCode, '', match[2], '.', match[3], '.', match[4]].join('')
  }
  return null
}

export function addressLink(address1, address2) {
  var address1Cleaned = slugify(address1)
  var address2Cleaned = slugify(address2)
  var url = 'https://www.google.com/maps/place/'
  return [url, address1Cleaned, ',+', address2Cleaned, '/',].join('')
}

export function mobileMenuToggle() {
  const html = document.documentElement
  const body = document.body
  const nav = document.getElementById("nav")
  const clickEl = document.getElementById("nav--mobile-menu")
  const menuEl = document.getElementById("nav--mobile-menu--overlay")

  if (clickEl.classList.value.includes(`active`)) {
    html.classList.remove(`active--mobile-menu`)
    clickEl.classList.remove(`active`)
    menuEl.classList.remove(`active`)
    nav.classList.remove(`mobile-nav-active`)
  } else {
    html.classList.add(`active--mobile-menu`)
    clickEl.classList.add(`active`)
    menuEl.classList.add(`active`)
    nav.classList.add(`mobile-nav-active`)
  }
}

export function mobileNavNav() {
  mobileMenuToggle()
}

export function goBack() {
  window.history.back();
}

export function getQueryVariable(variable) {
  if (window) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    // console.log('Query variable %s not found', variable);
  }
}

export function outputMenuData(key) {
  let data
  switch(key) {
    case "classicMenu" || "classic" :
      data = classicMenu
      break;
    case "corporateMenu" || "corporate" :
      data = corporateMenu
      break;
    case "milestoneMenu" || "milestone" :
      data = milestoneMenu
      break;
    case "weddingMenu" || "wedding" :
      data = weddingMenu
      break;
    default:
      data = classicMenu
      break;
  }
  return data
}

String.prototype.replaceAll = function(searchStr, replaceStr) {
  var str = this;

  // escape regexp special characters in search string
  searchStr = searchStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  return str.replace(new RegExp(searchStr, 'gi'), replaceStr);
}
