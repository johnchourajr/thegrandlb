import basics from './basics'

const classicMenu = {
  meta: {
    title: "The Classic Menu",
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
      title: "Breakfast &\nBrunch",
      description: "Breakfast beverage service includes orange juice, regular and decaf coffee, and iced water – **served with biodegradable disposable ware unless otherwise requested**.",
      caption: "30 guest minimum; $150 Fee applies if minimum is not met.",
      items: [
        {
          type: "multi-item",
          title: "Served Breakfast",
          description: "",
          annotation: [
            "**Substitute Turkey Bacon or Sausage for additional $1.50 per person.",
            "**Substitute Egg Whites for additional $1.50 per person"
          ],
          items: [
            {title: "Cinnamon French Toast", description: "Two Slices Texas Toast, Scrambled Eggs & Bacon or Sausage, Maple Syrup, & Powdered Sugar", price: "$21.50 *per person*"},
            {title: "The All American", description: "Scrambled Eggs with Cheese, Choice of Bacon, Sausage or Ham, Hash Browns, & Fresh Fruit", price: "$21.50 *per person*"},
            {title: "Traditional Benedict", description: "Two English Muffins Topped with Canadian Bacon, Poached Eggs, & Chipotle Hollandaise Sauce (vegetarian option available upon request)", price: "$21.50 *per person*"},
            {title: "Fried Chicken & Waffles", description: "Buttermilk Brined, Oven Fried Chicken on top a Belgian Waffle & Chipotle Syrup", price: "$21.50 *per person*"},
            {title: "Breakfast Croissant", description: "Open-faced Croissant with Scrambled Eggs, Cheddar Cheese, & Canadian Bacon. Served with Fresh Fruit", price: "$21.50 *per person*"},
            {title: "Mexican Scramble", description: "Scrambled Eggs with Pico de Gallo & Chorizo, Tortillas and Choice of Bacon or Sausage", price: "$21.50 *per person*"},
          ],
        },{
          type: "multi-item",
          title: "Buffet Breakfast",
          description: "",
          items: [
            {title: "Continental Breakfast", description: "Assorted Breakfast Breads, Mini Muffins & Mini Danish", price: "$16.50 *per person*"},
            {title: "Deluxe Continental", description: "Assorted Breakfast Breads, Mini Muffins & Fresh Fruit", price: "$18.50 *per person*"},
            {title: "Healthy Continental", description: "Fresh Fruit, Individual Yogurts, Granola & Assorted Breakfast Breads", price: "$20.50 *per person*"},
          ],
        },{
          type: "multi-item",
          title: "*Build Your Own* Breakfast Buffet",
          description: "",
          price: "$20.50 *per person*",
          items: [
            {
              title: "Scrambeled Eggs _(Select One)_",
              list: [
                "With Cheese",
                "With Chorizo",
                "With Vegetables",
              ],
              price: "$18.95 *per person*",
            },{
              title: "Side 1 _(Select One)_",
              list: [
                "Hash Browns",
                "Country Potatoes - Peppers & Onions",
                "Skillet Potatoes - Ortega Chiles, Cumin & Onions, Sweet Potato Hash *(Add $0.75 per person)*",
              ],
              price: "$18.95 *per person*",
            },{
              title: "Side 2 _(Select One)_",
              list: [
                "Thick-Cut Bacon",
                "Sausage Patties",
                "Sausage Links",
                "Turkey Sausage Links *(Add $1.50 per person)*",
                "Turkey Bacon *(Add $1.50per person)*",
                "Morning Star Veggie Patties *(Add $1.50 per person)*",
              ],
              price: "$18.95 *per person*",
            },{
              title: "Side 3 _(Select One)_",
              list: [
                "Petite Croissants",
                "Mini Muffins",
                "Mini Bagels",
                "Zucchini Bread",
              ],
              price: "$18.95 *per person*",
            },
          ],
        },{
          type: "multi-item",
          title: "Brunch Buffet",
          description: "Brunch beverage service includes orange juice, regular and decaf coffee, and iced water – served with biodegradable disposable ware unless otherwise requested. 50 guest minimum; $150 Fee applies if minimum is not met. Have our Brunch Buffet for Dinner for an additional **$5.00 *per person***.",
          items: [
            {title: "The Standard", description: "Fresh Fruit, Assorted Breakfast Breads, Country Potatoes, Oven Fried Chicken w/ Gravy, Bacon, Sausage, Scrambled Eggs w/ Chives & Cheese, Build Your Own Salad Bar & one [Culinary Enhancement below](#culinary-breakfast-enhancements) (food only).",price: "$36.50 *per person*"},
          ],
        },{
          type: "multi-item",
          title: "Culinary Breakfast Enhancements",
          description: "$150 per attendant. One attendant per 50 guests recommeneded",
          items: [
            {title: "Waffle Bar", description: "Berries, Banana, Bacon Bits, Chocolate Chips, Whipped Cream, Syrup, Butter, & Powdered Sugar", price: "Add $8 *per person*"},
            {title: "Omelet Bar", description: "Cheddar, Feta, Mushroom, Spinach, Diced Tomato, Peppers, Onions, Scallions, Ham, Bacon, & Sausage", price: "Add $11 *per person*"},
            {
              title: "Carving Station _(Select One)_",
              list: [
                "Herb Roasted Prime Rib with Horseradish Cream & Au Jus", "Turkey Airline Breast with Cranberry Relish & Sage Gravy", "Smoked Pitt Ham with Honey Clove Orange Glaze & Ground Mustard",
              ],
              price: "Add $11 *per person*",
            },
            {
              title: "Juice Bar",
              description: "Carrots, Apples, Celery, Cucumber, Kale, Spinach, Beets, & Pineapple",
              price: "Add $8 *per person*"
            },{
              title: "Mimosa Station",
              description: "Champagne & Assorted Fruit Juices",
              price: "Add $7*per person per hour*"
            },
          ],
        },
      ],
    },
    ...basics
  ]
}

export default classicMenu
