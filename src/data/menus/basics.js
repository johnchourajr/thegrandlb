const basics = [
  {
    type: "section",
    title: "Appetizers",
    description: "",
    caption: "",
    items: [
      {
        type: "multi-item",
        title: "To Start",
        description: "Displayed - *A la Carte*",
        items: [
          {title: "Domestic Cheese Platter", description: "Domestic Cheese, Dried Fruit, Roasted Rosemary Nuts, & Assorted Crackers", price: "$4.00 *per person*"},
          {title: "Gourmet Cheese Platter", description: "Gourmet Cheese, Dried Fruit, & Roasted Rosemary Nuts. Add Assorted Crostinis & Crackers *(Add $1.50 per person)*", price: "$4.00 *per person*"},
          {title: "Fruit Platter", description: "Assorted Seasonal Melon & Berries", price: "$4.00 *per person*"},
          {title: "Vegetable Crudités", description: "Herb Ranch Dip", price: "$4.00 *per person*"},
          {title: "Antipasto Platter", description: "Assorted Cured Meats, Marinated Artichoke Hearts, Assorted Olives, & Roasted Peppers", price: "$4.00 *per person*"},
          {title: "Roasted Garlic Hummus", description: "Served with Pita Chips. Add Grilled Vegetables *(Add $2.00 per person)*", price: "$4.00 *per person*"},
        ],
      },{
        type: "multi-item",
        title: "Cold Hors D’oeuvres",
        description: "Chilled and ready to eat.\n$6.00 per person for Tray Passed or\n$5.00 per person for displayed",
        items: [
          {title: "Antipasto Skewers", description: "Cherry Tomatoes, Olives, Marinated Artichoke Hearts, & Bocconcini Mozzarella", price: "$6.00 *per person*"},
          {title: "Chopped Heirloom Tomato Salad", description: "Baby Arugula, Crushed Pistachios, Goat Cheese, Basil & Dijon Vinaigrette on Endive Spear", price: "$6.00 *per person*"},
          {title: "Sesame Crusted Goat Cheese", description: "on Wonton Crisp", price: "$6.00 *per person*"},
          {title: "Ahi Poke", description: "Tuna, Soy Sauce, Black Sesame Seeds, and Scallions on a Wonton Crisp", price: "$6.00 *per person*"},
          {title: "White Fish Ceviche", description: "on Tostada Round", price: "$6.00 *per person*"},
          {title: "Grilled Peach Crostini", description: "Balsamic Glaze, Goat Cheese & Honey Drizzle", price: "$6.00 *per person*"},
          {title: "NY Steak Crostini", description: "Caramelized Onions & Gorgonzola Cream", price: "$6.00 *per person*"},
          {title: "Open Faced NY Steak Sandwich Bite", description: "Arugula & Spicy Aioli", price: "$6.00 *per person*"},
          {title: "Jumbo Shrimp", description: "Cocktail Sauce & Lemon Wedges", price: "$7.50 *per person*"},
          {title: "Grilled Shrimp", description: "Thai Chili Sauce", price: "$7.50 *per person*"},
          {title: "Pan Seared Ahi", description: "Cucumber Slice with Japanese Spice, Pickled Onions, & Sriracha Aioli", price: "$6.00 *per person*"},
          {title: "Fresh Spring Rolls", description: "Green Tea Soba Noodles, Thai Basil, Cucumber, Mint, & Spicy Hoisin", price: "$6.00 *per person*"},
          {title: "Caprese Skewers", description: "Cherry Tomato, Bocconcini Mozzarella, Fresh Basil, & Basil Pesto", price: "$6.00 *per person*"},
          {title: "Roasted Artichoke Crostini", description: "Fennel Herb Goat Cheese", price: "$6.00 *per person*"},
        ],
      },{
        type: "multi-item",
        title: "Warm Hors D’oeuvres",
        description: "Warm and ready to eat.\n$6.00 per person for Tray Passed or\n$5.00 per person for displayed",
        items: [
          {title: "Homemade Meatballs", description: "Select One: Teriyaki, Turkey, or Italian", price: "$6.00 *per person*"},
          {title: "Buffalo Chicken Drumettes", description: "Served with Ranch Dressing", price: "$6.00 *per person*"},
          {title: "Crispy Chicken Egg Rolls", description: "Served with Sweet + Sour Dipping Sauce", price: "$6.00 *per person*"},
          {title: "Pork & Shrimp Egg Rolls", description: "Served with Sweet Chili Hoisin Sauce", price: "$6.00 *per person*"},
          {title: "Chicken Satay", description: "Select One: Served with Spicy Peanut Sauce, Tikka Masala Sauce, or Teriyaki Pineapple", price: "$6.00 *per person*"},
          {title: "Spanakopita", description: "Flaky Phyllo Stuffed with Spinach & Feta Cheese", price: "$6.00 *per person*"},
          {title: "Sicilian Stuffed Mushrooms", description: "Sicilian Sausage & Cheddar", price: "$6.00 *per person*"},
          {title: "Yucatan Beef Empanadas", description: "Served with Avocado Crème", price: "$6.00 *per person*"},
          {title: "Mini Beef Wellington", description: "Tender Beef Wrapped in Puff Pastry with Sautéed Mushrooms & Shallots Duxelle, & Madera Wine Demi Glaze", price: "$6.00 *per person*"},
          {title: "Lump Crab Cakes", description: "Served with Cilantro Lime Aioli Mongolian Beef Skewers - with Grilled Scallions", price: "$6.00 *per person*"},
          {title: "Short Rib Quesadilla", description: "Served with Chipotle Crème", price: "$6.00 *per person*"},
          {title: "Soup Shooter", description: "Select One: Tomato Bisque, Butternut Squash, or Mushroom Cream", price: "$6.00 *per person*"},
          {title: "Angus Beef Slider", description: "Bleu Cheese & Port Wine Pickled Onions", price: "$7.00 *per person*"},
          {title: "Tikka Masala Taco", description: "Chicken Tikka Masala, Cilantro & Cucumber Raita", price: "$6.00 *per person*"},
          {title: "Italian Surf & Turf", description: "Shrimp Scampi and Italian Sausage Bite", price: "$6.00 *per person*"},
          {title: "Lobster Corndogs", description: "Served with Green Peppercorn Aioli", price: "$7.50 *per person*"},
        ],
      },
    ],
  },{
    type: "section",
    title: "Main Courses",
    description: "Served Meals. All entrées include homemade rolls & butter, one [gourmet salad](#salad), one [starch](#starch), one [vegetable](#vegetable), & [dessert](#sweets). Beverage service includes coffee, iced tea & iced water – served with biodegradable disposable ware unless otherwise requested. For split menu *(Add $3.00 per person)*. For buffet choose additional salad & entrée *(Add $4.00 per person)*.",
    caption: "",
    items: [
      {
        type: "multi-item",
        title: "The Standard",
        description: "Choose one.\n$31.50 for Lunch and $39.50 for Dinner *per person*.\nChoose two options for a duet plate *(Add $3.00 per person)*.",
        price: "",
        items: [
          {title: "Lemon Rosemary Chicken", description: "Bone-in Chicken Breast with Lemon Caper Beurre Blanc", price: "$31.50/$39.50 *per person*"},
          {title: "Chicken Parmesan", description: "Parmesan Panko Crusted Chicken Breast with Provolone & Basil Marinara Sauce", price: "$31.50/$39.50 *per person*"},
          {title: "Chicken Marsala", description: "Bone-in Chicken Breast with Sautéed Mushrooms, Caramelized Onions, & Marsala Wine Sauce", price: "$31.50/$39.50 *per person*"},
          {title: "Beef Brisket", description: "Fork Tender Roasted Beef Brisket with Natural Jus", price: "$31.50/$39.50 *per person*"},
          {title: "Spiced Pork Loin", description: "Roasted Poblano Ancho Chile Demi", price: "$31.50/$39.50 *per person*"},
          {title: "Asian Inspired Salmon", description: "Shiitake Mushrooms, Bok Choy, & Sweet Soy Reduction", price: "$33.00/$42.00 *per person*"},
        ],
      },{
        type: "multi-item",
        title: "The Grand Standard",
        description: "Choose one.\n$35.50 for Lunch and $43.50 for Dinner *per person*.\nChoose two options for a duet plate *(Add $4.50 per person)*.",
        price: "",
        items: [
          {title: "Chicken Wellington", description: "Boneless Chicken Breast Wrapped in Puff Pastry with Sautéed Mushrooms & Shallots Duxelle, & Madera Wine Demi Glaze", price: "$35.50/$43.50 *per person*"},
          {title: "California Chicken", description: "Grilled Chicken Breast with Balsamic Marinated Artichoke Hearts, Roma Tomatoes, Sun Dried Tomato, Kalamata Olives, Capers, Garlic, Toasted Pine Nuts & Fresh Basil", price: "$35.50/$43.50 *per person*"},
          {title: "Beef Stroganoff", description: "Braised Filet Mignon Beef Tips, Mushrooms, & Demi Sauce", price: "$35.50/$43.50 *per person*"},
          {title: "Bistecca", description: "Grilled Tri Tip with Fresh Lemon, Garlic, Shaved Parmesan, & Tomato Basil Vinaigrette", price: "$35.50/$43.50 *per person*"},
          {title: "Red Snapper", description: "Served with Chipotle Cream & Roasted Poblano Chiles", price: "$35.50/$43.50 *per person*"},
          {title: "Pistachio Crusted Mahi Mahi", description: "Served with Mango Relish", price: "$35.50/$43.50 *per person*"},
          {title: "Coconut Crusted Salmon", description: "Served with Coconut Lychee Cream", price: "$35.50/$43.50 *per person*"},
          {title: "Turf and Turf", description: "Chicken Grilled Breast & Herb Crusted Tri-tip with Rosemary Demi", price: "$35.50/$43.50 *per person*"},
        ],
      },{
        type: "multi-item",
        title: "The Choura Standard",
        description: "Choose one.\n$43.50 for Lunch and $50.50 for Dinner *per person*.\nChoose two options for a duet plate *(Add $6.00 per person)*.",
        price: "",
        items: [
          {title: "Classic Beef Wellington", description: "Filet Wrapped in Puff Pastry with Sautéed Mushrooms & Shallots Duxelle, & Madera Wine Demi Glaze", price: "$43.50/$50.50 *per person*"},
          {title: "Braised Short Ribs", description: "Served with Aromatics & Chipotle Honey Jus", price: "$43.50/$50.50 *per person*"},
          {title: "Chicken Cordon Bleu", description: "Panko Crusted Chicken Breast with Virginia Ham, Swiss Cheese, & Classic Cheese Mornay Sauce", price: "$43.50/$50.50 *per person*"},
          {title: "Chicken Florentine", description: "Roasted Chicken Breast Stuffed with Sautéed Spinach, Artichoke Hearts, and Topped with a Parmesan Cream Sauce", price: "$43.50/$50.50 *per person*"},
          {title: "Prime Rib", description: "Served with Green Peppercorn Demi", price: "$43.50/$50.50 *per person*"},
          {title: "Filet Mignon", description: "Served with Béarnaise Sauce (MP)", price: "$43.50/$50.50 *per person*"},
          {title: "Chilean Sea Bass", description: "Garlic Fennel Rubbed with Blood Orange Beurre Blanc (MP) ", price: "$43.50/$50.50 *per person*"},
          {title: "Spice Rubbed Halibut", description: "Served with Lemon Cilantro Crema (MP)", price: "$43.50/$50.50 *per person*"},
          {title: "Land and Sea", description: "Petite Filet & Pan Seared Shrimp with Demi Glaze", price: "$43.50/$50.50 *per person*"},
          {title: "Ribeye", description: "Pan Seared with Thyme, Bellini Onions, & Cabernet Demi *(Only Available for Dinner Service)*", price: "$50.50 *per person*"},
        ],
      },{
        type: "multi-item",
        title: "Vegetarian Options",
        items: [
          {title: "Pasta Primavera", description: "Penne Pasta with Roasted Vegetables and tossed in a White Wine Cream Sauce", price: "--"},
          {title: "Eggplant Parmesan", description: "Parmesan Panko Crusted Eggplant with Provolone & Basil Marinara Sauce", price: "--"},
          {title: "Grilled Portobello Mushroom Cap", description: "Filled with Roasted Vegetables and topped with a Tomato Coulis *(Vegan & Gluten Free)*", price: "--"},
          {title: "Roasted Butternut Squash", description: "Stuffed with Roasted Vegetables and Topped with a Balsamic Glaze *(Vegan & Gluten Free)*", price: "--"},
        ],
      },{
        type: "multi-item",
        title: "Other Options",
        items: [
          {title: "Kids Meals", description: "Chicken Strips, Macaroni & Cheese, French Fries, Fresh Fruit & Juice or Milk", price: "$20.95 *per person*"},
          {title: "Vendor Meals", description: "Chef's Choice", price: "$25.00 *per person*"},
        ],
      },{
        type: "multi-item",
        title: "Carving Station\nEnhancement",
        description: "Chef Required; additional labor fees apply.",
        items: [
          {title: "Spice Rub Pork Loin", description: "Ancho Chile Demi & Avocado Corn Relish", price: "$9.00 *additional per person*"},
          {title: "Turkey Airline Breast", description: "Cranberry Relish & Sage Turkey Gravy", price: "$9.00 *additional per person*"},
          {title: "Smoked Pitt Ham", description: "Honey Clove Orange Glaze & Ground Mustard Herb ", price: "$9.00 *additional per person*"},
          {title: "Roasted Prime Rib of Beef", description: "Horseradish cream & Au Jus ", price: "$12.00 *additional per person*"},
          {title: "Peppercorn Crusted Beef Filet", description: "Béarnaise & Bordelaise Sauce", price: "$13.00 *additional per person*"},
          {title: "Pig Lechon", description: "Extra Large 70lb Pig", price: "$700 *per whole*"},
        ],
      },{
        type: "multi-item",
        title: "Salad",
        description: "Select One.",
        items: [
          {title: "Tossed Green", description: "Cucumber, Tomato, Carrot, Ranch & Balsamic Dressing", price: "*Included*"},
          {title: "Arugula", description: "Cranberries, Walnuts, Gorgonzola Cheese & Balsamic Vinaigrette", price: "*Included*"},
          {title: "Spinach", description: "Smoked Bacon, Mushrooms, Goat Cheese, & Caramelized Onion Bacon Vinaigrette", price: "*Included*"},
          {title: "Panzanella", description: "Cucumbers, Tomato, Slivered Red Onions, Fresh Basil, Croutons, & Creamy Basil Dressing", price: "*Included*"},
          {title: "Orzo", description: "Cherry Tomatoes, Kalamata Olives, Capers, Grilled Asparagus, & Homemade Pesto", price: "*Included*"},
          {title: "Angel Hair Pasta", description: "Olives, Capers, Tomatoes, & Roasted Tomato Vinaigrette", price: "*Included*"},
          {title: "Antipasto", description: "Chopped Romaine, Roasted Peppers, Marinated Artichokes, Assorted Cured Meats, Provolone Cheese, Olives, & Italian Dressing", price: "*Included*"},
          {title: "Potato Salad", description: "Red Potatoes, Capers, Smoked Bacon, Scallions, & Sweet Pickled Relish", price: "*Included*"},
          {title: "Caesar", description: "Chopped Romaine, Croutons, Shaved Parmesan, & Caesar Dressing", price: "*Included*"},
          {title: "Spanish Caesar", description: "Sweet Corn, Tomato, Cilantro, Pepitas, Cotija Cheese, & Creamy Parmesan Cilantro Dressing", price: "*Included*"},
          {title: "Black Bean", description: "Grilled Corn, Tomatoes, Queso Fresco, & Spicy Honey Lime Vinaigrette", price: "*Included*"},
          {title: "BLT", description: "Romaine, Smoked Bacon, Candied Walnuts, Tomatoes, & Avocado Vinaigrette", price: "*Included*"},
          {title: "Spinach + Melon", description: "Diced Watermelon, Pickled Red Onions, Toasted Pumpkin Seeds, Feta Cheese, & Citrus Vinaigrette", price: "*Included*"},
          {title: "Green Tea Soba Noodle", description: "Bok Choy, Shiitake Mushrooms, Fresh Mint, & Sweet Soy Vinaigrette", price: "*Included*"},
          {title: "Spinach Citrus Salad", description: "Spinach, Red Onions, Mandarin Orange, Toasted Pecans, Sesame Seeds, Feta Cheese with Orange Marmalade Vinaigrette", price: "*Included*"},
          {title: "Boston Wedge", description: "Diced Tomato, Scallion, Bacon, Blue Cheese Crumbles, & Ranch Dressing", price: "$1.25 *additional per person*"},
          {title: "Caprese", description: "Field greens, Bocconcini Mozzarella, Cherry Tomatoes, Fresh Basil, & Balsamic Vinaigrette", price: "$1.25 *additional per person*"},
          {title: "Deconstructed", description: "Romaine Lettuce, Pickled Onion, Candied Pecans, Bleu Cheese Crumbles, Heirloom Tomatoes & Bleu Cheese Dressing", price: "$1.25 *additional per person*"},
          {title: "Classic Cobb", description: "Romaine, Avocado, Smoked Ham, Bleu Cheese Crumbles, Tomatoes, Bacon, Egg, & Buttermilk Ranch", price: "$1.25 *additional per person*"},
        ],
      },{
        type: "multi-item",
        title: "Starch",
        description: "Select One.",
        items: [
          {title: "Brown Rice", price: "*Included*"},
          {title: "White Jasmine Rice", price: "*Included*"},
          {title: "Wild Rice Pilaf", price: "*Included*"},
          {title: "Roasted Red Potato", price: "*Included*"},
          {title: "Scalloped Potatoes", price: "*Included*"},
          {title: "Sweet Potato Butter Quinoa", price: "*Included*"},
          {title: "Couscous", price: "*Included*"},
          {title: "Roasted Garlic Mashed Potatoes ", price: "*Included*"},
          {title: "Cauliflower Mash", price: "*Included*"},
        ],
      },{
        type: "multi-item",
        title: "Vegetable",
        description: "Select One.",
        items: [
          {title: "Vegetable Medley", price: "*Included*"},
          {title: "Ratatouille", price: "*Included*"},
          {title: "Baby Carrots", price: "*Included*"},
          {title: "Grilled Zucchini", price: "*Included*"},
          {title: "Grilled Bok Choy", price: "*Included*"},
          {title: "Spicy Green Beans", price: "*Included*"},
          {title: "French Green Beans", price: "*Included*"},
          {title: "Root Vegetable Hash", price: "*Included*"},
          {title: "Roasted Brussel Sprouts w/ Pancetta & Balsamic Glaze", price: "*Included*"},
          {title: "Roasted Asparagus", price: "$1.00 *additional per person*"},
        ],
      },{
        type: "multi-item",
        title: "Perfectly Packaged Buffet",
        description: "All packages include homemade rolls and butter, coffee, iced tea & iced water – served with biodegradable disposable ware unless otherwise requested. Please note, the Eats & Sweets Package only does not include homemade rolls and butter.",
        items: [
          {
            title: "Taste of Asia",
            description: "",
            price: "*Lunch* $34.50 *-* *Dinner* $41.50",
            items: [
              {
                title: "Salads — Included",
                list: [
                  "Chinese Chicken Salad - Chicken, Romaine, Thai Basil, Cucumber, Bean Sprout, & Toasted Sesame Vinaigrette",
                  "Green Tea Soba Noodle - Bok Choy, Shiitake Mushrooms, Fresh Mint, & Sweet Soy Vinaigrette"
                ],
              },{
                title: "Entrées — Select Two",
                list: [
                  "Orange Chicken - Crispy Chicken Tossed with Orange Zest & Chiles",
                  "Spicy Kung Pao Chicken - Pan Fried Chicken with Dried Chile Pods, Scallions, Peanuts, Cilantro, Peppers, Onions, & Red Chile Sauce ",
                  "Beef + Broccoli - with a Sweet Soy Ginger Glaze",
                  "Mongolian Beef - Sautéed Tender Beef with Scallions & Garlic",
                  "Asian Salmon - Shiitake Mushrooms, Bok Choy, & Sweet Soy Reduction *(Add $1.50 per person)*",
                ],
              },{
                title: "Sides — Select Two",
                list: [
                  "Pan Fried Noodles - with Bean Sprouts, Asparagus, Shiitake Mushrooms, & Bok Choy",
                  "House Fried Rice - with Fresh Peas, Egg, Carrots, Scallions, & Fresh Herbs",
                  "Vegetable Stir Fry - Assorted Vegetables Sautéed with Garlic, Ginger, Asian Herbs, & Sweet Soy Sauce",
                  "Steamed White Rice *(brown rice available upon request)*",
                ],
              },{
                title: "Dessert — Included",
                list: [
                  "Pineapple Upside-down Cake -or- Almond Cookies",
                ],
              },
            ]
          },{
            title: "Taste of India",
            description: "Served with Naan Bread",
            price: "*Lunch* $34.50 *-* *Dinner* $41.50",
            items: [
              {
                title: "Salads — Included",
                list: [
                  "Tossed Green - Cucumber, Tomato, Carrot, Ranch & Balsamic Dressing",
                  "Cucumber Raita - Cucumber, Yogurt, Lemon, Garlic & Mint",
                ],
              },{
                title: "Entrées — Select Two",
                list: [
                  "Chicken Tikka Masala - Boneless Chicken Marinated with Cumin, Cardamom, Paprika, Cayenne, and Garlic & Served with Traditional Indian Tikka Masala Sauce",
                  "Curry Chicken - Boneless Chicken with a Classic Indian Curry Sauce *(Add $1.50 per person for Shrimp)*",
                  "Vegetable Skewers - Choose Tikka Masala or Curry Sauce",
                ],
              },{
                title: "Sides — Select Two",
                list: [
                  "Basmati Rice",
                  "Panir Tikka - Stir Fried Vegetables with Curry Spice",
                  "Dal Mahkni - Lentils, Onion, Garlic, Cumin & Cream",
                ],
              },{
                title: "Dessert — Included",
                list: [
                  "Chef’s Choice",
                ],
              },
            ]
          },{
            title: "South of the Border",
            description: "",
            price: "*Lunch* $34.50 *-* *Dinner* $41.50",
            items: [
              {
                title: "Salads — Included",
                list: [
                  "Black Bean - Grilled Corn, Tomatoes, Queso Fresco, & Spicy Honey Lime Vinaigrette",
                  "Mexican Chopped Salad - Mixed Greens with Jicama, Radishes, Tomatoes, Crispy Tortillas Strips, & Spicy Chipotle Dressing",
                ],
              },{
                title: "Entrées — Select Two",
                list: [
                  "Beef or Chicken Fajitas - Marinated with Cilantro, Lime, Toasted Cumin, Caramelized Onions, & Mixed Peppers *(Add $4 per person for Shrimp)*",
                  "Chicken Enchilada Casserole - Slow Roasted & Shredded with Mexican Spices, Homemade Red or Green sauce, & Cheese",
                  "Pollo Asado - Marinated Chicken with Fresh Citrus, Cumin, Cilantro, Garlic, & Fresh Herbs *(Add $3 per person for Carne Asada)*",
                ],
              },{
                title: "Sides — Included",
                list: [
                  "Mexican Rice",
                  "Refried, Pinto, or Black Beans with Queso Fresco",
                  "Corn or Flour Tortillas",
                  "Homemade Salsa",
                  "Sour Cream",
                ],
              },{
                title: "Dessert — Select One",
                list: [
                  "Tres Leches Cake",
                  "Churros with Caramel",
                ],
              },
            ]
          },{
            title: "The Cowboy",
            description: "",
            price: "*Lunch* $34.50 *-* *Dinner* $41.50",
            items: [
              {
                title: "Salads — Included",
                list: [
                  "Classic Cobb - Romaine, Avocado, Smoked Ham, Bleu Cheese Crumbles, Tomatoes, Bacon, Egg, & Buttermilk Ranch",
                  "Cole Slaw - Shredded Napa Cabbage, Apples, Toasted Pecans, Fresh Citrus, & Spicy Dijon Vinaigrette",
                ],
              },{
                title: "Entrées — Select Two",
                list: [
                  "Oven Fried Chicken",
                  "Smoked Pork Spare Ribs - Featuring the Choura Signature Rub",
                  "BBQ Brisket - Glazed with BBQ Sauce & Orange Zest",
                  "Tri Tip - Marinated with Fresh Herbs, Garlic, & Lemon *(Add $1.25 per person)*",
                ],
              },{
                title: "Sides — Select Two",
                list: [
                  "The Mash - Yukon Gold Potatoes with Roasted Garlic, Sour Cream, & Scallions",
                  "Corn on the Cob - Grilled with Smokey Chipotle Butter",
                  "Mac + Cheese - Elbow Pasta with Farmhouse Cheddar, Crispy Pancetta, Fresh Chives, & Crispy Bread Crumb Crust",
                  "Baked Beans - Slow Baked with Caramelized Onions, Brown Sugar, & Smoked Bacon. Served with Homemade Corn Bread and Honey Butter",
                ],
              },{
                title: "Dessert — Included",
                list: [
                  "Apple Pan Doude",
                ],
              },
            ]
          },{
            title: "Mambo Italiano",
            description: "",
            price: "*Lunch* $34.50 *-* *Dinner* $41.50",
            items: [
              {
                title: "Salads — Select Two",
                list: [
                  "Orzo - Cherry Tomatoes, Kalamata Olives, Capers, Grilled Asparagus, & Homemade Pesto",
                  "Angel Hair Pasta - Olives, Capers, Tomatoes, & Roasted Tomato Vinaigrette",
                  "Caesar Salad - Chopped Romaine, Croutons, Shaved Parmesan, & Caesar Dressing",
                  "Antipasto Salad - Chopped Romaine, Roasted Peppers, Marinated Artichokes, Assorted Cured Meats, Provolone Cheese, Olives, & Italian Dressing",
                ],
              },{
                title: "Entrées — Select Two",
                list: [
                  "Chicken or Eggplant Parmesan - Parmesan Panko Crusted Chicken Breast or Baked Eggplant with Provolone & Basil Marinara Sauce",
                  "Bistecca - Grilled Tri Tip with Fresh Lemon, Garlic, Shaved Parmesan & Tomato Basil Vinaigrette *(Add $1.25 per person)*",
                  "Penne Pasta - Italian Sausage, Caramelized Onions, Roasted Peppers, & Rustic Basil-Alfredo Sauce",
                  "Pasta Primavera - Garlic Butter Sautéed Seasonal Vegetables & White Wine Cream Sauce",
                ],
              },{
                title: "Sides — Included",
                list: [
                  "Vegetable Ratatouille - Grilled Zucchini, Peppers, Asparagus, & Roasted Baby Carrots Seasoned with Garlic-Basil Butter",
                  "Fettuccine Olio di Burro - Pasta Tossed with Butter, Fresh Italian Parsley, Extra Virgin Olive Oil and Parmesan Cheese",
                ],
              },{
                title: "Dessert — Included",
                list: [
                  "Coconut Macaroons & Mini Cannolis",
                ],
              },
            ]
          },{
            title: "From The Deli",
            description: "",
            price: "*Lunch* $31.50 *-* *Dinner* $37.50",
            items: [
              {
                title: "Salads — Included",
                list: [
                  "Antipasto - Chopped Romaine, Roasted Peppers, Marinated Artichokes, Assorted Cured Meats, Provolone Cheese, Olives, & Italian Dressing",
                  "Panzanella – Cucumber, Tomato, Slivered Red Onion, Fresh Basil, Croutons, & Creamy Basil Dressing",
                ],
              },{
                title: "Between The Bread — Select Two",
                list: [
                  "Smoked Ham - Brie & Honey Mustard",
                  "Roast Beef - Cheddar Cheese, Caramelized Onions, & Gorgonzola Spread",
                  "Classic BLT - Bacon, Lettuce, Tomato, & Lemon Aioli",
                  "Chicken Caesar Pita - Romaine Lettuce, Tomato, Parmesan, & Caesar Dressing",
                  "Club Sandwich - Roasted Turkey, Ham, Lettuce, Tomato, Bacon, & Garlic Aioli",
                  "Roasted Turkey - Provolone, Roasted Red Peppers, & Basil Pesto",
                  "Santa Fe Chicken - Ortega Chiles, Pepperjack Cheese, Greens, & Chipotle Aioli ",
                  "Roasted Pork Loin - Asian Slaw, Thai Basil, Pea Sprouts, Pickled Cucumber, & Sriracha Aioli",
                  "Albacore Tuna - with Scallions, Fresh Tarragon, & Lemon Zest",
                  "Chicken Salad - with Celery, Fresh Herbs, Dried Cherries, Chives, & Curry Aioli",
                  "Garden Stack - Grilled Vegetables, Feta, & Olive Tapenade Spread",
                  "Caprese Stack - Arugula, Mozzarella, Tomatoes, Balsamic Glaze, & Basil Pesto",
                  "Assorted Cookies & Brownies",
                ],
              },{
                title: "Side — Included",
                list: [
                  "Assorted Chips",
                ],
              },{
                title: "Dessert — Included",
                list: [
                  "Assorted Cookies & Brownies",
                ],
              },
            ]
          },{
            title: "Eats + Sweets",
            description: "",
            price: "*Lunch* $34.50 *-* *Dinner* $41.50",
            items: [
              {
                title: "Appetizers — Select Six",
                list: [
                  "Sesame Crusted Goat Cheese - on Wonton Crisp",
                  "NY Steak Crostini - Caramelized Onions & Gorgonzola Cream",
                  "Pan Seared Ahi - atop Cucumber Slice with Japanese Spice, Pickled Onions, & Sriracha Aioli ",
                  "Roasted Garlic Humus - Served with Pita Chips",
                  "Fresh Spring Rolls - Green Tea Soba Noodles, Thai Basil, Cucumber, Mint, & Spicy Hoisin ",
                  "Caprese Skewers - Cherry Tomato, Bocconcini Mozzarella, Olives, & Basil Pesto",
                  "Roasted Artichoke Crostini - with Fennel Herb Goat Cheese",
                  "Homemade Meatballs - Teriyaki, Turkey or Italian",
                  "Crispy Spring Rolls - with Sweet + Sour Dipping Sauce",
                  "Chicken Satay - with Spicy Peanut Sauce, Tikka Masala Sauce or Chimichurri Sauce",
                  "Mini Beef Wellington - Tender Beef Wrapped in Puff Pastry with Sautéed Mushrooms & Shallots Duxelle, & Madera Wine Demi Glaze",
                  "Mongolian Beef Skewers - Grilled Scallions",
                  "Short Rib Quesadilla - with Chipotle Crème",
                  "Lobster Corndogs - with Green Peppercorn Aioli *(Add $1.50 per person)*",
                ],
              },{
                title: "Desserts — Select Two",
                list: [
                  "Traditional New York Cheesecake - with Seasonal Berries",
                  "Cinnamon Apple Tart - with Fresh Whipped Cream",
                  "Dolce Italiano – Coconut Macaroons & Mini Chocolate Chip Cannolis ",
                  "Mini Beignets - Dusted with Cinnamon Sugar or Powdered Sugar",
                ],
              },
            ]
          },
        ],
      },{
        type: "multi-item",
        title: "Live Cooking Stations",
        description: "Chef Required; additional labor fees apply. Minimum 25 people.",
        annotation: ["**Any Add-On Add $2.50 per person"],
        items: [
          {
            title: "Mashed Potato Bar",
            description: "",
            price: "$11.00 *per person*",
            items: [
              {
                title: "Select Two",
                list: [
                  "Red Bliss Mash", "Cheddar & Chive Mash", "Wasabi Mash", "Garlic Mash", "Sweet Potato Mash",
                ],
              },{
                title: "Select Two",
                list: [
                  "Garlic Chive Butter Shrimp *(Add $1.50 per person)*", "Shredded Rotisserie Chicken", "Beef Short Ribs", "Sautéed Mushrooms", "Chili", "BBQ Brisket",
                ],
              },{
                title: "Includes All",
                list: [
                  "Sharp Cheddar", "Smoked Bacon Bits", "Sour Cream", "Whipped Butter", "Blue Cheese Crumbles", "Shoe-String Onions", "Scallions",
                ],
              },
            ],
          },{
            title: "Mac n' Cheese Martinis",
            description: "",
            price: "$10.00 *per person*",
            items: [
              {
                title: "Select Two",
                list: [
                  "Cheddar Cheese Sauce", "White Cheddar", "Brown Ale Bacon Cheddar", "Swiss Chive Roasted Garlic",
                ],
              },{
                title: "Select Two",
                list: [
                  "Shredded Rotisserie Chicken", "Chili", "BBQ Brisket", "Sautéed Mushrooms", "Beef Short Ribs",
                ],
              },{
                title: "Includes All",
                list: [
                  "Sharp Cheddar", "Sour Cream", "Smoked Bacon Bits", "Scallions", "Shoe-String Onions",
                ],
              },
            ],
          },{
            title: "Taco Cart",
            description: "",
            price: "$9.00 *per person*",
            items: [
              {
                title: "Select Two",
                list: [
                  "Carne Asada", "Pollo Asado", "Carnitas", "Barbacoa", "Chorizo",
                ],
              },{
                title: "Includes All",
                list: [
                  "Cheese", "Sour Cream", "Salsa", "Cilantro", "Onion", "Corn -or- Flour Tortillas",
                ],
              },
            ],
          },{
            title: "Chinese \"To-Go\" Cup",
            description: "",
            price: "$8.00 *per person*",
            items: [
              {
                title: "Select Two",
                list: [
                  "Kung Pao Chicken", "Teriyaki Chicken", "Stir Fry Veggies", "Shrimp *(Add $1.50 per person)*",
                ],
              },{
                title: "Includes All",
                list: [
                  "Wonton Strips", "Scallions", "Roasted Peanuts", "Toasted Sesame Seeds", "Sriracha", "Soy Sauce",
                ],
              },
            ],
          },{
            title: "Slider Station",
            description: "",
            price: "$8.00 *per person*",
            items: [
              {
                title: "Select Two",
                list: [
                  "Kahlua Pulled Pork on Hawaiian Roll", "Angus Beef w/ Caramelized Onions & Blue Cheese", "Blackened Chicken w/ Honey Mustard & Swiss", "Southwest Black Bean w/ Pepperjack & Guacamole",
                ],
              },{
                title: "Includes All",
                list: [
                  "Cheddar", "Lettuce", "Tomato", "Onion", "Pickles", "Thousand Island", "Ketchup", "Mustard", "Mayo",
                ],
              },
            ],
          },{
            title: "Taco Bar",
            description: "",
            price: "$15.00 *per person*",
            items: [
              {
                title: "Select Two",
                list: [
                  "Carne Asada", "Pollo Asado", "Carnitas", "Barbacoa", "Chorizo",
                ],
              },{
                title: "Includes All",
                list: [
                  "Cheese", "Sour Cream", "Salsa", "Cilantro", "Onion", "Corn -or- Flour Tortillas", "Black -or- Pinto Beans", "Spanish Rice",
                ],
              },
            ],
          },
        ],
      },
    ],
  },{
    type: "section",
    title: "Sweets",
    description: "",
    caption: "",
    items: [
      {
        type: "multi-item",
        title: "Sweet Tooth",
        items: [
          {
            title: "Sweet Tooth Treats",
            description: "Served or Displayed - A la Carte",
            price: "$4.00 *per person*",
            list: [
              "Assorted Dessert Bars - Lemon & Pecan", "Tres Leches Cake", "Gourmet Homemade Pie - Caramel Apple or Chocolate Mousse", "Mini Bundt Cakes - Carrot, Lemon, or Chocolate", "Mini Cupcakes - PBJ, Lemon, Chocolate, Red Velvet, Vanilla or Mint Chocolate Chip", "Individual Fruit Tarts", "Tuxedo Trifle Mousse Cake - Chocolate Cake Layered with Vanilla Mousse and Chocolate Shell", "Cheesecake - Traditional New York with Seasonal Berries or Cookies and Cream with Oreo Crust", "Cinnamon Apple Tart - with Fresh Whipped Cream", "Dolce Italiano - Hazelnut Macaroons & Mini Chocolate Chip Cannolis", "Mini Beignets - Dusted with Cinnamon Sugar or Powdered Sugar", "Churros – with Caramel Sauce", "Chocolate Tartlet – with Salted Caramel",
            ],
          },
        ],
      },{
        type: "multi-item",
        title: "Custom Dessert Bar",
        description: "Displayed.",
        items: [
          {
            title: "3 Sweet Tooth Treats",
            description: "Select options from Sweet Tooth treat list",
            price: "$10.00 *per person*",
          },{
            title: "4 Sweet Tooth Treats",
            description: "Select options from Sweet Tooth treat list",
            price: "$11.00 *per person*",
          },{
            title: "5 Sweet Tooth Treats",
            description: "Select options from Sweet Tooth treat list",
            price: "$13.00 *per person*",
          },
        ],
      },{
        type: "multi-item",
        title: "Sweet Stations",
        items: [
          {
            title: "Float Home Station",
            description: "Attendant Required; additional labor fee applies",
            price: "$4.00 *per person*",
            items: [
              {
                title: "Select Two Soda Flavors\n*(served with Vanilla Ice Cream)*",
                list: [
                  "Root Beer", "Orange", "Grape", "Coke",
                ],
              },
            ],
          },{
            title: "Chacolate Fountain",
            description: "Warm Belgium Chocolate cascades off a three-tier fountain, specially designed for fondue. Minimum 25 people.",
            price: "$350 *rental fee* *-* $8-$11 *per person*",
            items: [
              {
                title: "Includes",
                list: [
                  "Three Hour Fountain Rental",
                  "20lbs of Belgium Chocolate (choice of dark, semisweet, milk, or white)",
                  "Round, Skirted Table",
                  "Napkins, Mini Plates, & 8in Skewers",
                ],
              },
              {
                title: "Dipping Items",
                list: [
                  "Choose Three for $8.00 *per person*",
                  "Choose Four for $10.00 *per person*",
                  "Choose Five for $11.00 *per person*",
                ],
              },
              {
                title: "Choice of",
                list: [
                  "Cheesecake Bites",
                  "Brownie Squares",
                  "Strawberries",
                  "Apples",
                  "Oreo Cookies",
                  "Caramel",
                  "Bananas",
                  "Peanut Butter Balls",
                  "Nutter Butter Cookies",
                  "Shortbread Cookies ",
                  "Snicker Pieces",
                  "Pretzel Rods",
                  "Cream Puffs",
                  "Pineapple",
                  "Rice Krispie Treats",
                  "Graham Cracker Squares",
                  "Coconut Macaroons",
                  "Coconut Balls",
                  "Biscotti",
                  "Marshmallows",
                ],
              },
            ],
          },
        ],
      },
    ],
  },{
    type: "section",
    title: "Drinks",
    description: "",
    caption: "",
    items: [
      {
        type: "multi-item",
        title: "Wet Your Whistle",
        items: [
          {
            description: "Beer",
          },{
            title: "Domestic Beer",
            price: "$6",
          },{
            title: "Import/Specialty Beer",
            price: "$7",
          },{
            title: "Domestic Keg",
            description: "Approximately 150 servings",
            price: "$450",
          },{
            title: "Import/Specialty Keg",
            description: "Approximately 150 servings",
            price: "$500",
          },{
            description: " ",
          },{
            description: "Wine",
          },{
            title: "Wine by the Glass",
            price: "$7-$8",
          },{
            title: "Wine by the Bottle",
            price: "$24-$38",
          },{
            title: "Champagne by the Glass",
            price: "$8-$10",
          },{
            title: "Champagne by the Bottle",
            price: "$20-$105",
          },{
            description: " ",
          },{
            description: "Mixed Cocktails",
          },{
            title: "Well Brand",
            price: "$8",
          },{
            title: "Call Brand",
            price: "$9-$10",
          },{
            title: "Premium Brand",
            price: "$10",
          },{
            title: "Martinis",
            price: "$11",
          },{
            description: " ",
          },{
            description: "Non-Alcoholic",
          },{
            title: "Bottled Water",
            price: "$3-$5",
          },{
            title: "Pellegrino Sparkling Water",
            price: "$4-$6",
          },{
            title: "Soft Drinks",
            price: "$3",
          },{
            title: "Juices",
            price: "$2",
          },{
            title: "Sparkling Cider",
            price: "$13 *per bottle*",
          },{
            title: "Unlimited Sodas",
            price: "$4 *per person*",
          },{
            title: "Corkage Fee",
            price: "$15 *per bottle*",
          },
        ],
      },{
        type: "multi-item",
        title: "Bars",
        items: [
          {
            title: "Cash Bar",
            description: "One bartender per 75 guests recommended",
            price: "$150 *per bartender*",
          },{
            title: "Limited Hosted Bar",
            description: "Bartender fee waived when bar is hosted by client. $500 minimum for flat-rate hosted bars. $6 for each additional hour.",
            price: "$13-$21 *per hour, per person*",
            list: [
              "1 hour for $13 *per person*",
              "2 hours for $17 *per person*",
              "3 hours for $21 *per person*",
              "Limited Hosted Includes:\nDomestic & Imported Beer, House Wine, Soft Drinks, and Mineral Water.",
            ]
          },{
            title: "Hosted Bar",
            description: "Bartender fee waived when bar is hosted by client. $500 minimum for flat-rate hosted bars. $8 for each additional hour.",
            price: "$17-$29 *per hour, per person*",
            list: [
              "1 hour for $17 *per person*",
              "2 hours for $24 *per person*",
              "3 hours for $29 *per person*",
              "Hosted Bar Includes:\nWell Drinks, Domestic & Imported Beer, House Wine, Soft Drinks, and Mineral Water.",
            ]
          },{
            title: "Premium Hosted Bar",
            description: "Bartender fee waived when bar is hosted by client. $500 minimum for flat-rate hosted bars. $11 for each additional hour.",
            price: "$17-$29 *per hour, per person*",
            list: [
              "1 hour for $20 *per person*",
              "2 hours for $31 *per person*",
              "3 hours for $36 *per person*",
              "Hosted Bar Includes:\nCall Drinks, Well Drinks, Domestic & Imported Beer, House Wine, Soft Drinks, and Mineral Water.",
            ]
          },
        ],
      },
    ],
  },
]

export default basics
