/**
 * Seed blog post: What to Include in a Shopify Agency Contract
 * Author: Elena King
 * Category: Hiring Guide
 * Bottom-funnel; links to brief, red-flags, pricing-model, and interview posts.
 * Run: node scripts/seed-blog-shopify-agency-contract-guide.js
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
const tip = (text) => ({ type: "tip", text });
const cta = (text, href, label) => ({ type: "cta", text, href, label });
const table = (headers, rows) => ({ type: "table", headers, rows });
const faq = (items) => ({ type: "faq", items });

const post = {
  slug: "what-to-include-in-shopify-agency-contract",
  title: "What to Include in a Shopify Agency Contract (and the Clauses That Protect You)",
  seo_title: "Shopify Agency Contract: What to Include (2026)",
  excerpt: "Signing with a Shopify agency without a proper contract is one of the most common — and expensive — mistakes merchants make. Here is exactly what your contract should cover, clause by clause, before you transfer a deposit.",
  category: "Hiring Guide",
  tags: [
    "shopify agency contract",
    "hiring shopify agency",
    "shopify development contract",
    "agency agreement",
    "shopify agency terms",
    "protect yourself hiring agency",
  ],
  author: "Elena King",
  reading_time: 9,
  status: "published",
  featured: false,
  date: "2026-06-02",
  updated_date: "2026-06-02",
  content: [
    p("Signing with a Shopify agency without a proper contract is one of the most common — and expensive — mistakes merchants make. A good contract does not signal distrust; it protects both parties by making expectations explicit before work starts. When something goes wrong — and on complex projects, something always does — the contract is what determines who pays to fix it."),
    p("This guide covers what a Shopify agency contract should contain, which clauses are non-negotiable, and the red flags that should make you pause before signing."),

    cta("Before you get to contract stage, make sure your brief is solid. Agencies quote more accurately — and contracts are easier to write — when the scope is clear.", "/blog/how-to-brief-a-shopify-agency", "How to Brief a Shopify Agency"),

    h2("The 10 Things Every Shopify Agency Contract Must Cover"),

    h3("1. Scope of Work"),
    p("This is the most important section. It should list every deliverable — by phase, by page, by feature — with enough specificity that a dispute about what was 'included' is impossible. Include page count, number of design revisions, data migration limits (e.g. 'up to 5,000 products'), app integrations, and which environments the agency will configure (development, staging, production)."),
    tip("Insist on an 'out of scope' section too. A good agency lists what they are NOT doing just as clearly as what they are. This is actually a positive sign — it means they have thought carefully about the edges of the project."),

    h3("2. Timeline and Milestones"),
    p("A project with a deadline but no intermediate milestones is a project that will drift. The contract should list each phase, its expected start and end date, and what you need to review and approve at each stage. Also specify your own obligations — timelines slip because clients are slow to give feedback as often as agencies are slow to deliver."),

    h3("3. Payment Terms"),
    p("Be specific: which payment, for which milestone, by which date, via which method. Milestone-based structures are the most balanced for fixed-price projects. The contract should also state what happens if you miss a payment (work pause after X days) and what happens if the agency misses a milestone (credit or discount). Avoid structures where the agency is fully paid before launch."),
    table(
      ["Payment Structure", "Risk Level", "When It Works"],
      [
        ["Milestone-based (25/25/25/25)", "Low", "Best for most fixed-price projects"],
        ["50% deposit, 50% at launch", "Medium", "Acceptable for smaller projects under $10,000"],
        ["Time and materials, billed monthly", "Variable", "Good for evolving scope; requires clear rate card and cap"],
        ["100% upfront", "High", "Avoid unless the project is very small or the relationship is long-established"],
      ]
    ),

    h3("4. Change Request Process"),
    p("Scope creep is the primary cause of budget overruns on Shopify projects. The contract must define what constitutes an 'in scope' change vs a 'change request', how change requests are submitted and priced, the minimum turnaround time for a change request quote, and your right to decline a change request without project penalty."),

    h3("5. Intellectual Property and Code Ownership"),
    p("Who owns the code after launch? In most cases the answer should be you — the merchant — but verify this in writing. Some agencies retain ownership of reusable code components or internal libraries (which is fine) but the custom work built for your store should transfer to you on final payment. Also confirm you will receive access to all accounts: Shopify admin, Shopify Partner account access, any third-party tools configured during the project."),

    h3("6. Post-Launch Support and Warranty"),
    p("A professional agency includes a post-launch warranty period — typically 30 days — during which they fix any bugs or broken functionality that was in scope at no extra cost. The contract should state the length of this warranty, what it covers (in-scope bugs only, not new feature requests), and the response time for critical issues versus minor ones."),

    h3("7. Confidentiality"),
    p("Standard but important. Both parties should agree not to disclose each other's sensitive business information. From your side, this protects your sales data, pricing strategy, and product roadmap. From the agency's side, it protects their internal processes and proprietary tools. Mutual NDA language is the norm for any professional engagement."),

    h3("8. Termination Clauses"),
    p("What happens if the project goes badly wrong? The contract should specify the notice period required to terminate (typically 14 to 30 days), what you are entitled to receive on termination (all completed work, access to accounts, code to date), how payment is calculated for partially completed milestones, and whether there is a kill fee if you terminate without cause."),

    h3("9. Dispute Resolution"),
    p("Define the process before you need it: which jurisdiction's law governs the contract, whether disputes go to mediation before litigation, and the escalation path within both organisations. This is rarely needed, but it dramatically simplifies a difficult situation if it arises."),

    h3("10. Liability Cap"),
    p("Agencies typically cap their total liability at the contract value, or sometimes less. This is standard and reasonable — no agency can accept unlimited liability for a software project. What to watch for: any attempt to exclude liability for gross negligence, wilful misconduct, or data loss. Those carve-outs should remain uncapped."),

    h2("Contract Red Flags to Watch For"),
    p("Beyond what should be in the contract, watch for what should not be there — or what is conspicuously absent."),
    ul(
      "No deliverable list — a contract that describes 'a Shopify store' without specifying what that includes",
      "Unlimited change requests 'at no extra cost' — this sounds generous but usually means the agency will redefine scope to avoid them",
      "Payment 100% upfront — removes all financial incentive to meet quality standards",
      "IP retained by the agency — you should own the custom code built for your project",
      "No post-launch warranty — a professional agency stands behind its work for at least 30 days",
      "No termination clause — contracts without exit provisions are contracts that favour the stronger party",
    ),
    cta("Know the warning signs in proposals before you even get to contract stage.", "/blog/shopify-agency-proposal-red-flags", "Shopify Agency Proposal Red Flags"),

    h2("Should You Use the Agency's Contract or Your Own?"),
    p("Most agencies will send their standard contract. Review it carefully — it will naturally favour the agency. You have every right to negotiate terms, add clauses, or provide your own contract template. On larger projects (above $20,000), it is worth having a lawyer review the agreement before signing. The cost of legal review is usually a fraction of the cost of a dispute."),
    tip("A well-structured agency brief produces a better contract. When scope is defined in your brief, the agency's contract simply needs to reference and confirm it — rather than vaguely re-describe the project in general terms."),

    faq([
      {
        q: "Do I need a formal contract with a Shopify agency?",
        a: "Yes, always. Even for small projects, a written agreement protects both parties by documenting what was agreed. Verbal agreements and email threads are not substitutes — they are ambiguous, difficult to enforce, and rarely capture the full scope, payment terms, and IP ownership.",
      },
      {
        q: "Who owns the Shopify store and code after the project?",
        a: "You should — the merchant. A professional contract will transfer ownership of custom code and design to you upon final payment. The agency may retain rights to reusable internal libraries or frameworks, which is normal, but anything built specifically for your store should be yours. Verify this in writing before signing.",
      },
      {
        q: "What is a fair post-launch warranty period?",
        a: "30 days is the standard, and it should cover fixing any bugs or broken functionality that was in scope at no extra cost. Some agencies offer 60 or 90 days for larger projects. The warranty should not cover new feature requests or changes you make yourself after launch — only defects in the delivered work.",
      },
      {
        q: "Can I negotiate a Shopify agency contract?",
        a: "Yes, and you should. Agency contracts are starting points, not final documents. Common areas to negotiate: payment milestone structure, IP ownership of custom work, post-launch warranty length, and liability caps. For projects above $20,000, having a lawyer review and mark up the contract is worth the cost.",
      },
      {
        q: "What happens if the agency misses a deadline?",
        a: "Your contract should address this. Common provisions include a grace period, then a daily credit or rate reduction, with the right to terminate if the delay exceeds a defined threshold. Without a clause, your only recourse is general contract law — slower and more expensive. Add timeline consequences before you sign.",
      },
    ]),

    h2("The Bottom Line"),
    p("A proper contract does not slow down a good project — it protects it. Agencies that resist reasonable contract terms or push back on IP ownership and warranty clauses are telling you something important about how they operate. The few hours you invest in getting the contract right before signing will save you far more time, money, and stress if the project runs into trouble."),
    cta("Ready to find a professional agency worth signing with? Browse 900+ verified Shopify agencies.", "/agencies", "Browse Verified Agencies"),
  ],
};

async function seed() {
  console.log("Seeding blog post:", post.title);
  const { data, error } = await supabase
    .from("blog_posts")
    .upsert(
      {
        slug: post.slug,
        title: post.title,
        seo_title: post.seo_title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        author: post.author,
        reading_time: post.reading_time,
        status: post.status,
        featured: post.featured,
        date: post.date,
        updated_date: post.updated_date,
      },
      { onConflict: "slug" }
    )
    .select();

  if (error) { console.error("Failed:", error); process.exit(1); }
  console.log("Seeded:", data?.[0]?.slug);
}
seed();
