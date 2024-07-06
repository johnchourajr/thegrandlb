import * as prismic from '@prismicio/client'

const endpoint = prismic.getRepositoryEndpoint('grandmenus')
const accessToken = process.env.NEXT_PRISMIC_MENUS_TOKEN // Set an access token

export const getPrismicMenus = prismic.createClient(endpoint, { accessToken })