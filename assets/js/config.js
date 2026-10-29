/* Down.Town site configuration — edit here, nowhere else.
   payments: paste a PayPal donate link, Stripe Payment Link, Buy Me a Coffee or Ko-fi URL to turn
             on instant checkout on the Support page. Blank = pledge mode (form only).
   adSlots:  paste AdSense display-unit slot IDs to add manual units on top of Auto ads. Blank = Auto ads only.
   relayAlias: optional FormSubmit alias string (from the activation email) — replaces the encoded key below. */
window.SITE = {
  name: "Down.Town",
  domain: "down.town",
  ownerContactUrl: "https://web.works/contact",
  adsenseClient: "ca-pub-6620975821265271",
  adSlots: { incontent: "", sidebar: "", footer: "" },
  payments: { paypal: "", stripe: "", buymeacoffee: "", kofi: "" },
  relayAlias: "",
  /* Form relay key (encoded, split). Never paste a plain address anywhere on this site. */
  _k: ["MWFza3Jv", "d2Jldw==", "bW9jLmxp", "YW1n"]
};
