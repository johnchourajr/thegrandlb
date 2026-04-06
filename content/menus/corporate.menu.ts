import type { MenuDoc } from "content/types";

const corporateMenu: MenuDoc = {
  uid: "corporate",
  page_title: `Our Corporate Menu`,
  page_description: `Our corporate menu is perfect for your business lunch or team offsite.`,
  page_disclaimer: `Add 22% production fee and applicable sales tax to all menus`,
  groups: [
    {
      title: `Corporate Package`,
      description: `All Packages Include
5 Hour Event Time, Two Hour Access Window Prior to Event Start, Customized Room Setup, Choice of White, Black or Ivory Linens for all Tables, Selection of Napkin Color(s), All China, Glassware & Flatware, Complimentary Parking for all Guests, and Uniformed, Professional Staff.
$81.75 per person`,
      disclaimer: "",
      sections: [
        {
          primary: {
            title: [
                          { type: "heading2", text: "Breakfast", spans: [] },
                        ],
            description: [
                          { type: "paragraph", text: "30 guest minimum. $150 fee applies if minimum is not met.", spans: [] },
                        ],
            caption: [],
          },
          items: [
            {
              title: [
                              { type: "heading4", text: "Continental Breakfast", spans: [] },
                            ],
              description: [
                              { type: "list-item", text: "Assorted Mini Danishes, Breakfast Breads & Mini Muffins", spans: [] },
                              { type: "list-item", text: "Seasonal Fruit Platter", spans: [] },
                              { type: "list-item", text: "Orange Juice", spans: [] },
                              { type: "list-item", text: "Freshly Brewed Coffee, Decaf, Iced Water, and Tazo Hot Tea – served with biodegradable disposable ware unless otherwise requested", spans: [{"start": 61, "end": 129, "type": "em"}] },
                            ],
              price_per: "per person",
              price_min: 81.75,
              price_max: 0,
            },
            {
              title: [
                              { type: "heading4", text: "Morning Break", spans: [] },
                            ],
              description: [
                              { type: "list-item", text: "Assorted Granola Bars", spans: [] },
                              { type: "list-item", text: "Assorted Individual Yogurts", spans: [] },
                              { type: "list-item", text: "Room Refresh", spans: [] },
                            ],
              price_per: "included",
              price_min: 81.75,
              price_max: 0,
            },
          ],
        },
        {
          primary: {
            title: [
                          { type: "heading2", text: "Lunch", spans: [] },
                        ],
            description: [
                          { type: "paragraph", text: "choose Served Lunch or Deli Buffet", spans: [] },
                        ],
            caption: [],
          },
          items: [
            {
              title: [
                              { type: "heading4", text: "Served Lunch", spans: [] },
                            ],
              description: [
                              { type: "paragraph", text: "Included", spans: [] },
                              { type: "list-item", text: "Homemade Rolls with Butter", spans: [] },
                              { type: "list-item", text: "Fresh Garden Salad with Ranch & Balsamic Dressings", spans: [] },
                              { type: "list-item", text: "Steamed Vegetables", spans: [] },
                              { type: "list-item", text: "One Choice of Entrée", spans: [] },
                              { type: "list-item", text: "Chef's Choice Dessert", spans: [] },
                              { type: "paragraph", text: "Select One Entrée", spans: [] },
                              { type: "list-item", text: "Grand Chicken Marsala served with Garlic Mashed Potatoes", spans: [] },
                              { type: "list-item", text: "Lemon Rosemary Chicken served with Smashed Yukon Gold Potatoes", spans: [] },
                              { type: "list-item", text: "Roasted Beef Brisket served with Cheddar Leek Mash", spans: [] },
                              { type: "list-item", text: "Chicken -or- Eggplant Parmesan served with Fettuccine Marinara", spans: [] },
                            ],
              price_per: "per person",
              price_min: 81.75,
              price_max: 0,
            },
            {
              title: [
                              { type: "heading4", text: "Deli Buffet", spans: [] },
                            ],
              description: [
                              { type: "paragraph", text: "Included", spans: [] },
                              { type: "list-item", text: "Fresh Fruit Platter", spans: [] },
                              { type: "list-item", text: "Garden Salad with Ranch & Balsamic Dressings", spans: [] },
                              { type: "list-item", text: "Create Your Own Sandwich Bar", spans: [] },
                              { type: "paragraph", text: "Sandwich Bar", spans: [] },
                              { type: "list-item", text: "Selection of Meats: Turkey, Ham, Roast Beef, and Salami", spans: [] },
                              { type: "list-item", text: "Selection of Cheeses: Cheddar, Provolone, and Swiss", spans: [] },
                              { type: "list-item", text: "Selection of Produce: Lettuce, Tomatoes, Pickles, Pepperoncini, and Olives", spans: [] },
                              { type: "list-item", text: "Assorted Bread & Rolls, Potato Chips, and Appropriate Condiments", spans: [] },
                              { type: "list-item", text: "Freshly Baked Cookies", spans: [] },
                            ],
              price_per: "per person",
              price_min: 81.75,
              price_max: 0,
            },
            {
              title: [
                              { type: "heading4", text: "Afternoon Break", spans: [] },
                            ],
              description: [
                              { type: "list-item", text: "Domestic Cheese Platter with Mixed Nuts & Dried Fruit", spans: [] },
                              { type: "list-item", text: "Assorted Soft Drinks", spans: [] },
                              { type: "list-item", text: "Room Refresh", spans: [] },
                            ],
              price_per: "included",
              price_min: 0,
              price_max: 0,
            },
          ],
        },
      ],
    },
  ],
};

export default corporateMenu;
