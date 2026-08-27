/**
 * A structured-data block for search engines. It is inert markup, not
 * executable page JS: the browser never runs a script of this type, Google
 * only parses it.
 *
 * `<` is escaped because JSON.stringify leaves it alone, and a caption
 * containing `</script>` would otherwise close the tag early and spill the
 * rest of the payload into the document as live markup.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
