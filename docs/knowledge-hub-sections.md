# Knowledge Hub Sections

**Source file:** `src/components/knowledge-hub/hub-data.ts`

This file defines all sections and their resources displayed on the `/knowledge-hub` page. Each section is rendered as a `HubSectionCard`. The same data is used to build JSON-LD ItemList schema.

---

## Section 1: Core Guides

- **ID:** `core-guides`
- **Title:** Core Guides
- **Description:** Essential guides explaining Alternative Provision fundamentals, processes, and pathways for educators, parents, and referring professionals.
- **Icon:** BookOpen

**Resources:**

| Title | URL |
|-------|-----|
| What is Alternative Provision | /knowledge-hub/guides/what-is-alternative-provision |
| How AP Works in Staffordshire | /knowledge-hub/guides/how-ap-works-staffordshire |
| High-Quality AP Provider | /knowledge-hub/guides/high-quality-ap-provider |
| When to Refer a Learner | /knowledge-hub/guides/when-to-refer |
| Academic vs Vocational | /knowledge-hub/guides/academic-vs-vocational |

---

## Section 2: Comparisons

- **ID:** `comparisons`
- **Title:** Comparisons
- **Description:** Side-by-side comparisons to help decision-makers understand the differences between various AP models and approaches.
- **Icon:** GitCompare

**Resources:**

| Title | URL |
|-------|-----|
| AP vs Mainstream Schooling | /knowledge-hub/comparisons/ap-vs-mainstream |
| Group vs One-to-One | /knowledge-hub/comparisons/group-vs-one-to-one |
| Short-Term vs Long-Term | /knowledge-hub/comparisons/short-vs-long-term |
| Onsite vs Offsite | /knowledge-hub/comparisons/onsite-vs-offsite |

---

## Section 3: Best Practice

- **ID:** `best-practice`
- **Title:** Best Practice
- **Description:** Evidence-based strategies and proven approaches for achieving the best outcomes in Alternative Provision settings.
- **Icon:** Star

**Resources:**

| Title | URL |
|-------|-----|
| SEMH Pathways | /knowledge-hub/best-practice/semh-pathways |
| Attendance Strategies | /knowledge-hub/best-practice/attendance-strategies |
| Vocational Routes | /knowledge-hub/best-practice/vocational-routes |
| Post-16 Progression | /knowledge-hub/best-practice/post-16-progression |

---

## Section 4: Glossary

- **ID:** `glossary`
- **Title:** Glossary
- **Description:** Clear definitions of key Alternative Provision terms and concepts for quick reference and understanding.
- **Icon:** BookMarked

**Resources (sample/quick-links into the full glossary page):**

| Title | URL |
|-------|-----|
| Alternative Provision | /knowledge-hub/glossary#alternative-provision |
| SEMH | /knowledge-hub/glossary#semh |
| EHCP | /knowledge-hub/glossary#ehcp |
| Managed Move | /knowledge-hub/glossary#managed-move |

---

## Notes for Editors

- To add a new section, add an entry to the `HUB_SECTIONS` array in `src/components/knowledge-hub/hub-data.ts`.
- Each section must have: `id`, `title`, `description`, `icon` (Lucide icon), `color` (Tailwind class), and `resources` (array of `{ title, href }`).
- All resources in all sections are automatically included in the JSON-LD `ItemList` schema on `/knowledge-hub`.
- The `id` value is used as the sidebar TOC anchor on the Knowledge Hub page.
