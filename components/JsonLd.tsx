/**
 * Renders a JSON-LD block. Server component — the payload is serialised at
 * render time and ships in the HTML, which is what crawlers need.
 *
 * `<` is escaped so a stray closing tag inside any string value cannot break
 * out of the script element.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
