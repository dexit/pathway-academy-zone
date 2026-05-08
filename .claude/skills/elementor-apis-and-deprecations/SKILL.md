---
name: elementor-apis-and-deprecations
description: Modernize Elementor integrations safely across versions. Use for deprecated hook/method replacement, phased API migrations, and behavior-stable upgrades in any project.
---

# Elementor APIs And Deprecations

## Core (Universal)

### Trigger Scope

Use this skill when migration is the primary goal:
- deprecated hooks/methods warnings
- post-upgrade breakage
- mixed legacy/current Elementor APIs
- phased modernization with minimal regressions

### Workflow

1. Inventory legacy surface.
- registration hooks
- manager calls
- legacy method patterns

2. Prioritize by impact.
- boot-breaking first
- editor-breaking second
- frontend-only third

3. Migrate in thin slices.
- one subsystem per patch
- preserve storage/output semantics

4. Validate after each slice.
- widget discoverability
- control persistence
- render parity

5. Record migration notes.
- replaced APIs
- verification outcome

### Legacy To Modern Map

| Legacy pattern | Modern pattern |
|---|---|
| old widget registration hooks | `elementor/widgets/register` |
| deprecated widget registration calls | manager `register()` |
| legacy underscored control registration methods | `register_controls()` |
| mixed old/new registration in same subsystem | one modern style per subsystem |

### Guardrails

- Do not mix old and new registration styles in the same flow.
- Do not bundle migration with unrelated refactors.
- Do not change visible behavior unless explicitly requested.
- Always keep compatibility gate before Elementor symbol usage.

### Migration Checks

- After each slice, check:
- widget appears in editor
- controls save and persist
- frontend output parity with previous stable state

### Minimal Example

```php
// modern
add_action( 'elementor/widgets/register', [ $this, 'register_widgets' ] );

public function register_widgets( $manager ): void {
    $manager->register( new \Vendor\Widget\Hero_Widget() );
}
```
