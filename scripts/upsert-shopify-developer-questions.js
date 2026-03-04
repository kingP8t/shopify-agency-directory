/**
 * Publish 2 variations on "Questions to Ask Before Hiring a Shopify Developer".
 * Each post has a distinct angle to avoid duplicate content.
 * Run: node scripts/upsert-shopify-developer-questions.js
 */
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const h2  = (text)              => ({ type: "h2", text });
const h3  = (text)              => ({ type: "h3", text });
const p   = (text)              => ({ type: "p",  text });
const ul  = (...items)          => ({ type: "ul", items });
const tip = (text)              => ({ type: "tip", text });
const cta = (text, href, label) => ({ type: "cta", text, href, label });

// ─────────────────────────────────────────────────────────────────────────────
// Variation 1 — Complete checklist angle
// Angle: organised by category (technical, process, commercial, references)
//         — the authoritative resource merchants bookmark and share
// ─────────────────────────────────────────────────────────────────────────────
const post_v1 = {
  slug: "questions-to-ask-before-hiring-a-shopify-developer",
  title: "Questions to Ask Before Hiring a Shopify Developer",
  excerpt: "Hiring a Shopify developer without asking the right questions is how projects go over budget and underdeliver. Here's the complete checklist — organised by technical skill, process, commercial terms, and references.",
  category: "Hiring Guide",
  tags: ["hiring", "shopify developer", "freelancer", "agency vetting", "ecommerce"],
  author: "Shopify Agency Directory",
  reading_time: 9,
  status: "published",
  featured: false,
  date: "2026-03-04",
  content: [
    p("Hiring the wrong Shopify developer is expensive in ways that go beyond the invoice. A bad hire costs you time, momentum, and often the extra budget to fix what went wrong. The challenge is that most developers look capable from the outside — polished portfolios, confident communication, and competitive rates don't tell you much about what happens when a project gets complicated."),
    p("The questions below are organised into four categories: technical capability, process and communication, commercial terms, and references. Work through each section before you sign anything."),

    h2("Technical Questions"),
    h3("1. Which Shopify plans and features have you worked with?"),
    p("Shopify Standard and Shopify Plus are meaningfully different platforms. Plus unlocks checkout extensibility, Shopify Functions, multi-store management, and automation via Flow. If your project requires any of these, confirm the developer has hands-on experience — not just theoretical knowledge."),
    h3("2. Have you built custom Shopify apps or Shopify Functions?"),
    p("Many requirements that seem like 'customisations' actually require custom app development — subscription logic, B2B pricing tiers, custom checkout steps, or bespoke loyalty mechanics. A developer who has only done theme work may not be the right fit for these."),
    h3("3. How comfortable are you with Liquid, Shopify's templating language?"),
    p("Liquid is the backbone of every Shopify theme. Ask them to walk you through a recent piece of complex Liquid they wrote — a custom section schema, a metafield-driven layout, or a conditional rendering challenge. Their explanation will reveal both skill level and communication ability."),
    h3("4. How do you handle app conflicts and third-party integrations?"),
    p("Almost every Shopify store runs 5–20 apps. Conflicts between apps — particularly around theme JavaScript, checkout scripts, and storefront API calls — are one of the most common causes of post-launch bugs. Ask how they identify and resolve these conflicts and whether they test against your specific app stack."),
    h3("5. What is your approach to page speed and Core Web Vitals?"),
    p("A slow store costs sales. Ask what their typical PageSpeed Insights scores look like post-launch and what specific techniques they use — lazy loading, critical CSS, image optimisation, script deferral. Vague answers ('we follow best practices') are a warning sign."),
    h3("6. How do you handle data migration from another platform?"),
    p("If you're migrating from WooCommerce, Magento, or another platform, ask specifically: how do they migrate product data, customer records, order history, and SEO URLs? What tools do they use? What's their approach to preserving URL structure and redirects to protect your organic rankings?"),

    tip("Ask to see a live store they've built that's similar to your project in complexity. Load it on mobile, check the speed, navigate the checkout. The work speaks louder than any answer."),

    h2("Process and Communication Questions"),
    h3("7. Who will actually work on my project day to day?"),
    p("In agencies, work is often sold by seniors and delivered by juniors. In freelance arrangements, work is sometimes subcontracted without disclosure. Ask specifically: will you personally be writing the code? If it's an agency, ask to meet the developer who will be assigned to your project."),
    h3("8. What does your project management process look like?"),
    p("Good developers work to a clear structure: a defined brief, a scoped spec, milestones, and a staging environment for review before anything goes live. If their process is 'I'll send you updates when I have something to show', that is not a process — it's a risk."),
    h3("9. How do you handle scope changes mid-project?"),
    p("Scope changes are inevitable. Ask what their process is when a client requests something that wasn't in the original brief. A professional developer will have a formal change request process — a written description of the addition, a revised quote, and your sign-off before work begins. An informal process ('I'll add it, we'll sort out cost later') leads to disputes."),
    h3("10. How often will we communicate, and through what channels?"),
    p("Establish this upfront. Weekly updates via a project management tool (Linear, Notion, Basecamp) is standard. If their answer is 'whenever you message me on WhatsApp', that's not a professional workflow. Consistent, documented communication protects both parties."),
    h3("11. What does your testing process look like before handover?"),
    p("Ask specifically: do they test on multiple browsers and devices? Do they test with real payment methods in a sandbox? Do they run through a checkout QA checklist? Do they test any apps installed during the build? A developer who tests thoroughly will be able to describe their process in detail."),

    h2("Commercial Questions"),
    h3("12. What is your pricing model — fixed price or hourly?"),
    p("Fixed-price contracts give you budget certainty but require a watertight scope. Hourly contracts are more flexible but require careful tracking. Neither is inherently better — but you should understand which you're agreeing to and what happens if the scope expands."),
    h3("13. What is your payment schedule?"),
    p("Standard terms are 30–50% upfront, with the balance paid on delivery or tied to milestones. Be cautious of 100% upfront requests from unknown developers. For larger projects, milestone-based payments (30% deposit, 30% at staging sign-off, 40% at launch) give you leverage throughout."),
    h3("14. What is your policy on bugs discovered after launch?"),
    p("Reputable developers offer a post-launch warranty — typically 14–30 days during which they fix bugs at no extra charge. Ask specifically: what counts as a bug versus a change request? What's the response time for critical issues? What happens after the warranty expires?"),
    h3("15. Who owns the code at the end of the project?"),
    p("For custom theme development and custom app code, confirm IP ownership transfers to you on final payment. This is standard — but it should be in the contract. Also confirm you'll receive all source files, git repository access, and documentation."),

    tip("Never proceed without a written contract. For small projects a simple statement of work will do. For anything over $5,000, engage a properly scoped contract that covers deliverables, timelines, payment terms, IP ownership, and post-launch support."),

    h2("Reference Questions"),
    h3("16. Can you provide 2–3 references from comparable projects?"),
    p("Ask for references from clients whose projects were similar in scope, budget, and complexity to yours. When you speak to references, ask: did the project land on time and on budget? How did the developer handle problems when they arose? Would you hire them again?"),
    h3("17. What was the most challenging project you've worked on, and how did you handle it?"),
    p("This reveals problem-solving ability and honesty more than any portfolio piece. A developer who can describe a specific technical or client challenge — and explain clearly how they resolved it — is demonstrating real-world competence. Vague or overly polished answers are a red flag."),

    h2("The Answers That Should Make You Walk Away"),
    ul(
      "They can't name who will work on your project",
      "They send a quote within 24 hours without a proper discovery call",
      "They guarantee specific SEO rankings or traffic outcomes",
      "They don't have a post-launch support policy",
      "They can't describe their testing process in concrete terms",
      "They're unwilling to provide references from comparable projects",
      "The contract doesn't specify IP ownership or includes a perpetual licence clause"
    ),

    cta("Browse verified Shopify developers and agencies — filter by specialization, budget, and location.", "/agencies", "Find a Vetted Developer →"),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Variation 2 — "What the answers reveal" angle
// Angle: forensic/investigative — focus on interpreting the developer's answers,
//         not just what to ask. Useful for merchants who've been burned before.
// ─────────────────────────────────────────────────────────────────────────────
const post_v2 = {
  slug: "shopify-developer-interview-questions-what-answers-reveal",
  title: "Shopify Developer Interview Questions: What the Answers Actually Reveal",
  excerpt: "It's not just about asking the right questions — it's about knowing what a good answer looks like. Here's how to read between the lines when hiring a Shopify developer.",
  category: "Hiring Guide",
  tags: ["hiring", "shopify developer", "freelancer", "agency vetting", "ecommerce"],
  author: "Shopify Agency Directory",
  reading_time: 8,
  status: "published",
  featured: false,
  date: "2026-03-04",
  content: [
    p("Most hiring advice tells you what questions to ask. This guide goes further — it tells you what the answers actually mean. Because the difference between a developer who will deliver and one who will disappear mid-project often isn't visible in their portfolio. It's visible in how they answer questions under mild pressure."),
    p("Here are the questions that reveal the most, and how to interpret the responses you'll get."),

    h2("'Walk me through a recent Shopify project and the most complex part of it.'"),
    h3("What a strong answer looks like"),
    p("A confident developer will describe a specific technical problem — a custom section schema that required dynamic metafield rendering, an app conflict that took debugging to diagnose, a checkout script that broke on a particular browser. They'll explain what they tried, what failed, and what worked."),
    h3("What a weak answer reveals"),
    p("If they describe the project in terms of the client brief ('I built a store for a fashion brand, it had 200 products') rather than the technical challenges they solved, they're telling you they executed instructions without deep problem-solving. That's fine for simple projects — but not for anything with complexity."),
    tip("The best developers talk about problems, not features. Listen for specific technical detail. Vagueness at this stage is a reliable predictor of vagueness when something breaks mid-project."),

    h2("'Who will personally be writing the code on my project?'"),
    h3("What a strong answer looks like"),
    p("Either 'I will' (freelancer) or a named senior developer with specific Shopify experience (agency). In an agency context, a strong answer includes: the developer's name, their experience level, and an offer for you to speak with them before signing."),
    h3("What a weak answer reveals"),
    p("'Our team will handle it' or 'we assign based on availability' means the person you're evaluating won't be the person building your store. This is the single most common source of disappointment in agency projects — you evaluate the senior, you get the junior. Always push for a name and the opportunity to meet them."),

    h2("'What happens if I request something that wasn't in the original scope?'"),
    h3("What a strong answer looks like"),
    p("A clear change request process: the developer acknowledges the request, documents it in writing, provides a separate quote, and waits for your sign-off before starting work. This protects both parties and keeps the budget predictable."),
    h3("What a weak answer reveals"),
    p("'It depends' or 'we'll figure it out' or 'I'll add it and we'll sort cost at the end' is how scope disputes are born. There is no grey area here. A developer without a formal change request process is inviting problems — and the cost is almost always borne by the client."),

    h2("'Can you describe your testing process before you hand a project over?'"),
    h3("What a strong answer looks like"),
    p("Cross-browser and cross-device testing. Test purchases with sandbox payment methods. QA of every app installed during the build. Mobile checkout walkthrough. Performance check via PageSpeed Insights or Lighthouse. Ideally, a written QA checklist they can share with you."),
    h3("What a weak answer reveals"),
    p("'I test as I go' or 'I check it looks right before I send it over' is not a testing process. It's an indication that bugs will surface post-launch — and that the developer may argue they're change requests rather than their responsibility. This question alone filters out a significant proportion of underskilled developers."),

    h2("'What does your post-launch support look like?'"),
    h3("What a strong answer looks like"),
    p("A defined warranty period (14–30 days is standard) during which bugs are fixed at no charge. A clear definition of what constitutes a bug versus a change request. A stated response time for critical issues. A retainer or support package option for ongoing work."),
    h3("What a weak answer reveals"),
    p("'I'm available if you need me' is not a support policy. 'Just message me on WhatsApp' is not a professional workflow. Post-launch is when most problems appear — apps conflicting, edge cases in the checkout, performance issues under real traffic. If the developer hasn't thought about this, you haven't either."),

    h2("'Can you share references from two projects similar to mine?'"),
    h3("What a strong answer looks like"),
    p("Two or three warm introductions to former clients — not case studies, not testimonials, but real people you can call. Strong developers actively encourage reference calls because they know their clients will speak highly of them."),
    h3("What a weak answer reveals"),
    p("'My clients are all under NDA' is the most common deflection — and it's almost never true for a boutique or mid-size Shopify project. 'I'm new to freelancing, I don't have references yet' is an honest answer that warrants a lower-risk, smaller first engagement before committing a large budget. No reference offer at all is a reason to pause."),

    h2("'What do you do when you realise a project will miss its deadline?'"),
    h3("What a strong answer looks like"),
    p("They flag it as soon as they identify the risk — not the day before the deadline. They explain the cause clearly (underestimated complexity, a dependency on a third party, a technical blocker) and propose options: a revised timeline, a reduced initial scope, or parallel paths to still hit a partial launch."),
    h3("What a weak answer reveals"),
    p("'That hasn't happened to me' is almost certainly false — and suggests the developer doesn't reflect honestly on their work. 'I just work harder to hit the deadline' is a better answer but incomplete. The best developers treat risk as something to manage proactively, not absorb quietly until it's too late."),

    h2("'What does your handover process look like?'"),
    h3("What a strong answer looks like"),
    p("A structured close-out: all credentials transferred to you, custom code documented and delivered with comments, a list of all installed apps and their configurations, a walkthrough training session for your team, a theme backup, and a final review sign-off."),
    h3("What a weak answer reveals"),
    p("'I'll give you the Shopify login' is not a handover. Many merchants end up locked out of parts of their own store — custom integrations they can't unpick, code they don't understand, and no documentation for the next developer to work from. A developer who hasn't thought about handover has only thought about building, not about your long-term ownership."),

    h2("The Question You Should Always Ask Last"),
    p("After all of the above, ask: 'Is there anything about my project that gives you pause or that you'd want to flag before we agree to work together?' A developer who answers honestly — 'I've not done this specific integration before, but here's how I'd approach it' — is demonstrating exactly the kind of candour that makes a project go well. A developer who says 'No, it all sounds straightforward' to a complex brief is telling you either that they haven't thought about it carefully, or that they're optimising for winning the work rather than delivering it."),

    cta("Find vetted Shopify developers and agencies who've been reviewed by real clients.", "/agencies", "Browse Verified Agencies →"),
  ],
};

async function main() {
  const posts = [post_v1, post_v2];

  for (const post of posts) {
    console.log(`Upserting: "${post.title}"`);
    const { error } = await supabase
      .from("blog_posts")
      .upsert(post, { onConflict: "slug" });

    if (error) {
      console.error(`  Error: ${error.message}`);
      process.exit(1);
    }
    console.log(`  Published: /blog/${post.slug}`);
  }

  console.log("\nDone — both posts published.");
}

main();
