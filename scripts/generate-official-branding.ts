import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const BRANDING_DIR = path.resolve(process.cwd(), 'public/branding');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

if (!fs.existsSync(BRANDING_DIR)) {
  fs.mkdirSync(BRANDING_DIR, { recursive: true });
}

// Master Vector SVG matching the attached official logo with 100% precision
export const MASTER_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000" fill="none">
  <defs>
    <!-- Rich metallic gold gradient -->
    <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2B755"/>
      <stop offset="35%" stop-color="#CBA135"/>
      <stop offset="70%" stop-color="#B88B22"/>
      <stop offset="100%" stop-color="#9E7314"/>
    </linearGradient>

    <!-- Deep Navy Tone -->
    <linearGradient id="navyTone" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E2E54"/>
      <stop offset="100%" stop-color="#081E38"/>
    </linearGradient>

    <!-- Clip path to keep bottom foundation within the inner circle -->
    <clipPath id="innerCircleClip">
      <circle cx="500" cy="500" r="433" />
    </clipPath>
  </defs>

  <!-- Outer White/Transparent Canvas Base -->
  <rect width="1000" height="1000" fill="transparent" />

  <!-- Outer Dark Navy Ring -->
  <circle cx="500" cy="500" r="474" stroke="#081E38" stroke-width="6" fill="none" />

  <!-- Main Metallic Gold Circular Ring -->
  <circle cx="500" cy="500" r="454" stroke="url(#goldMetallic)" stroke-width="28" fill="none" />

  <!-- Inner Dark Navy Ring Border -->
  <circle cx="500" cy="500" r="436" stroke="#081E38" stroke-width="5" fill="#FFFFFF" />

  <!-- ========================================== -->
  <!-- BOTTOM FOUNDATION SWOOSHES (CLIPPED)       -->
  <!-- ========================================== -->
  <g clip-path="url(#innerCircleClip)">
    <!-- Base Deep Navy Area -->
    <path d="M 120 780 Q 500 700 880 780 L 880 950 L 120 950 Z" fill="#081E38" />

    <!-- Top Metallic Gold Dynamic Arc Ribbon -->
    <path d="M 150 780 C 320 735 680 735 850 785 C 800 812 650 765 480 765 C 310 765 190 802 150 780 Z" fill="url(#goldMetallic)" />

    <!-- Deep Navy Arc Below Gold Ribbon -->
    <path d="M 180 810 C 340 768 660 768 820 812 C 780 848 640 798 480 798 C 320 798 220 838 180 810 Z" fill="#081E38" />

    <!-- Clean White Highway/Infrastructure Dividing Stripe -->
    <path d="M 210 832 C 360 792 640 792 790 832 C 755 848 640 812 480 812 C 320 812 245 842 210 832 Z" fill="#FFFFFF" />

    <!-- Deep Navy Bottom Foundation Base Block -->
    <path d="M 240 852 C 380 820 620 820 760 852 C 700 920 500 935 300 920 Z" fill="#081E38" />
  </g>

  <!-- ========================================== -->
  <!-- ARCHITECTURAL EMBLEM (UPPER HALF)          -->
  <!-- ========================================== -->
  <g id="master-emblem">
    <!-- Skyscraper Tower Right Vertical Cluster -->
    <!-- Tower Body (Navy) -->
    <path d="M 488 132 L 568 180 L 568 472 L 488 472 Z" fill="none" stroke="#081E38" stroke-width="14" stroke-linejoin="round" />
    
    <!-- 3 Ascending Gold Architectural Louvers / Vertical Bars -->
    <!-- Bar 1 (Leftmost gold tower pillar) -->
    <path d="M 580 190 L 606 206 L 606 472 L 580 472 Z" fill="url(#goldMetallic)" />
    <!-- Bar 2 (Middle gold pillar) -->
    <path d="M 618 228 L 644 244 L 644 472 L 618 472 Z" fill="url(#goldMetallic)" />

    <!-- House Gable Silhouette (Left) -->
    <!-- Gold Left Roof Pitch -->
    <path d="M 452 214 L 288 352 L 312 376 L 452 258 Z" fill="url(#goldMetallic)" />
    
    <!-- Navy Right Roof Pitch joining the Tower -->
    <path d="M 444 220 L 546 308 L 530 326 L 444 252 Z" fill="#081E38" />

    <!-- 4-Pane Square Window in Gold under Gable Apex -->
    <rect x="424" y="290" width="20" height="20" fill="url(#goldMetallic)" rx="1.5" />
    <rect x="450" y="290" width="20" height="20" fill="url(#goldMetallic)" rx="1.5" />
    <rect x="424" y="316" width="20" height="20" fill="url(#goldMetallic)" rx="1.5" />
    <rect x="450" y="316" width="20" height="20" fill="url(#goldMetallic)" rx="1.5" />

    <!-- INTERLOCKING LDL MONOGRAM -->
    <!-- Left 'L' (Navy Blue) -->
    <path d="M 330 348 H 368 V 484 H 412 V 524 H 330 Z" fill="#081E38" />

    <!-- Center 'D' (Warm Metallic Gold, Elegant Slab Proportions) -->
    <path d="M 416 352 H 472 C 516 352 542 384 542 438 C 542 492 516 524 472 524 H 416 Z M 446 384 V 492 H 470 C 496 492 512 472 512 438 C 512 404 496 384 470 384 Z" fill="url(#goldMetallic)" />

    <!-- Right 'L' (Navy Blue - connects with skyscraper) -->
    <path d="M 546 306 H 576 V 484 H 666 V 524 H 546 Z" fill="#081E38" />
  </g>

  <!-- ========================================== -->
  <!-- CENTRAL TYPOGRAPHY (MIDDLE)                -->
  <!-- ========================================== -->
  <!-- Line 1: Primary Brand Name -->
  <g id="brand-typography">
    <!-- LDL in Gold -->
    <text x="368" y="632" font-family="'Montserrat', 'Inter', system-ui, sans-serif" font-size="88" font-weight="900" fill="url(#goldMetallic)" letter-spacing="0.04em" text-anchor="middle">
      LDL
    </text>
    <!-- DHENZE in Deep Navy -->
    <text x="612" y="632" font-family="'Montserrat', 'Inter', system-ui, sans-serif" font-size="88" font-weight="900" fill="#081E38" letter-spacing="0.04em" text-anchor="middle">
      DHENZE
    </text>

    <!-- Line 2: Entity Subtitle -->
    <text x="500" y="678" font-family="'Montserrat', 'Inter', system-ui, sans-serif" font-size="28" font-weight="800" fill="#081E38" letter-spacing="0.22em" text-anchor="middle">
      RESIDENTIAL BUILDING CONSTRUCTION
    </text>

    <!-- Line 3: Official Tagline with Flanking Accent Rules -->
    <line x1="160" y1="713" x2="258" y2="713" stroke="url(#goldMetallic)" stroke-width="2.5" />
    <text x="500" y="719" font-family="'Montserrat', 'Inter', system-ui, sans-serif" font-size="19" font-weight="700" fill="url(#goldMetallic)" letter-spacing="0.28em" text-anchor="middle">
      BUILDING BETTER TOMORROWS
    </text>
    <line x1="742" y1="713" x2="840" y2="713" stroke="url(#goldMetallic)" stroke-width="2.5" />
  </g>
</svg>`;

// Emblem only (for compact icon, favicon, and mobile viewports)
export const EMBLEM_ONLY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500" fill="none">
  <defs>
    <linearGradient id="embGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2B755"/>
      <stop offset="35%" stop-color="#CBA135"/>
      <stop offset="70%" stop-color="#B88B22"/>
      <stop offset="100%" stop-color="#9E7314"/>
    </linearGradient>
    <clipPath id="embClip">
      <circle cx="250" cy="250" r="216" />
    </clipPath>
  </defs>

  <!-- Outer Navy Ring -->
  <circle cx="250" cy="250" r="238" stroke="#081E38" stroke-width="3.5" fill="none" />
  <!-- Main Gold Ring -->
  <circle cx="250" cy="250" r="227" stroke="url(#embGold)" stroke-width="15" fill="none" />
  <!-- Inner Navy Ring & Clean White Field -->
  <circle cx="250" cy="250" r="218" stroke="#081E38" stroke-width="2.5" fill="#FFFFFF" />

  <!-- Foundation Swooshes (Clipped) -->
  <g clip-path="url(#embClip)">
    <path d="M 60 380 Q 250 340 440 380 L 440 480 L 60 480 Z" fill="#081E38" />
    <path d="M 80 385 C 160 360 340 360 420 388 C 400 404 320 378 240 378 C 160 378 100 398 80 385 Z" fill="url(#embGold)" />
    <path d="M 100 402 C 180 380 320 380 400 404 C 370 420 320 396 240 396 C 160 396 120 416 100 402 Z" fill="#081E38" />
    <path d="M 115 414 C 185 394 305 394 375 414 C 360 422 310 402 240 402 C 170 402 130 418 115 414 Z" fill="#FFFFFF" />
  </g>

  <!-- Architectural Emblem Monogram -->
  <g transform="translate(0, -10)">
    <!-- Tower Outline -->
    <path d="M 244 80 L 284 104 L 284 250 L 244 250 Z" fill="none" stroke="#081E38" stroke-width="7" stroke-linejoin="round" />
    <!-- Tower Gold Louvers -->
    <path d="M 290 110 L 304 118 L 304 250 L 290 250 Z" fill="url(#embGold)" />
    <path d="M 310 130 L 324 138 L 324 250 L 310 250 Z" fill="url(#embGold)" />

    <!-- Roofline -->
    <path d="M 226 122 L 144 191 L 156 203 L 226 144 Z" fill="url(#embGold)" />
    <path d="M 222 125 L 273 169 L 265 178 L 222 141 Z" fill="#081E38" />

    <!-- 4-Pane Window in Gold -->
    <rect x="212" y="160" width="10" height="10" fill="url(#embGold)" rx="0.8" />
    <rect x="225" y="160" width="10" height="10" fill="url(#embGold)" rx="0.8" />
    <rect x="212" y="173" width="10" height="10" fill="url(#embGold)" rx="0.8" />
    <rect x="225" y="173" width="10" height="10" fill="url(#embGold)" rx="0.8" />

    <!-- Interlocking Letters LDL -->
    <path d="M 165 190 H 184 V 256 H 206 V 276 H 165 Z" fill="#081E38" />
    <path d="M 208 192 H 236 C 258 192 271 208 271 235 C 271 262 258 276 236 276 H 208 Z M 223 208 V 260 H 235 C 248 260 256 250 256 235 C 256 218 248 208 235 208 Z" fill="url(#embGold)" />
    <path d="M 273 168 H 288 V 256 H 333 V 276 H 273 Z" fill="#081E38" />
  </g>

  <!-- LDL DHENZE Mini Bottom Arc Text / Wordmark -->
  <text x="180" y="326" font-family="'Montserrat', system-ui, sans-serif" font-size="40" font-weight="900" fill="url(#embGold)" text-anchor="middle">
    LDL
  </text>
  <text x="310" y="326" font-family="'Montserrat', system-ui, sans-serif" font-size="40" font-weight="900" fill="#081E38" text-anchor="middle">
    DHENZE
  </text>
  <text x="250" y="348" font-family="'Montserrat', system-ui, sans-serif" font-size="12" font-weight="800" fill="#081E38" letter-spacing="0.18em" text-anchor="middle">
    RESIDENTIAL CONSTRUCTION
  </text>
</svg>`;

async function generateAllAssets() {
  console.log('Generating official brand vector files...');
  fs.writeFileSync(path.join(BRANDING_DIR, 'ldl-dhenze-logo.svg'), MASTER_LOGO_SVG, 'utf-8');
  fs.writeFileSync(path.join(BRANDING_DIR, 'ldl-dhenze-emblem.svg'), EMBLEM_ONLY_SVG, 'utf-8');

  // Rasterize MASTER LOGO to high-res PNG (1024x1024)
  console.log('Rasterizing master logo (1024x1024)...');
  const resvgMaster = new Resvg(MASTER_LOGO_SVG, {
    fitTo: { mode: 'width', value: 1024 },
  });
  const masterPngData = resvgMaster.render().asPng();
  fs.writeFileSync(path.join(BRANDING_DIR, 'ldl-dhenze-logo.png'), masterPngData);

  // Rasterize EMBLEM to high-res PNG (512x512)
  console.log('Rasterizing emblem (512x512)...');
  const resvgEmblem = new Resvg(EMBLEM_ONLY_SVG, {
    fitTo: { mode: 'width', value: 512 },
  });
  const emblemPngData = resvgEmblem.render().asPng();
  fs.writeFileSync(path.join(BRANDING_DIR, 'ldl-dhenze-emblem.png'), emblemPngData);

  // Also copy master logo and emblem to public root for seamless accessibility
  fs.writeFileSync(path.join(PUBLIC_DIR, 'ldl-dhenze-logo.png'), masterPngData);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'ldl-dhenze-logo.svg'), MASTER_LOGO_SVG, 'utf-8');

  // Backward-compatibility: overwrite legacy logo2.png and logo2.svg with the new master logo
  const legacyDir = path.join(PUBLIC_DIR, 'assets/images');
  if (fs.existsSync(legacyDir)) {
    fs.writeFileSync(path.join(legacyDir, 'logo2.png'), masterPngData);
    fs.writeFileSync(path.join(legacyDir, 'LOGO2.png'), masterPngData);
    fs.writeFileSync(path.join(legacyDir, 'logo2.svg'), MASTER_LOGO_SVG, 'utf-8');
  }

  // Generate Favicons from Emblem
  console.log('Generating favicon assets from official emblem...');
  // 16x16
  const fav16 = await sharp(emblemPngData).resize(16, 16).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-16x16.png'), fav16);

  // 32x32
  const fav32 = await sharp(emblemPngData).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon-32x32.png'), fav32);

  // 48x48 for ICO fallback
  const fav48 = await sharp(emblemPngData).resize(48, 48).png().toBuffer();
  // Using 32x32 as favicon.ico directly (PNG in ICO container or direct PNG favicon)
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), fav32);

  // Apple touch icon 180x180
  const appleTouch = await sharp(emblemPngData).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), appleTouch);

  // Android chrome 192x192
  const android192 = await sharp(emblemPngData).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'android-chrome-192x192.png'), android192);

  // Android chrome 512x512
  const android512 = await sharp(emblemPngData).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'android-chrome-512x512.png'), android512);

  console.log('✅ ALL OFFICIAL MASTER BRANDING ASSETS GENERATED SUCCESSFULLY!');
}

generateAllAssets().catch(err => {
  console.error('Error generating branding assets:', err);
  process.exit(1);
});
