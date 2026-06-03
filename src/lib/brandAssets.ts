export const brandAssetVersion = "20260603";

export function versionedAsset(path: `/${string}`) {
  return `${path}?v=${brandAssetVersion}`;
}
