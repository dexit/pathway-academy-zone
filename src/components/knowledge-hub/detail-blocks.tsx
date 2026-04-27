import type { Block } from "./detail-content"

export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose prose-paz">
      {blocks.map((block, idx) => (
        <BlockRenderer key={idx} block={block} />
      ))}
    </div>
  )
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>
    case "h2":
      return (
        <h2 id={slugify(block.text)}>
          {block.text}
        </h2>
      )
    case "h3":
      return <h3 id={slugify(block.text)} className="text-2xl font-bold text-foreground mb-4 mt-8 scroll-mt-24">{block.text}</h3>
    case "ul":
      return (
        <ul className="space-y-3 list-disc list-inside text-muted-foreground leading-relaxed mb-8">
          {block.items.map((item, i) => (
            <li key={i} className="pl-2">
              {item}
            </li>
          ))}
        </ul>
      )
    case "ol":
      return (
        <ol className="space-y-3 list-decimal list-inside text-muted-foreground leading-relaxed mb-8">
          {block.items.map((item, i) => (
            <li key={i} className="pl-2">
              {item}
            </li>
          ))}
        </ol>
      )
    case "table":
      return (
        <div className="my-10 overflow-x-auto rounded-3xl border border-border shadow-sm">
          <table className="w-full text-sm md:text-base border-collapse">
            <thead className="bg-muted/50">
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left font-bold px-6 py-4 text-foreground border-b border-border">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="hover:bg-muted/20 transition-colors">
                  {row.map((cell, c) => (
                    <td key={c} className="px-6 py-4 align-top text-muted-foreground border-b border-border/50">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case "cards":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
          {block.items.map((card, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-xl text-foreground mb-3">{card.title}</h4>
              <p className="text-muted-foreground leading-relaxed text-sm">{card.body}</p>
            </div>
          ))}
        </div>
      )
    case "callout":
      return (
        <div className="p-8 my-10 rounded-[2.5rem] bg-primary/5 border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
          <h4 className="font-bold text-xl text-primary mb-3">{block.title}</h4>
          <p className="text-muted-foreground leading-relaxed">{block.body}</p>
        </div>
      )
    case "stats":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
          {block.items.map((s, i) => (
            <div key={i} className="rounded-3xl bg-primary text-primary-foreground p-8 text-center shadow-lg shadow-primary/10">
              <div className="text-4xl md:text-5xl font-bold mb-2">{s.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-70">{s.label}</div>
            </div>
          ))}
        </div>
      )
    case "steps":
      return (
        <ol className="space-y-6 my-10">
          {block.items.map((step, i) => (
            <li key={i} className="flex gap-6 items-start group">
              <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-accent/10 text-accent-foreground flex items-center justify-center font-bold text-lg group-hover:bg-accent group-hover:text-primary-foreground transition-colors">
                {i + 1}
              </span>
              <div className="pt-2">
                <h4 className="font-bold text-xl text-foreground mb-2">{step.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      )
    case "quote":
      return (
        <blockquote className="my-10 border-l-4 border-primary pl-8 py-2 italic text-muted-foreground text-xl leading-relaxed">
          &ldquo;{block.text}&rdquo;
        </blockquote>
      )
  }
}
