// Brand Menu Items Dataset (Southeast Asian / Thai Street Food)
import bangkokFireBasilRiceImg from '../assets/Bangkok Fire Basil Rice.png'
import pineappleIslandFriedRiceImg from '../assets/Pineapple Island Fried Rice.png'
import classicThaiFriedRiceImg from '../assets/Classic Thai Fried Rice.png'
import crabButterFriedRiceImg from '../assets/Crab Butter Fried Rice.png'
import currySpicedFriedRiceImg from '../assets/Curry Spiced Fried Rice.png'
import greenCurryFriedRiceImg from '../assets/Green Curry Fried Rice .png'
import redCurryFriedRiceImg from '../assets/Red Curry Fried Rice.png'
import kapiUmamiFriedRiceImg from '../assets/Kapi Umami Fried Rice.png'

import heroDish from '../assets/hero_dish.png'
import menuAppetizer from '../assets/menu_appetizer.png'
import northernKhaoSoiImg from '../assets/Northern Khao Soi.png'

import kanaHedHormImg from '../assets/KANA HED HORM.png'
import vegThaiFriedRiceImg from '../assets/Vegetarian Thai Fried Rice.png'
import plantBasilRiceImg from '../assets/Basil Fried Rice 🌶️.png'
import plantPadThaiImg from '../assets/Vegetarian Pad Thai.png'
import plantTomKhaImg from '../assets/Tom Kha (veg).png'
import plantTomYumImg from '../assets/Tom Yum (veg).png'
import plantEggplantTofuImg from '../assets/Eggplant & Tofu Curry.png'
import plantChooCheeTofuImg from '../assets/Choo Chee Tofu.png'
import plantTofuKheeMaoImg from '../assets/Tofu Khee Mao.png'

import rubiesCoconutImg from '../assets/Red Rubies in Coconut Milk..png'
import mangoStickyRiceImg from '../assets/Mango Sticky Rice.png'
import bananaStickyRiceImg from '../assets/Banana Sticky Rice.png'
import blackRiceMangoImg from '../assets/Black Rice Mango.png'
import menuDessert from '../assets/menu_dessert.png'
import lunchImg from '../assets/lunchimg.png'

export const MENU_ITEMS = [
  // FRIED RICE (8 items)
  {
    id: 'bangkok_fire_basil_rice',
    name: 'Bangkok Fire Basil Rice',
    price: 15.99,
    category: 'Fried Rice',
    desc: "Spicy wok-fried jasmine rice with fresh holy basil, Thai bird's eye chilies, garlic, and savory house sauce.",
    image: bangkokFireBasilRiceImg,
    tags: ['Spicy', 'Popular']
  },
  {
    id: 'pineapple_island_fried_rice',
    name: 'Pineapple Island Fried Rice',
    price: 15.99,
    category: 'Fried Rice',
    desc: 'Sweet and savory wok-tossed jasmine rice with fresh golden pineapple chunks, cashew nuts, raisins, and a hint of curry powder.',
    image: pineappleIslandFriedRiceImg,
    tags: ['Sweet', 'Chef Special']
  },
  {
    id: 'classic_thai_fried_rice',
    name: 'Classic Thai Fried Rice',
    price: 15.99,
    category: 'Fried Rice',
    desc: 'Traditional Thai-style fried rice with organic eggs, sweet onions, scallions, tomatoes, and a light soy seasoning.',
    image: classicThaiFriedRiceImg,
    tags: ['Classic']
  },
  {
    id: 'crab_butter_fried_rice',
    name: 'Crab Butter Fried Rice',
    price: 17.99,
    category: 'Fried Rice',
    desc: 'Premium jasmine rice wok-fried in rich crab butter, loaded with sweet lump crab meat, eggs, and fresh scallions.',
    image: crabButterFriedRiceImg,
    tags: ['Premium', 'Seafood']
  },
  {
    id: 'curry_spiced_fried_rice',
    name: 'Curry Spiced Fried Rice',
    price: 14.99,
    category: 'Fried Rice',
    desc: 'Aromatic yellow curry powder wok-tossed with jasmine rice, onions, carrots, and sweet peas.',
    image: currySpicedFriedRiceImg,
    tags: ['Aromatic']
  },
  {
    id: 'green_curry_fried_rice',
    name: 'Green Curry Fried Rice',
    price: 15.99,
    category: 'Fried Rice',
    desc: 'Flavorful fried rice infused with spicy green curry paste, bamboo shoots, eggplants, and sweet Thai basil.',
    image: greenCurryFriedRiceImg,
    tags: ['Spicy']
  },
  {
    id: 'red_curry_fried_rice',
    name: 'Red Curry Fried Rice',
    price: 15.99,
    category: 'Fried Rice',
    desc: 'Fragrant jasmine rice wok-tossed with spicy red curry paste, red bell peppers, and fresh kaffir lime leaves.',
    image: redCurryFriedRiceImg,
    tags: ['Spicy']
  },
  {
    id: 'kapi_umami_fried_rice',
    name: 'Kapi Umami Fried Rice',
    price: 17.99,
    category: 'Fried Rice',
    desc: 'Authentic Thai shrimp paste fried rice served with sweet pork, shredded green mango, red onions, and lime.',
    image: kapiUmamiFriedRiceImg,
    tags: ['Umami', 'Authentic']
  },

  // SOUTHEAST ASIAN STREET KITCHEN (7 items)
  {
    id: 'hainanese_chicken_rice',
    name: 'Hainanese Chicken Rice',
    price: 13.99,
    category: 'Southeast Asian Street Kitchen',
    desc: 'Poached tender chicken served over aromatic garlic-ginger rice, accompanied by spicy chili sauce and soy paste.',
    image: heroDish,
    tags: ['Signature', 'Classic']
  },
  {
    id: 'thai_chicken_biryani',
    name: 'Thai Chicken Biryani',
    price: 16.99,
    category: 'Southeast Asian Street Kitchen',
    desc: 'Thai-style chicken biryani cooked with aromatic dry spices, served with sweet chili sauce and fried shallots.',
    image: menuAppetizer,
    tags: ['Aromatic']
  },
  {
    id: 'northern_khao_soi',
    name: 'Northern Khao Soi',
    price: 18.99,
    category: 'Southeast Asian Street Kitchen',
    desc: 'Rich Northern Thai coconut curry noodle soup with tender chicken, pickled mustard greens, raw shallots, and crispy egg noodles.',
    image: northernKhaoSoiImg,
    tags: ['Chef Special', 'Spicy']
  },
  {
    id: 'thai_orange_sesame_chicken',
    name: 'Thai Orange Sesame Chicken',
    price: 15.99,
    category: 'Southeast Asian Street Kitchen',
    desc: 'Crispy chicken bites tossed in a tangy orange glaze, topped with toasted sesame seeds and fresh scallions.',
    image: menuAppetizer,
    tags: ['Sweet']
  },
  {
    id: 'thai_sweet_and_sour_chicken',
    name: 'Thai Sweet and Sour Chicken',
    price: 15.99,
    category: 'Southeast Asian Street Kitchen',
    desc: 'Stir-fried crispy chicken with pineapple, cucumbers, onions, and bell peppers in a tangy sweet-and-sour glaze.',
    image: menuAppetizer,
    tags: ['Sweet & Sour']
  },
  {
    id: 'spicy_basil_leaves',
    name: 'Spicy Basil Leaves',
    price: 15.99,
    category: 'Southeast Asian Street Kitchen',
    desc: "Fiery stir-fry of minced chicken, garlic, Thai bird's eye chilies, and sweet holy basil leaves.",
    image: menuAppetizer,
    tags: ['Spicy', 'Popular']
  },
  {
    id: 'thai_rama_garden',
    name: 'Thai Rama Garden',
    price: 15.99,
    category: 'Southeast Asian Street Kitchen',
    desc: 'Steamed chicken and fresh seasonal vegetables served over a bed of rich, creamy house peanut sauce.',
    image: menuAppetizer,
    tags: ['Savory']
  },

  // PLANT-BASED KITCHEN (11 items)
  {
    id: 'ka_na_hed_horm',
    name: 'Ka-Na Hed Horm',
    price: 14.00,
    category: 'Plant-Based Kitchen',
    desc: 'Chinese broccoli and shiitake mushrooms sautéed in a savory plant-based sauce.',
    image: kanaHedHormImg,
    tags: ['Vegan', 'Healthy']
  },
  {
    id: 'vegetarian_thai_fried_rice',
    name: 'Vegetarian Thai Fried Rice',
    price: 14.00,
    category: 'Plant-Based Kitchen',
    desc: 'Classic wok-tossed jasmine rice with organic tofu, mixed seasonal vegetables, and light soy sauce.',
    image: vegThaiFriedRiceImg,
    tags: ['Vegan Option', 'Healthy']
  },
  {
    id: 'basil_fried_rice_veg',
    name: 'Basil Fried Rice',
    price: 14.00,
    category: 'Plant-Based Kitchen',
    desc: 'Spicy plant-based fried rice with fresh holy basil, sweet bell peppers, onions, and organic tofu.',
    image: plantBasilRiceImg,
    tags: ['Vegan Option', 'Spicy']
  },
  {
    id: 'vegetarian_pad_thai',
    name: 'Vegetarian Pad Thai',
    price: 14.00,
    category: 'Plant-Based Kitchen',
    desc: 'Thin rice noodles stir-fried with sweet tamarind glaze, tofu, bean sprouts, chives, and crushed peanuts.',
    image: plantPadThaiImg,
    tags: ['Vegan Option', 'Classic']
  },
  {
    id: 'tom_kha_veg_small',
    name: 'Tom Kha — Veg Small',
    price: 5.99,
    category: 'Plant-Based Kitchen',
    desc: 'Aromatic small bowl of coconut soup infused with lemongrass, galangal, kaffir lime leaves, mushrooms, and tofu.',
    image: plantTomKhaImg,
    tags: ['Vegan', 'Soup']
  },
  {
    id: 'tom_kha_veg_large',
    name: 'Tom Kha — Veg Large',
    price: 11.99,
    category: 'Plant-Based Kitchen',
    desc: 'Large sharing bowl of rich, creamy coconut herb soup with seasonal vegetables and organic tofu.',
    image: plantTomKhaImg,
    tags: ['Vegan', 'Soup']
  },
  {
    id: 'tom_yum_veg_small',
    name: 'Tom Yum — Veg Small',
    price: 5.99,
    category: 'Plant-Based Kitchen',
    desc: 'Spicy and sour small bowl of herb broth with lemongrass, lime juice, mushrooms, tomatoes, and tofu.',
    image: plantTomYumImg,
    tags: ['Vegan', 'Spicy']
  },
  {
    id: 'tom_yum_veg_large',
    name: 'Tom Yum — Veg Large',
    price: 11.99,
    category: 'Plant-Based Kitchen',
    desc: 'Large sharing bowl of fiery, herb-infused hot and sour soup with tofu and mixed vegetables.',
    image: plantTomYumImg,
    tags: ['Vegan', 'Spicy']
  },
  {
    id: 'eggplant_tofu_prik_pao',
    name: 'Eggplant & Tofu Prik Pao',
    price: 14.00,
    category: 'Plant-Based Kitchen',
    desc: 'Sweet purple eggplants and crispy organic tofu stir-fried with sweet chili paste and sweet basil.',
    image: plantEggplantTofuImg,
    tags: ['Vegan Option', 'Popular']
  },
  {
    id: 'choo_chee_tofu',
    name: 'Choo Chee Tofu',
    price: 18.00,
    category: 'Plant-Based Kitchen',
    desc: 'Crispy organic tofu steak simmered in a thick, rich Choo Chee red curry cream, garnished with kaffir lime leaves.',
    image: plantChooCheeTofuImg,
    tags: ['Vegan Option', 'Premium']
  },
  {
    id: 'tofu_khee_mao',
    name: 'Tofu Khee Mao',
    price: 14.00,
    category: 'Plant-Based Kitchen',
    desc: 'Spicy plant-based drunken noodles stir-fried with wide flat rice noodles, mixed vegetables, tofu, and fresh chilies.',
    image: plantTofuKheeMaoImg,
    tags: ['Vegan Option', 'Spicy']
  },

  // SWEET ENDINGS (9 items)
  {
    id: 'thai_rubies_in_coconut_milk',
    name: 'Thai Rubies in Coconut Milk',
    price: 9.99,
    category: 'Sweet Endings',
    desc: 'Water chestnuts served in sweet coconut milk with crushed ice.',
    image: rubiesCoconutImg,
    tags: ['Cold', 'Traditional']
  },
  {
    id: 'mango_sticky_rice',
    name: 'Mango Sticky Rice',
    price: 9.99,
    category: 'Sweet Endings',
    desc: 'Fresh mango served with sweet coconut sticky rice.',
    image: mangoStickyRiceImg,
    tags: ['Warm', 'Popular']
  },
  {
    id: 'banana_sticky_rice',
    name: 'Banana Sticky Rice',
    price: 8.99,
    category: 'Sweet Endings',
    desc: 'Warm sticky rice with banana and coconut.',
    image: bananaStickyRiceImg,
    tags: ['Steamed', 'Traditional']
  },
  {
    id: 'black_rice_mango_dessert',
    name: 'Black Rice Mango Dessert',
    price: 9.99,
    category: 'Sweet Endings',
    desc: 'Nutty black rice paired with fresh mango.',
    image: blackRiceMangoImg,
    tags: ['Warm']
  },
  {
    id: 'sweet_roti',
    name: 'Sweet Roti',
    price: 6.99,
    category: 'Sweet Endings',
    desc: 'Crispy Thai flatbread topped with condensed milk.',
    image: menuDessert,
    tags: ['Crispy', 'Popular']
  },
  {
    id: 'fried_banana_with_honey',
    name: 'Fried Banana with Honey',
    price: 6.99,
    category: 'Sweet Endings',
    desc: 'Golden fried banana drizzled with honey.',
    image: menuDessert,
    tags: ['Crispy']
  },
  {
    id: 'fried_cheesecake',
    name: 'Fried Cheesecake',
    price: 6.99,
    category: 'Sweet Endings',
    desc: 'Crispy outside with a creamy cheesecake center.',
    image: menuDessert,
    tags: ['Indulgent']
  },
  {
    id: 'deep_fried_ice_cream',
    name: 'Deep Fried Ice Cream',
    price: 7.99,
    category: 'Sweet Endings',
    desc: 'Ice cream wrapped and fried for a hot and cold contrast.',
    image: menuDessert,
    tags: ['Cold & Hot']
  },
  {
    id: 'thai_coconut_pancakes',
    name: 'Thai Coconut Pancakes / Kanom Krok',
    price: 8.99,
    category: 'Sweet Endings',
    desc: 'Bite-sized coconut rice pancakes with crispy edges and soft centers.',
    image: menuDessert,
    tags: ['Fresh', 'Authentic']
  },

  // LUNCH EXPERIENCE (1 item)
  {
    id: 'lunch_experience',
    name: 'Lunch Experience',
    price: 12.99,
    category: 'Lunch Experience',
    desc: 'Curated weekday lunch set featuring your choice of select fried rice or noodle entree, starter, and hot tea.',
    image: lunchImg,
    tags: ['Value', 'Weekday']
  }
]

export const MENU_CATEGORIES = [
  'All Dishes',
  'Fried Rice',
  'Southeast Asian Street Kitchen',
  'Plant-Based Kitchen',
  'Sweet Endings',
  'Lunch Experience'
]
