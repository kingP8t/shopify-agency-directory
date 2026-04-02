/**
 * Seed blog post: How to Write a Shopify Agency Brief That Gets Results
 * Run: node scripts/seed-blog-brief-guide.js
 */
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// ─── Content block helpers ────────────────────────────────────────────────────
const h2 = (text) => ({ type: "h2", text });
const h3 = (text) => ({ type: "h3", text });
const p = (text) => ({ type: "p", text });
const ul = (...items) => ({ type: "ul", items });
const ol = (...items) => ({ type: "ol", items });
const tip = (text) => ({ type: "tip", text });
const cta = (text, href, label) => ({ type: "cta", text, href, label });
const table = (headers, rows) => ({ type: "table", headers, rows });
const faq = (items) => ({ type: "faq", items });

const post = {
  slug: "how-to-write-shopify-agency-brief",
  title: "How to Write a Shopify Agency Brief That Gets Results",
  excerpt:
    "A step-by-step guide to creating a professional project brief that helps agencies quote accurately and take your project seriously. Includes a free downloadable template.",
  category: "Hiring Guide",
  tags: [
    "shopify agency brief",
    "project brief template",
    "RFP template",
    "how to brief an agency",
    "shopify project planning",
  ],
  author: "Elena King",
  reading_time: 9,
  status: "published",
  featured: true,
  date: "2026-04-02",
  content: [
    p(
      "You have found the perfect Shopify agency. Their portfolio looks great, their reviews are solid, and they specialise in exactly what you need. You fire off an email: \"Hi, we need a new Shopify store. Can you send a quote?\" Then you wait. And wait. When the quote finally arrives, it is vague, overpriced, or completely misaligned with what you had in mind."
    ),
    p(
      "The problem is not the agency. It is the brief \u2014 or rather, the lack of one. A well-written project brief is the single most important document in your agency relationship. It saves weeks of back-and-forth, produces more accurate quotes, and signals to agencies that you are a serious, organised client worth prioritising."
    ),

    h2("Why a Good Brief Matters More Than You Think"),
    p(
      "Agencies receive dozens of enquiries every week. The ones that come with a clear, structured brief get moved to the top of the pile. A strong brief helps agencies understand your business context, quote accurately instead of padding for uncertainty, assign the right team members, identify potential risks early, and deliver work that actually matches your expectations."
    ),
    tip(
      "Agencies report that projects with detailed briefs are 40% more likely to stay on budget and timeline. The 30 minutes you spend writing a brief can save weeks of rework later."
    ),

    h2("The 7 Sections Every Shopify Brief Needs"),
    p(
      "Whether you are building a new store, redesigning an existing one, or migrating from another platform, every Shopify brief should cover these seven areas."
    ),

    h3("1. About Your Business"),
    p(
      "Start with context. Agencies need to understand who you are before they can help you. Include your company name, website URL (if you have one), industry or niche, current ecommerce platform, and approximate monthly revenue. This is not about bragging \u2014 it helps agencies gauge the scale and complexity of what you need."
    ),

    h3("2. Project Type"),
    p(
      "Be specific about what you are asking for. There is a big difference between a theme-based store build and a fully custom headless build. Common project types include new store build (theme or custom), store redesign, platform migration (e.g. WooCommerce to Shopify), Shopify Plus upgrade, headless or composable build, and ongoing support retainer."
    ),

    h3("3. Goals and Requirements"),
    p(
      "This is where most briefs fall short. Do not just say \"we want a new store.\" Explain what you want to achieve. Are you trying to increase conversion rates? Improve mobile experience? Launch in a new market? List your primary goals, then separate your features into must-haves and nice-to-haves."
    ),
    ul(
      "Must-haves: features that are non-negotiable for launch",
      "Nice-to-haves: features you would love but can live without in phase one",
      'Be specific: "custom product configurator for 50+ options" is better than "product customisation"'
    ),

    h3("4. Design Preferences"),
    p(
      "Help agencies understand your aesthetic. Choose a general style direction (minimal, bold, corporate, luxury), share 2 to 3 example websites you admire and explain what you like about them, and note whether you have existing brand guidelines. The more visual references you provide, the closer the first design concept will be to what you want."
    ),

    h3("5. Technical Requirements"),
    p(
      "List every integration and technical capability you need. This section has the biggest impact on cost estimates. Cover integrations needed (ERP, PIM, email marketing, loyalty, reviews, subscriptions, accounting, shipping), product catalog size, multi-language requirements, and multi-currency requirements."
    ),
    tip(
      "If you are unsure about integrations, list the tools you currently use. The agency can recommend Shopify-compatible alternatives."
    ),

    h3("6. Timeline and Budget"),
    p(
      "Many merchants skip budget because they worry about anchoring the price. But omitting it wastes everyone's time. If your budget is $10,000 and the agency's minimum is $25,000, you both want to know that upfront. Include your desired launch date, budget range (not an exact number \u2014 a range is fine), and your flexibility on timing."
    ),

    h3("7. Contact Information"),
    p(
      "Include the name and email of the primary decision-maker, plus any additional context about your decision process: who else is involved, what your evaluation criteria are, and when you plan to make a decision."
    ),

    h2("5 Common Mistakes That Weaken Your Brief"),
    ol(
      'Being too vague on features \u2014 "we want a modern store" tells the agency nothing actionable',
      "Skipping the budget range \u2014 agencies cannot scope properly without knowing your investment level",
      "No example websites \u2014 visual references eliminate guesswork and reduce revision rounds",
      "Forgetting integrations \u2014 discovering a complex ERP integration mid-project blows up timelines",
      "Sending the same brief to 10 agencies \u2014 tailor your brief to each agency's strengths for better responses"
    ),

    h2("Brief vs RFP vs SOW: Which Do You Need?"),
    table(
      ["Document", "When to Use", "Who Creates It"],
      [
        [
          "Project Brief",
          "Early stage \u2014 you know what you want but need quotes",
          "You (the merchant)",
        ],
        [
          "RFP (Request for Proposal)",
          "Formal procurement \u2014 comparing multiple agencies on specific criteria",
          "You (the merchant)",
        ],
        [
          "SOW (Statement of Work)",
          "After selecting an agency \u2014 defines exact deliverables, milestones, payments",
          "The agency (with your input)",
        ],
      ]
    ),
    p(
      "For most Shopify projects, a detailed brief is all you need. RFPs are more common in enterprise or government procurement. The SOW comes later, after you have chosen your agency."
    ),

    h2("Template Walkthrough: A Strong Brief for a $25K\u2013$50K Redesign"),
    p(
      "Here is what a strong brief looks like in practice for a mid-range store redesign."
    ),
    ul(
      "Company: Established DTC fashion brand, 3 years on Shopify, $150K per month revenue",
      "Project: Full store redesign with custom theme development",
      "Goals: Increase mobile conversion by 20%, improve brand storytelling, add lookbook functionality",
      "Design: Luxury and minimal \u2014 references Reiss, COS, Aritzia",
      "Tech: Klaviyo integration, Judge.me reviews, 1,200 products, multi-currency (USD, EUR, GBP)",
      "Timeline: Launch before September, somewhat flexible",
      "Budget: $25,000 to $50,000"
    ),
    p(
      "Notice how specific this is. An agency reading this brief can immediately estimate scope, assign the right team, and produce an accurate quote."
    ),

    h2("Create Your Brief in 5 Minutes"),
    p(
      "You do not have to start from scratch. Our free Brief Generator walks you through all 7 sections with guided prompts, then produces a professional PDF you can download and send to any agency."
    ),
    cta(
      "Ready to create your brief?",
      "/tools/brief-generator",
      "Use the Free Brief Generator"
    ),

    faq([
      {
        q: "How long should a Shopify agency brief be?",
        a: "A good brief is typically 2 to 4 pages. It should be detailed enough for an agency to quote accurately but concise enough to read in 10 minutes. Our Brief Generator produces a well-structured PDF that hits this sweet spot.",
      },
      {
        q: "Should I include my budget in the brief?",
        a: "Yes. Including a budget range (not an exact figure) helps agencies scope appropriately and tells them whether the project is a fit. If your budget is flexible, say so.",
      },
      {
        q: "How many agencies should I send my brief to?",
        a: "We recommend 3 to 5 agencies. Fewer than 3 limits your options; more than 5 becomes difficult to manage and evaluate fairly.",
      },
      {
        q: "What if I do not know my technical requirements?",
        a: "List the tools you currently use and the problems you want solved. A good agency will recommend the right technical approach during their proposal.",
      },
    ]),
  ],
};

async function seed() {
  console.log("Seeding blog post:", post.title);

  const { error } = await supabase.from("blog_posts").upsert(
    [post],
    { onConflict: "slug" }
  );

  if (error) {
    console.error("Insert error:", error);
    process.exit(1);
  }

  console.log("Done! Post seeded successfully.");
}

seed();
