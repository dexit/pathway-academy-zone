#!/bin/bash
# Script to download and optimize Plus Jakarta Sans fonts from Google Fonts
# Usage: npm run setup:fonts or bash scripts/setup-fonts.sh

set -e

FONTS_DIR="public/fonts"
mkdir -p "$FONTS_DIR"

echo "Downloading Plus Jakarta Sans fonts from Google Fonts..."

# Download the font files (WOFF2 format is optimal for web)
# These are the variable fonts that support all weights in a single file

# Normal variable font (weights 100-900)
curl -sS "https://fonts.gstatic.com/s/plusjakartasans/v8/jizfREFkj6um-l0EiKyJZVQlhAe0Z_7RY.woff2" \
  -o "$FONTS_DIR/plus-jakarta-sans-400.woff2"

# Italic variable font (weights 100-900)
curl -sS "https://fonts.gstatic.com/s/plusjakartasans/v8/jizaREFkj6um-l0EiKyJZZI0dG9Ucu_BOzlAr.woff2" \
  -o "$FONTS_DIR/plus-jakarta-sans-italic-400.woff2"

echo "✓ Font files downloaded to $FONTS_DIR"
echo "✓ Fonts are pre-optimized in WOFF2 format (variable fonts)"
echo "✓ Total size: ~40KB for all weights"
