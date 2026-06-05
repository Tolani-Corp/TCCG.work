import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const publicDir = path.join(root, "public");
const registryBrandDir = path.join(
  root,
  "..",
  "tolanicorp-hq",
  "brand-registry",
  "TCCG Branding",
  "TCCG Branding_Final",
);
const localBrandDir = path.join(publicDir, "TCCG Branding_Final");
const brandDir = await resolveBrandDir();
const officialFaviconPng = path.join(
  homedir(),
  "OneDrive",
  "Desktop",
  "Tolani Corp",
  "Tolani Corp Marketing",
  "TCCG Branding",
  "TC CONSTRUCTION GROUP (icon_trans) (no slogan 2).png",
);
const canonicalIllustratorSource = path.join(
  registryBrandDir,
  "TC CONSTRUCTION GROUP (icon_trans) (slogan_outlined).ai",
);
const brandFile = path.join(root, "src", "lib", "brandAssets.ts");
const iconSource = path.join(
  brandDir,
  "TC CONSTRUCTION GROUP (icon_trans) (no slogan 2).svg",
);
const brandVersion = await readBrandVersion();
const colors = {
  dark: "#10151B",
  red: "#F05F5E",
  page: "#F4F6F5",
  steel: "#4F5B67",
};
const faviconSource = await resolveOfficialFavicon();
const faviconInput = await createFaviconInput();
const croppedIconSvg = await createCroppedIconSvg();
const croppedLogoSvg = await createCroppedLogoSvg();

await mkdir(publicDir, { recursive: true });
await renderIconPng(path.join(publicDir, "icon.png"), { size: 512 });
await writeFile(path.join(publicDir, "icon.svg"), croppedIconSvg);
await writeFile(path.join(publicDir, "favicon.svg"), croppedIconSvg);
await writeFile(path.join(publicDir, "brand-mark.svg"), croppedIconSvg);
await writeFile(path.join(publicDir, "logo.svg"), croppedLogoSvg);

await writeFile(
  path.join(publicDir, "safari-pinned-tab.svg"),
  await createSafariMaskSvg(),
);
await writeFile(path.join(publicDir, "browserconfig.xml"), browserConfig());
await writeFile(path.join(publicDir, "site.webmanifest"), siteManifest());

const sizes = [16, 32, 48, 96, 192, 512];
for (const size of sizes) {
  await renderIconPng(path.join(publicDir, `favicon-${size}x${size}.png`), {
    size,
  });
}

await renderIconPng(path.join(publicDir, "apple-touch-icon.png"), {
  size: 180,
});
await renderIconPng(path.join(publicDir, "android-chrome-192x192.png"), {
  size: 192,
});
await renderIconPng(path.join(publicDir, "android-chrome-512x512.png"), {
  size: 512,
});
await renderIconPng(path.join(publicDir, "mstile-150x150.png"), {
  size: 150,
  maskable: true,
});
await renderIconPng(path.join(publicDir, "maskable-icon-192x192.png"), {
  size: 192,
  maskable: true,
});
await renderIconPng(path.join(publicDir, "maskable-icon-512x512.png"), {
  size: 512,
  maskable: true,
});
await renderOgImage(path.join(publicDir, "og-image.png"));

const icoBuffers = await Promise.all(
  [16, 32, 48, 96].map(async (size) => ({
    size,
    buffer: await readFile(path.join(publicDir, `favicon-${size}x${size}.png`)),
  })),
);
await writeFile(path.join(publicDir, "favicon.ico"), createIco(icoBuffers));

console.log(
  `Generated TCCG browser brand assets from official no-slogan branding with version ${brandVersion}`,
);
console.log(`Brand SVG source: ${brandDir}`);
console.log(`Official favicon PNG source: ${faviconSource}`);
console.log(`Illustrator reference: ${canonicalIllustratorSource}`);

async function readBrandVersion() {
  try {
    const source = await readFile(brandFile, "utf8");
    const match = source.match(/brandAssetVersion\s*=\s*"([^"]+)"/);
    return match?.[1] ?? "20260603";
  } catch {
    return "20260603";
  }
}

async function resolveBrandDir() {
  try {
    await readFile(
      path.join(
        registryBrandDir,
        "TC CONSTRUCTION GROUP (icon_trans) (no slogan 2).svg",
      ),
    );
    await readFile(path.join(registryBrandDir, "TC CONSTRUCTION GROUP (trans).svg"));
    return registryBrandDir;
  } catch {
    return localBrandDir;
  }
}

async function resolveOfficialFavicon() {
  try {
    await readFile(officialFaviconPng);
    return officialFaviconPng;
  } catch {
    return iconSource;
  }
}

async function renderIconPng(outputPath, { size, maskable = false }) {
  if (!maskable) {
    await sharp(faviconInput, { density: 384 })
      .resize(size, size, {
        fit: "contain",
        background: "#ffffff",
      })
      .png()
      .toFile(outputPath);
    return;
  }

  const innerSize = Math.round(size * 0.74);
  const iconBuffer = await sharp(faviconInput, { density: 384 })
    .resize(innerSize, innerSize, {
      fit: "contain",
      background: "#ffffff",
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: "#ffffff",
    },
  })
    .composite([
      {
        input: iconBuffer,
        left: Math.round((size - innerSize) / 2),
        top: Math.round((size - innerSize) / 2),
      },
    ])
    .png()
    .toFile(outputPath);
}

async function renderOgImage(outputPath) {
  const logoBuffer = await sharp(faviconInput, { density: 384 })
    .resize({
      width: 300,
      height: 300,
      fit: "contain",
      background: "#ffffff",
    })
    .png()
    .toBuffer();

  const panel = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <rect width="1200" height="630" fill="${colors.page}"/>
      <rect x="72" y="78" width="1060" height="452" rx="28" fill="#ffffff" stroke="#D8DFDC" stroke-width="2"/>
      <text x="144" y="454" fill="#696969" font-family="Arial, sans-serif" font-size="24" font-weight="700">TC CONSTRUCTION GROUP</text>
      <text x="568" y="184" fill="${colors.dark}" font-family="Arial, sans-serif" font-size="52" font-weight="700">TCCG Work</text>
      <text x="572" y="244" fill="${colors.steel}" font-family="Arial, sans-serif" font-size="25">Work board + capture management</text>
      <text x="572" y="300" fill="${colors.red}" font-family="Arial, sans-serif" font-size="23" font-weight="700">Smart HVAC | BIM | ESG | Funding capture</text>
      <rect x="572" y="362" width="140" height="42" rx="10" fill="#EEF2F1"/>
      <rect x="730" y="362" width="142" height="42" rx="10" fill="#EEF2F1"/>
      <text x="596" y="390" fill="${colors.dark}" font-family="Arial, sans-serif" font-size="18" font-weight="700">Open jobs</text>
      <text x="766" y="390" fill="${colors.dark}" font-family="Arial, sans-serif" font-size="18" font-weight="700">Capture</text>
      <text x="572" y="468" fill="${colors.steel}" font-family="Arial, sans-serif" font-size="24" font-weight="700">tccg.work</text>
    </svg>
  `);

  await sharp(panel)
    .composite([{ input: logoBuffer, left: 156, top: 116 }])
    .png()
    .toFile(outputPath);
}

async function createFaviconInput() {
  const trimmed = await sharp(faviconSource, { density: 384 })
    .flatten({ background: "#ffffff" })
    .trim({ background: "#ffffff", threshold: 10 })
    .png()
    .toBuffer();

  return sharp(trimmed)
    .extend({
      top: 34,
      right: 34,
      bottom: 34,
      left: 34,
      background: "#ffffff",
    })
    .png()
    .toBuffer();
}

async function createSafariMaskSvg() {
  const iconSvg = await readFile(iconSource, "utf8");
  const blackGroups = iconSvg.match(/<g fill="#000000">[\s\S]*?<\/g>/g) ?? [];
  const body = blackGroups.join("\n");

  return `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="150 135 200 200">
${body}
</svg>
`;
}

async function createCroppedIconSvg() {
  const iconSvg = await readFile(iconSource, "utf8");
  const body = iconSvg
    .replace(/<\?xml[^>]*>\s*/i, "")
    .replace(/<svg[^>]*>/i, "")
    .replace(/<\/svg>\s*$/i, "");

  return `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="150 135 200 200" preserveAspectRatio="xMidYMid meet">
${body.trim()}
</svg>
`;
}

async function createCroppedLogoSvg() {
  const iconSvg = await readFile(iconSource, "utf8");
  const body = iconSvg
    .replace(/<\?xml[^>]*>\s*/i, "")
    .replace(/<svg[^>]*>/i, "")
    .replace(/<\/svg>\s*$/i, "")
    .replace(/\s*<g fill="#ffffff">[\s\S]*?<\/g>/i, "");

  return `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="920" height="180" viewBox="0 0 920 180" preserveAspectRatio="xMidYMid meet">
  <svg x="0" y="18" width="144" height="144" viewBox="150 135 200 200" preserveAspectRatio="xMidYMid meet">
${body.trim()}
    <polygon points="302,282 337,282 319.5,250" fill="${colors.red}"/>
  </svg>
  <text x="164" y="108" fill="#646464" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700" letter-spacing="1.2">TC CONSTRUCTION GROUP</text>
</svg>
`;
}

function browserConfig() {
  return `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png?v=${brandVersion}"/>
      <TileColor>${colors.dark}</TileColor>
    </tile>
  </msapplication>
</browserconfig>
`;
}

function siteManifest() {
  return `${JSON.stringify(
    {
      name: "TCCG Work",
      short_name: "TCCG",
      description:
        "Work management and capture platform for TC Construction Group.",
      id: "/",
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: colors.page,
      theme_color: colors.dark,
      categories: ["business", "productivity", "utilities"],
      icons: [
        {
          src: `/android-chrome-192x192.png?v=${brandVersion}`,
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: `/android-chrome-512x512.png?v=${brandVersion}`,
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: `/maskable-icon-192x192.png?v=${brandVersion}`,
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: `/maskable-icon-512x512.png?v=${brandVersion}`,
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    null,
    2,
  )}\n`;
}

function createIco(entries) {
  const headerSize = 6;
  const directorySize = entries.length * 16;
  const imageOffset = headerSize + directorySize;
  const totalSize =
    imageOffset +
    entries.reduce((total, entry) => total + entry.buffer.length, 0);
  const ico = Buffer.alloc(totalSize);

  ico.writeUInt16LE(0, 0);
  ico.writeUInt16LE(1, 2);
  ico.writeUInt16LE(entries.length, 4);

  let directoryOffset = headerSize;
  let dataOffset = imageOffset;

  for (const entry of entries) {
    ico.writeUInt8(entry.size === 256 ? 0 : entry.size, directoryOffset);
    ico.writeUInt8(entry.size === 256 ? 0 : entry.size, directoryOffset + 1);
    ico.writeUInt8(0, directoryOffset + 2);
    ico.writeUInt8(0, directoryOffset + 3);
    ico.writeUInt16LE(1, directoryOffset + 4);
    ico.writeUInt16LE(32, directoryOffset + 6);
    ico.writeUInt32LE(entry.buffer.length, directoryOffset + 8);
    ico.writeUInt32LE(dataOffset, directoryOffset + 12);

    entry.buffer.copy(ico, dataOffset);
    directoryOffset += 16;
    dataOffset += entry.buffer.length;
  }

  return ico;
}
