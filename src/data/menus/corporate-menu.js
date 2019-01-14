import corporateMenuContent from './corporateMenu.json'

const weddingMenu = {
  meta: {
    title: "The Corporate Menu",
    description: "",
    lastUpdated: "2018-12-29T18:35:35+0000",
    included: [
      "30 Person Minimum",
    ],
    footer: "All Catering Services Incur a 22% Production Fee and Applicable Sales Tax",
  },
  items: [
    ...corporateMenuContent.items
  ]
}

export default weddingMenu
