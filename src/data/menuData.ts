export interface MenuItem {
  id: string;
  name: string;
  price?: number;
  halfPrice?: number;
  fullPrice?: number;
  note?: string;
  tag?: 'Signature' | 'Spicy' | 'Veg' | 'Popular';
}

export interface MenuCategory {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  hasPortions?: boolean;
  items: MenuItem[];
}

export const SIGNATURE_DISHES = [
  {
    id: 'kaada-biryani',
    name: 'Kaada Biryani',
    category: 'Kaada Specialities',
    price: '₹210',
    description:
      'Fragrant short-grain jeerakasala rice slow-cooked with spiced quail, caramelized shallots, ghee, and whole Malabar spices.',
    image: '/images/signature-biryani.jpg',
    badge: 'House Favourite',
  },
  {
    id: 'chicken-kuthu-porota',
    name: 'Chicken Kuthu Porota',
    category: 'Mix Items',
    price: '₹120',
    description:
      'Flaky Kerala porota minced and tossed on a screaming hot iron tawa with roast chicken masala, egg, curry leaves, and black pepper.',
    image: '/images/atmosphere-kitchen.jpg',
    badge: 'Tawa Classic',
  },
  {
    id: 'pepper-chicken-porota',
    name: 'Pepper Chicken & Kerala Porota',
    category: 'Chicken Curry & Breads',
    price: '₹140 / ₹240',
    description:
      'Crushed Tellicherry black pepper chicken simmered in roasted coconut & shallots, paired with hand-layered crispy Kerala porota.',
    image: '/images/signature-porota-curry.jpg',
    badge: 'Most Ordered',
  },
];

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'main-course',
    title: 'Main Course',
    subtitle: 'Aromatic biryanis, fragrant ghee rice, and wok-tossed fried rice',
    image: '/images/signature-biryani.jpg',
    imageAlt: 'Traditional Malabar biryani and fragrant rice',
    items: [
      { id: 'chicken-biryani', name: 'Chicken Biryani', price: 160, tag: 'Popular' },
      { id: 'egg-biryani', name: 'Egg Biryani', price: 140 },
      { id: 'biryani-rice', name: 'Biryani Rice', price: 100 },
      { id: 'ghee-rice', name: 'Ghee Rice', price: 90 },
      { id: 'jeera-rice', name: 'Jeera rice', price: 100 },
      { id: 'curd-rice', name: 'Curd Rice', price: 60, tag: 'Veg' },
      { id: 'chicken-fried-rice', name: 'Chicken Fried Rice', price: 120 },
      { id: 'egg-fried-rice', name: 'Egg Fried Rice', price: 100 },
      { id: 'veg-fried-rice', name: 'Veg Fried Rice', price: 90, tag: 'Veg' },
      { id: 'gobi-fried-rice', name: 'Gobi Fried Rice', price: 100, tag: 'Veg' },
      { id: 'paneer-fried-rice', name: 'Paneer Fried Rice', price: 100, tag: 'Veg' },
    ],
  },
  {
    id: 'kaada-items',
    title: 'Kaada Items',
    subtitle: 'Signature quail preparations roasted with freshly ground pepper and spices',
    image: '/images/signature-biryani.jpg',
    imageAlt: 'Kaada Biryani and spiced quail roast',
    items: [
      { id: 'kaada-biryani', name: 'Kaada Biryani', price: 210, tag: 'Signature' },
      { id: 'kaada-pepper-masala', name: 'Kaada Pepper Masala', price: 160, tag: 'Spicy' },
      { id: 'kaada-fry', name: 'Kaada Fry', price: 130, tag: 'Popular' },
    ],
  },
  {
    id: 'mix-items',
    title: 'Mix Items',
    subtitle: 'Hot-tawa shredded porota, steamed puttu, and lacey appam mixes',
    image: '/images/atmosphere-kitchen.jpg',
    imageAlt: 'Kuthu Porota cooked on hot iron tawa',
    items: [
      { id: 'chicken-kuthu-porota', name: 'Chicken Kuthu Porota', price: 120, tag: 'Popular' },
      { id: 'egg-kuthu-porota', name: 'Egg Kuthu Porota', price: 110 },
      { id: 'veg-kuthu-porota', name: 'Veg Kuthu Porota', price: 100, tag: 'Veg' },
      { id: 'puttu-chicken-mix', name: 'Puttu Chicken Mix', price: 120, tag: 'Signature' },
      { id: 'puttu-egg-mix', name: 'Puttu Egg Mix', price: 110 },
      { id: 'appam-chicken-mix', name: 'Appam Chicken Mix', price: 120 },
    ],
  },
  {
    id: 'meals',
    title: 'Meals',
    subtitle: 'Wholesome homestyle rice meals served fresh every afternoon',
    image: '/images/signature-veg-egg.jpg',
    imageAlt: 'Traditional Kerala rice meals',
    items: [
      { id: 'boil-rice-meals', name: 'Boil Rice Meals', price: 80, tag: 'Popular' },
      { id: 'white-rice-meals', name: 'White Rice Meals', price: 80 },
    ],
  },
  {
    id: 'chicken-curry',
    title: 'Chicken Curry Items',
    subtitle: 'Slow-simmered gravies available in Half & Full portions',
    image: '/images/signature-porota-curry.jpg',
    imageAlt: 'Rich chicken curries with Kerala porota',
    hasPortions: true,
    items: [
      { id: 'chicken-masala', name: 'Chicken Masala', halfPrice: 120, fullPrice: 220 },
      { id: 'pepper-chicken-curry', name: 'Pepper Chicken', halfPrice: 140, fullPrice: 240, tag: 'Spicy' },
      { id: 'chilli-chicken-curry', name: 'Chilli Chicken', halfPrice: 140, fullPrice: 240 },
      { id: 'butter-chicken', name: 'Butter Chicken', halfPrice: 140, fullPrice: 240, tag: 'Popular' },
      { id: 'chicken-kheema', name: 'Chicken Kheema', halfPrice: 140, fullPrice: 240 },
      { id: 'kadai-chicken', name: 'Kadai Chicken', halfPrice: 140, fullPrice: 240 },
      { id: 'garlic-chicken', name: 'Garlic Chicken', halfPrice: 140, fullPrice: 240 },
      { id: 'chicken-kurma', name: 'Chicken Kurma', halfPrice: 130, fullPrice: 240 },
    ],
  },
  {
    id: 'chicken-dry',
    title: 'Chicken Dry Items',
    subtitle: 'Crisp-fried, pepper-tossed, and smoky tawa chicken starters',
    image: '/images/signature-porota-curry.jpg',
    imageAlt: 'Crispy chicken dry starters',
    hasPortions: true,
    items: [
      { id: 'chicken-kabab', name: 'Chicken Kabab', halfPrice: 100, fullPrice: 190, tag: 'Popular' },
      { id: 'pepper-chicken-dry', name: 'Pepper Chicken', halfPrice: 140, fullPrice: 240, tag: 'Spicy' },
      { id: 'chilli-chicken-dry', name: 'Chilli Chicken', halfPrice: 140, fullPrice: 240 },
      { id: 'chicken-manchurian', name: 'Chicken Manchurian', halfPrice: 140, fullPrice: 240 },
      { id: 'chicken-burji', name: 'Chicken Burji', halfPrice: 140, fullPrice: 240 },
      { id: 'leg-fry', name: 'Leg Fry', fullPrice: 120 },
    ],
  },
  {
    id: 'veg-dry',
    title: 'Veg Dry Items',
    subtitle: 'Crisp paneer, cauliflower, and spiced lentil fries',
    image: '/images/signature-veg-egg.jpg',
    imageAlt: 'Vegetarian dry fry dishes',
    items: [
      { id: 'paneer-fry', name: 'Paneer Fry', price: 130, tag: 'Veg' },
      { id: 'channa-fry', name: 'Channa Fry', price: 80, tag: 'Veg' },
      { id: 'greenpeas-fry', name: 'Greenpeas Fry', price: 80, tag: 'Veg' },
      { id: 'aloo-jeera-fry', name: 'Aloo Jeera Fry', price: 80, tag: 'Veg' },
      { id: 'gobi-manchurian', name: 'Gobi Manchurian', price: 100, tag: 'Popular' },
      { id: 'mix-veg-fry', name: 'Mix Veg Fry', price: 80, tag: 'Veg' },
      { id: 'aloo-channa-fry', name: 'Aloo Channa Fry', price: 90, tag: 'Veg' },
      { id: 'paneer-matar-fry', name: 'Paneer Matar Fry', price: 120, tag: 'Veg' },
    ],
  },
  {
    id: 'veg-curry',
    title: 'Veg Curry Items',
    subtitle: 'Rich paneer gravies, homestyle channa, and comfort curries',
    image: '/images/signature-veg-egg.jpg',
    imageAlt: 'Paneer Butter Masala and vegetarian curries',
    items: [
      { id: 'paneer-butter-masala', name: 'Paneer Butter Masala', price: 130, tag: 'Popular' },
      { id: 'paneer-chilli-gravy', name: 'Paneer Chilli Gravy', price: 130, tag: 'Veg' },
      { id: 'kadai-paneer', name: 'Kadai Paneer', price: 130, tag: 'Veg' },
      { id: 'paneer-matar-masala', name: 'Paneer Matar Masala', price: 120, tag: 'Veg' },
      { id: 'paneer-masala', name: 'Paneer Masala', price: 120, tag: 'Veg' },
      { id: 'gobi-chilli', name: 'Gobi Chilli', price: 100, tag: 'Veg' },
      { id: 'gobi-pepper-masala', name: 'Gobi Pepper Masala', price: 100, tag: 'Spicy' },
      { id: 'gobi-masala', name: 'Gobi Masala', price: 90, tag: 'Veg' },
      { id: 'aloo-matar', name: 'Aloo Matar', price: 70, tag: 'Veg' },
      { id: 'aloo-gobi-masala', name: 'Aloo Gobi Masala', price: 80, tag: 'Veg' },
      { id: 'channa-masala', name: 'Channa Masala', price: 60, tag: 'Veg' },
      { id: 'greenpeas-masala', name: 'Greenpeas Masala', price: 50, tag: 'Veg' },
      { id: 'black-channa', name: 'Black Channa', price: 50, tag: 'Veg' },
      { id: 'veg-kurma', name: 'Veg Kurma', price: 70, tag: 'Veg' },
      { id: 'dal-fry', name: 'Dal Fry', price: 60, tag: 'Veg' },
    ],
  },
  {
    id: 'egg-items',
    title: 'Egg Items',
    subtitle: 'Classic Kerala egg roast, spiced bhurji, and pepper masala',
    image: '/images/signature-veg-egg.jpg',
    imageAlt: 'Kerala Egg Roast and Egg Masala',
    items: [
      { id: 'egg-masala', name: 'Egg Masala', price: 60 },
      { id: 'egg-roast', name: 'Egg Roast', price: 70, tag: 'Popular' },
      { id: 'egg-burji', name: 'Egg Burji', price: 60 },
      { id: 'egg-kheema', name: 'Egg Kheema', price: 70 },
      { id: 'egg-kurma', name: 'Egg Kurma', price: 70 },
      { id: 'egg-pepper-masala', name: 'Egg Pepper Masala', price: 100, tag: 'Spicy' },
      { id: 'egg-omlet', name: 'Egg Omlet', price: 40 },
      { id: 'boiled-egg', name: 'Boiled Egg (2 Pcs)', price: 25 },
    ],
  },
  {
    id: 'indian-breads',
    title: 'Indian Breads',
    subtitle: 'Hand-flaked porotas, steamed puttu, lacey appam, and idiyappam',
    image: '/images/signature-porota-curry.jpg',
    imageAlt: 'Kerala Porota, Appam, Puttu and Idiyappam',
    items: [
      { id: 'chapathi', name: 'Chapathi', price: 15 },
      { id: 'kerala-porota', name: 'Kerala Porota', price: 18, tag: 'Popular' },
      { id: 'wheat-porota', name: 'Wheat Porota', price: 20 },
      { id: 'cylon-porota', name: 'Cylon Porota', price: 25 },
      { id: 'appam', name: 'Appam', price: 15, tag: 'Popular' },
      { id: 'puttu', name: 'Puttu', price: 30 },
      { id: 'idiyappam', name: 'Idiyappam', price: 15 },
      { id: 'butter-extra', name: 'Butter extra', price: 5, note: 'Add-on' },
    ],
  },
];
