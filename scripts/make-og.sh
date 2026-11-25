#!/usr/bin/env bash
# Renders the Open Graph images (public/og/en.png, public/og/es.png, 1200 × 630) with headless
# Chrome from the brand assets in this repository. Run it after changing the headline or the
# hero screenshot, then commit the PNGs. Needs Google Chrome and `npm ci` (for the Nunito files).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
FONTS="$ROOT/node_modules/@fontsource/nunito/files"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

render() {
  local lang="$1" heading="$2" sub="$3"
  cat > "$TMP/$lang.html" <<EOF
<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:N;font-weight:900;src:url(file://$FONTS/nunito-latin-900-normal.woff2)}
@font-face{font-family:N;font-weight:800;src:url(file://$FONTS/nunito-latin-800-normal.woff2)}
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{background:radial-gradient(circle at 25% 15%,#9B6BF0,#7B3FE4 55%,#5B26B8);font-family:N;color:#fff;position:relative}
.staff{position:absolute;left:0;right:0;top:150px;height:120px;background:repeating-linear-gradient(#fff2 0 2px,transparent 2px 30px)}
.lock{position:absolute;left:72px;top:64px;height:86px}
h1{position:absolute;left:72px;top:200px;width:640px;margin:0;font-weight:900;font-size:66px;line-height:1.08}
b{color:#F2B441}
p{position:absolute;left:72px;top:500px;margin:0;font-weight:800;font-size:30px;opacity:.92}
.shot{position:absolute;right:56px;top:28px;width:380px;border-radius:28px}
</style></head><body><div class="staff"></div>
<img class="lock" src="file://$ROOT/src/assets/brand/lockup-white.svg">
<h1>$heading</h1><p>$sub</p>
<img class="shot" src="file://$ROOT/src/assets/screens/$lang/01-tuner.jpg">
</body></html>
EOF
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=3000 \
    --user-data-dir="$TMP/profile" --screenshot="$ROOT/public/og/$lang.png" "file://$TMP/$lang.html" 2>/dev/null
}

mkdir -p "$ROOT/public/og"
render en 'Learn sax or clarinet with an app that <b>listens.</b>' 'Feedback on every note you play.'
render es 'Aprende saxo o clarinete con una app que te <b>escucha.</b>' 'Una corrección para cada nota que tocas.'
echo "Wrote $ROOT/public/og/en.png and es.png"
