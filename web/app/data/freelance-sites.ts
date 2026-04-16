export interface FreelanceSite {
  name: string;
  location: string;
  category: string;
  palette: string[]; // 2-3 hex colors
  accentLabel: string; // short brand vibe descriptor
  url?: string; // live demo url if available
  batch: "athens" | "belpre" | "bonus";
}

export const freelanceSites: FreelanceSite[] = [
  // ── Athens batch ──────────────────────────────────────────────────
  {
    name: "Smiling Skull Saloon",
    location: "Athens, OH",
    category: "Dive Bar",
    palette: ["#0a0a0a", "#cc1a1a", "#b84a0a"],
    accentLabel: "Dark · Blood Red · Biker",
    url: "https://www.perplexity.ai/computer/a/smiling-skull-saloon-FdvRoQTzQ_GgoZUNKONWwA",
    batch: "athens",
  },
  {
    name: "Uptown Dog",
    location: "Athens, OH",
    category: "Pet Hotel & Grooming",
    palette: ["#f5f0e8", "#7a9e7e", "#c07a50"],
    accentLabel: "Cream · Sage · Boutique",
    url: "https://www.perplexity.ai/computer/a/uptown-dog-h38T.ZtbRJG1Wp8bs9DDgQ",
    batch: "athens",
  },
  {
    name: "Stephen's",
    location: "Athens, OH",
    category: "Cocktail Bar",
    palette: ["#0d0b09", "#c49a28", "#1a1208"],
    accentLabel: "Near-Black · Amber · Speakeasy",
    url: "https://www.perplexity.ai/computer/a/stephen-s-bar-qRyx1XmuQ_2NXMUzQMnkGg",
    batch: "athens",
  },
  {
    name: "Casa Nueva",
    location: "Athens, OH",
    category: "Cantina & Co-op",
    palette: ["#b85c38", "#d4a017", "#2d5a27"],
    accentLabel: "Terra Cotta · Gold · Bohemian",
    url: "https://www.perplexity.ai/computer/a/casa-nueva-DwACDVquTl6qAAAxs3y0DQ",
    batch: "athens",
  },
  {
    name: "Athena Cinema",
    location: "Athens, OH",
    category: "Art House Cinema",
    palette: ["#0a0a0a", "#6b1a2a", "#c9a227"],
    accentLabel: "True Black · Burgundy · Gold",
    url: "https://www.perplexity.ai/computer/a/athena-cinema-m7ynQE36QPC2TyVlxtSBYQ",
    batch: "athens",
  },
  {
    name: "Bagel Street Deli",
    location: "Athens, OH",
    category: "Deli",
    palette: ["#f5f0e0", "#d4a017", "#8b1a1a"],
    accentLabel: "Cream · Mustard · Punchy Red",
    url: "https://www.perplexity.ai/computer/a/bagel-street-deli-ALlrtSihTCiyg4cqbXtLEA",
    batch: "athens",
  },

  // ── Belpre / Washington County batch ─────────────────────────────
  {
    name: "Dragon House",
    location: "Belpre, OH",
    category: "Chinese Restaurant",
    palette: ["#0a0a0a", "#8b0000", "#1a5c3a"],
    accentLabel: "Black · Ruby · Jade",
    url: "https://www.perplexity.ai/computer/a/dragon-house-Vik7Nk4fR1a6SdO3y6Tx3g",
    batch: "belpre",
  },
  {
    name: "Q-Wagon BBQ",
    location: "Belpre, OH",
    category: "BBQ Food Truck",
    palette: ["#1a0a00", "#c44b0a", "#f5c842"],
    accentLabel: "Charcoal · Ember · Smoke Yellow",
    url: "https://www.perplexity.ai/computer/a/q-wagon-bbq-vQ6WgldHTYuvj8w3eK2Jiw",
    batch: "belpre",
  },
  {
    name: "Village Cakery",
    location: "Vincent, OH",
    category: "Bakery",
    palette: ["#fdf6ee", "#d4789a", "#8b5e3c"],
    accentLabel: "Warm White · Dusty Rose · Mocha",
    url: "https://www.perplexity.ai/computer/a/village-cakery-uCNALK1tRxGgFJZGgf1blQ",
    batch: "belpre",
  },
  {
    name: "Neff's Country Loft",
    location: "Belpre area, OH",
    category: "Quilt & Fabric Shop",
    palette: ["#f5ece0", "#8b6914", "#4a3728"],
    accentLabel: "Linen · Harvest Gold · Walnut",
    url: "https://www.perplexity.ai/computer/a/neff-s-country-loft-Tk9WSdBuRCCnU2brfMykCA",
    batch: "belpre",
  },
  {
    name: "Boathouse BBQ",
    location: "Belpre, OH",
    category: "BBQ Restaurant",
    palette: ["#0d1a0d", "#8b2500", "#c49a28"],
    accentLabel: "Dark Green · Rust · Gold",
    url: "https://www.perplexity.ai/computer/a/boathouse-bbq-zwORScKDQviIVpbAbg76gw",
    batch: "belpre",
  },
  {
    name: "Der Dog Haus",
    location: "Washington County, OH",
    category: "Hot Dog Stand",
    palette: ["#1a0a00", "#d44000", "#f5c842"],
    accentLabel: "Dark · Red-Orange · Mustard",
    url: "https://www.perplexity.ai/computer/a/der-dog-haus-m.xuvp3YTjWUyL44xFGz5g",
    batch: "belpre",
  },
  {
    name: "The Ohio Redwood",
    location: "Washington County, OH",
    category: "American Diner",
    palette: ["#1a0505", "#8b1a1a", "#c49a28"],
    accentLabel: "Deep Burgundy · Amber · Heritage",
    url: "https://www.perplexity.ai/computer/a/the-ohio-redwood-mvxUw5L9TVSxrky25mVSYQ",
    batch: "belpre",
  },
  {
    name: "Belpre Hardware",
    location: "Belpre, OH",
    category: "Hardware Store",
    palette: ["#0a0d1a", "#1a4a8b", "#c44b0a"],
    accentLabel: "Navy · Steel Blue · Orange",
    url: "https://www.perplexity.ai/computer/a/belpre-hardware-HPiLIcpiQV.MvaDBC9pHNA",
    batch: "belpre",
  },
  {
    name: "Blennerhassett Hotel",
    location: "Parkersburg, WV",
    category: "Historic Hotel",
    palette: ["#0d0a05", "#2a1a0a", "#c49a28"],
    accentLabel: "Near-Black · Dark Wood · Gold",
    url: "https://www.perplexity.ai/computer/a/blennerhassett-hotel-RpDJfcbORdm0Z9zEZI_CWg",
    batch: "belpre",
  },
  {
    name: "Napoli's Pizza",
    location: "Washington County, OH",
    category: "Pizza Restaurant",
    palette: ["#1a0000", "#8b1a00", "#f5c842"],
    accentLabel: "Dark · Tomato Red · Parmesan",
    url: "https://www.perplexity.ai/computer/a/napoli-s-pizza-pSLeaM4fT8WDeA.ifvaYqQ",
    batch: "belpre",
  },
  {
    name: "Schultz's Restaurant",
    location: "Belpre, OH",
    category: "Family Diner",
    palette: ["#fdf6ee", "#2a4a8b", "#c44b0a"],
    accentLabel: "Cream · Navy · Warm Orange",
    url: "https://www.perplexity.ai/computer/a/schultz-s-restaurant-xsw2SK5gRjObJdeq5wsi4w",
    batch: "belpre",
  },
  {
    name: "Little Caesars Belpre",
    location: "Belpre, OH",
    category: "Pizza Chain",
    palette: ["#1a0000", "#8b1a00", "#f5a800"],
    accentLabel: "Dark · Deep Red · Caesar Gold",
    url: "https://www.perplexity.ai/computer/a/little-caesars-belpre-NTNstDEFSZmQc6l5xCkJSw",
    batch: "belpre",
  },

  // ── Bonus ─────────────────────────────────────────────────────────
  {
    name: "Meigs County Sheriff",
    location: "Pomeroy, OH",
    category: "Law Enforcement",
    palette: ["#08090c", "#1b2a4a", "#c4952a"],
    accentLabel: "Near-Black · Navy · Sheriff Gold",
    url: "https://www.perplexity.ai/computer/a/meigs-county-sheriff-ttPOYamdQT6ZEOaqUSiptg",
    batch: "bonus",
  },
];

export const BATCH_LABELS: Record<FreelanceSite["batch"], string> = {
  athens: "Athens, OH",
  belpre: "Belpre / Washington County",
  bonus: "Bonus",
};
