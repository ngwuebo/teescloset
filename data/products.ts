export type ProductColor = {
  name: string;
  hex: string;
  image?: string;
};

export type ProductDescription = {
  intro: string;
  whyLoveTitle: string;
  whyLoveItems: string[];
  keyFeaturesTitle: string;
  keyFeaturesItems: string[];
};

export type Product = {
  id: number;
  name: string;
  brand?: string;
  category?: string;
  price: number;
  oldPrice?: number;
  onSale?: boolean;

  image: string;
  image2?: string;
  images: string[];

  description: string;
  material: string;
  condition: string;

  colors?: ProductColor[];
  testimonialImages: string[];
  relatedIds?: number[];

  productDescription: ProductDescription;
};

type ProductInput = {
  id: number;
  name: string;
  brand?: string;
  category?: string;
  price: number;
  oldPrice?: number;
  onSale?: boolean;

  material?: string;
  condition?: string;
  imageCount?: number;
  image?: string;
  image2?: string;
  images?: string[];

  colors?: ProductColor[];
  relatedIds?: number[];
  testimonialImages?: string[];

  description?: string;
  productDescription?: Partial<ProductDescription>;
};

const DEFAULT_CONDITION = "Brand New";
const DEFAULT_MATERIAL = "Premium Leather / Canvas";
const DEFAULT_IMAGE_COUNT = 20;

const DEFAULT_TESTIMONIALS = [
  "/reviews/review1.jpg",
  "/reviews/review2.jpg",
  "/reviews/review3.jpg",
  "/reviews/review4.jpg",
  "/reviews/review5.jpg",
];


/**
 * Supports up to 20 images automatically by default.
 * Example for id 19:
 * /bags/bag19.jpg
 * /bags/bag19b.jpg
 * /bags/bag19c.jpg
 * ...
 * /bags/bag19t.jpg
 */
function buildBagImages(id: number, count = DEFAULT_IMAGE_COUNT): string[] {
  const suffixes = [
    "",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
  ];

  return suffixes
    .slice(0, Math.max(1, Math.min(count, DEFAULT_IMAGE_COUNT)))
    .map((suffix) => `/bags/bag${id}${suffix}.jpg`);
}

function buildDefaultDescription(
  name: string,
  material: string,
  condition: string
): ProductDescription {
  return {
    intro: `${name} is designed for elegant daily use with a refined luxury-inspired finish. It offers a polished look, practical structure, and comfortable carry for work, shopping, travel, and everyday outings.`,
    whyLoveTitle: "Why You’ll Love It:",
    whyLoveItems: [
      `${name} is made with premium materials for a polished and durable finish.`,
      "Spacious enough for everyday essentials like phone, wallet, and keys.",
      "Designed for comfortable everyday carry.",
      "Elegant styling that works for casual and dressy looks.",
      "A versatile choice for work, travel, shopping, and outings.",
    ],
    keyFeaturesTitle: "Key Features:",
    keyFeaturesItems: [
      `Material: ${material}`,
      `Condition: ${condition}`,
      "Quality: Highest",
      "Processing: 24 HOURS",
      "Shipping: 1–3 DAYS",
      "Packaging: Dust bag included",
    ],
  };
}

function createProduct(input: ProductInput): Product {
  const material = input.material || DEFAULT_MATERIAL;
  const condition = input.condition || DEFAULT_CONDITION;
  const imageCount = input.imageCount ?? DEFAULT_IMAGE_COUNT;

  const generatedImages = buildBagImages(input.id, imageCount);

  const defaultLongDescription = buildDefaultDescription(
    input.name,
    material,
    condition
  );

  return {
    id: input.id,
    name: input.name,
    brand: input.brand,
    category: input.category,
    price: input.price,
    oldPrice: input.oldPrice,
    onSale: input.onSale,

    image: input.image || generatedImages[0],
    image2: input.image2 || generatedImages[1],
    images: input.images || generatedImages,

    description:
      input.description ||
      `${input.name} is a premium designer-inspired bag crafted for stylish everyday use.`,

    material,
    condition,

    colors: input.colors || [],
    relatedIds: input.relatedIds || [],
    testimonialImages: input.testimonialImages || DEFAULT_TESTIMONIALS,

    productDescription: {
      intro: input.productDescription?.intro || defaultLongDescription.intro,
      whyLoveTitle:
        input.productDescription?.whyLoveTitle ||
        defaultLongDescription.whyLoveTitle,
      whyLoveItems:
        input.productDescription?.whyLoveItems ||
        defaultLongDescription.whyLoveItems,
      keyFeaturesTitle:
        input.productDescription?.keyFeaturesTitle ||
        defaultLongDescription.keyFeaturesTitle,
      keyFeaturesItems:
        input.productDescription?.keyFeaturesItems ||
        defaultLongDescription.keyFeaturesItems,
    },
  };
}
export const products: Product[] = [
  createProduct({
    id: 1,
    name: "Chanel Quilted Lambskin Designer Bag",
    brand: "Chanel",
    category: "Women’s Bags",
    price: 200,
    oldPrice: 250,
    onSale: true,
    material: "lambskin Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag1-navy-blue.jpg",
    image2: "/bags/bag1-beige.jpg",
    images: [
      "/bags/bag1-navy-blue.jpg",
      "/bags/bag1-beige.jpg",
      "/bags/bag1-black.jpg",
      "/bags/bag1-custom-burgundy.jpg",
      "/bags/bag1-red.jpg",
      "/bags/bag1-white.jpg",
    ],
    colors: [
      { name: "Navy Blue", hex: "#1E3A5F", image: "/bags/bag1-navy-blue.jpg" },
      { name: "Beige", hex: "#ffe4c4", image: "/bags/bag1-beige.jpg" },
      { name: "Black", hex: "#111111", image: "/bags/bag1-black.jpg" },
      { name: "Custom Burgundy", hex: "#60373B", image: "/bags/bag1-custom-burgundy.jpg" },
      { name: "Red", hex: "#C1121f", image: "/bags/bag1-red.jpg" },
      { name: "White", hex: "#FFFFFF", image: "/bags/bag1-white.jpg" },
    ],
    relatedIds: [2, 3, 4, 5, 8, 10, 19, 20],
  }),

  createProduct({
    id: 2,
    name: "Coach Tabby Shoulder Bag 26",
    brand: "Coach",
    category: "Womens’s Bags",
    price: 329,
    material: "Nappa Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag2-dark-lemon.jpg",
    image2: "/bags/bag2-wine.jpg",
    images: [
      "/bags/bag2-dark-lemon.jpg",
      "/bags/bag2-wine.jpg",
      "/bags/bag2-black.jpg",
      "/bags/bag2-dark-brown.jpg",
      "/bags/bag2e.jpg",
      "/bags/bag2f.jpg",
    ],
    colors: [
      { name: "dark lemon", hex: "#193820", image: "/bags/bag2-dark-lemon.jpg" },
      { name: "wine", hex: "#981C0C", image: "/bags/bag2-wine.jpg" },
      { name: "black", hex: "#111111", image: "/bags/bag2-black.jpg" },
      { name: "dark-brown", hex: "#4A2A2F", image: "/bags/bag2-dark-brown.jpg" },
    ],
    relatedIds: [1, 3, 4, 5],
  }),

  createProduct({
    id: 3,
    name: "Coach Idol Shoulder Bag ",
    brand: "Coach",
    category: "Women’s Bags",
    price: 285,
    material: "luxe refined calf leather",
    condition: "Preloved",
    imageCount: 10,
    image: "/bags/bag3-red.jpg",
    image2: "/bags/bag3b.jpg",
    images: [
      "/bags/bag3-red.jpg",
      "/bags/bag3b.jpg",
    ],
    colors: [
      { name: "Red", hex: "#C1452F", image: "/bags/bag3-red.jpg" },
    ],
    relatedIds: [1, 2, 4, 5],
  }),

  createProduct({
    id: 4,
    name: "Tory Burch Eleanor Convertible Shoulder Bag",
    brand: "Tory Burch",
    category: "Women’s Bags",
    price: 310,
    material: "Soft chevron-quilted leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag4-dark-green.jpg",
    image2: "/bags/bag4b-black.jpg",
    images: [
      "/bags/bag4-dark-green.jpg",
      "/bags/bag4b-black.jpg",
    ],
    colors: [
      { name: "Dark Green", hex: "#112819", image: "/bags/bag4-dark-green.jpg" },
      { name: "Black", hex: "#111111", image: "/bags/bag4b-black.jpg" },
    ],
    relatedIds: [1, 2, 3, 5],
  }), 

  createProduct({
    id: 5,
    name: "Tory Burch T-Monogram Jacquard Bucket Bag",
    brand: "Tory Burch",
    category: "Travel Bags",
    price: 295,
    material: "woven jacquard and leather trim",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag5-navy-blue.jpg",
    image2: "/bags/bag5b.jpg",
    images: [
      "/bags/bag5-navy-blue.jpg",
      "/bags/bag5b.jpg",
      "/bags/bag5c.jpg",
      "/bags/bag5d.jpg",
    ],
    colors: [
      { name: "Navy Blue", hex: "#1E3A5F", image: "/bags/bag5-navy-blue.jpg" },
    ],
    relatedIds: [1, 2, 3, 4],
  }),

  createProduct({
    id: 6,
    name: "Coach Lana Shoulder Bag 23",
    brand: "Coach",
    category: "Women’s Bags",
    price: 245,
    oldPrice: 285,
    onSale: true,
    material: "polished pebble leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag6-black.jpg",
    image2: "/bags/bag6b-pink.jpg",
    images: [
      "/bags/bag6-black.jpg",
      "/bags/bag6b-pink.jpg",
      "/bags/bag6c-white.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag6-black.jpg" },
      { name: "Pink", hex: "#EC4899", image: "/bags/bag6b-pink.jpg" },
      { name: "White", hex: "#FFFFFF", image: "/bags/bag6c-white.jpg" },
    ],
    relatedIds: [7, 8, 9, 10],
  }),

  createProduct({
    id: 7,
    name: "Gucci Ophidia Small Shoulder Bag",
    brand: "Gucci",
    category: "Women’s Bags",
    price: 315,
    material: "GG Supreme canvas",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag7-brown.jpg",
    image2: "/bags/bag7b-beige.jpg",
    images: [
      "/bags/bag7-brown.jpg",
      "/bags/bag7b-beige.jpg",
      "/bags/bag7c-gold.jpg",
      "/bags/bag7d.jpg",
      "/bags/bag7e.jpg",
    ],
    colors: [
      { name: "Brown", hex: "#7A4E2D", image: "/bags/bag7-brown.jpg" },
      { name: "Beige", hex: "#DCC7AA", image: "/bags/bag7b-beige.jpg" },
      { name: "Gold", hex: "#D4AF37", image: "/bags/bag7c-gold.jpg" },
    ],
    relatedIds: [6, 8, 9, 10],
  }),

  createProduct({
    id: 8,
    name: "Gucci  Dionysus Shoulder Bag",
    brand: "Gucci",
    category: "Women’s Bags",
    price: 305,
    material: "Pu Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag8-pink.jpg",
    image2: "/bags/bag8b-ash.jpg",
    images: [
      "/bags/bag8-pink.jpg",
      "/bags/bag8b-ash.jpg",
      "/bags/bag8c-cream.jpg",
      "/bags/bag8d.jpg",
      "/bags/bag8e.jpg",
      "/bags/bag8f.jpg",
    ],
    colors: [
      { name: "Pink", hex: "#E7A9B0", image: "/bags/bag8-pink.jpg" },
      { name: "Ash", hex: "#B2BEB5", image: "/bags/bag8b-ash.jpg" },
      { name: "Cream", hex: "#F5E7D3", image: "/bags/bag8c-cream.jpg" },
    ],
    relatedIds: [6, 7, 9, 10],
  }),

  createProduct({
    id: 9,
    name: "Gucci Ophidia Tote Bag",
    brand: "Gucci",
    category: "Women’s Bags",
    price: 298,
    material: "GG Supreme canvas",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag9-black.jpg",
    image2: "/bags/bag9b-white.jpg",
    images: [
      "/bags/bag9-black.jpg",
      "/bags/bag9b-white.jpg",
      "/bags/bag9c-hot-pink.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag9-black.jpg" },
      { name: "White", hex: "#FFFFFF", image: "/bags/bag9b-white.jpg" },
      { name: "Hot Pink", hex: "#FF69B4", image: "/bags/bag9c-hot-pink.jpg" },
    ],
    relatedIds: [6, 7, 8, 10],
  }),

  createProduct({
    id: 10,
    name: "Elegant Suede PU Leather Handbag",
    brand: "Unbranded",
    category: "suede PU leather",
    price: 289,
    material: "Pebbled Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag10-wine.jpg",
    image2: "/bags/bag10b-black.jpg",
    images: [
      "/bags/bag10-wine.jpg",
      "/bags/bag10b-black.jpg",
      "/bags/bag10d-brown.jpg",
      "/bags/bag10c.jpg",
    ],
    colors: [
      { name: "Wine", hex: "#722F37", image: "/bags/bag10-wine.jpg" },
      { name: "Black", hex: "#111111", image: "/bags/bag10b-black.jpg" },
      { name: "Brown", hex: "#7A4E2D", image: "/bags/bag10d-brown.jpg" },
    ],
    relatedIds: [6, 7, 8, 9],
  }),

  createProduct({
    id: 11,
    name: "Women Small Square Chain Shoulder Muju Bag",
    brand: "Muju",
    category: "Women’s Bags",
    price: 420,
    oldPrice: 470,
    onSale: true,
    material: "Togo Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag11-Deep-Blue.jpg",
    image2: "/bags/bag11b-Light-Brown.jpg",
    images: [
      "/bags/bag11-Deep-Blue.jpg",
      "/bags/bag11b-Light-Brown.jpg",
      "/bags/bag11cDark-Bown.jpg",
      "/bags/bag11d-Wine.jpg",
      "/bags/bag11e.jpg",
      "/bags/bag11f.jpg",
      "/bags/bag11g.jpg",
    ],
    colors: [
      { name: "Deep Blue", hex: "#1E3A5F", image: "/bags/bag11-Deep-Blue.jpg" },
      { name: "Light Brown", hex: "#D2B48C", image: "/bags/bag11b-Light-Brown.jpg" },
      { name: "Dark Brown", hex: "#654321", image: "/bags/bag11cDark-Bown.jpg" },
      { name: "Wine", hex: "#722F37", image: "/bags/bag11d-Wine.jpg" },
    ],
    relatedIds: [12, 13, 14, 15],
  }),

  createProduct({
    id: 12,
    name: "Louis Vuitton OnTheGo",
    brand: "Louis Vuitton",
    category: "Women’s Bags",
    price: 450,
    material: "Monogram Empreinte leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag12-cream.jpg",
    image2: "/bags/bag12b-Black.jpg",
    images: [
      "/bags/bag12-cream.jpg",
      "/bags/bag12b-Black.jpg",
      "/bags/bag12c.jpg",
      "/bags/bag12d.jpg",
      "/bags/bag12e.jpg",
      "/bags/bag12f.jpg",
      "/bags/bag12g.jpg",
      "/bags/bag12h.jpg",
    ],
    colors: [
      { name: "Cream", hex: "#F5E7D3", image: "/bags/bag12-cream.jpg" },
      { name: "Black", hex: "#111111", image: "/bags/bag12b-Black.jpg" },
    ],
    relatedIds: [11, 13, 14, 15],
  }),

  createProduct({
    id: 13,
    name: "Luxury Crocodile Pattern Crossbody Handbag",
    brand: "Unbranded",
    category: "Women’s Bags",
    price: 315,
    material: "Pu Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag13-red.jpg",
    image2: "/bags/bag13b-Gold.jpg",
    images: [
      "/bags/bag13-red.jpg",
      "/bags/bag13b-Gold.jpg",
      "/bags/bag13c-Black.jpg",
      "/bags/bag13d-beige.jpg",
    ],
    colors: [
      { name: "Red", hex: "#C1121F", image: "/bags/bag13-red.jpg" },
      { name: "Gold", hex: "#D4AF37", image: "/bags/bag13b-Gold.jpg" },
      { name: "Black", hex: "#111111", image: "/bags/bag13c-Black.jpg" },
      { name: "Beige", hex: "#DCC7AA", image: "/bags/bag13d-beige.jpg" },
    ],
    relatedIds: [11, 12, 14, 15],
  }),

  createProduct({
    id: 14,
    name: "Saint Laurent Loulou Puffer",
    brand: "Saint Laurent",
    category: "Women’s Bags",
    price: 330,
    material: "Quilted Lambskin Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag14-Black.jpg",
    image2: "/bags/bag14b.jpg",
    images: [
      "/bags/bag14-Black.jpg",
      "/bags/bag14b.jpg",
      "/bags/bag14c.jpg",
      "/bags/bag14d.jpg",
      "/bags/bag14e.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag14-Black.jpg" },
    ],
    relatedIds: [11, 12, 13, 15],
  }),

  createProduct({
    id: 15,
    name: "COACH Tabby Shoulder Bag 26 with Quilting",
    brand: "COACH",
    category: "Women’s Bags",
    price: 286,
    material: "Genuine quilted leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag15-Blue.jpg",
    image2: "/bags/bag15b-Silver.jpg",
    images: [
      "/bags/bag15-Blue.jpg",
      "/bags/bag15b-Silver.jpg",
      "/bags/bag15c-brown.jpg",
      "/bags/bag15d-Gold.jpg",
    ],
    colors: [
      { name: "Blue", hex: "#355C9A", image: "/bags/bag15-Blue.jpg" },
      { name: "Silver", hex: "#C0C0C0", image: "/bags/bag15b-Silver.jpg" },
      { name: "Brown", hex: "#7A4E2D", image: "/bags/bag15c-brown.jpg" },
      { name: "Gold", hex: "#D4AF37", image: "/bags/bag15d-Gold.jpg" },
    ],
    relatedIds: [11, 12, 13, 14],
  }),

  createProduct({
    id: 16,
    name: "Woven Satchel Tote Bag",
    brand: "Gucci",
    category: "Women’s Bags",
    price: 299,
    material: "Faux Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag16-Dark-Green.jpg",
    image2: "/bags/bag16b-Silver.jpg",
    images: [
      "/bags/bag16-Dark-Green.jpg",
      "/bags/bag16b-Silver.jpg",
    ],
    colors: [
      { name: "Dark Green", hex: "#112819", image: "/bags/bag16-Dark-Green.jpg" },
      { name: "Silver", hex: "#C0C0C0", image: "/bags/bag16b-Silver.jpg" },
    ],
    relatedIds: [17, 18, 19, 20],
  }),

  createProduct({
    id: 17,
    name: "Nicole & Doris Stylish Top Handle Bag",
    brand: "Unbranded",
    category: "Women’s Bags",
    price: 325,
    material: "Pu Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag17-Brown.jpg",
    image2: "/bags/bag17b-Cream.jpg",
    images: [
      "/bags/bag17-Brown.jpg",
      "/bags/bag17b-Cream.jpg",
      "/bags/bag17c-Dark-Blue.jpg",
    ],
    colors: [
      { name: "Brown", hex: "#7A4E2D", image: "/bags/bag17-Brown.jpg" },
      { name: "Cream", hex: "#F5E7D3", image: "/bags/bag17b-Cream.jpg" },
      { name: "Dark Blue", hex: "#1E3A5F", image: "/bags/bag17c-Dark-Blue.jpg" },
    ],
    relatedIds: [16, 18, 19, 20],
  }),

  createProduct({
    id: 18,
    name: "Hermes Mini Kelly 2 Gris Ciment Shiny Croc Hand Bag",
    brand: "Hermes",
    category: "Women’s Bags",
    price: 335,
    material: "Quilted Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag18-Beige.jpg",
    image2: "/bags/bag18b-White.jpg",
    images: [
      "/bags/bag18-Beige.jpg",
      "/bags/bag18b-White.jpg",
      "/bags/bag18c-Black.jpg",
    ],
    colors: [
      { name: "Beige", hex: "#DCC7AA", image: "/bags/bag18-Beige.jpg" },
      { name: "White", hex: "#FFFFFF", image: "/bags/bag18b-White.jpg" },
      { name: "Black", hex: "#111111", image: "/bags/bag18c-Black.jpg" },
    ],
    relatedIds: [16, 17, 19, 20],
  }),

  createProduct({
    id: 19,
    name: "Fashion Large Croc Skin Leather Flap Clamp Bag. ",
    brand: "Unbranded",
    category: "Women’s Bags",
    price: 272,
    material: "PU Leather (Synthetic)",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag19-Black.jpg",
    image2: "/bags/bag19b-Brown.jpg",
    images: [
      "/bags/bag19-Black.jpg",
      "/bags/bag19b-Brown.jpg",
      "/bags/bag19c-beige.jpg",
      "/bags/bag19d-Light-brown.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag19-Black.jpg" },
      { name: "Brown", hex: "#7A4E2D", image: "/bags/bag19b-Brown.jpg" },
      { name: "Beige", hex: "#DCC7AA", image: "/bags/bag19c-beige.jpg" },
      { name: "Light Brown", hex: "#D2B48C", image: "/bags/bag19d-Light-brown.jpg" },
    ],
    relatedIds: [16, 17, 18, 20],
  }),

  createProduct({
    id: 20,
    name: "Verafied Eclaier Fashion Bag",
    brand: "Eclaier",
    category: "Women’s Bags",
    price: 318,
    material: "Genuine Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag20-black.jpg",
    image2: "/bags/bag20b-brown.jpg",
    images: [
      "/bags/bag20-black.jpg",
      "/bags/bag20b-brown.jpg",
      "/bags/bag20c.jpg",
      "/bags/bag20d.jpg",
      "/bags/bag20e.jpg",
      "/bags/bag20f.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag20-black.jpg" },
      { name: "Brown", hex: "#7A4E2D", image: "/bags/bag20b-brown.jpg" },
    ],
    relatedIds: [16, 17, 18, 19],
  }),

  createProduct({
    id: 21,
    name: "Fashion Leather Croco Textured Handbag.",
    brand: "unbranded",
    category: "Tote Bags",
    price: 280,
    material: "Pu Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag21-Cream.jpg",
    image2: "/bags/bag21c-blue.jpg",
    images: [
      "/bags/bag21-Cream.jpg",
      "/bags/bag21b-Brown.jpg",
      "/bags/bag21c-blue.jpg",
    ],
    colors: [
      { name: "Cream", hex: "#FFFDD0", image: "/bags/bag21-Cream.jpg" },
      { name: "Brown", hex: "#7A4E2D", image: "/bags/bag21b-Brown.jpg" },
      { name: "Blue", hex: "#1E40AF", image: "/bags/bag21c-blue.jpg" },
    ],
    relatedIds: [22, 23, 24, 25],
  }),

  createProduct({
    id: 22,
    name: "Chanel 25A Suede Top Handle Flap Bag",
    brand: "chanel",
    category: "Women’s Bags",
    price: 301,
    material: "Suede",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag22-orange.jpg",
    image2: "/bags/bag22b.jpg",
    images: [
      "/bags/bag22-orange.jpg",
      "/bags/bag22b.jpg",
      "/bags/bag22c.jpg",
      "/bags/bag22d-Brown.jpg",
      "/bags/bag22e.jpg",
    ],
    colors: [
      { name: "Orange", hex: "#F97316", image: "/bags/bag22-orange.jpg" },
      { name: "Brown", hex: "#7A4E2D", image: "/bags/bag22d-Brown.jpg" },
    ],
    relatedIds: [21, 23, 24, 25],
  }),

  createProduct({
    id: 23,
    name: "Coach Cherry keychain for Purse",
    brand: "Coach",
    category: "keyrings & Bag Charms",
    price: 250,
    material: "metals and enamel",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag23.jpg",
    image2: "/bags/bag23b.jpg",
    images: [
      "/bags/bag23.jpg",
      "/bags/bag23b.jpg",
    ],
    colors: [],
    relatedIds: [21, 22, 24, 25],
  }),

  createProduct({
    id: 24,
    name: "Coach herry Keychain For Bags",
    brand: "Coach",
    category: "keyrings & Bag Charms",
    price: 294,
    material: "Matals and Enamel",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag24-gold.jpg",
    image2: "/bags/bag24b.jpg",
    images: [
      "/bags/bag24-gold.jpg",
      "/bags/bag24b.jpg",
      "/bags/bag24c.jpg",
    ],
    colors: [
      { name: "Gold", hex: "#FFD700", image: "/bags/bag24-gold.jpg" },
    ],
    relatedIds: [21, 22, 23, 25],
  }),

  createProduct({
    id: 25,
    name: "3D Dice Model Keychain for Bags",
    brand: "Chloé",
    category: "Keyrings & Bag Charms",
    price: 265,
    material: "Zinc Alloy",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag25-black.jpg",
    image2: "/bags/bag25b-brown.jpg",
    images: [
      "/bags/bag25-black.jpg",
      "/bags/bag25b-brown.jpg",
      "/bags/bag25c.jpg",
      "/bags/bag25d.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag25-black.jpg" },
      { name: "Brown", hex: "#7A4E2D", image: "/bags/bag25b-brown.jpg" },
    ],
    relatedIds: [21, 22, 23, 24],
  }),

  createProduct({
    id: 26,
    name: "Hermès Birkin Handbag",
    brand: "Hermès",
    category: "Tote Bags",
    price: 210,
    oldPrice: 240,
    onSale: true,
    material: "Genuine Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag26-cream.jpg",
    image2: "/bags/bag26b-Cream.jpg",
    images: [
      "/bags/bag26-cream.jpg",
      "/bags/bag26b-Cream.jpg",
      "/bags/bag26c.jpg",
      "/bags/bag26d.jpg",
      "/bags/bag26e.jpg",
    ],
    colors: [
      { name: "Cream", hex: "#FFFDD0", image: "/bags/bag26-cream.jpg" },
    ],
    relatedIds: [27, 28, 29, 30],
  }),

  createProduct({
    id: 27,
    name: "Hermès Birkin Handbag",
    brand: "Hermès",
    category: "Women’s Bags",
    price: 278,
    material: "Genuine Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag27-white.jpg",
    image2: "/bags/bag27b.jpg",
    images: [
      "/bags/bag27-white.jpg",
      "/bags/bag27b.jpg",
      "/bags/bag27c.jpg",
      "/bags/bag27d.jpg",
    ],
    colors: [
      { name: "White", hex: "#FFFFFF", image: "/bags/bag27-white.jpg" },
    ],
    relatedIds: [26, 28, 29, 30],
  }),

  createProduct({
    id: 28,
    name: "Hermès Birkin Handbag",
    brand: "Hermès",
    category: "Women’s Bags",
    price: 225,
    material: "Genuine Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag28-white.jpg",
    image2: "/bags/bag28b.jpg",
    images: [
      "/bags/bag28-white.jpg",
      "/bags/bag28b.jpg",
      "/bags/bag28c.jpg",
    ],
    colors: [
      { name: "White", hex: "#FFFFFF", image: "/bags/bag28-white.jpg" },
    ],
    relatedIds: [26, 27, 29, 30],
  }),

  createProduct({
    id: 29,
    name: "Pu Leather Horse Pendant Keyring for Bags",
    brand: "Unbranded",
    category: "keyrings & Bag Charms",
    price: 238,
    material: "Pu Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag29-0range.jpg",
    image2: "/bags/bag29b-black.jpg",
    images: [
      "/bags/bag29-0range.jpg",
      "/bags/bag29b-black.jpg",
      "/bags/bag29c-brown.jpg",
    ],
    colors: [
      { name: "Orange", hex: "#F97316", image: "/bags/bag29-0range.jpg" },
      { name: "Black", hex: "#111111", image: "/bags/bag29b-black.jpg" },
      { name: "Brown", hex: "#7A4E2D", image: "/bags/bag29c-brown.jpg" },
    ],
    relatedIds: [26, 27, 28, 30],
  }),

  createProduct({
    id: 30,
    name: "Silver and Gold-toned bag charm",
    brand: "unbeanded",
    category: "keyrings & Bag Charms",
    price: 205,
    material: "Enamel Coated Metals",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag30-gold.jpg",
    image2: "/bags/bag30b-gold.jpg",
    images: [
      "/bags/bag30-gold.jpg",
      "/bags/bag30b-gold.jpg",
    ],
    colors: [
      { name: "Gold", hex: "#FFD700", image: "/bags/bag30-gold.jpg" },
    ],
    relatedIds: [26, 27, 28, 29],
  }),

  createProduct({
    id: 31,
    name: "Women's 4.5CM Comfort Medium Heel Pump",
    brand: "Unbranded",
    category: "Women Shoes",
    price: 345,
    material: "Pu Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag31-black.jpg",
    image2: "/bags/bag31c-blue.jpg",
    images: [
      "/bags/bag31-black.jpg",
      "/bags/bag31b.jpg",
      "/bags/bag31c-blue.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag31-black.jpg" },
      { name: "Blue", hex: "#1E40AF", image: "/bags/bag31c-blue.jpg" },
    ],
    relatedIds: [32, 33, 34, 35],
  }),

  createProduct({
    id: 32,
    name: "Mens Woven Leather Tassel Loafers shoe",
    brand: "unbranded",
    category: "Men Shoes",
    price: 338,
    material: "Patent Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag32-black.jpg",
    image2: "/bags/bag32b.jpg",
    images: [
      "/bags/bag32-black.jpg",
      "/bags/bag32b.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag32-black.jpg" },
    ],
    relatedIds: [31, 33, 34, 35],
  }),

  createProduct({
    id: 33,
    name: "Tory Burch Britten Convertible Crossbody Bag",
    brand: "Tory Burch",
    category: "Handbag Bags",
    price: 355,
    material: "Smooth Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag33-dark-green.jpg",
    image2: "/bags/bag33b-dark-red.jpg",
    images: [
      "/bags/bag33-dark-green.jpg",
      "/bags/bag33b-dark-red.jpg",
    ],
    colors: [
      { name: "Dark Green", hex: "#006400", image: "/bags/bag33-dark-green.jpg" },
      { name: "Dark Red", hex: "#8B0000", image: "/bags/bag33b-dark-red.jpg" },
    ],
    relatedIds: [31, 32, 34, 35],
  }),

  createProduct({
    id: 34,
    name: "Hermès Avalon throw blanket",
    brand: "Hermès",
    category: "Throws & Blankets",
    price: 290,
    material: "wool and cashmere blend",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag34-blue.jpg",
    image2: "/bags/bag34b-black.jpg",
    images: [
      "/bags/bag34-blue.jpg",
      "/bags/bag34b-black.jpg",
    ],
    colors: [
      { name: "Blue", hex: "#1E40AF", image: "/bags/bag34-blue.jpg" },
      { name: "Black", hex: "#111111", image: "/bags/bag34b-black.jpg" },
    ],
    relatedIds: [31, 32, 33, 35],
  }),

  createProduct({
    id: 35,
    name: "Hermès Avalon throw blanket",
    brand: "Hermès",
    category: "Throws & Blankets",
    price: 312,
    material: "wool and cashmere blend",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag35-orange.jpg",
    image2: "/bags/bag35b-ash.jpg",
    images: [
      "/bags/bag35-orange.jpg",
      "/bags/bag35b-ash.jpg",
    ],
    colors: [
      { name: "Orange", hex: "#F97316", image: "/bags/bag35-orange.jpg" },
      { name: "Ash", hex: "#808080", image: "/bags/bag35b-ash.jpg" },
    ],
    relatedIds: [34, 32, 33, 34],
  }),

  createProduct({
    id: 36,
    name: "Chanel Small 11.12 Black Lampskin Flap Bag",
    brand: "Chanel",
    category: "Women’s Bags",
    price: 288,
    material: "Lambskin leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag36-black.jpg",
    image2: "/bags/bag36b-green.jpg",
    images: [
      "/bags/bag36-black.jpg",
      "/bags/bag36b-green.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag36-black.jpg" },
      { name: "Green", hex: "#22C55E", image: "/bags/bag36b-green.jpg" },
    ],
    relatedIds: [37, 38, 39, 40],
  }),

  createProduct({
    id: 37,
    name: "Christian Dior Toujours tote bag M2821ODCZ ",
    brand: "Christian Dior",
    category: "Women’s Bags",
    price: 305,
    material: "Quilted blue denim canvas",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag37-blue.jpg",
    image2: "/bags/bag37b.jpg",
    images: [
      "/bags/bag37-blue.jpg",
      "/bags/bag37b.jpg",
      "/bags/bag37c.jpg",
    ],
    colors: [
      { name: "Dark blue", hex: "#1E3A5F", image: "/bags/bag37-blue.jpg" },
    ],
    relatedIds: [36, 38, 39, 40],
  }),

  createProduct({
    id: 38,
    name: "Chanel Trendy CC Flap bag",
    brand: "Chanel",
    category: "Women’s Bags",
    price: 292,
    material: "Genuine Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag38-black.jpg",
    image2: "/bags/bag38b.jpg",
    images: [
      "/bags/bag38-black.jpg",
      "/bags/bag38b.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag38-black.jpg" },
    ],
    relatedIds: [36, 37, 39, 40],
  }),

  createProduct({
    id: 39,
    name: "Chanel Shopping Bag",
    brand: "Chanel",
    category: "Women’s Bags",
    price: 255,
    material: "Suede Calfskin Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag39-wine.jpg",
    image2: "/bags/bag39b-brown.jpg",
    images: [
      "/bags/bag39-wine.jpg",
      "/bags/bag39b-brown.jpg",
      "/bags/bag39c-black.jpg",
    ],
    colors: [
      { name: "Wine", hex: "#800020", image: "/bags/bag39-wine.jpg" },
    ],
    relatedIds: [36, 37, 38, 40],
  }),

  createProduct({
    id: 40,
    name: "Saint Laurent Le 57 quilted leather shoulder bag",
    brand: "Saint Laurent",
    category: "Women’s Bags",
    price: 268,
    material: "Quilted Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag40-black.jpg",
    image2: "/bags/bag40b.jpg",
    images: [
      "/bags/bag40-black.jpg",
      "/bags/bag40b.jpg",
      "/bags/bag40c.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag40-black.jpg" },
    ],
    relatedIds: [36, 37, 38, 39],
  }),

  createProduct({
    id: 41,
    name: "Vanity Case Bag in Pink",
    brand: "Chanel",
    category: "Women’s Bags",
    price: 298,
    material: "Caviar Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag41-black.jpg",
    image2: "/bags/bag41b.jpg",
    images: [
      "/bags/bag41-black.jpg",
      "/bags/bag41b.jpg",
      "/bags/bag41c.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag41-black.jpg" },
    ],
    relatedIds: [42, 43, 44, 45],
  }),

  createProduct({
    id: 42,
    name: "Louis Vuitton-Inspired Coussin Bag in Cream",
    brand: "Louis Vuitton",
    category: "Women’s Bags",
    price: 320,
    material: "Puffy Lambskin",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag42-black.jpg",
    image2: "/bags/bag42b.jpg",
    images: [
      "/bags/bag42-black.jpg",
      "/bags/bag42b.jpg",
      "/bags/bag42c.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag42-black.jpg" },
    ],
    relatedIds: [41, 43, 44, 45],
  }),

  createProduct({
    id: 43,
    name: "Bottega Veneta-Inspired Jodie Bag in Green",
    brand: "Bottega Veneta",
    category: "Women’s Bags",
    price: 314,
    material: "Woven Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag43-brown.jpg",
    image2: "/bags/bag43b.jpg",
    images: [
      "/bags/bag43-brown.jpg",
      "/bags/bag43b.jpg",
      "/bags/bag43c.jpg",
    ],
    colors: [
      { name: "Brown", hex: "#7A4E2D", image: "/bags/bag43-brown.jpg" },
    ],
    relatedIds: [41, 42, 44, 45],
  }),

  createProduct({
    id: 44,
    name: "Gucci-Inspired Jackie 1961 Bag in Red",
    brand: "Gucci",
    category: "Women’s Bags",
    price: 308,
    material: "Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag44-Turquoise.jpg",
    image2: "/bags/bag44b.jpg",
    images: [
      "/bags/bag44-Turquoise.jpg",
      "/bags/bag44b.jpg",
      "/bags/bag44c.jpg",
    ],
    colors: [
      { name: "Turquoise", hex: "#40E0D0", image: "/bags/bag44-Turquoise.jpg" },
    ],
    relatedIds: [41, 42, 43, 45],
  }),

  createProduct({
    id: 45,
    name: "Dior-Inspired Lady Dior Medium Bag in Black",
    brand: "Dior",
    category: "Women’s Bags",
    price: 340,
    material: "Cannage Lambskin",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag45-brown.jpg",
    image2: "/bags/bag45b.jpg",
    images: [
      "/bags/bag45-brown.jpg",
      "/bags/bag45b.jpg",
      "/bags/bag45c.jpg",
    ],
    colors: [
      { name: "Brown", hex: "#7A4E2D", image: "/bags/bag45-brown.jpg" },
    ],
    relatedIds: [41, 42, 43, 44],
  }),

  createProduct({
    id: 46,
    name: "YSL-Inspired Envelope Chain Bag in Black",
    brand: "YSL",
    category: "Women’s Bags",
    price: 297,
    material: "Grain de Poudre Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag46-black.jpg",
    image2: "/bags/bag46b.jpg",
    images: [
      "/bags/bag46-black.jpg",
      "/bags/bag46b.jpg",
      "/bags/bag46c.jpg",
      "/bags/bag46d.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag46-black.jpg" },
    ],
    relatedIds: [47, 48, 49, 50],
  }),

  createProduct({
    id: 47,
    name: "Prada-Inspired Cleo Bag in White",
    brand: "Prada",
    category: "Women’s Bags",
    price: 287,
    material: "Brushed Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag47-black.jpg",
    image2: "/bags/bag47b.jpg",
    images: [
      "/bags/bag47-black.jpg",
      "/bags/bag47b.jpg",
      "/bags/bag47c.jpg",
      "/bags/bag47d.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag47-black.jpg" },
    ],
    relatedIds: [46, 48, 49, 50],
  }),

  createProduct({
    id: 48,
    name: "Fendi-Inspired Peekaboo Mini Bag in Beige",
    brand: "Fendi",
    category: "Women’s Bags",
    price: 322,
    material: "Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag48-black.jpg",
    image2: "/bags/bag48b.jpg",
    images: [
      "/bags/bag48-black.jpg",
      "/bags/bag48b.jpg",
      "/bags/bag48c.jpg",
      "/bags/bag48d.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag48-black.jpg" },
    ],
    relatedIds: [46, 47, 49, 50],
  }),

  createProduct({
    id: 49,
    name: "Celine-Inspired Belt Bag Nano in Grey",
    brand: "Celine",
    category: "Women’s Bags",
    price: 299,
    material: "Grained Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag49-brown.jpg",
    image2: "/bags/bag49b.jpg",
    images: [
      "/bags/bag49-brown.jpg",
      "/bags/bag49b.jpg",
      "/bags/bag49c.jpg",
      "/bags/bag49d.jpg",
    ],
    colors: [
      { name: "Brown", hex: "#7A4E2D", image: "/bags/bag49-brown.jpg" },
    ],
    relatedIds: [46, 47, 48, 50],
  }),

  createProduct({
    id: 50,
    name: "Balmain-Inspired B-Buzz Bag",
    brand: "Balmain",
    category: "Women’s Bags",
    price: 311,
    material: "Structured Leather",
    condition: "Brand New",
    imageCount: 10,
    image: "/bags/bag50-black.jpg",
    image2: "/bags/bag50b.jpg",
    images: [
      "/bags/bag50-black.jpg",
      "/bags/bag50b.jpg",
      "/bags/bag50c.jpg",
      "/bags/bag50d.jpg",
    ],
    colors: [
      { name: "Black", hex: "#111111", image: "/bags/bag50-black.jpg" },
    ],
    relatedIds: [46, 47, 48, 49],
  }),

createProduct({
    id: 51,
    name: "Michael Kors-Inspired Mercer Tote",
    brand: "Michael Kors",
    category: "Tote Bags",
    price: 205,
    material: "Pebbled Leather",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Brown", hex: "#7A4E2D" },
      { name: "Beige", hex: "#DCC7AA" },
      { name: "Red", hex: "#C1121F" },
    ],
    relatedIds: [26, 27, 28, 29],
  }),

  createProduct({
    id: 52,
    name: "Louis Vuitton-Inspired Keepall 45",
    brand: "Louis Vuitton",
    category: "Travel Bags",
    price: 345,
    material: "Coated Canvas",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Monogram", hex: "#8B6B44" },
      { name: "Brown", hex: "#7A4E2D" },
      { name: "Black", hex: "#111111" },
    ],
    relatedIds: [32, 33, 34, 35],
  }),

  createProduct({
    id: 53,
    name: "Gucci-Inspired Duffle Bag",
    brand: "Gucci",
    category: "Travel Bags",
    price: 338,
    material: "GG Canvas Leather",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Brown", hex: "#7A4E2D" },
      { name: "Black", hex: "#111111" },
      { name: "Green", hex: "#2E8B57" },
    ],
    relatedIds: [31, 33, 34, 35],
  }),

  createProduct({
    id: 54,
    name: "Dior-Inspired Weekender Bag",
    brand: "Dior",
    category: "Travel Bags",
    price: 355,
    material: "Canvas Leather",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Navy Blue", hex: "#1E3A5F" },
      { name: "Blue", hex: "#355C9A" },
      { name: "Grey", hex: "#808080" },
    ],
    relatedIds: [31, 32, 34, 35],
  }),

  createProduct({
    id: 55,
    name: "Prada-Inspired Nylon Travel Bag",
    brand: "Prada",
    category: "Travel Bags",
    price: 290,
    material: "Nylon Leather",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Navy", hex: "#1C2D4D" },
      { name: "Ash", hex: "#B2BEB5" },
    ],
    relatedIds: [31, 32, 33, 35],
  }),

  createProduct({
    id: 56,
    name: "Fendi-Inspired FF Travel Tote",
    brand: "Fendi",
    category: "Travel Bags",
    price: 312,
    material: "Canvas Leather",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Brown", hex: "#7A4E2D" },
      { name: "Gold", hex: "#D4AF37" },
      { name: "Beige", hex: "#DCC7AA" },
    ],
    relatedIds: [31, 32, 33, 34],
  }),

  createProduct({
    id: 57,
    name: "Gucci-Inspired Ophidia Messenger",
    brand: "Gucci",
    category: "Men’s Bags",
    price: 288,
    material: "GG Supreme Canvas",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Brown", hex: "#7A4E2D" },
      { name: "Black", hex: "#111111" },
      { name: "Green", hex: "#2E8B57" },
    ],
    relatedIds: [37, 38, 39, 40],
  }),

  createProduct({
    id: 58,
    name: "Louis Vuitton-Inspired Trio Messenger",
    brand: "Louis Vuitton",
    category: "Men’s Bags",
    price: 305,
    material: "Canvas Leather",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Grey", hex: "#808080" },
      { name: "Monogram", hex: "#8B6B44" },
    ],
    relatedIds: [36, 38, 39, 40],
  }),

  createProduct({
    id: 59,
    name: "Dior-Inspired Rider Sling Bag",
    brand: "Dior",
    category: "Men’s Bags",
    price: 292,
    material: "Oblique Canvas",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Blue", hex: "#355C9A" },
      { name: "Navy", hex: "#1C2D4D" },
      { name: "Black", hex: "#111111" },
    ],
    relatedIds: [36, 37, 39, 40],
  }),

  createProduct({
    id: 60,
    name: "Burberry-Inspired Crossbody Bag",
    brand: "Burberry",
    category: "Men’s Bags",
    price: 255,
    material: "Canvas Leather",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Beige", hex: "#DCC7AA" },
      { name: "Brown", hex: "#7A4E2D" },
      { name: "Black", hex: "#111111" },
    ],
    relatedIds: [36, 37, 38, 40],
  }),

  createProduct({
    id: 61,
    name: "Prada-Inspired Triangle Shoulder Bag",
    brand: "Prada",
    category: "Men’s Bags",
    price: 268,
    material: "Saffiano Leather",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Navy Blue", hex: "#1E3A5F" },
      { name: "White", hex: "#FFFFFF" },
    ],
    relatedIds: [36, 37, 38, 39],
  }),

  createProduct({
    id: 62,
    name: "Chanel-Inspired Vanity Case Bag in Black",
    brand: "Chanel",
    category: "Women’s Bags",
    price: 298,
    material: "Caviar Leather",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Pink", hex: "#EC4899" },
      { name: "Black", hex: "#111111" },
      { name: "White", hex: "#FFFFFF" },
    ],
    relatedIds: [42, 43, 44, 45],
  }),

  createProduct({
    id: 63,
    name: "Louis Vuitton-Inspired Coussin Bag in Purple",
    brand: "Louis Vuitton",
    category: "Women’s Bags",
    price: 320,
    material: "Puffy Lambskin",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Cream", hex: "#ECE8DE" },
      { name: "Purple", hex: "#7E22CE" },
      { name: "Black", hex: "#111111" },
    ],
    relatedIds: [41, 43, 44, 45],
  }),

  createProduct({
    id: 64,
    name: "Bottega Veneta-Inspired Jodie Bag in Beige",
    brand: "Bottega Veneta",
    category: "Women’s Bags",
    price: 314,
    material: "Woven Leather",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Green", hex: "#2E8B57" },
      { name: "Beige", hex: "#DCC7AA" },
      { name: "Chocolate", hex: "#4A2C2A" },
    ],
    relatedIds: [41, 42, 44, 45],
  }),

  createProduct({
    id: 65,
    name: "Gucci-Inspired Jackie 1961 Bag in Black",
    brand: "Gucci",
    category: "Women’s Bags",
    price: 308,
    material: "Leather",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Red", hex: "#C1121F" },
      { name: "Black", hex: "#111111" },
      { name: "Brown", hex: "#7A4E2D" },
    ],
    relatedIds: [41, 42, 43, 45],
  }),

  createProduct({
    id: 66,
    name: "Dior-Inspired Lady Dior Medium Bag in Pink",
    brand: "Dior",
    category: "Women’s Bags",
    price: 340,
    material: "Cannage Lambskin",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Pink", hex: "#EC4899" },
      { name: "Grey", hex: "#808080" },
    ],
    relatedIds: [41, 42, 43, 44],
  }),

  createProduct({
    id: 67,
    name: "YSL-Inspired Envelope Chain Bag in Burgundy",
    brand: "YSL",
    category: "Women’s Bags",
    price: 297,
    material: "Grain de Poudre Leather",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Burgundy", hex: "#800020" },
      { name: "Gold", hex: "#D4AF37" },
    ],
    relatedIds: [47, 48, 49, 50],
  }),

  createProduct({
    id: 68,
    name: "Prada-Inspired Cleo Bag in Black",
    brand: "Prada",
    category: "Women’s Bags",
    price: 287,
    material: "Brushed Leather",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#111111" },
      { name: "Pink", hex: "#EC4899" },
    ],
    relatedIds: [46, 48, 49, 50],
  }),

  createProduct({
    id: 69,
    name: "Fendi-Inspired Peekaboo Mini Bag in Brown",
    brand: "Fendi",
    category: "Women’s Bags",
    price: 322,
    material: "Leather",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Beige", hex: "#DCC7AA" },
      { name: "Brown", hex: "#7A4E2D" },
      { name: "Ash", hex: "#B2BEB5" },
    ],
    relatedIds: [46, 47, 49, 50],
  }),

  createProduct({
    id: 70,
    name: "Celine-Inspired Belt Bag Nano in Black",
    brand: "Celine",
    category: "Women’s Bags",
    price: 299,
    material: "Grained Leather",
    condition: "Brand New",
    imageCount: 10,
    colors: [
      { name: "Grey", hex: "#808080" },
      { name: "Black", hex: "#111111" },
      { name: "Taupe", hex: "#8B7E74" },
    ],
    relatedIds: [46, 47, 48, 50],
  }),
];