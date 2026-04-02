// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BriefData {
  // Step 1: About Your Business
  companyName: string;
  websiteUrl: string;
  industry: string;
  currentPlatform: string;
  monthlyRevenue: string;

  // Step 2: Project Type
  projectType: string;

  // Step 3: Goals & Requirements
  goals: string[];
  mustHaveFeatures: string;
  niceToHaveFeatures: string;

  // Step 4: Design Preferences
  designStyle: string;
  exampleWebsites: string;
  hasBrandGuidelines: string;

  // Step 5: Technical Requirements
  integrations: string[];
  catalogSize: string;
  multiLanguage: string;
  multiCurrency: string;

  // Step 6: Timeline & Budget
  launchDate: string;
  budgetRange: string;
  timelineFlexibility: string;

  // Step 7: Contact & Notes
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  additionalNotes: string;
}

export const INITIAL_DATA: BriefData = {
  companyName: "",
  websiteUrl: "",
  industry: "",
  currentPlatform: "",
  monthlyRevenue: "",
  projectType: "",
  goals: [],
  mustHaveFeatures: "",
  niceToHaveFeatures: "",
  designStyle: "",
  exampleWebsites: "",
  hasBrandGuidelines: "",
  integrations: [],
  catalogSize: "",
  multiLanguage: "",
  multiCurrency: "",
  launchDate: "",
  budgetRange: "",
  timelineFlexibility: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  additionalNotes: "",
};

// ---------------------------------------------------------------------------
// Option definitions
// ---------------------------------------------------------------------------

export const PROJECT_TYPES = [
  { value: "New Store Build (Theme)", icon: "\uD83D\uDED2", desc: "Build on a premium Shopify theme" },
  { value: "New Store Build (Custom)", icon: "\uD83C\uDFA8", desc: "Fully custom design and development" },
  { value: "Store Redesign", icon: "\u2728", desc: "Refresh an existing Shopify store" },
  { value: "Platform Migration", icon: "\uD83D\uDD04", desc: "Move from another platform to Shopify" },
  { value: "Shopify Plus Upgrade", icon: "\u2B50", desc: "Upgrade to Shopify Plus" },
  { value: "Headless Build", icon: "\uD83D\uDCBB", desc: "Custom frontend with Shopify backend" },
  { value: "Ongoing Support & Development", icon: "\uD83D\uDCC5", desc: "Monthly retainer for dev and maintenance" },
];

export const GOAL_OPTIONS = [
  "Increase conversion rate",
  "Improve mobile experience",
  "Launch in new market / region",
  "Reduce operating costs",
  "Improve site speed and performance",
  "Better brand experience / storytelling",
  "Add B2B / wholesale capabilities",
  "Automate manual processes",
  "Improve SEO and organic traffic",
  "Integrate with ERP / PIM / other systems",
];

export const DESIGN_STYLES = [
  { value: "Modern & Minimal", icon: "\u25FB\uFE0F", desc: "Clean lines, whitespace, understated" },
  { value: "Bold & Creative", icon: "\uD83C\uDFA8", desc: "Eye-catching, distinctive, colourful" },
  { value: "Corporate & Professional", icon: "\uD83D\uDCBC", desc: "Trustworthy, structured, formal" },
  { value: "Luxury & Premium", icon: "\uD83D\uDC8E", desc: "Elegant, refined, high-end" },
];

export const INTEGRATION_OPTIONS = [
  "ERP (NetSuite, SAP, Dynamics)",
  "PIM (Akeneo, Salsify, Pimberly)",
  "Email Marketing (Klaviyo, Omnisend)",
  "Loyalty / Rewards (Smile.io, LoyaltyLion)",
  "Reviews (Judge.me, Yotpo, Loox)",
  "Subscriptions (Recharge, Loop)",
  "Accounting (Xero, QuickBooks)",
  "Shipping / 3PL (ShipStation, ShipBob)",
  "Custom API / Middleware",
];

export const CATALOG_SIZES = [
  "Under 100 products",
  "100\u20131,000 products",
  "1,000\u20135,000 products",
  "5,000\u201320,000 products",
  "20,000+ products",
];

export const BUDGET_RANGES = [
  "Under $5,000",
  "$5,000 \u2013 $15,000",
  "$15,000 \u2013 $25,000",
  "$25,000 \u2013 $50,000",
  "$50,000 \u2013 $100,000",
  "$100,000+",
  "Not sure yet",
];

export const REVENUE_RANGES = [
  "Pre-revenue / Not launched yet",
  "Under $10,000/month",
  "$10,000 \u2013 $50,000/month",
  "$50,000 \u2013 $200,000/month",
  "$200,000 \u2013 $1M/month",
  "$1M+/month",
  "Prefer not to say",
];

export const PLATFORMS = [
  "None (brand new store)",
  "Shopify (current version)",
  "WooCommerce",
  "Magento / Adobe Commerce",
  "BigCommerce",
  "Wix / Squarespace",
  "Custom-built platform",
  "Other",
];

export const STEPS = [
  { title: "About Your Business", subtitle: "Tell us about your company and where you are today." },
  { title: "Project Type", subtitle: "What kind of Shopify project are you planning?" },
  { title: "Goals & Requirements", subtitle: "What do you want to achieve and what features do you need?" },
  { title: "Design Preferences", subtitle: "What should your store look and feel like?" },
  { title: "Technical Requirements", subtitle: "What integrations and technical capabilities do you need?" },
  { title: "Timeline & Budget", subtitle: "When do you need it and what can you invest?" },
  { title: "Contact & Additional Info", subtitle: "How should agencies reach you?" },
];

// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------

export const inputClass =
  "w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100";
export const labelClass = "block text-sm font-semibold text-gray-800";
export const selectClass =
  "w-full appearance-none rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

export const STORAGE_KEY = "brief_generator_data";
export const STORAGE_STEP_KEY = "brief_generator_step";

export function toggleArrayItem(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
