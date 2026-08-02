/**
 * Section 7 — the atmosphere carousel.
 *
 * The photographs live in the project's Vercel Blob store rather than in the
 * repo: the originals are multi-megabyte camera files. Each entry here is a
 * blob pathname; only the slug varies, so the host is written once.
 *
 * To change the selection: resize to 1600px on the long edge, replace the
 * contents of `atmosphere/` in the store, and regenerate the list below.
 * The carousel steps five at a time and wraps modulo the count, so keep the
 * count and 5 coprime if every photograph should reach every position.
 *
 * Slugs assigned to the networking table cards (a92a6791, a92a6879, a92a6981)
 * live in lib/placeholders.ts and are intentionally omitted here so they do
 * not also appear in the gallery carousel. They stay in the blob store even
 * when they are not part of the carousel selection.
 */
export const ATMOSPHERE_BLOB_BASE =
  "https://5mimhywtvsblan4k.public.blob.vercel-storage.com/atmosphere";

/** Blob URL for a resized atmosphere / tables photograph by slug. */
export const clientPhoto = (slug: string) =>
  `${ATMOSPHERE_BLOB_BASE}/${slug}.jpg`;

const SLUGS = [
  "a92a6861",
  "a92a6924",
  "a92a6944",
  "a92a6958",
  "a92a6976",
  "a92a6979",
  "a92a6983",
  "a92a6993",
  "a92a7025",
  "a92a7031",
  "a92a7040",
  "a92a7080",
  "a92a7103",
  "a92a7134",
  "a92a7148",
  "img-5494",
  "img-5496",
  "img-5512",
  "img-5523",
  "img-5525",
  "img-5532",
  "img-5535",
  "img-5537",
  "img-5545",
  "img-5551",
  "img-5567",
  "img-5581",
  "img-5611",
  "img-5613",
  "img-5677",
  "img-5688",
  "img-5714",
  "img-5749",
  "img-5780",
];

export type AtmospherePhoto = { src: string; alt: string };

export const atmospherePhotos: AtmospherePhoto[] = SLUGS.map((slug) => ({
  src: clientPhoto(slug),
  // The shoot is not catalogued per-frame, so the alt text describes the set
  // rather than inventing a description of each photograph.
  alt: "OOT Tastings olive oil tasting — table, pours and guests",
}));
