import milestoneMenuContent from './milestoneMenu.json'
import basics from './basics.json'

const milestoneMenu = {
  meta: {
    title: "The Milestone Menu",
    description: "",
    lastUpdated: "2018-12-29T18:35:35+0000",
    included: [
      "Five Hour Event Time",
      "Two Hour Access Window Prior to Event",
      "Customized Room Setup",
      "Choice of White or Ivory Linens",
      "Selection of Napkin Color(s)",
      "All China, Glassware, & Flatware",
      "Complimentary Parking for all Guests",
      "Uniformed Professional Staff",
    ],
    footer: "All Catering Services Incur a 22% Production Fee and Applicable Sales Tax",
  },
  items: [
    ...milestoneMenuContent.items,
    ...basics.items
  ]
}

export default milestoneMenu
