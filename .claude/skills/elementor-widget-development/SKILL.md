---
name: elementor-widget-development
description: Engineer Elementor widgets for any WordPress project. Use for control modeling, frontend rendering, editor preview parity, selector logic, and widget-level dependency loading.
---

# Elementor Widget Development

## Core (Universal)

### Trigger Scope

Use this skill when the task is widget internals:
- building/refactoring widget classes
- mapping controls to visual output
- fixing `render()` and `content_template()` mismatch
- optimizing widget-specific JS/CSS dependencies

### Workflow

1. Define widget contract.
- required identity methods
- control model with explicit defaults

2. Implement control surface.
- section structure
- responsive and conditional behavior

3. Implement frontend rendering.
- deterministic output from sanitized settings
- explicit output escaping

4. Implement editor rendering.
- mirror frontend intent in `content_template()`
- keep branch parity where possible

5. Verify behavior.
- empty/default/custom states
- editor/frontend parity

### Control And Selector Patterns

- Prefer `{{WRAPPER}}`-scoped selectors for style controls.
- Use control placeholders by data shape:
- `{{VALUE}}` for scalar controls (text/color/select/switcher).
- `{{SIZE}}{{UNIT}}` for slider-like controls.
- `{{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}` for dimensions.
- `{{URL}}` for media/url bindings.
- For repeater rows, use the row `_id` and `{{CURRENT_ITEM}}`-style targeting patterns.

### Output Escaping & Sanitization

Apply context-appropriate escaping when rendering user-provided values:

| Context | Function | Example |
|---|---|---|
| HTML attribute | `esc_attr()` | `<div class="{{ $settings['css_class'] }}">` → `esc_attr( $settings['css_class'] )` |
| Raw HTML tags | `wp_kses_post()` | Rich text editor output |
| Plain text (HTML context) | `esc_html()` | `<p>{{ $settings['title'] }}</p>` → `esc_html( $settings['title'] )` |
| URL href | `esc_url()` | `<a href="{{ $settings['url'] }}">` → `esc_url( $settings['url'] )` |
| JavaScript string | `wp_json_encode()` | Inline JS with user data |
| CSS value | `sanitize_text_field()` for string, validate range/unit for numeric | `color()`, `font-size` |
| Dynamic CSS selector | Validate against whitelist | Use `_id` from Elementor repeater, avoid concatenation |

**Safe pattern in render():**

```php
protected function render(): void {
    $settings = $this->get_settings_for_display();
    ?>
    <div class="<?php echo esc_attr( $settings['css_class'] ); ?>">
        <h2><?php echo esc_html( $settings['title'] ); ?></h2>
        <a href="<?php echo esc_url( $settings['button_url'] ); ?>">
            <?php echo wp_kses_post( $settings['button_text'] ); ?>
        </a>
    </div>
    <?php
}
```

### Guardrails

- Do not rely on implicit defaults for critical output.
- Do not output raw setting values without escaping.
- Do not enqueue heavy assets globally when widget-level dependency is possible.
- Avoid unnecessary DOM wrappers.

### Extended Cases

- If widget includes rich form behavior (validation/actions/record processing), route to `$elementor-forms`.
- If control injection into third-party widgets is needed, use element hooks before/after section boundaries.

### Minimal Example

```php
class Card_Widget extends \Elementor\Widget_Base {
    public function get_name(): string { return 'card_widget'; }
    public function get_title(): string { return esc_html__( 'Card', 'vendor-kit' ); }
    public function get_categories(): array { return [ 'basic' ]; }
    public function get_script_depends(): array { return [ 'vendor-card' ]; }
    protected function register_controls(): void {}
    protected function render(): void {}
    protected function content_template(): void {}
}
```
