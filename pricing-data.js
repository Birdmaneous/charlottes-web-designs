/* ============================================================
   PRICING DATA: edit numbers and text HERE. The pricing page builds itself from this.
   status: "confirmed" = Brian approved it. "proposed" = DRAFT wording, needs Brian's approval/edit.
   scopeStatus: same, but for the scope line under an item.
   Tip: open pricing.html?review in a browser to see PROPOSED tags next to draft items.
   Visitors never see the tags (only when ?review is in the URL).
   Updated Oct 26, 2026: Brian approved the prices below. Only the two Google-profile scope lines are still proposed.
   ============================================================ */
window.PRICING = {
  plans: [
    { name: "Starter one-page site", price: "from $400", unit: "one-time", status: "confirmed",
      blurb: "Everything a local business needs on one clean, phone-first page.",
      features: ["Phone-first layout with tap-to-call button", "Your services and the area you cover", "Email request-an-estimate button, included free", "Google profile friendly", "A sample to review before you go live"] },
    { name: "Multi-page site (up to 5 pages)", price: "from $800", unit: "one-time", status: "confirmed",
      blurb: "For businesses that want a page for each main service.",
      features: ["Everything in the one-page site", "Up to 5 pages, such as one per service", "Photo gallery page", "Email request-an-estimate button, included free", "Basic local search setup"] }
  ],
  addons: [
    { name: "Extra page", price: "$100 each", status: "confirmed", desc: "Add a page for another service or area." },
    { name: "Logo / simple brand refresh", price: "from $150", status: "confirmed", desc: "A clean logo and colors for your site." },
    { name: "Photo gallery setup", price: "$75", status: "confirmed", desc: "A standard photo gallery, with your job photos sized to load fast. Not charged if your package already includes a gallery page." },
    { name: "Scheduler / online booking embed", price: "$50", status: "confirmed", desc: "Embeds a booking or scheduling tool on your site. The email request-an-estimate button is already included free." }
  ],
  monthly: [
    { name: "Google profile upkeep: Basic", price: "$75 / month", status: "confirmed", desc: "Optional.",
      scope: "Keeps your hours, photos and business info up to date, and prepares one set of ready-to-use posts each month.", scopeStatus: "proposed" },
    { name: "Google profile upkeep: Plus", price: "$150 / month", status: "confirmed", desc: "Optional.",
      scope: "Everything in Basic, plus weekly posts and drafted replies to your reviews.", scopeStatus: "proposed" },
    { name: "Site care (hosting, small edits)", price: "$40 / month", status: "confirmed", desc: "Optional. Keeps your site online and includes up to 30 minutes of small text and photo edits per month." }
  ],
  footnote: "Prices are starting points. The final price depends on your project and is agreed with you before any work begins."
};
