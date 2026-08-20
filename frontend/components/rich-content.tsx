import { PortableText, type PortableTextComponents } from '@portabletext/react';

/** Minimal shapes for the content produced by the Studio's built-in table editor. */
export type RichBlock = { _type: string; _key?: string; [key: string]: unknown };
export type TableCell = { _key?: string; _type: 'cell'; value?: RichBlock[] };
export type TableRow = { _key?: string; _type: 'row'; cells?: TableCell[] };
export type TableBlock = {
  _key?: string;
  _type: 'table';
  headerRows?: number;
  rows?: TableRow[];
};

/** True when the content contains at least one non-empty table. */
export function hasTable(content?: RichBlock[] | null): boolean {
  return Boolean(
    content?.some(
      (b) =>
        b._type === 'table' &&
        Array.isArray((b as TableBlock).rows) &&
        ((b as TableBlock).rows?.length ?? 0) > 0,
    ),
  );
}

const cellComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="[&:not(:first-child)]:mt-1">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
  },
};

function CellContent({ cell }: { cell: TableCell }) {
  if (!cell.value?.length) return null;
  return <PortableText value={cell.value} components={cellComponents} />;
}

export function TableBlockView({ value }: { value: TableBlock }) {
  const rows = value.rows ?? [];
  if (rows.length === 0) return null;
  const headerCount = Math.min(Math.max(value.headerRows ?? 0, 0), rows.length);
  const head = rows.slice(0, headerCount);
  const body = rows.slice(headerCount);

  return (
    <div className="my-8 overflow-hidden rounded-lg border border-border bg-card first:mt-0">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {head.length > 0 && (
            <thead className="bg-brand-soft text-left">
              {head.map((row, i) => (
                <tr key={row._key ?? `h-${i}`}>
                  {row.cells?.map((cell, j) => (
                    <th
                      key={cell._key ?? `h-${i}-${j}`}
                      scope="col"
                      className="px-4 py-3 text-sm font-semibold text-foreground whitespace-nowrap"
                    >
                      <CellContent cell={cell} />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          )}
          <tbody>
            {body.map((row, i) => (
              <tr key={row._key ?? `r-${i}`} className="border-t border-border">
                {row.cells?.map((cell, j) => (
                  <td
                    key={cell._key ?? `r-${i}-${j}`}
                    className={`px-4 py-3 align-top text-foreground/80 ${
                      j === 0 ? 'font-medium text-foreground' : ''
                    }`}
                  >
                    <CellContent cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const richComponents: PortableTextComponents = {
  types: {
    table: ({ value }) => <TableBlockView value={value as TableBlock} />,
  },
  block: {
    normal: ({ children }) => (
      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground [&:not(:first-child)]:mt-4">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-semibold first:mt-0 md:text-3xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold first:mt-0">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 max-w-3xl list-disc space-y-1.5 pl-6 text-muted-foreground">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 max-w-3xl list-decimal space-y-1.5 pl-6 text-muted-foreground">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href ?? '#';
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="font-medium text-brand-deep underline underline-offset-4 hover:text-foreground"
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

/** Renders rich content (paragraphs, sub-headings and tables) edited in the Studio. */
export function RichContent({ value }: { value: RichBlock[] }) {
  return <PortableText value={value} components={richComponents} />;
}
