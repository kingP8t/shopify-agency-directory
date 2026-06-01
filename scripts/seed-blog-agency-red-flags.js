/**
 * Seed blog post: 5 Red Flags in Shopify Agency Proposals (And What to Ask Instead)
 * Run: node scripts/seed-blog-agency-red-flags.js
 */
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

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
  slug: "red-flags-shopify-agency-proposals",
  title: "5 Red Flags in Shopify Agency Proposals (And What to Ask Instead)",
  excerpt:
    "How to spot warning signs in agency proposals before you sign. Learn the 5 most common red flags, what good proposals look like, and the exact questions to ask to protect your project and budget.",
  category: "Hiring Guide",
  tags: [
    "shopify agency proposal",
    "hiring shopify developer",
    "shopify agency red flags",
    "how to hire shopify agency",
    "agency evaluation",
    "shopify rfp",
  ],
  author: "Varine Rashford",
  reading_time: 10,
  // RETIRED: consolidated into /blog/shopify-agency-proposal-red-flags (301 in
  // next.config.ts). Kept as draft so re-running this seed won't resurrect the
  // duplicate and re-introduce keyword cannibalization.
  status: "draft",
  featured: false,
  date: "2026-04-03",
  content: [
    p(
      "You have done your research, shortlisted three or four Shopify agencies, and sent out your project brief. The proposals come back. One is suspiciously cheap. Another is a 40-page document with more buzzwords than substance. A third quotes a fixed price but buries scope exclusions in the fine print."
    ),
    p(
      "How do you tell the difference between an agency that will deliver and one that will drain your budget, miss your deadline, or disappear after launch? After reviewing hundreds of agency proposals through our directory, we have identified the five most common red flags \u2014 and the specific questions you should ask to protect yourself."
    ),

    cta(
      "Before you evaluate proposals, make sure your brief is solid. A detailed brief leads to more accurate, comparable quotes from agencies.",
      "/tools/brief-generator",
      "Create Your Project Brief"
    ),

    h2("Red Flag 1: No Discovery Phase"),
    p(
      "The proposal jumps straight from your brief to a fixed-price quote with no mention of discovery, requirements gathering, or a kickoff workshop."
    ),
    h3("Why This Is a Problem"),
    p(
      "An agency that quotes a fixed price without understanding your business is either wildly overcharging (to cover uncertainty) or wildly undercharging (to win the project, then hit you with change requests later). Both outcomes are bad."
    ),
    p(
      "Discovery is where the agency digs into your requirements, maps your data flows, identifies technical risks, and produces a detailed specification. Without it, the project is built on assumptions."
    ),
    h3("What Good Looks Like"),
    ul(
      "A paid discovery phase (typically $2,000\u2013$8,000 or 1\u20132 weeks) before committing to a fixed price",
      "Discovery deliverables: detailed specification document, sitemap, wireframes, data migration plan, integration architecture",
      "A fixed quote that comes after discovery \u2014 based on the specification, not just your brief"
    ),
    h3("What to Ask"),
    ul(
      "\"Do you offer a paid discovery phase before committing to a fixed price?\"",
      "\"What deliverables come out of discovery?\"",
      "\"If we proceed after discovery, does the discovery cost apply towards the project fee?\""
    ),

    h2("Red Flag 2: Vague or Missing Scope Documentation"),
    p(
      "The proposal gives a total price but does not break it down by phase, feature, or deliverable. You see broad descriptions like \"custom Shopify store build\" or \"full ecommerce implementation\" without specifics."
    ),
    h3("Why This Is a Problem"),
    p(
      "Without a clear scope, you have no way to know what is included and what is not. This is the number one source of disputes between merchants and agencies. \"I assumed that was included\" is a sentence that has ruined thousands of agency relationships."
    ),
    h3("What Good Looks Like"),
    p(
      "A detailed proposal should include:"
    ),
    ul(
      "A line-item breakdown by project phase (discovery, design, development, data migration, QA, launch, post-launch)",
      "Specific deliverables for each phase (e.g. \"5 custom page templates\", \"3 rounds of design revisions\", \"product data migration for up to 2,000 SKUs\")",
      "Explicit exclusions \u2014 a \"what is NOT included\" section is a sign of a mature agency",
      "Change request process \u2014 how out-of-scope work is quoted and approved",
      "Assumptions \u2014 what the agency is assuming about your requirements, data, and availability"
    ),
    h3("What to Ask"),
    ul(
      "\"Can you break the quote down by phase and deliverable?\"",
      "\"What is explicitly NOT included in this quote?\"",
      "\"How do you handle scope changes during the project? What is the change request process and typical approval time?\""
    ),
    tip(
      "The best proposals have a \"key assumptions\" section. If any assumption turns out to be wrong, it triggers a scope discussion \u2014 not a surprise invoice. This protects both you and the agency."
    ),

    h2("Red Flag 3: No Case Studies or References for Your Project Type"),
    p(
      "The agency shows a portfolio of beautiful stores but none of them match your project type. You need a Magento migration, but their case studies are all new builds. You are a B2B wholesaler, but their portfolio is all DTC fashion brands."
    ),
    h3("Why This Is a Problem"),
    p(
      "Shopify development is not one-size-fits-all. A migration project requires completely different skills than a new build. A B2B Shopify Plus implementation is nothing like a DTC theme customisation. An agency with no relevant experience will learn on your project \u2014 at your expense."
    ),
    h3("What Good Looks Like"),
    ul(
      "Case studies that match your project type (migration, new build, Plus implementation, headless, B2B)",
      "Case studies at a similar scale (product count, order volume, integration complexity)",
      "Named client references you can actually contact",
      "Specific results: \"reduced page load time by 40%\", \"migrated 8,000 products with zero data loss\", \"increased conversion rate by 15% post-launch\""
    ),
    h3("What to Ask"),
    ul(
      "\"Can you share 2\u20133 case studies of projects similar to mine in scope and scale?\"",
      "\"Can I speak to a reference client who had a similar project?\"",
      "\"What was the biggest challenge on that project and how did you solve it?\"",
      "\"How many [migration/Plus/headless] projects has your team completed in the last 12 months?\""
    ),

    h2("Red Flag 4: No Defined Project Management Process"),
    p(
      "The proposal does not mention how the project will be managed, who your point of contact is, how progress is tracked, or how often you will receive updates."
    ),
    h3("Why This Is a Problem"),
    p(
      "Poor project management is the second most common reason Shopify projects fail (after scope creep). Without a defined process, communication breaks down, deadlines slip silently, and issues are discovered too late to fix without delaying the launch."
    ),
    h3("What Good Looks Like"),
    ul(
      "A named project manager (PM) or account manager as your primary contact",
      "Weekly status updates (written, not just verbal) with progress against milestones",
      "A project management tool (Asana, Linear, Monday, Notion) where you can track progress in real time",
      "Defined feedback and approval cycles with clear turnaround expectations (e.g. \"client feedback within 3 business days\")",
      "A communication plan: what channel for what (email for formal decisions, Slack for daily questions, weekly video calls for reviews)",
      "Escalation process: who to contact if the PM is unresponsive or you have concerns"
    ),
    h3("What to Ask"),
    ul(
      "\"Who will be my primary point of contact throughout the project?\"",
      "\"How often will I receive progress updates, and in what format?\"",
      "\"What project management tools do you use? Will I have access?\"",
      "\"What is your expected response time for questions and feedback?\"",
      "\"What happens if the project falls behind schedule? How do you communicate delays?\""
    ),

    h2("Red Flag 5: Payment Terms That Favour the Agency"),
    p(
      "The proposal requires 100% upfront payment, or 50% upfront with the remaining 50% due before launch (meaning you have paid in full before seeing the finished product). There is no mention of milestone-based payments."
    ),
    h3("Why This Is a Problem"),
    p(
      "Payment structure reflects the balance of power in the relationship. If the agency has been paid in full before delivering, there is no financial incentive to meet your standards. This is not about trust \u2014 it is about alignment."
    ),
    h3("What Good Looks Like"),
    table(
      ["Payment Model", "Risk Level", "When It Works"],
      [
        ["Milestone-based (e.g. 25% deposit, 25% after design approval, 25% after development, 25% at launch)", "Low", "Best for fixed-price projects. Both parties are protected."],
        ["Monthly retainer (pay for hours, not deliverables)", "Medium", "Good for ongoing work. Requires trust and transparent time tracking."],
        ["50/50 (50% upfront, 50% at launch)", "Medium", "Acceptable for small projects (<$10,000). Less ideal for larger engagements."],
        ["100% upfront", "High", "Only acceptable for very small projects (<$2,000) or highly trusted, long-term relationships."],
        ["Time and materials (hourly, billed weekly/monthly)", "Variable", "Good for projects with evolving scope. Requires clear hourly rate and weekly hour caps."],
      ]
    ),
    h3("What to Ask"),
    ul(
      "\"Can we structure payments around milestones tied to deliverables?\"",
      "\"What is your cancellation policy if we need to pause or stop the project?\"",
      "\"Is there a retention period after launch for bug fixes and adjustments? How long?\""
    ),
    tip(
      "A 30-day post-launch support period should be standard. Any bugs, broken functionality, or issues that were in scope should be fixed at no extra cost during this period. If the agency does not offer this, negotiate it into the contract."
    ),

    h2("Bonus: 5 Green Flags to Look For"),
    p(
      "While watching for red flags, also look for these positive signals that indicate a professional, reliable agency."
    ),
    ol(
      "They ask you questions before quoting \u2014 a good agency will push back on your brief with clarifying questions. This shows they are thinking critically about your project, not just saying yes to everything.",
      "They recommend against features \u2014 an agency that talks you out of unnecessary complexity is acting in your interest. Beware agencies that enthusiastically agree with everything you suggest.",
      "They have a content-rich website \u2014 agencies that publish case studies, blog posts, and guides demonstrate expertise and transparency. If their own website is thin, their work for you may be too.",
      "They offer a post-launch retainer option \u2014 agencies that want to work with you long-term are incentivised to build something maintainable. Agencies that do project work and disappear have less incentive for quality.",
      "They are transparent about who will do the work \u2014 some agencies sell you on senior team members in the pitch, then assign juniors to the actual project. Ask who specifically will be working on your project and at what seniority level."
    ),

    h2("How to Compare Proposals Effectively"),
    p(
      "When you have 3\u20135 proposals in hand, use this framework to compare them objectively."
    ),
    table(
      ["Evaluation Criteria", "Weight", "What to Look For"],
      [
        ["Relevant experience", "25%", "Case studies matching your project type and scale"],
        ["Scope clarity", "20%", "Detailed deliverables, explicit exclusions, assumptions documented"],
        ["Team and process", "20%", "Named team members, PM process, communication plan"],
        ["Pricing and value", "15%", "Competitive rate for the scope, milestone-based payments"],
        ["Cultural fit", "10%", "Communication style, responsiveness during the proposal process, shared values"],
        ["Post-launch support", "10%", "Warranty period, retainer options, long-term partnership approach"],
      ]
    ),
    p(
      "Score each agency on a 1\u20135 scale for each criterion, multiply by the weight, and total. This gives you a structured, defensible comparison rather than a gut feeling."
    ),

    cta(
      "Ready to find the right agency? Browse our directory of 900+ verified Shopify agencies, filtered by specialisation, location, and budget.",
      "/agencies",
      "Browse Verified Agencies"
    ),

    h2("The Bottom Line"),
    p(
      "A good agency proposal is not just a price tag. It is a window into how the agency thinks, communicates, and operates. Red flags in the proposal phase rarely resolve themselves during the project \u2014 they get worse."
    ),
    p(
      "Take the time to evaluate proposals carefully, ask the hard questions upfront, and choose an agency that demonstrates both competence and transparency. The extra week you spend on due diligence can save you months of frustration and thousands in wasted budget."
    ),

    cta(
      "Start with a strong brief and agencies will take your project seriously. Our generator covers all 7 sections agencies need to quote accurately.",
      "/tools/brief-generator",
      "Create Your Project Brief"
    ),

    h2("Frequently Asked Questions"),
    faq([
      {
        q: "How many proposals should I request?",
        a: "Request proposals from 3\u20135 agencies. Fewer than 3 does not give you enough data points to compare. More than 5 creates evaluation fatigue and wastes agencies' time. If you have used our directory to filter by specialisation and budget, 3\u20134 proposals is usually enough.",
      },
      {
        q: "Should I share my budget with agencies?",
        a: "Yes. Sharing your budget range helps agencies scope their proposal appropriately. Without a budget, agencies either propose their ideal solution (which may be over budget) or lowball to win the project (leading to scope cuts later). A budget range (e.g. $20,000\u2013$35,000) gives them a target to design against.",
      },
      {
        q: "How long should I wait for a proposal?",
        a: "A reasonable turnaround for a detailed proposal is 1\u20132 weeks after receiving your brief. If an agency responds within hours with a fixed price, that is a red flag \u2014 they have not properly analysed your requirements. If they take more than 3 weeks, they may be overloaded or not prioritising your project.",
      },
      {
        q: "Is the cheapest proposal always the worst?",
        a: "Not always, but be cautious. A significantly cheaper proposal usually means one of three things: the agency has misunderstood the scope, they plan to cut corners, or they are based in a lower-cost region (which can be fine if the quality is there). Always ask why a quote is lower \u2014 there is usually a specific reason.",
      },
      {
        q: "What should a good Shopify proposal include?",
        a: "A good proposal includes: project understanding (proving they read your brief), scope breakdown by phase, specific deliverables, timeline with milestones, team members assigned, case studies, pricing breakdown, payment terms, exclusions, assumptions, and post-launch support terms.",
      },
      {
        q: "Can I negotiate agency pricing?",
        a: "Yes, but negotiate on scope rather than hourly rate. Instead of asking for a discount, identify features that can move to a phase two. This keeps the agency's margins intact while fitting your budget. Most agencies are flexible on payment terms and can adjust scope to hit a target budget.",
      },
    ]),
  ],
};

async function main() {
  console.log("Seeding blog post:", post.title);
  const { data, error } = await supabase
    .from("blog_posts")
    .upsert(
      {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        author: post.author,
        reading_time: post.reading_time,
        status: post.status,
        featured: post.featured,
        date: post.date,
      },
      { onConflict: "slug" }
    )
    .select("slug, title");

  if (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
  console.log("Done:", data);
}

main();
