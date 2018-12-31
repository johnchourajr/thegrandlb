import basics from './basics'

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
    {
      type: "section",
      title: "Specials",
      items: [
        {
          type: "multi-item",
          title: "Lunch and Dinner Packages",
          items: [
            {
              title: "The Ruby",
              description: "",
              price: "*Lunch* $35.50 *-* *Dinner* $44.00",
              list: [
                "“[The Standard](#the-standard)” Menu", "Complimentary Entrée for Guest of Honor", "Fruit Punch -or- Lemonade Station", "Served Champagne & Sparkling Cider Toast", "Cake Cutting & Serving",
              ]
            },{
              title: "The Pearl",
              description: "",
              price: "*Lunch* $42.00 *-* *Dinner* $55.00",
              list: [
                "“[The Grand Standard](#the-grand-standard)” Menu", "Complimentary Entrée for Guest of Honor", "Fruit Punch -or- Lemonade Station", "Unlimited Soft Drinks", "Served Champagne & Sparkling Cider Toast", "Cake Cutting & Serving", "10” Mirrored Round for Each Guest Table",
              ]
            },{
              title: "The Diamond",
              description: "",
              price: "*Lunch* $49.00 *-* *Dinner* $65.00",
              list: [
                "“[The Choura Standard](#the-choura-standard)” Menu", "Complimentary Entrée for Guest of Honor", "Fruit Punch -or- Lemonade Station", "Unlimited Soft Drinks", "Served Champagne & Sparkling Cider Toast", "Chocolate Fountain with Five Dipping Items", "Cake Cutting & Serving", "10” Mirrored Round for Each Guest Table", "Chair Covers with Sash -or- Chiavari Chairs", "Additional Event Hour"
              ]
            },
          ]
        }
      ],
    },
    ...basics
  ]
}

export default milestoneMenu
