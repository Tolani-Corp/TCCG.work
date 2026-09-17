export const TCCG_CONTACT = {
  legalName: "TC Construction Group",
  brandName: "TCCG",
  domain: "https://tccg.work",
  email: "info@tccg.work",
  phone: {
    display: "(754) 350-9675",
    e164: "+17543509675",
    telHref: "tel:+17543509675",
  },
  serviceArea:
    "South Florida project intake with commercial, institutional, and public-sector opportunities reviewed by scope and jurisdiction.",
} as const;

export type TccgContact = typeof TCCG_CONTACT;
