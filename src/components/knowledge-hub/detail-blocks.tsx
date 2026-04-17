import type { Block } from "./detail-content"

export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, idx) => (
        <BlockRenderer key={idx} block={block} />
      ))}
    </div>
  )
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{block.text}</p>
    case "h2":
      return (
        <h2 className="text-2xl md:text-3xl font-bold text-foreground pt-4 border-t border-border">
          {block.text}
        </h2>
      )
    case "h3":
      return <h3 className="text-xl font-semibold text-foreground">{block.text}</h3>
    case "ul":
      return (
        <ul className="space-y-2 list-disc list-inside text-muted-foreground leading-relaxed">
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      )
    case "ol":
      return (
        <ol className="space-y-2 list-decimal list-inside text-muted-foreground leading-relaxed">
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              {item}
            </li>
          ))}
        </ol>
      )
    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm md:text-base">
            <thead className="bg-secondary">
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left font-semibold px-4 py-3 text-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-border">
                  {row.map((cell, c) => (
                    <td key={c} className="px-4 py-3 align-top text-muted-foreground">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {block.items.map((card, i) => (
            <div key={i} className="p-5 rounded-xl bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-2">{card.title}</h4>
              <p className="text-muted-foreground leading-relaxed text-sm">{card.body}</p>
            </div>
          ))}
        </div>
      )
    case "callout":
      return (
        <div className="p-6 rounded-xl bg-secondary border border-border">
          <h4 className="font-bold text-foreground mb-2">{block.title}</h4>
          <p className="text-muted-foreground leading-relaxed">{block.body}</p>
        </div>
      )
    case "stats":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {block.items.map((s, i) => (
            <div key={i} className="rounded-xl bg-primary text-primary-foreground p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold">{s.value}</div>
              <div className="text-sm opacity-80 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      )
    case "steps":
      return (
        <ol className="space-y-4">
          {block.items.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                {i + 1}
              </span>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      )
    case "quote":
      return (
        <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
          &ldquo;{block.text}&rdquo;
        </blockquote>
      )
  }
}
