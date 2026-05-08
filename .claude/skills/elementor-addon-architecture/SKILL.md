---
name: elementor-addon-architecture
description: Design universal Elementor addon foundations for any WordPress codebase. Use for bootstrap design, lifecycle boundaries, compatibility gates, manager wiring, and asset loading policy.
---

# Elementor Addon Architecture

## Core (Universal)

### Trigger Scope

Use this skill when the task is about extension-level structure:
- addon/plugin bootstrap
- initialization order and dependency checks
- manager registration wiring (widgets, controls, tags, finder, categories)
- global asset registration policy

### Workflow

1. Define runtime contract.
- target WordPress/PHP/Elementor ranges
- required dependencies and failure behavior

2. Build startup boundaries.
- WordPress-safe load phase
- Elementor wiring phase after compatibility gate

3. Organize registration surfaces.
- one method per manager type
- explicit include/registration map

4. Define asset strategy.
- register handles centrally
- consume dependencies at widget/control level

5. Validate boot behavior.
- deterministic startup
- no partial boot on incompatibility

### Registration Map

| Component | Hook | Manager method |
|---|---|---|
| Widgets | `elementor/widgets/register` | `register()` / `unregister()` |
| Controls | `elementor/controls/register` | `register()` / `unregister()` |
| Dynamic Tags | `elementor/dynamic_tags/register` | `register()` / `unregister()` |
| Finder | `elementor/finder/register` | `register()` / `unregister()` |
| Categories | `elementor/elements/categories_registered` | `add_category()` |

### Guardrails

- Do not call Elementor classes before compatibility checks pass.
- Do not mix bootstrap logic with feature logic in one file.
- Do not use deprecated registration APIs.
- Fail early with clear admin feedback on incompatibility.

### Interop Handoff

- If request is mainly about widget logic, route to `$elementor-widget-development`.
- If request is mainly API modernization, route to `$elementor-apis-and-deprecations`.
- If request is theme-location rendering/fallback, route to `$elementor-themes`.
- If request is persisted content mutation, route to `$elementor-ops-and-data`.

### Minimal Example

```php
defined( 'ABSPATH' ) || exit;

add_action( 'plugins_loaded', static function () {
    \Vendor\Addon\Plugin::boot();
} );

private function can_run(): bool {
    return did_action( 'elementor/loaded' )
        && version_compare( ELEMENTOR_VERSION, self::MIN_ELEMENTOR, '>=' )
        && version_compare( PHP_VERSION, self::MIN_PHP, '>=' );
}
```
