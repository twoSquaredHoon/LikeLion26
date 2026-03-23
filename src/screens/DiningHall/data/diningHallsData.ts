import { DiningHall } from '../types';

// ─── Mock Data ────────────────────────────────────────────────────────────────
// TODO: Replace with API call → GET /api/dining-halls
// Data structure mirrors the Nutrislice API response:
//   - Top-level: menu_info contains station display names (keyed by menu_id)
//   - menu_items: flat list where is_station_header=true marks a new station
//   - Each food item has: name, rounded_nutrition_info.calories, food_category,
//     icons.food_icons (dietary labels: vegan, vegetarian, halal, top-9-free, etc.)
//
// Parsing strategy:
//   1. Filter menu_items where is_station_header=true → station name
//   2. Group subsequent items under that station until next station header
//   3. Map station name → MenuCategory, items → MenuItem[]
//
// Status ('open' | 'soon' | 'closed') and hours should be derived from
// the hall's operating schedule relative to current time.
//
// TanStack Query suggested config:
//   staleTime: 1000 * 60 * 30  (30 min — menus don't change mid-service)
//   refetchOnWindowFocus: false

export const DINING_HALLS: DiningHall[] = [
    {
        id: 'gordon',
        name: 'Gordon Avenue Market',
        emoji: '🏛️',
        emojiBg: '#FFE8D6',
        status: 'open',
        hours: 'Closes 8:00 PM',
        aiPickLabel: 'High Protein',
        aiPickName: 'Roasted Turkey Recovery',
        mapsUrl: 'https://www.google.com/maps/place/Gordon+Dining+and+Event+Center/@43.0711999,-89.4011868,16z/data=!3m1!4b1!4m6!3m5!1s0x8807acccaa79ac4b:0xc41dfe34820883a9!8m2!3d43.071196!4d-89.3986119!16s%2Fg%2F11b7r6fxl7?entry=ttu',
        menus: {
        breakfast: {
            count: 18,
            categories: [
            {
                // Station: "Great Greens" in Nutrislice
                category: 'Great Greens',
                items: [
                { name: 'Odyssey Strawberry Greek Yogurt' },
                { name: 'Fruit Grapes Whole' },
                { name: 'Oatmeal (VN)' },
                { name: 'Honeydew Melon Slices' },
                { name: 'Build Your Own Yogurt Bar' },
                ],
            },
            {
                // Station: "Gordon Delicious" in Nutrislice
                category: 'Gordon Delicious',
                items: [
                { name: 'Egg Salad Filling' },
                { name: 'Hummus Homemade Roasted Beet (VN)' },
                { name: 'Avocado Toast' },
                { name: 'Build Your Own Breakfast Sandwich' },
                { name: 'Build Your Own Sandwich' },
                ],
            },
            {
                // Station: "Eggcetera" in Nutrislice
                category: 'Eggcetera',
                items: [
                { name: 'Scrambled Eggs' },
                { name: 'Scrambled Egg Whites' },
                { name: 'Scrambled Tofu (VN)' },
                { name: 'Make Your Own Waffle w/Fruit & Cream' },
                { name: 'Hard Cooked Egg' },
                { name: 'Biscuits & Pork Gravy' },
                { name: 'Redstone Potatoes' },
                { name: 'Bacon' },
                { name: 'Turkey Sausage Patties' },
                { name: 'Jackfruit Sausage Patty' },
                ],
            },
            ],
        },
        lunch: {
            count: 14,
            categories: [
            {
                category: '1849',
                items: [
                { name: 'Spinach & Mushroom Fried Rice (VN)' },
                { name: 'Chicken Drumstick Teriyaki Glazed' },
                { name: 'Haddock Ginger Glazed' },
                { name: 'Sesame Spinach (VN)' },
                { name: 'Kung Pao Brussel Sprouts (VN)' },
                { name: 'Thai Style Red Quinoa & Vegetables (VN)' },
                ],
            },
            {
                category: 'Fired Up',
                items: [
                { name: 'Sweet Potato & Oatmeal Bake (VN)' },
                { name: 'Denver Omelet' },
                { name: 'Hashbrown Patty (VN)' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Tofu' },
                { name: 'Black Beans (VN)' },
                { name: 'Hearty Vegetable Soup (VN)' },
                { name: 'Chicken Noodle Soup' },
                { name: 'Build Your Own Salad' },
                { name: 'Build Your Own Yogurt Bar' },
                ],
            },
            {
                category: 'Buckingham Bakery',
                items: [
                { name: 'Cookies & Cream Brownie' },
                { name: 'Rice Krispie Bar' },
                { name: 'Popcake Pancake' },
                { name: 'Cookie M&M' },
                { name: 'Double Chocolate Chip Cookie' },
                ],
            },
            ],
        },
        dinner: {
            count: 30,
            categories: [
            {
                // Station: "Entree" (image 1 — Roasted Turkey, Gravy, Biscuits, Tofu)
                category: 'Entree',
                items: [
                { name: 'Roasted Turkey Breast', favorited: true },
                { name: 'Turkey Gravy' },
                { name: 'Biscuits & Pork Gravy' },
                { name: 'Tofu Brown Rice & Veggies (VN)' },
                ],
            },
            {
                // Station: "Sides" (image 1 — Corn, Carrots, Wild Rice, Potatoes)
                category: 'Sides',
                items: [
                { name: 'Corn' },
                { name: 'Steamed Baby Carrots' },
                { name: 'Wild Rice & Cranberry Pilaf (VN)' },
                { name: 'Baby Baker Potatoes' },
                ],
            },
            {
                // Station: "Gordon Buona Cucina" (image 2)
                category: 'Gordon Buona Cucina',
                items: [
                { name: 'Buona Cucina Condiment' },
                { name: 'Pasta (VN)' },
                { name: 'Whole Grain Pasta (VN)' },
                { name: 'Zucchini Noodles (VN)' },
                { name: 'Gluten Free Rotini (VN)' },
                { name: 'Homemade Alfredo Sauce' },
                { name: 'Homestyle Marinara Sauce (VN)' },
                { name: 'Giardiniera Chicken' },
                { name: 'Jackfruit Meatballs (VN)' },
                { name: 'Italian Roasted Normandy Vegetables' },
                { name: 'Hawaiian Roll' },
                ],
            },
            {
                // Station: pizza + "Gordon Que Rico" (images 4 & 5)
                category: 'Gordon Que Rico',
                items: [
                { name: 'Cheese Pizza Slice (Veg)' },
                { name: 'Pepperoni Pizza Slice' },
                { name: 'Pizza Slice Sausage' },
                { name: 'Gluten Free Cheese Pizza Quarter' },
                { name: 'Vegan Taco Filling (VN)' },
                { name: 'Pork Carnita' },
                { name: 'Beef Taco Meat' },
                { name: 'Cilantro Lime White Rice (VN)' },
                { name: 'Pinto Beans (VN)' },
                { name: 'Build Your Own Que Rico' },
                ],
            },
            {
                // Station: "Fired Up" (image 6)
                category: 'Fired Up',
                items: [
                { name: "Crispy Buffalo Chik'n Sandwich (VN)" },
                { name: 'Crispy Buffalo Chicken Sandwich' },
                { name: 'Straight Cut Fries (VN)' },
                ],
            },
            {
                // Station: "Buckingham Bakery" (image 7)
                category: 'Buckingham Bakery',
                items: [
                { name: 'Peach Crumb Bar' },
                { name: '-Marble Cake w/Chocolate Frosting' },
                { name: 'Cake Chocolate Streusel Coffee - UR' },
                { name: 'Double Chocolate Chip Cookie' },
                { name: 'Oatmeal Raisin Cookie' },
                ],
            },
            {
                // Station: "Gordon Delicious" (images 7 & 8)
                category: 'Gordon Delicious',
                items: [
                { name: 'Egg Salad Filling' },
                { name: 'Hummus Homemade Roasted Beet (VN)' },
                { name: 'Avocado Toast' },
                { name: 'Build Your Own Breakfast Sandwich' },
                { name: 'Build Your Own Sandwich' },
                ],
            },
            {
                // Station: "Great Greens" (image 9)
                category: 'Great Greens',
                items: [
                { name: 'Tempeh' },
                { name: 'Diced Chicken' },
                { name: 'Quinoa (VN)' },
                { name: 'Garbanzo Beans (VN)' },
                { name: 'Odyssey Strawberry Greek Yogurt' },
                { name: 'Fruit Grapes Whole (VN)' },
                { name: 'Honeydew Melon Slices (VN)' },
                { name: 'Garden Vegetable Soup (VN)' },
                { name: 'Chicken Chili' },
                ],
            },
            ],
        },
        },
    },
    {
        id: 'rheta',
        name: "Rheta's Market",
        emoji: '🍜',
        emojiBg: '#E8F4FF',
        status: 'open',
        hours: 'Closes 9:00 PM',
        aiPickLabel: 'Balanced Meal',
        aiPickName: 'Giardiniera Chicken Pasta',
        mapsUrl: "https://www.google.com/maps/place/Rheta's+Market/@43.073974,-89.404274,16z",
        menus: {
        breakfast: {
            count: 6,
            categories: [
            {
                category: 'Fired Up',
                items: [
                { name: 'Breakfast Burrito' },
                { name: 'Denver Omelet' },
                { name: 'Turkey Sausage Patty' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Oatmeal (VN)' },
                { name: 'Yogurt Parfait' },
                { name: 'Bagel & Cream Cheese' },
                ],
            },
            ],
        },
        lunch: {
            count: 8,
            categories: [
            {
                category: 'Global Kitchen',
                items: [
                { name: 'Buona Cucina Condiment' },
                { name: 'Veg Mix Roasted for Buona Cucina (VN)' },
                { name: 'Garlic Wheat Texas Toast' },
                { name: 'Pasta (VN)' },
                { name: 'Whole Grain Pasta (VN)' },
                { name: 'Gluten Free Rotini (VN)' },
                { name: 'Beef' },
                { name: 'Fried Tofu' },
                { name: 'Homestyle Marinara Sauce (VN)' },
                { name: 'Tomato Cream Sauce' },
                { name: 'Homemade Alfredo Sauce' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Grilled Chicken' },
                { name: 'Giardiniera Pasta' },
                { name: 'Sweet Corn (VN)' },
                ],
            },
            ],
        },
        dinner: {
            count: 5,
            categories: [
            {
                category: 'Global Kitchen',
                items: [
                { name: 'Pad Thai', favorited: true },
                { name: 'Miso Soup (VN)' },
                { name: 'Edamame (VN)' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Build Your Own Salad' },
                { name: 'Hearty Vegetable Soup (VN)' },
                ],
            },
            ],
        },
        },
    },
    {
        id: 'liz',
        name: "Liz's Market",
        emoji: '🥗',
        emojiBg: '#E8FFE8',
        status: 'soon',
        hours: 'Closes 2:30 PM',
        aiPickLabel: 'Lean & Clean',
        aiPickName: 'Atlantic Salmon Power Bowl',
        mapsUrl: "https://www.google.com/maps/place/Liz's+Market/@43.0767289,-89.4095358,16z",
        menus: {
        breakfast: {
            count: 5,
            categories: [
            {
                category: 'Fired Up',
                items: [
                { name: 'Acai Bowl (VN)' },
                { name: 'Avocado Toast', favorited: true },
                { name: 'Veggie Omelette' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Granola & Berries (VN)' },
                { name: 'Smoothie (VN)' },
                ],
            },
            ],
        },
        lunch: {
            count: 6,
            categories: [
            {
                category: 'Create-A-Bowl',
                items: [
                { name: 'Atlantic Salmon' },
                { name: 'Tofu Stir Fry (VN)' },
                { name: 'Quinoa (VN)', favorited: true },
                { name: 'Steamed Broccoli (VN)' },
                { name: 'White Basmati Rice (VN)' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Build Your Own Salad' },
                ],
            },
            ],
        },
        dinner: {
            count: 4,
            categories: [
            {
                category: 'Create-A-Bowl',
                items: [
                { name: 'Poke Bowl' },
                { name: 'Veggie Sushi Roll (VN)' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Build Your Own Salad' },
                { name: 'Miso Soup (VN)' },
                ],
            },
            ],
        },
        },
    },
    {
        id: 'fourlakes',
        name: 'Four Lakes Market',
        emoji: '🏔️',
        emojiBg: '#E8F0FF',
        status: 'open',
        hours: 'Closes 7:30 PM',
        aiPickLabel: 'Comfort Fuel',
        aiPickName: 'Beef Stew & Sourdough',
        mapsUrl: 'https://www.google.com/maps/place/Four+Lakes+Market/@43.0777477,-89.4203371,17z',
        menus: {
        breakfast: {
            count: 6,
            categories: [
            {
                category: 'Fired Up',
                items: [
                { name: 'Pancakes' },
                { name: 'Biscuits & Gravy' },
                { name: 'Sweet Potato & Oatmeal Bake (VN)' },
                ],
            },
            {
                category: 'Create-A-Bowl',
                items: [
                { name: 'BYO Bar - Four Lakes Bulgogi' },
                { name: 'Bulgogi Beef' },
                { name: 'Bulgogi Chicken' },
                { name: 'Bulgogi Portabella Mushrooms (VN)' },
                { name: 'White Basmati Rice (VN)' },
                { name: 'Firecracker Slaw (VN)' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Fruit Cup (VN)' },
                ],
            },
            ],
        },
        lunch: {
            count: 8,
            categories: [
            {
                category: 'Que Rico',
                items: [
                { name: 'Beef Taco Meat' },
                { name: 'Turkey Barbacoa' },
                { name: 'Vegetable Fajita (VN)' },
                { name: 'Black Beans (VN)' },
                { name: 'Spanish Rice (VN)' },
                { name: 'Build Your Own Que Rico' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Mac & Cheese' },
                { name: 'Chicken Sandwich' },
                { name: 'Coleslaw' },
                ],
            },
            ],
        },
        dinner: {
            count: 5,
            categories: [
            {
                category: 'Fired Up',
                items: [
                { name: 'Hearty Beef Stew' },
                { name: 'Lentil Soup (VN)' },
                { name: 'Sourdough Bread' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Build Your Own Salad' },
                { name: 'Hearty Vegetable Soup (VN)' },
                ],
            },
            ],
        },
        },
    },
    {
        id: 'carson',
        name: "Carson's Market",
        emoji: '🌮',
        emojiBg: '#FFF0E8',
        status: 'closed',
        hours: 'Opens 5:00 PM',
        aiPickLabel: 'Bold Flavors',
        aiPickName: 'Taco Night Combo',
        closedNote: 'Closed · Opens today at 5:00 PM',
        mapsUrl: "https://www.google.com/maps/place/Carson's+Market/@43.0767289,-89.4095358,16z",
        menus: {
        breakfast: {
            count: 5,
            categories: [
            {
                category: 'Fired Up',
                items: [
                { name: 'Huevos Rancheros' },
                { name: 'Breakfast Quesadilla' },
                { name: 'Chilaquiles' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Refried Beans (VN)' },
                { name: 'Fruit Cup (VN)' },
                ],
            },
            ],
        },
        lunch: {
            count: 6,
            categories: [
            {
                category: 'Que Rico',
                items: [
                { name: 'Chicken Burrito Bowl' },
                { name: 'Veggie Tacos (VN)' },
                { name: 'Spanish Rice (VN)' },
                { name: 'Black Bean Salad (VN)' },
                { name: 'Build Your Own Que Rico' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Build Your Own Salad' },
                ],
            },
            ],
        },
        dinner: {
            count: 6,
            categories: [
            {
                category: 'Que Rico',
                items: [
                { name: 'Carne Asada Tacos', favorited: true },
                { name: 'Enchiladas' },
                { name: 'Elote Corn' },
                { name: 'Guacamole & Chips (VN)' },
                { name: 'Build Your Own Que Rico' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Build Your Own Salad' },
                ],
            },
            ],
        },
        },
    },
    {
        id: 'lowell',
        name: 'Lowell Market',
        emoji: '🌿',
        emojiBg: '#F5E8FF',
        status: 'closed',
        hours: 'Opens 11:00 AM',
        aiPickLabel: 'Plant Based',
        aiPickName: 'Garden Power Bowl',
        closedNote: 'Closed · Opens tomorrow at 11:00 AM',
        mapsUrl: 'https://www.google.com/maps/place/Lowell+Market/@43.0762606,-89.3983387,17z',
        menus: {
        breakfast: {
            count: 5,
            categories: [
            {
                category: 'Fired Up',
                items: [
                { name: 'Veggie Omelette' },
                { name: 'Steel Cut Oatmeal (VN)' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Fresh Fruit Bowl (VN)' },
                { name: 'Whole Grain Toast' },
                { name: 'Build Your Own Yogurt Bar' },
                ],
            },
            ],
        },
        lunch: {
            count: 6,
            categories: [
            {
                category: 'Delicious',
                items: [
                { name: 'Italian Pork Sub' },
                { name: 'Lemon Pepper Chicken Salad' },
                { name: 'Homemade Hummus (VN)' },
                { name: 'Build Your Own Breakfast Sandwich' },
                { name: 'Build Your Own Sandwich' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Falafel Wrap' },
                { name: 'Lentil Soup (VN)', favorited: true },
                { name: 'Roasted Beets (VN)' },
                ],
            },
            ],
        },
        dinner: {
            count: 5,
            categories: [
            {
                category: 'Fired Up',
                items: [
                { name: 'Garden Power Bowl (VN)' },
                { name: 'Stuffed Bell Peppers (VN)' },
                { name: 'Wild Rice Pilaf (VN)' },
                { name: 'Roasted Cauliflower (VN)' },
                ],
            },
            {
                category: 'Great Greens',
                items: [
                { name: 'Build Your Own Salad' },
                ],
            },
            ],
        },
        },
    },
];