# Badge Programme — Email Outreach Templates

Use these templates to notify listed agencies about the verified badge programme.
Personalise the [BRACKETS] before sending.

---

## 1. Initial Outreach (All Published Agencies)

**Subject line options:**
- Your verified badge is ready to embed
- You're verified on Shopify Agency Directory — here's your badge
- Add a trust badge to your website (takes 60 seconds)

**Body:**

Hi [AGENCY_NAME] team,

Your agency is listed and verified on the Shopify Agency Directory — and we've just launched something new for you.

We've created a branded "Verified on Shopify Agency Directory" badge that you can embed on your website. It takes about 60 seconds to set up.

**Here's what you get:**

- A professional SVG badge with your agency name and a verification checkmark
- Three styles (Light, Dark, Minimal) to match your website
- A direct link back to your directory profile where clients can see your ratings, reviews, and specialisations

**To grab your badge:**

1. Visit your profile: https://shopifyagencydirectory.com/agencies/[AGENCY_SLUG]
2. Scroll to "Get Your Badge"
3. Pick a style, copy the code, paste it on your site

Most agencies add it to their footer or About page. The whole thing takes under a minute.

If you have any questions, just reply to this email.

Best,
[YOUR_NAME]
Shopify Agency Directory

P.S. We wrote a step-by-step guide if you'd prefer: https://shopifyagencydirectory.com/blog/embed-verified-badge-shopify-agency-website

---

## 2. Follow-Up (7 days after initial, if no action)

**Subject line options:**
- Quick reminder: your verified badge is waiting
- Still haven't grabbed your badge?

**Body:**

Hi [AGENCY_NAME] team,

Quick follow-up — your "Verified on Shopify Agency Directory" badge is ready whenever you are.

A few agencies have already embedded theirs this week. It's a simple trust signal that shows prospective clients you're independently listed and verified.

Here's your direct link: https://shopifyagencydirectory.com/agencies/[AGENCY_SLUG]

Just scroll to "Get Your Badge," copy the embed code, and paste it into your website footer or About page.

Takes about 60 seconds. No account needed.

Best,
[YOUR_NAME]

---

## 3. For Claimed/Verified Agency Owners

**Subject line options:**
- New for verified owners: embed your badge
- Your agency badge is live — here's how to use it

**Body:**

Hi [CONTACT_NAME],

Thanks for claiming your agency profile on the Shopify Agency Directory. We've just launched a new feature specifically for verified agencies like [AGENCY_NAME].

You now have access to a branded verification badge you can embed directly on your website. It displays your agency name with a green verification checkmark and the text "Verified on Shopify Agency Directory."

**Why it matters:**

- Builds trust with prospects visiting your site
- Links directly to your profile (with your ratings and reviews)
- Works on any platform — WordPress, Webflow, Squarespace, custom sites

**Three styles available:**

- **Light** — white background, green accent (best for light websites)
- **Dark** — dark background, white text (best for dark themes)
- **Minimal** — just the checkmark and text (best for tight spaces)

Get your badge here: https://shopifyagencydirectory.com/agencies/[AGENCY_SLUG]

Scroll to "Get Your Badge," choose your style, and copy the embed code. Most agencies place it in their website footer for maximum visibility.

Let me know if you need a custom size or have any questions.

Best,
[YOUR_NAME]
Shopify Agency Directory

---

## Sending Tips

- **Batch by segment:** Send to claimed agencies first (they're most engaged), then featured agencies, then all published agencies
- **Personalise the slug:** Each email should include the agency's direct profile link
- **Best send times:** Tuesday–Thursday, 9–11am in the recipient's timezone
- **Track adoption:** Monitor badge API hits at `/api/badge/[slug]` to see which agencies embed it
- **Follow up once:** A single follow-up after 7 days is sufficient. Don't over-email.

## Quick Mail Merge Fields

| Field | Source |
|-------|--------|
| [AGENCY_NAME] | `agencies.name` |
| [AGENCY_SLUG] | `agencies.slug` |
| [CONTACT_NAME] | `agencies.claimed_email` (for claimed agencies) |

## SQL to Export Recipient List

```sql
-- All published agencies with email
SELECT name, slug, email, claimed_email,
       CASE WHEN claimed_at IS NOT NULL THEN 'claimed' ELSE 'unclaimed' END AS status
FROM agencies
WHERE status = 'published'
  AND (email IS NOT NULL OR claimed_email IS NOT NULL)
ORDER BY
  claimed_at IS NOT NULL DESC,  -- claimed first
  featured DESC,                 -- then featured
  rating DESC NULLS LAST;       -- then by rating
```
