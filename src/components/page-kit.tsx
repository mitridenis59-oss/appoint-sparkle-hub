import { Search, SlidersHorizontal, Download, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type PageConfig = { eyebrow: string; title: string; description: string; action: string; stats: Array<{label:string;value:string;note:string}>; columns: string[]; rows: string[][] };

export function DataPage({ config }: { config: PageConfig }) {
  return <div className="mx-auto max-w-[1440px] p-5 md:p-8">
    <header className="rise delay-1 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div><p className="font-display text-[11px] font-medium uppercase tracking-[0.22em] text-primary">{config.eyebrow}</p><h1 className="mt-1 text-3xl font-semibold">{config.title}</h1><p className="mt-1 max-w-2xl text-sm text-muted-foreground">{config.description}</p></div>
      <Button size="pill"><Plus />{config.action}</Button>
    </header>
    <section className="rise delay-2 mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{config.stats.map((stat)=><article key={stat.label} className="glass-panel rounded-xl p-4"><p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{stat.label}</p><p className="mt-2 font-display text-3xl font-semibold">{stat.value}</p><p className="mt-1 text-xs text-primary">{stat.note}</p></article>)}</section>
    <section className="glass-panel rise delay-3 mt-5 overflow-hidden rounded-xl">
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/><input className="h-10 w-full rounded-full bg-card/55 pl-10 pr-4 text-sm outline-none ring-1 ring-border focus:ring-primary" placeholder="Caută în listă…" /></div>
        <Button variant="glass" size="pill"><SlidersHorizontal />Filtre</Button><Button variant="glass" size="pill"><Download />Export</Button>
      </div>
      <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-secondary/25 text-[11px] uppercase text-muted-foreground"><tr>{config.columns.map(c=><th key={c} className="px-5 py-3 font-medium">{c}</th>)}<th className="w-14" /></tr></thead><tbody>{config.rows.map((row,i)=><tr key={i} className="border-t border-border/70 transition-colors hover:bg-card/60">{row.map((cell,j)=><td key={j} className="px-5 py-4"><span className={j===row.length-1 ? "rounded-full bg-secondary/55 px-2.5 py-1 text-xs" : j===0 ? "font-medium" : "text-muted-foreground"}>{cell}</span></td>)}<td><Button variant="ghost" size="icon" aria-label="Mai multe"><MoreHorizontal/></Button></td></tr>)}</tbody></table></div>
    </section>
  </div>;
}