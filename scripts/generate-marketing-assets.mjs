import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const outputDir = path.join(root, "public", "marketing");

await mkdir(outputDir, { recursive: true });

const width = 1800;
const height = 1040;
const heroSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#121820"/>
      <stop offset="0.52" stop-color="#243038"/>
      <stop offset="1" stop-color="#5C645F"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2D3434"/>
      <stop offset="1" stop-color="#111519"/>
    </linearGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#C9D0CE"/>
      <stop offset="0.5" stop-color="#F2F4F1"/>
      <stop offset="1" stop-color="#7B8588"/>
    </linearGradient>
    <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="12"/>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.16"/>
      </feComponentTransfer>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#wall)"/>
  <rect width="${width}" height="${height}" fill="#000000" opacity="0.08" filter="url(#grain)"/>

  <g opacity="0.34">
    <rect x="0" y="0" width="${width}" height="72" fill="#0D1116"/>
    <rect x="140" y="116" width="1520" height="18" rx="9" fill="#E8E1D2" opacity="0.5"/>
    <rect x="140" y="178" width="1520" height="12" rx="6" fill="#E8E1D2" opacity="0.3"/>
    <rect x="1020" y="110" width="18" height="620" fill="#D8DFDC" opacity="0.26"/>
    <rect x="1186" y="92" width="16" height="680" fill="#D8DFDC" opacity="0.18"/>
    <rect x="1346" y="116" width="14" height="620" fill="#D8DFDC" opacity="0.16"/>
  </g>

  <g transform="translate(820 260)">
    <rect x="0" y="0" width="720" height="380" rx="8" fill="#DCE3E0" opacity="0.94"/>
    <rect x="30" y="42" width="232" height="88" rx="8" fill="url(#metal)"/>
    <rect x="30" y="154" width="232" height="88" rx="8" fill="url(#metal)"/>
    <rect x="30" y="266" width="232" height="64" rx="8" fill="#B8C1BE"/>
    <rect x="310" y="48" width="330" height="32" rx="16" fill="#3C474E" opacity="0.64"/>
    <rect x="310" y="104" width="272" height="18" rx="9" fill="#667378" opacity="0.48"/>
    <rect x="310" y="154" width="314" height="18" rx="9" fill="#667378" opacity="0.42"/>
    <rect x="310" y="202" width="244" height="18" rx="9" fill="#667378" opacity="0.38"/>
    <rect x="620" y="272" width="68" height="68" rx="8" fill="#F05F5E" opacity="0.82"/>
    <rect x="642" y="294" width="24" height="24" rx="5" fill="#FFFFFF" opacity="0.8"/>
  </g>

  <g transform="translate(1090 644)">
    <rect x="0" y="0" width="464" height="190" rx="8" fill="#10151B" opacity="0.88"/>
    <rect x="28" y="30" width="92" height="14" rx="7" fill="#F05F5E"/>
    <rect x="28" y="64" width="318" height="12" rx="6" fill="#EEF2F1" opacity="0.72"/>
    <rect x="28" y="94" width="250" height="12" rx="6" fill="#EEF2F1" opacity="0.44"/>
    <rect x="28" y="134" width="86" height="26" rx="8" fill="#5D7E69"/>
    <rect x="132" y="134" width="92" height="26" rx="8" fill="#CDB58D"/>
    <rect x="242" y="134" width="92" height="26" rx="8" fill="#4F5B67"/>
  </g>

  <g transform="translate(0 706)">
    <path d="M0 138 C250 48 510 30 790 106 C1120 196 1438 168 1800 74 L1800 1040 L0 1040 Z" fill="url(#floor)" opacity="0.9"/>
    <path d="M-80 278 C260 200 620 188 920 272 C1248 364 1514 342 1880 230" fill="none" stroke="#EEF2F1" stroke-width="2" opacity="0.1"/>
  </g>

  <g opacity="0.34" filter="url(#soft)">
    <path d="M980 120 L1800 18 L1800 160 L1002 262 Z" fill="#FFFFFF" opacity="0.18"/>
    <path d="M1080 306 L1800 230 L1800 326 L1090 414 Z" fill="#F05F5E" opacity="0.16"/>
    <path d="M1150 720 L1800 644 L1800 748 L1148 820 Z" fill="#CDB58D" opacity="0.12"/>
  </g>

  <rect width="${width}" height="${height}" fill="#061016" opacity="0.24"/>
  <rect width="980" height="${height}" fill="#061016" opacity="0.52"/>
</svg>`;

await sharp(Buffer.from(heroSvg))
  .png({ quality: 92 })
  .toFile(path.join(outputDir, "tccg-operations-hero.png"));

console.log("Generated TCCG marketing hero asset");
