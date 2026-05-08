# AGENTS.md - Pathway Academy Zone

## Developer Guidelines
- **Terminology Enforcement**: NEVER use "AP" or "PAZ" in user-facing content. Always use "Alternative Provision" and "Pathway Academy Zone".
- **Hero Architecture**: All new pages must use the `Hero` pattern established in `src/pages/Referral.tsx`.
- **A11y Standards**: Maintain strict H1-H6 hierarchy. Ensure all decorative elements are `aria-hidden`.
- **Motion Patterns**: Use the shared `containerVariants` and `itemVariants` for all page entry animations.
- **SEO First**: Every page component must implement the `Seo` component with descriptive titles and JSON-LD data.
