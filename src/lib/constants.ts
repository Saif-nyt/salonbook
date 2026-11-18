export interface CategoryDefinition {
  name: string;
  tagline: string;
  image: string;
}

export const SERVICE_CATEGORIES: CategoryDefinition[] = [
  {
    name: "Hair",
    tagline: "Cut, colour and care",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Nails",
    tagline: "Considered hands and feet",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Skin",
    tagline: "Faces, gently restored",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Massage",
    tagline: "Space to unwind",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Makeup",
    tagline: "For occasions that matter",
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Barber",
    tagline: "Traditional, precise, unhurried",
    image:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80",
  },
];

export const CATEGORY_NAMES = SERVICE_CATEGORIES.map((category) => category.name);

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Browse Services" },
];

export const SERVICE_SORTS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A to Z" },
] as const;

export const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
] as const;

export const SALON_DETAILS = {
  address: "18 Marlow Lane, Suite 4",
  city: "Brooklyn, NY 11201",
  phone: "+1 (718) 555-0142",
  email: "hello@salonbook.com",
  hours: [
    { days: "Tuesday — Friday", time: "9:00 am — 7:00 pm" },
    { days: "Saturday", time: "9:00 am — 6:00 pm" },
    { days: "Sunday — Monday", time: "Closed" },
  ],
};
