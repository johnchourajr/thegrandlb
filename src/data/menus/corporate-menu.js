import basics from './basics'

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
    {
      type: "section",
      title: "Specials",
      items: [
        {
          type: "multi-item",
          title: "Breakfast Packages",
          description: "30 guest minimum. $150 fee applies of minimum is not met.",
          items: [
            {
              title: "Continential Breakfast",
              description: "",
              price: "$49.50 *per person*",
              list: [
                "Assorted Mini Danishes, Breakfast Breads & Mini Muffins",
                "Seasonal Fruit Platter",
                "Orange Juice",
                "Freshly Brewed Coffee, Decaf, Iced Water, and Tazo Hot Tea – *served with biodegradable disposable ware unless otherwise requested*",
              ]
            },{
              title: "Morning Break",
              description: "",
              price: "$49.50 *per person*",
              list: [
                "Assorted Granola Bars",
                "Assorted Individual Yogurts",
                "Room Refresh",
              ]
            },
          ]
        },{
          type: "multi-item",
          title: "Lunch Packages",
          description: "30 guest minimum. $150 fee applies of minimum is not met.",
          items: [
            {
              title: "Served Lunch",
              description: "",
              price: "$49.50 *per person*",
              items: [
                {
                  title: "Included",
                  list: [
                    "Homemade Rolls with Butter",
                    "Fresh Garden Salad with Ranch & Balsamic Dressings",
                    "Steamed Vegetables",
                    "One Choice of Entrée",
                    "Chef's Choice Dessert",
                  ],
                },{
                  title: "Select One Entrée",
                  list: [
                    "Grand Chicken Marsala served with Garlic Mashed Potatoes",
                    "Lemon Rosemary Chicken served with Smashed Yukon Gold Potatoes",
                    "Roasted Beef Brisket served with Cheddar Leek Mash",
                    "Chicken -or- Eggplant Parmesan served with Fettuccine Marinara",
                  ],
                }
              ]
            },{
              title: "Deli Buffet",
              description: "",
              price: "$49.50 *per person*",
              items: [
                {
                  title: "Included",
                  list: [
                    "Fresh Fruit Platter",
                    "Garden Salad with Ranch & Balsamic Dressings",
                    "Create Your Own Sandwich Bar",
                  ],
                },{
                  title: "Sandwich Bar",
                  list: [
                    "Selection of Meats: Turkey, Ham, Roast Beef, and Salami",
                    "Selection of Cheeses: Cheddar, Provolone, and Swiss",
                    "Selection of Produce: Lettuce, Tomatoes, Pickles, Pepperoncini, and Olives",
                    "Assorted Bread & Rolls, Potato Chips, and Appropriate Condiments",
                    "Freshly Baked Cookies",
                  ],
                }
              ]
            },{
              title: "Afternoon Break",
              description: "",
              price: "$49.50 *per person*",
              list: [
                "Domestic Cheese Platter with Mixed Nuts & Dried Fruit",
                "Assorted Soft Drinks",
                "Room Refresh",
              ]
            },
          ]
        },
      ],
    },
  ]
}

export default weddingMenu
