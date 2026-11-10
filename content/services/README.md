# Services content

Every service page comes from the **Taal Citizen's Charter 2026 (1st Edition)**
([PDF](https://drive.google.com/file/d/1GntbqUid0Rmfjaz3FzeOJZjWIcfR2syg/view)).
Page numbers below are the Charter's printed page numbers.

- Categories, life events and home page picks: `src/data/services.yaml`
- One file per service: `content/services/<category>/<service>.yaml`
- Office names, heads and emails: `src/data/offices.ts`

## Adding a service

1. Create `content/services/<category>/<service-slug>.yaml`.
2. Add the slug to that category's `services:` list in `src/data/services.yaml`
   (the list order is the display order).

## Fields

```yaml
title: Short name for cards
fullTitle: Title as printed in the Charter (page heading)
summary: One line for cards
description: The Charter's intro paragraph, lightly edited
icon: Lucide icon name (https://lucide.dev/icons)
office: key from src/data/offices.ts (e.g. mcr, bplo, mto, assessor, meo, mho, mswdo)
source: { page: 40 }
classification: Simple | Complex | Highly Technical
transactionType: Government-to-Citizen (G2C)
whoMayAvail: text, or a list of lines
requirements:
  - group: 1 copy of the following
    items:
      - { item: Valid ID, where: Applicant } # "where" = Where to secure
steps:
  - client: What the resident does
    agency: [What the office does, one line each]
    fee: None # text, or a list of lines
    time: 10 minutes
    responsible: LCR Staff
totalFee: ₱130.00
totalTime: 53 minutes
notes: [Anything the Charter says in a footnote, or a correction we made]
```

**Sub-types.** When the Charter splits a service (on-time vs late
registration, born in a hospital vs at home), put the differing fields under
`variants:`, each with a `name`. They show as tabs on the page. Fields not set
in a variant come from the service itself.

**Guides** (`type: guide`) only need `steps`, each with `client`, `agency` and
an optional `link` to a service page.

**FAQs** are optional (`faqs: [{ question, answer }]`). The section is hidden
when there are none.

## Rules

- Keep wording, fees and times as printed in the Charter.
- Fix only obvious typos. If you correct anything else, say so in `notes`.
- Unknown values: write `To be confirmed`. The page shows it in grey.
- Do not add officials' mobile numbers or personal email addresses.
