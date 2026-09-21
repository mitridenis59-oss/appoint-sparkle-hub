import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { BarChart3, CalendarDays, ChevronLeft, HeartPulse, LayoutDashboard, Mail, Menu, Settings, Stethoscope, UsersRound, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { to: "/", label: "Acasă", icon: LayoutDashboard },
  { to: "/programari", label: "Programări", icon: CalendarDays },
  { to: "/pacienti", label: "Pacienți", icon: UsersRound },
  { to: "/medici", label: "Medici", icon: Stethoscope },
  { to: "/servicii", label: "Servicii", icon: HeartPulse },
  { to: "/rapoarte", label: "Rapoarte", icon: BarChart3 },
  { to: "/mesaje", label: "Mesaje", icon: Mail },
  { to: "/setari", label: "Setări", icon: Settings },
  { to: "/portal", label: "Portal", icon: WalletCards },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_8%_0%,color-mix(in_oklab,var(--secondary)_55%,transparent),transparent_28%),radial-gradient(circle_at_100%_40%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_25%)]" />
      <div className="relative flex min-h-screen">
        <aside className={cn("fixed inset-y-0 left-0 z-40 border-r border-border bg-card/55 backdrop-blur-xl transition-[width] duration-300 md:sticky", expanded ? "w-56" : "w-[76px]")}> 
          <div className="flex h-full flex-col items-center py-5">
            <div className="mb-7 flex w-full items-center justify-center gap-3 px-4">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary font-display text-lg font-semibold text-primary-foreground">A</div>
              {expanded && <span className="min-w-0 font-display text-lg font-semibold">Aurora</span>}
            </div>
            <nav className="flex w-full flex-col gap-1.5 px-4">
              {navigation.map((item) => {
                const active = path === item.to;
                const Icon = item.icon;
                return <Link key={item.to} to={item.to} title={!expanded ? item.label : undefined} className={cn("flex h-11 items-center rounded-xl transition-all hover:-translate-y-0.5", expanded ? "gap-3 px-3" : "justify-center", active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground")}>
                  <Icon className="size-4 shrink-0" />{expanded && <span className="text-xs font-medium">{item.label}</span>}
                </Link>;
              })}
            </nav>
            <div className="mt-auto flex flex-col items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setExpanded((value) => !value)} aria-label={expanded ? "Restrânge meniul" : "Extinde meniul"}>{expanded ? <ChevronLeft /> : <Menu />}</Button>
              <div className="grid size-10 place-items-center rounded-full bg-foreground font-display text-sm font-semibold text-background">DR</div>
            </div>
          </div>
        </aside>
        <main className={cn("min-w-0 flex-1 transition-[padding] md:pl-0", expanded ? "pl-56" : "pl-[76px]")}>{children}</main>
      </div>
    </div>
  );
}