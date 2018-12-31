import basics from './basics'

const weddingMenu = {
  meta: {
    title: "The Wedding Menu",
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
              title: "The Silver",
              description: "",
              price: "*Lunch* $53.00 *-* *Dinner* $63.00",
              list: [
                "“[The Standard](#the-standard)” Menu",
                "Complimentary Entrées for Bride & Groom", "Choice of Two “[To Start](#to-start)” Displayed Appetizers", "Wine Service with Dinner *(two bottles per table)*", "Served Champagne & Sparkling Cider Toast", "Cake Cutting & Serving",
              ]
            },{
              title: "The Gold",
              description: "",
              price: "*Lunch* $64.00 *-* *Dinner* $74.00",
              list: [
                "“[The Grand Standard](#the-grand-standard)” Menu",
                "Complimentary Entrées for Bride & Groom",
                "90 Minute Limited Hosted Bar",
                "Choice of Three “[To Start](#to-start)” Displayed Appetizers", "Choice of Two Tray Passed Hors D’oeuvres",
                "Wine Service with Dinner *(two bottles per table)*",
                "Served Champagne & Sparkling Cider Toast",
                "10” Mirrored Round for Each Guest Table",
                "Cake Cutting & Serving",
              ]
            },{
              title: "The Platinum",
              description: "",
              price: "*Lunch* $78.00 *-* *Dinner* $88.00",
              list: [
                "“[The Choura Standard](#the-choura-standard)” Menu",
                "Complimentary Entrées for Bride & Groom",
                "90 Minute Hosted Bar w/ Signature Drink",
                "Choice of Three “[To Start](#to-start)” Displayed Appetizers",
                "Choice of Three Tray Passed Hors D’oeuvres",
                "Wine Service with Dinner *(two bottles per table)*",
                "Served Champagne & Sparkling Cider Toast",
                "10” Mirrored Round for Each Guest Table",
                "Chair Covers with Sash -or- Chiavari Chairs",
                "Cake Cutting & Serving",
                "Additional Event Hour",
              ]
            },
          ]
        },{
          type: "multi-item",
          title: "Say, 'I do...' Specials",
          items: [
            {
              title: "Garden Ceremony",
              description: "Have your wedding ceremony and reception in one space in The Garden Room and Patio. Minimum 100 guests.",
              price: "$10.00-$14.00 *per person*",
              items: [
                {
                  title: "Pricing",
                  list: [
                    "Without Reception $15.00 *per person*",
                    "With Reception $12.00 *per person*",
                  ]
                },{
                  title: "Includes",
                  list: [
                    "Iced Water Station",
                    "White Wood Chairs",
                    "Serene Garden Setting",
                    "Wedding Arch -or- Columns",
                    "White Aisle Runner",
                    "Bridal Suite – *Available on a 'First Come, First Served' Basis*",
                  ]
                },{
                  title: "Not Included",
                  list: [
                    "Groom’s Room, Wedding Coordinator, Photographer, Decorations, Clergy, and Music. *Referrals are available upon request*",
                  ]
                },
              ]
            },
          ]
        },{
          type: "multi-item",
          title: "Bridal Room Packages",
          description: "Each package is a flat cost and serves six people.",
          items: [
            {
              title: "Afternoon Treat",
              list: [
                "Ice Cream Bars",
                "Assorted Cookies",
                "Coffee, Decaf, Assorted Sodas",
              ],
              price: "$55.00",
            },{
              title: "Spice It Up",
              list: [
                "Mini Chicken Quesadillas",
                "Guacamole and Pico de Gallo",
                "Tortilla Chips",
                "Coffee, Decaf, Assorted Sodas",
              ],
              price: "$72.00",
            },{
              title: "Napa Valley",
              list: [
                "Marinated Olives, Goat Cheese, Grapes, and Crostinis Sliced Seasonal Fruit and Berries",
                "Coffee, Decaf, Tea, Mineral Water, Assorted Sodas",
              ],
              price: "$72.00",
            },{
              title: "Balance",
              list: [
                "Granola Bars",
                "Whole Fruit",
                "Vegetable Crudités with Dip",
                "Assorted Vitamin Water",
              ],
              price: "$82.00",
            },{
              title: "Time For Tea",
              list: [
                "Freshly Baked Scones",
                "Assorted Tea Sandwiches",
                "Strawberries with Whipped Cream",
                "Assorted Hot Teas",
              ],
              price: "$93.00",
            },{
              title: "Ultimate Relaxation",
              list: [
                "Premium House Chardonnay and Cabernet Sauvignon",
                "Gourmet Cheese Display with Dried Fruit and Nuts",
                "Seasonal Fruit Platter",
                "Assorted Breads & Crostinis",
                "Mineral Water",
              ],
              price: "139.00",
            },
          ]
        },
      ],
    },
    ...basics
  ]
}

export default weddingMenu
