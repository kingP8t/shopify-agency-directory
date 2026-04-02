"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BriefData {
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

const INITIAL_DATA: BriefData = {
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

const PROJECT_TYPES = [
  { value: "New Store Build (Theme)", icon: "\uD83D\uDED2", desc: "Build on a premium Shopify theme" },
  { value: "New Store Build (Custom)", icon: "\uD83C\uDFA8", desc: "Fully custom design and development" },
  { value: "Store Redesign", icon: "\u2728", desc: "Refresh an existing Shopify store" },
  { value: "Platform Migration", icon: "\uD83D\uDD04", desc: "Move from another platform to Shopify" },
  { value: "Shopify Plus Upgrade", icon: "\u2B50", desc: "Upgrade to Shopify Plus" },
  { value: "Headless Build", icon: "\uD83D\uDCBB", desc: "Custom frontend with Shopify backend" },
  { value: "Ongoing Support & Development", icon: "\uD83D\uDCC5", desc: "Monthly retainer for dev and maintenance" },
];

const GOAL_OPTIONS = [
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

const DESIGN_STYLES = [
  { value: "Modern & Minimal", icon: "\u25FB\uFE0F", desc: "Clean lines, whitespace, understated" },
  { value: "Bold & Creative", icon: "\uD83C\uDFA8", desc: "Eye-catching, distinctive, colourful" },
  { value: "Corporate & Professional", icon: "\uD83D\uDCBC", desc: "Trustworthy, structured, formal" },
  { value: "Luxury & Premium", icon: "\uD83D\uDC8E", desc: "Elegant, refined, high-end" },
];

const INTEGRATION_OPTIONS = [
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

const CATALOG_SIZES = [
  "Under 100 products",
  "100\u20131,000 products",
  "1,000\u20135,000 products",
  "5,000\u201320,000 products",
  "20,000+ products",
];

const BUDGET_RANGES = [
  "Under $5,000",
  "$5,000 \u2013 $15,000",
  "$15,000 \u2013 $25,000",
  "$25,000 \u2013 $50,000",
  "$50,000 \u2013 $100,000",
  "$100,000+",
  "Not sure yet",
];

const REVENUE_RANGES = [
  "Pre-revenue / Not launched yet",
  "Under $10,000/month",
  "$10,000 \u2013 $50,000/month",
  "$50,000 \u2013 $200,000/month",
  "$200,000 \u2013 $1M/month",
  "$1M+/month",
  "Prefer not to say",
];

const PLATFORMS = [
  "None (brand new store)",
  "Shopify (current version)",
  "WooCommerce",
  "Magento / Adobe Commerce",
  "BigCommerce",
  "Wix / Squarespace",
  "Custom-built platform",
  "Other",
];

// ---------------------------------------------------------------------------
// Shared styles (matching CostEstimator and LeadForm patterns)
// ---------------------------------------------------------------------------

const inputClass =
  "w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100";
const labelClass = "block text-sm font-semibold text-gray-800";
const selectClass =
  "w-full appearance-none rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-900 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100";

// ---------------------------------------------------------------------------
// PDF generation
// ---------------------------------------------------------------------------

async function generatePDF(data: BriefData) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  function checkPage(needed: number) {
    if (y + needed > 270) {
      doc.addPage();
      y = 20;
    }
  }

  function addHeading(text: string) {
    checkPage(16);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 163, 74); // green-600
    doc.text(text, margin, y);
    y += 3;
    doc.setDrawColor(22, 163, 74);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + contentWidth, y);
    y += 8;
  }

  function addField(label: string, value: string) {
    if (!value || value === "[]") return;
    checkPage(14);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(107, 114, 128); // gray-500
    doc.text(label.toUpperCase(), margin, y);
    y += 5;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(17, 24, 39); // gray-900
    const lines = doc.splitTextToSize(value, contentWidth);
    checkPage(lines.length * 5 + 4);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 4;
  }

  // Header
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(17, 24, 39);
  doc.text("Shopify Project Brief", margin, y);
  y += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128);
  doc.text(
    `Prepared by ${data.companyName || "Merchant"} \u2022 ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
    margin,
    y
  );
  y += 12;

  // Section 1: About Your Business
  addHeading("About Your Business");
  addField("Company Name", data.companyName);
  addField("Website", data.websiteUrl);
  addField("Industry / Niche", data.industry);
  addField("Current Platform", data.currentPlatform);
  addField("Monthly Revenue", data.monthlyRevenue);

  // Section 2: Project Type
  addHeading("Project Type");
  addField("Project", data.projectType);

  // Section 3: Goals & Requirements
  addHeading("Goals & Requirements");
  if (data.goals.length > 0) addField("Primary Goals", data.goals.join(", "));
  addField("Must-Have Features", data.mustHaveFeatures);
  addField("Nice-to-Have Features", data.niceToHaveFeatures);

  // Section 4: Design Preferences
  addHeading("Design Preferences");
  addField("Style Preference", data.designStyle);
  addField("Example Websites", data.exampleWebsites);
  addField("Brand Guidelines Exist?", data.hasBrandGuidelines);

  // Section 5: Technical Requirements
  addHeading("Technical Requirements");
  if (data.integrations.length > 0)
    addField("Integrations Needed", data.integrations.join(", "));
  addField("Product Catalog Size", data.catalogSize);
  addField("Multi-Language Required?", data.multiLanguage);
  addField("Multi-Currency Required?", data.multiCurrency);

  // Section 6: Timeline & Budget
  addHeading("Timeline & Budget");
  addField("Desired Launch Date", data.launchDate);
  addField("Budget Range", data.budgetRange);
  addField("Timeline Flexibility", data.timelineFlexibility);

  // Section 7: Contact Info
  addHeading("Contact Information");
  addField("Name", data.contactName);
  addField("Email", data.contactEmail);
  if (data.contactPhone) addField("Phone", data.contactPhone);
  if (data.additionalNotes) {
    addHeading("Additional Notes");
    addField("Notes", data.additionalNotes);
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(156, 163, 175);
    doc.text(
      "Generated by shopifyagencydirectory.com/tools/brief-generator",
      margin,
      287
    );
    doc.text(`Page ${p} of ${pageCount}`, pageWidth - margin - 20, 287);
  }

  const filename = `shopify-brief-${(data.companyName || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`;
  doc.save(filename);
}

// ---------------------------------------------------------------------------
// Step components
// ---------------------------------------------------------------------------

function StepBusiness({
  data,
  onChange,
}: {
  data: BriefData;
  onChange: (patch: Partial<BriefData>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="companyName" className={labelClass}>
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          id="companyName"
          type="text"
          className={`mt-1.5 ${inputClass}`}
          value={data.companyName}
          onChange={(e) => onChange({ companyName: e.target.value })}
          placeholder="e.g. Acme Goods Co."
        />
      </div>
      <div>
        <label htmlFor="websiteUrl" className={labelClass}>Website URL (if you have one)</label>
        <input
          id="websiteUrl"
          type="url"
          className={`mt-1.5 ${inputClass}`}
          value={data.websiteUrl}
          onChange={(e) => onChange({ websiteUrl: e.target.value })}
          placeholder="https://yourstore.com"
        />
      </div>
      <div>
        <label htmlFor="industry" className={labelClass}>Industry / Niche</label>
        <input
          id="industry"
          type="text"
          className={`mt-1.5 ${inputClass}`}
          value={data.industry}
          onChange={(e) => onChange({ industry: e.target.value })}
          placeholder="e.g. Fashion, Health & Beauty, Home Goods"
        />
      </div>
      <div>
        <label htmlFor="currentPlatform" className={labelClass}>Current Platform</label>
        <select
          id="currentPlatform"
          className={`mt-1.5 ${selectClass}`}
          value={data.currentPlatform}
          onChange={(e) => onChange({ currentPlatform: e.target.value })}
        >
          <option value="">Select platform...</option>
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="monthlyRevenue" className={labelClass}>Monthly Revenue Range</label>
        <select
          id="monthlyRevenue"
          className={`mt-1.5 ${selectClass}`}
          value={data.monthlyRevenue}
          onChange={(e) => onChange({ monthlyRevenue: e.target.value })}
        >
          <option value="">Select range...</option>
          {REVENUE_RANGES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function StepProjectType({
  data,
  onChange,
}: {
  data: BriefData;
  onChange: (patch: Partial<BriefData>) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {PROJECT_TYPES.map((pt) => (
        <button
          key={pt.value}
          type="button"
          onClick={() => onChange({ projectType: pt.value })}
          className={`flex flex-col items-start rounded-xl border-2 p-5 text-left transition-all ${
            data.projectType === pt.value
              ? "border-green-600 bg-green-50 ring-2 ring-green-100"
              : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
          }`}
        >
          <span className="text-2xl" aria-hidden="true">{pt.icon}</span>
          <span className="mt-2 text-sm font-semibold text-gray-900">{pt.value}</span>
          <span className="mt-0.5 text-xs text-gray-500">{pt.desc}</span>
        </button>
      ))}
    </div>
  );
}

function StepGoals({
  data,
  onChange,
}: {
  data: BriefData;
  onChange: (patch: Partial<BriefData>) => void;
}) {
  function toggleGoal(goal: string) {
    const next = data.goals.includes(goal)
      ? data.goals.filter((g) => g !== goal)
      : [...data.goals, goal];
    onChange({ goals: next });
  }
  return (
    <div className="space-y-5">
      <div>
        <p className={labelClass}>Primary Goals (select all that apply)</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {GOAL_OPTIONS.map((goal) => (
            <label
              key={goal}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 text-sm transition-all ${
                data.goals.includes(goal)
                  ? "border-green-600 bg-green-50 text-green-800"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                className="accent-green-600"
                checked={data.goals.includes(goal)}
                onChange={() => toggleGoal(goal)}
              />
              {goal}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="mustHave" className={labelClass}>Must-Have Features</label>
        <textarea
          id="mustHave"
          rows={3}
          className={`mt-1.5 ${inputClass}`}
          value={data.mustHaveFeatures}
          onChange={(e) => onChange({ mustHaveFeatures: e.target.value })}
          placeholder="e.g. Custom product configurator, multi-currency checkout, loyalty programme integration..."
        />
      </div>
      <div>
        <label htmlFor="niceToHave" className={labelClass}>Nice-to-Have Features</label>
        <textarea
          id="niceToHave"
          rows={3}
          className={`mt-1.5 ${inputClass}`}
          value={data.niceToHaveFeatures}
          onChange={(e) => onChange({ niceToHaveFeatures: e.target.value })}
          placeholder="e.g. Blog section, customer portal, gift wrapping option..."
        />
      </div>
    </div>
  );
}

function StepDesign({
  data,
  onChange,
}: {
  data: BriefData;
  onChange: (patch: Partial<BriefData>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className={labelClass}>Design Style Preference</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {DESIGN_STYLES.map((ds) => (
            <button
              key={ds.value}
              type="button"
              onClick={() => onChange({ designStyle: ds.value })}
              className={`flex flex-col items-start rounded-xl border-2 p-5 text-left transition-all ${
                data.designStyle === ds.value
                  ? "border-green-600 bg-green-50 ring-2 ring-green-100"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <span className="text-2xl" aria-hidden="true">{ds.icon}</span>
              <span className="mt-2 text-sm font-semibold text-gray-900">{ds.value}</span>
              <span className="mt-0.5 text-xs text-gray-500">{ds.desc}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="exampleSites" className={labelClass}>
          Example Websites You Like
        </label>
        <textarea
          id="exampleSites"
          rows={2}
          className={`mt-1.5 ${inputClass}`}
          value={data.exampleWebsites}
          onChange={(e) => onChange({ exampleWebsites: e.target.value })}
          placeholder="e.g. allbirds.com, gymshark.com, reiss.com — what do you like about them?"
        />
      </div>
      <div>
        <p className={labelClass}>Do you have existing brand guidelines?</p>
        <div className="mt-2 flex gap-3">
          {["Yes", "No", "Partial / Outdated"].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange({ hasBrandGuidelines: opt })}
              className={`rounded-lg border-2 px-5 py-2.5 text-sm font-medium transition-all ${
                data.hasBrandGuidelines === opt
                  ? "border-green-600 bg-green-50 text-green-700"
                  : "border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepTechnical({
  data,
  onChange,
}: {
  data: BriefData;
  onChange: (patch: Partial<BriefData>) => void;
}) {
  function toggleIntegration(item: string) {
    const next = data.integrations.includes(item)
      ? data.integrations.filter((i) => i !== item)
      : [...data.integrations, item];
    onChange({ integrations: next });
  }
  return (
    <div className="space-y-5">
      <div>
        <p className={labelClass}>Integrations Needed (select all that apply)</p>
        <div className="mt-3 space-y-2">
          {INTEGRATION_OPTIONS.map((item) => (
            <label
              key={item}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 text-sm transition-all ${
                data.integrations.includes(item)
                  ? "border-green-600 bg-green-50 text-green-800"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                className="accent-green-600"
                checked={data.integrations.includes(item)}
                onChange={() => toggleIntegration(item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="catalogSize" className={labelClass}>Product Catalog Size</label>
        <select
          id="catalogSize"
          className={`mt-1.5 ${selectClass}`}
          value={data.catalogSize}
          onChange={(e) => onChange({ catalogSize: e.target.value })}
        >
          <option value="">Select size...</option>
          {CATALOG_SIZES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className={labelClass}>Multi-Language Required?</p>
          <div className="mt-2 flex gap-3">
            {["Yes", "No", "Maybe later"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange({ multiLanguage: opt })}
                className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                  data.multiLanguage === opt
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className={labelClass}>Multi-Currency Required?</p>
          <div className="mt-2 flex gap-3">
            {["Yes", "No", "Maybe later"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange({ multiCurrency: opt })}
                className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                  data.multiCurrency === opt
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepTimeline({
  data,
  onChange,
}: {
  data: BriefData;
  onChange: (patch: Partial<BriefData>) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="launchDate" className={labelClass}>Desired Launch Date</label>
        <input
          id="launchDate"
          type="text"
          className={`mt-1.5 ${inputClass}`}
          value={data.launchDate}
          onChange={(e) => onChange({ launchDate: e.target.value })}
          placeholder="e.g. September 2026, Before Black Friday, ASAP, Flexible"
        />
      </div>
      <div>
        <label htmlFor="budgetRange" className={labelClass}>Budget Range</label>
        <select
          id="budgetRange"
          className={`mt-1.5 ${selectClass}`}
          value={data.budgetRange}
          onChange={(e) => onChange({ budgetRange: e.target.value })}
        >
          <option value="">Select range...</option>
          {BUDGET_RANGES.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      <div>
        <p className={labelClass}>Timeline Flexibility</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {[
            { value: "Rigid", desc: "Hard deadline, no flexibility" },
            { value: "Somewhat Flexible", desc: "Preferred date but can adjust 2\u20134 weeks" },
            { value: "Very Flexible", desc: "No fixed deadline, quality over speed" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ timelineFlexibility: opt.value })}
              className={`rounded-xl border-2 px-5 py-3 text-left transition-all ${
                data.timelineFlexibility === opt.value
                  ? "border-green-600 bg-green-50 ring-2 ring-green-100"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="block text-sm font-semibold text-gray-900">{opt.value}</span>
              <span className="block text-xs text-gray-500">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepContact({
  data,
  onChange,
}: {
  data: BriefData;
  onChange: (patch: Partial<BriefData>) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contactName" className={labelClass}>Your Name</label>
          <input
            id="contactName"
            type="text"
            className={`mt-1.5 ${inputClass}`}
            value={data.contactName}
            onChange={(e) => onChange({ contactName: e.target.value })}
            placeholder="Full name"
          />
        </div>
        <div>
          <label htmlFor="contactEmail" className={labelClass}>Email</label>
          <input
            id="contactEmail"
            type="email"
            className={`mt-1.5 ${inputClass}`}
            value={data.contactEmail}
            onChange={(e) => onChange({ contactEmail: e.target.value })}
            placeholder="you@company.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contactPhone" className={labelClass}>Phone (optional)</label>
        <input
          id="contactPhone"
          type="tel"
          className={`mt-1.5 ${inputClass}`}
          value={data.contactPhone}
          onChange={(e) => onChange({ contactPhone: e.target.value })}
          placeholder="+1 555 123 4567"
        />
      </div>
      <div>
        <label htmlFor="additionalNotes" className={labelClass}>
          Anything Else the Agency Should Know
        </label>
        <textarea
          id="additionalNotes"
          rows={4}
          className={`mt-1.5 ${inputClass}`}
          value={data.additionalNotes}
          onChange={(e) => onChange({ additionalNotes: e.target.value })}
          placeholder="Deadlines, concerns, preferences, decision process, key stakeholders..."
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step metadata
// ---------------------------------------------------------------------------

const STEPS = [
  { title: "About Your Business", subtitle: "Tell us about your company and where you are today." },
  { title: "Project Type", subtitle: "What kind of Shopify project are you planning?" },
  { title: "Goals & Requirements", subtitle: "What do you want to achieve and what features do you need?" },
  { title: "Design Preferences", subtitle: "What should your store look and feel like?" },
  { title: "Technical Requirements", subtitle: "What integrations and technical capabilities do you need?" },
  { title: "Timeline & Budget", subtitle: "When do you need it and what can you invest?" },
  { title: "Contact & Additional Info", subtitle: "How should agencies reach you?" },
];

// ---------------------------------------------------------------------------
// Preview component
// ---------------------------------------------------------------------------

function BriefPreview({ data }: { data: BriefData }) {
  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div className="border-t border-gray-100 pt-5">
        <h3 className="text-sm font-bold uppercase tracking-wide text-green-600">{title}</h3>
        <div className="mt-3 space-y-2">{children}</div>
      </div>
    );
  }
  function Field({ label, value }: { label: string; value: string }) {
    if (!value) return null;
    return (
      <div>
        <span className="text-xs font-semibold uppercase text-gray-400">{label}</span>
        <p className="text-sm text-gray-800">{value}</p>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <Section title="About Your Business">
        <Field label="Company" value={data.companyName} />
        <Field label="Website" value={data.websiteUrl} />
        <Field label="Industry" value={data.industry} />
        <Field label="Current Platform" value={data.currentPlatform} />
        <Field label="Monthly Revenue" value={data.monthlyRevenue} />
      </Section>
      <Section title="Project Type">
        <Field label="Project" value={data.projectType} />
      </Section>
      <Section title="Goals & Requirements">
        {data.goals.length > 0 && <Field label="Goals" value={data.goals.join(", ")} />}
        <Field label="Must-Have Features" value={data.mustHaveFeatures} />
        <Field label="Nice-to-Have Features" value={data.niceToHaveFeatures} />
      </Section>
      <Section title="Design Preferences">
        <Field label="Style" value={data.designStyle} />
        <Field label="Example Websites" value={data.exampleWebsites} />
        <Field label="Brand Guidelines" value={data.hasBrandGuidelines} />
      </Section>
      <Section title="Technical Requirements">
        {data.integrations.length > 0 && (
          <Field label="Integrations" value={data.integrations.join(", ")} />
        )}
        <Field label="Catalog Size" value={data.catalogSize} />
        <Field label="Multi-Language" value={data.multiLanguage} />
        <Field label="Multi-Currency" value={data.multiCurrency} />
      </Section>
      <Section title="Timeline & Budget">
        <Field label="Launch Date" value={data.launchDate} />
        <Field label="Budget" value={data.budgetRange} />
        <Field label="Flexibility" value={data.timelineFlexibility} />
      </Section>
      <Section title="Contact Information">
        <Field label="Name" value={data.contactName} />
        <Field label="Email" value={data.contactEmail} />
        <Field label="Phone" value={data.contactPhone} />
        {data.additionalNotes && <Field label="Additional Notes" value={data.additionalNotes} />}
      </Section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function BriefGenerator() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BriefData>(INITIAL_DATA);
  const [showResults, setShowResults] = useState(false);
  const [fade, setFade] = useState(false);
  const [validationError, setValidationError] = useState("");

  const update = useCallback(
    (patch: Partial<BriefData>) => {
      setData((prev) => ({ ...prev, ...patch }));
      setValidationError("");
    },
    []
  );

  function goToStep(n: number) {
    setShowResults(false);
    setFade(true);
    setTimeout(() => {
      setStep(n);
      setFade(false);
    }, 150);
  }

  function handleNext() {
    // Validate required fields
    if (step === 1 && !data.companyName.trim()) {
      setValidationError("Company name is required");
      return;
    }
    if (step === 2 && !data.projectType) {
      setValidationError("Please select a project type");
      return;
    }

    if (step < 7) {
      setFade(true);
      setTimeout(() => {
        setStep(step + 1);
        setFade(false);
      }, 150);
    } else {
      // Generate brief
      setShowResults(true);
      trackEvent("brief_generated", {
        project_type: data.projectType,
        budget_range: data.budgetRange,
        has_integrations: data.integrations.length > 0 ? "yes" : "no",
      });
    }
  }

  function handleDownloadPDF() {
    generatePDF(data);
    trackEvent("brief_pdf_downloaded", {
      project_type: data.projectType,
    });
  }

  function reset() {
    setData(INITIAL_DATA);
    setShowResults(false);
    setStep(1);
    setValidationError("");
  }

  // ── Results view ─────────────────────────────────────────────────────────
  if (showResults) {
    return (
      <div className="space-y-6">
        {/* Preview card */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Your Project Brief
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {data.companyName} \u2022{" "}
                {new Date().toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PDF
            </button>
          </div>
          <div className="mt-6">
            <BriefPreview data={data} />
          </div>
        </div>

        {/* CTAs */}
        <div className="rounded-2xl border bg-green-50 p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Ready to Send This to Agencies?
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Submit your brief through our free matching service and receive 3
            curated agency recommendations within 24 hours.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/get-matched"
              className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
            >
              Get Matched Free \u2192
            </Link>
            <button
              onClick={handleDownloadPDF}
              className="rounded-lg border-2 border-green-600 px-6 py-3 text-sm font-semibold text-green-600 hover:bg-green-50"
            >
              Download PDF Again
            </button>
          </div>
        </div>

        <button
          onClick={reset}
          className="mx-auto block text-sm text-gray-400 hover:text-gray-600"
        >
          Start over with a new brief
        </button>
      </div>
    );
  }

  // ── Wizard view ──────────────────────────────────────────────────────────
  const currentStepInfo = STEPS[step - 1];

  const stepContent = [
    <StepBusiness key={1} data={data} onChange={update} />,
    <StepProjectType key={2} data={data} onChange={update} />,
    <StepGoals key={3} data={data} onChange={update} />,
    <StepDesign key={4} data={data} onChange={update} />,
    <StepTechnical key={5} data={data} onChange={update} />,
    <StepTimeline key={6} data={data} onChange={update} />,
    <StepContact key={7} data={data} onChange={update} />,
  ];

  return (
    <div>
      {/* Progress */}
      <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
        <span>Step {step} of 7</span>
        {step > 1 && (
          <button
            onClick={() => goToStep(step - 1)}
            className="text-green-600 hover:text-green-700"
          >
            &larr; Back
          </button>
        )}
      </div>
      <div
        className="mb-8 h-2 overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={7}
      >
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-500"
          style={{ width: `${(step / 7) * 100}%` }}
        />
      </div>

      {/* Step content */}
      <div className={`transition-opacity duration-150 ${fade ? "opacity-0" : "opacity-100"}`}>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            {currentStepInfo.title}
          </h2>
          <p className="mt-1 text-sm text-gray-500">{currentStepInfo.subtitle}</p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          {stepContent[step - 1]}
        </div>

        {/* Validation error */}
        {validationError && (
          <p className="mt-3 text-sm font-medium text-red-600">
            {validationError}
          </p>
        )}

        {/* Next button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            className="rounded-lg bg-green-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
          >
            {step === 7 ? "Generate Brief" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
