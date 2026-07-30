import Image, { type ImageProps } from "next/image";

/**
 * Every placeholder photo renders through here so the underlying <img> always
 * carries data-placeholder="true" — makes find/replace with real client
 * photography trivial later.
 */
export default function PlaceholderImage(props: ImageProps) {
  return <Image {...props} data-placeholder="true" />;
}
