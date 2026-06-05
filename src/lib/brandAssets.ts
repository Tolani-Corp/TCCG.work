export const brandAssetVersion = "20260605";

export function versionedAsset(path: `/${string}`) {
  return `${path}?v=${brandAssetVersion}`;
}
