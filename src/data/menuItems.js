// Brand Menu Items Dataset
import mangoLassiSmoothieImg from '../assets/MANGO LASSI SMOOTHIE.png'
import strawberryBananaSmoothieImg from '../assets/STRAWBERRY BANANA SMOOTHIE.png'
import matchaGreenTeaSmoothieImg from '../assets/MATCHA GREEN TEA SMOOTHIE.png'
import taroSmoothieImg from '../assets/TARO SMOOTHIE.png'
import oreoSmoothieImg from '../assets/OREO SMOOTHIE.png'
import honeydewSmoothieImg from '../assets/HONEYDEW SMOOTHIE.png'
import thaiTeaSmoothieImg from '../assets/THAI TEA SMOOTHIE.png'
import tigerBrownSugarMilkTeaImg from '../assets/TIGER BROWN SUGAR MILK TEA.png'
import classicMilkTeaImg from '../assets/CLASSIC MILK TEA.png'
import thaiMilkTeaImg from '../assets/THAI MILK TEA.png'
import chaiMilkTeaImg from '../assets/CHAI MILK TEA.png'
import chocolateMilkTeaImg from '../assets/CHOCOLATE MILK TEA.png'
import honeydewMilkTeaImg from '../assets/HONEYDEW MILK TEA.png'
import taroMilkTeaImg from '../assets/TARO MILK TEA.png'

// Newly uploaded local image assets
import pinaColadaSlushImg from '../assets/PINA COLADA SLUSH.png'
import lycheeSlushImg from '../assets/LYCHEE SLUSH.png'
import passionfruitSlushImg from '../assets/PASSIONFRUIT SLUSH.png'
import peachSlushImg from '../assets/PEACH SLUSH .png'
import mangoSlushImg from '../assets/MANGO SLUSH.png'
import pineappleSlushImg from '../assets/PINEAPPLE SLUSH.png'
import milkTeaImg from '../assets/Milk tea.png'
import iceColdLemonadeImg from '../assets/ICE COLD LEMONADE.png'
import peachLemonadeImg from '../assets/PEACH LEMONADE.png'
import passionfruitLemonadeImg from '../assets/PASSIONFRUIT LEMONADE.png'
import pineappleLemonadeImg from '../assets/PINEAPPLE LEMONADE.png'
import matchaLatteImg from '../assets/MATCHA LATTE.png'
import matchaLemonadeImg from '../assets/MATCHA LEMONADE.png'
import matchaMangoImg from '../assets/MATCHA MANGO.png'
import matchaStrawberryImg from '../assets/MATCHA STRAWBERRY.png'

export const MENU_ITEMS = [
  // SMOOTHIES (5.95)
  {
    id: 'mango_lassi_smoothie',
    name: 'Mango Lassi Smoothie',
    price: 5.95,
    category: 'Smoothies',
    desc: 'Creamy blend of sweet organic mangoes and fresh cold yogurt.',
    image: mangoLassiSmoothieImg,
    tags: ['LRG']
  },
  {
    id: 'strawberry_banana_smoothie',
    name: 'Strawberry Banana Smoothie',
    price: 5.95,
    category: 'Smoothies',
    desc: 'A classic rich fusion of fresh organic strawberries and sweet ripe bananas.',
    image: strawberryBananaSmoothieImg,
    tags: ['LRG']
  },
  {
    id: 'matcha_green_tea_smoothie',
    name: 'Matcha Green Tea Smoothie',
    price: 5.95,
    category: 'Smoothies',
    desc: 'Ceremonial stone-ground green tea whisked and blended into a cold creamy base.',
    image: matchaGreenTeaSmoothieImg,
    tags: ['LRG']
  },
  {
    id: 'taro_smoothie',
    name: 'Taro Smoothie',
    price: 5.95,
    category: 'Smoothies',
    desc: 'Rich, velvet blend of real organic purple taro root with sweet creamy milk.',
    image: taroSmoothieImg,
    tags: ['LRG']
  },
  {
    id: 'oreo_smoothie',
    name: 'Oreo Smoothie',
    price: 5.95,
    category: 'Smoothies',
    desc: 'Indulgent, creamy blend loaded with crushed Oreo cookies and sweet vanilla cream.',
    image: oreoSmoothieImg,
    tags: ['LRG']
  },
  {
    id: 'honeydew_smoothie',
    name: 'Honeydew Smoothie',
    price: 5.95,
    category: 'Smoothies',
    desc: 'Refreshing and sweet blend of ripe, sweet honeydew melon and fresh milk base.',
    image: honeydewSmoothieImg,
    tags: ['LRG']
  },
  {
    id: 'thai_tea_smoothie',
    name: 'Thai Tea Smoothie',
    price: 5.95,
    category: 'Smoothies',
    desc: 'Spiced sweet Thai tea leaves slow-infused and blended into a creamy smoothie.',
    image: thaiTeaSmoothieImg,
    tags: ['LRG']
  },

  // SLUSHES (5.95)
  {
    id: 'pina_colada_slush',
    name: 'Pina Colada Slush',
    price: 5.95,
    category: 'Slushes',
    desc: 'Tropical icy slush of sweet golden pineapple nectar and rich coconut milk.',
    image: pinaColadaSlushImg,
    tags: ['LRG']
  },
  {
    id: 'lychee_slush',
    name: 'Lychee Slush',
    price: 5.95,
    category: 'Slushes',
    desc: 'Fragrant and sweet cold-blended tropical lychee fruit slush.',
    image: lycheeSlushImg,
    tags: ['LRG']
  },
  {
    id: 'passionfruit_slush',
    name: 'Passionfruit Slush',
    price: 5.95,
    category: 'Slushes',
    desc: 'Tangy and sweet cold-infused tropical purple passionfruit pulp slush.',
    image: passionfruitSlushImg,
    tags: ['LRG']
  },
  {
    id: 'peach_slush',
    name: 'Peach Slush',
    price: 5.95,
    category: 'Slushes',
    desc: 'Refreshing sweet icy slush crafted from fresh hand-picked ripe white peaches.',
    image: peachSlushImg,
    tags: ['LRG']
  },
  {
    id: 'mango_slush',
    name: 'Mango Slush',
    price: 5.95,
    category: 'Slushes',
    desc: 'Ice-blended pure sweet mango nectar slush for a refreshing tropical escape.',
    image: mangoSlushImg,
    tags: ['LRG']
  },
  {
    id: 'pineapple_slush',
    name: 'Pineapple Slush',
    price: 5.95,
    category: 'Slushes',
    desc: 'Chilled and refreshing gold pineapple juice ice-blended slush.',
    image: pineappleSlushImg,
    tags: ['LRG']
  },

  // CLASSIC TEA (5.25)
  {
    id: 'special_blend_black_tea',
    name: 'Special Blend Black Tea',
    price: 5.25,
    category: 'Classic Tea',
    desc: 'Slow-steeped signature high-mountain black tea leaves with a bold, rich aroma.',
    image: milkTeaImg,
    tags: ['LRG']
  },

  // MILK TEA (5.25)
  {
    id: 'tiger_brown_sugar_milk_tea',
    name: 'Tiger Brown Sugar Milk Tea',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Creamy milk tea drizzled with caramel-like house brown sugar syrup stripes.',
    image: tigerBrownSugarMilkTeaImg,
    tags: ['LRG']
  },
  {
    id: 'classic_milk_tea',
    name: 'Classic Milk Tea',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Traditional high-mountain black milk tea brewed to rich, smooth perfection.',
    image: classicMilkTeaImg,
    tags: ['LRG']
  },
  {
    id: 'thai_milk_tea',
    name: 'Thai Milk Tea',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Sweet, spiced orange Thai black tea topped with rich, creamy milk layer.',
    image: thaiMilkTeaImg,
    tags: ['LRG']
  },
  {
    id: 'chai_milk_tea',
    name: 'Chai Milk Tea',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Exotic blend of robust black tea leaves, warm aromatic spices, and cream.',
    image: chaiMilkTeaImg,
    tags: ['LRG']
  },
  {
    id: 'taro_milk_tea',
    name: 'Taro Milk Tea',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Sweet, velvety smooth milk tea infused with sweet organic purple taro root.',
    image: taroMilkTeaImg,
    tags: ['LRG']
  },
  {
    id: 'honeydew_milk_tea',
    name: 'Honeydew Milk Tea',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Refreshing sweet blend of ripe, aromatic honeydew melon and classic milk tea.',
    image: honeydewMilkTeaImg,
    tags: ['LRG']
  },
  {
    id: 'chocolate_milk_tea',
    name: 'Chocolate Milk Tea',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Rich, smooth milk tea infused with decadent organic cocoa and dark chocolate.',
    image: chocolateMilkTeaImg,
    tags: ['LRG']
  },
  {
    id: 'dark_roast_coffee',
    name: 'Dark Roast Coffee',
    price: 5.25,
    category: 'Milk Tea',
    desc: 'Decadent slow-dripped bold espresso blended with sweet, creamy dairy.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },

  // LEMONADES (5.25)
  {
    id: 'ice_cold_lemonade',
    name: 'Ice Cold Lemonade',
    price: 5.25,
    category: 'Lemonades',
    desc: 'Traditional freshly squeezed tart organic lemons sweetened with pure cane sugar.',
    image: iceColdLemonadeImg,
    tags: ['LRG']
  },
  {
    id: 'mango_lemonade',
    name: 'Mango Lemonade',
    price: 5.25,
    category: 'Lemonades',
    desc: 'Sweet, tropical Alphonso mango nectar mixed with our signature fresh lemonade.',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'strawberry_lemonade',
    name: 'Strawberry Lemonade',
    price: 5.25,
    category: 'Lemonades',
    desc: 'A vibrant sweet blend of fresh organic strawberry puree and refreshing lemonade.',
    image: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'peach_lemonade',
    name: 'Peach Lemonade',
    price: 5.25,
    category: 'Lemonades',
    desc: 'Juicy summer peach nectar blended with a refreshing, tart squeezed lemonade base.',
    image: peachLemonadeImg,
    tags: ['LRG']
  },
  {
    id: 'passionfruit_lemonade',
    name: 'Passionfruit Lemonade',
    price: 5.25,
    category: 'Lemonades',
    desc: 'Fragrant tropical purple passionfruit pulp combined with chilled fresh lemonade.',
    image: passionfruitLemonadeImg,
    tags: ['LRG']
  },
  {
    id: 'pineapple_lemonade',
    name: 'Pineapple Lemonade',
    price: 5.25,
    category: 'Lemonades',
    desc: 'Sweet golden pineapple nectar combined with tart fresh hand-squeezed lemonade.',
    image: pineappleLemonadeImg,
    tags: ['LRG']
  },

  // MATCHA SPECIALS (5.95)
  {
    id: 'matcha_latte',
    name: 'Matcha Latte',
    price: 5.95,
    category: 'Matcha Specials',
    desc: 'Ceremonial green tea whisked with creamy organic milk.',
    image: matchaLatteImg,
    tags: ['LRG']
  },
  {
    id: 'matcha_lemonade',
    name: 'Matcha Lemonade',
    price: 5.95,
    category: 'Matcha Specials',
    desc: 'Fragrant organic green tea layered with tart, freshly squeezed iced lemonade.',
    image: matchaLemonadeImg,
    tags: ['LRG']
  },
  {
    id: 'matcha_mango',
    name: 'Matcha Mango',
    price: 5.95,
    category: 'Matcha Specials',
    desc: 'Tropical layered drink combining sweet mango nectar and ceremonial green matcha.',
    image: matchaMangoImg,
    tags: ['LRG']
  },
  {
    id: 'matcha_strawberry',
    name: 'Matcha Strawberry',
    price: 5.95,
    category: 'Matcha Specials',
    desc: 'Premium green tea layers floating above sweet organic strawberries and cold milk.',
    image: matchaStrawberryImg,
    tags: ['LRG']
  },

  // SEA SALT CREME (5.95)
  {
    id: 'milk_tea_creme',
    name: 'Milk Tea w/ Crème de Sea Salt',
    price: 5.95,
    category: 'Sea Salt Creme',
    desc: 'Signature robust milk tea topped with our dense, salty sea salt cream foam.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'chai_tea_creme',
    name: 'Chai Tea w/ Crème de Sea Salt',
    price: 5.95,
    category: 'Sea Salt Creme',
    desc: 'Rich, spiced chai tea layered beneath our signature savory velvet sea salt cream.',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc5c1a61cff?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'thai_tea_creme',
    name: 'Thai Tea w/ Crème de Sea Salt',
    price: 5.95,
    category: 'Sea Salt Creme',
    desc: 'Sweet orange spiced Thai tea topped with a luxurious cap of salty velvet sea salt foam.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  },
  {
    id: 'dark_coffee_creme',
    name: 'Dark Coffee w/ Crème de Sea Salt',
    price: 5.95,
    category: 'Sea Salt Creme',
    desc: 'Decadent slow-dripped bold iced coffee topped with sweet and salty sea salt cream layers.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=80',
    tags: ['LRG']
  }
]

export const MENU_CATEGORIES = [
  'All Brews',
  'Smoothies',
  'Slushes',
  'Classic Tea',
  'Milk Tea',
  'Lemonades',
  'Matcha Specials',
  'Sea Salt Creme'
]
