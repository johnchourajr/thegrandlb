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

function goBack() {
  window.history.back();
}
