---
name: elementor-ops-and-data
description: Run safe Elementor content operations in live or staging environments. Use for backup-first meta changes, scoped WP-CLI edits, template cloning, cache refresh, and verification loops.
---

# Elementor Ops And Data

## Core (Universal)

### Trigger Scope

Use this skill when operating on persisted Elementor content:
- bulk text/URL edits
- `_elementor_data` and related meta operations
- template clone/apply workflows
- import/export integrity checks

### Workflow

1. Scope changes.
- identify target post IDs and exact keys/tables

2. Create rollback artifacts.
- backup relevant meta before writes

3. Run controlled mutation.
- dry-run first
- execute scoped updates

4. Refresh generated state.
- flush Elementor CSS/cache artifacts

5. Verify outcome.
- editor load
- frontend render
- metadata sanity

### Verification Loop

Run this sequence for every non-trivial mutation:

1. backup snapshot created
2. dry-run reports expected blast radius
3. write operation executed with scoped target
4. cache/CSS regenerated
5. editor and frontend parity verified

### Guardrails

- Never run broad replacements without explicit scope.
- Never mutate Elementor meta without backup.
- Do not treat `_elementor_data` as unstructured text.
- Keep rollback artifacts until acceptance.
- Keep data ops and structural widget refactors in separate passes.

### Minimal Example

**Bash / Linux / macOS:**

```bash
wp post meta get <id> _elementor_data > backup-<id>.json
wp search-replace "Old" "New" wp_postmeta --include-columns=meta_value --dry-run --precise
wp search-replace "Old" "New" wp_postmeta --include-columns=meta_value --precise
wp elementor flush-css
```

**PowerShell / Windows:**

```powershell
# Backup meta
$backupName = "backup-$(Get-Date -Format 'yyyyMMdd-HHmm')-$id.json"
wp post meta get $id _elementor_data | Out-File -FilePath $backupName -Encoding UTF8

# Dry-run (review what will change)
wp search-replace "Old" "New" wp_postmeta --include-columns=meta_value --dry-run --precise

# Execute (provide explicit yes flag)
wp search-replace "Old" "New" wp_postmeta --include-columns=meta_value --precise

# Refresh cache
wp elementor flush-css
```

**Scope verification (before mutations):**

```powershell
# Count matching rows
$matchCount = wp db query "SELECT COUNT(*) as cnt FROM wp_postmeta WHERE meta_key='_elementor_data' AND meta_value LIKE '%Old%'" --skip-column-names
Write-Host "Will affect ~$matchCount rows. Review backup first."
```
