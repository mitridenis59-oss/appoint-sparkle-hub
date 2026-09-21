import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, CalendarPlus, ChevronRight, Search, UserPlus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import doctorElena from "@/assets/doctor-elena.jpg";
import doctorRadu from "@/assets/doctor-radu.jpg";
import doctorAna from "@/assets/doctor-ana.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Recepție — Aurora Medical" }, { name: "description", content: "Panoul operațional al Clinicii Aurora." },
    { property: "og:title", content: "Recepție — Aurora Medical" }, { property: "og:description", content: "Panoul operațional al Clinicii Aurora." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: Dashboard,
});

const appointments = [
  { time:"09:15", patient:"Andrei Popescu", detail:"Cardiologie · Dr. Elena Marin · Cabinet 3", status:"În curs", active:true },
  { time:"10:30", patient:"Maria Ionescu", detail:"Dermatologie · Dr. Radu Stan · Cabinet 5", status:"Confirmat" },
  { time:"11:15", patient:"Vasile Dumitru", detail:"Ortopedie · Dr. Ana Georgescu · Cabinet 2", status:"Programat" },
  { time:"12:00", patient:"Ioana Radu", detail:"Pediatrie · Dr. Mihai Luca · Cabinet 1", status:"Confirmat" },
];

function Dashboard() {
  const [modal, setModal] = useState<"appointment"|"patient"|null>(null);
  const doctors = [{name:"Dr. Elena Marin",specialty:"Cardiologie",image:doctorElena,status:"Disponibil"},{name:"Dr. Radu Stan",specialty:"Dermatologie",image:doctorRadu,status:"În consultație"},{name:"Dr. Ana Georgescu",specialty:"Ortopedie",image:doctorAna,status:"Disponibil"}];
  return <div className="mx-auto max-w-[1440px] p-5 md:p-8">
    <header className="rise delay-1 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div><p className="font-display text-[11px] font-medium uppercase tracking-[0.22em] text-primary">Recepție · Clinica Aurora</p><h1 className="mt-1 text-3xl font-semibold">Bună dimineața, Dana</h1></div>
      <div className="flex flex-wrap items-center gap-3"><div className="relative min-w-52 flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/><input className="h-10 w-full rounded-full bg-card/55 pl-10 pr-4 text-sm outline-none ring-1 ring-border backdrop-blur-xl focus:ring-primary xl:w-64" placeholder="Caută pacient, medic, dosar…"/></div><Button variant="glass" size="icon" className="relative rounded-full" aria-label="Notificări"><Bell/><span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-background"/></Button><Button size="pill" onClick={()=>setModal("appointment")}><CalendarPlus/>Programare rapidă</Button></div>
    </header>
    <section className="rise delay-2 mt-7 grid grid-cols-2 gap-4 xl:grid-cols-4">{[["Pacienți azi","42","▲ 6 față de ieri"],["Consultații","18","3 în așteptare"],["Ocupare","87%","program complet"],["Medici activi","9","2 în pauză"]].map(([l,v,n])=><article key={l} className="glass-panel rounded-xl p-4"><p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{l}</p><p className="mt-2 font-display text-3xl font-semibold">{v}</p><p className="mt-1 text-xs text-primary">{n}</p></article>)}</section>
    <section className="rise delay-3 mt-5 grid gap-5 xl:grid-cols-3">
      <article className="glass-panel rounded-xl p-5 xl:col-span-2"><div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold">Calendarul zilei</h2><p className="text-xs text-muted-foreground">Luni, 21 septembrie 2026</p></div><Button variant="quiet" size="sm">Zi</Button></div><div className="mt-4 grid gap-3">{appointments.map(a=><div key={a.time} className={`flex items-center gap-3 rounded-xl p-3 ring-1 ${a.active ? "bg-primary text-primary-foreground ring-primary" : "bg-card/55 ring-border"}`}><span className="w-12 font-display text-sm font-semibold">{a.time}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{a.patient}</p><p className={`truncate text-[11px] ${a.active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{a.detail}</p></div><span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${a.active ? "bg-card/20" : "bg-secondary/60"}`}>{a.status}</span></div>)}</div></article>
      <article className="glass-panel rounded-xl p-5"><h2 className="text-lg font-semibold">Următoarele consultații</h2><div className="mt-4 space-y-3">{doctors.map((d,i)=><div key={d.name} className="flex items-center gap-3 rounded-xl bg-card/55 p-3 ring-1 ring-border transition-transform hover:-translate-y-0.5"><img src={d.image} alt={d.name} width={816} height={816} loading="lazy" className="size-10 rounded-full object-cover"/><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{appointments[i]?.patient}</p><p className="truncate text-[11px] text-muted-foreground">{appointments[i]?.time} · {d.name}</p></div><span className="text-[11px] text-primary">{i===0?"Acum":appointments[i]?.time}</span></div>)}</div></article>
    </section>
    <section className="rise delay-4 mt-5 grid gap-5 xl:grid-cols-3">
      <article className="glass-panel rounded-xl p-5 xl:col-span-2"><div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Medici disponibili</h2><Button variant="ghost" size="sm" asChild><Link to="/medici">Vezi toți <ChevronRight/></Link></Button></div><div className="mt-4 grid gap-3 sm:grid-cols-3">{doctors.map(d=><div key={d.name} className="rounded-xl bg-card/55 p-3 ring-1 ring-border"><div className="flex items-center gap-2"><img src={d.image} alt={d.name} width={816} height={816} loading="lazy" className="size-10 rounded-full object-cover"/><div className="min-w-0"><p className="truncate text-sm font-medium">{d.name}</p><p className="text-[11px] text-muted-foreground">{d.specialty}</p></div></div><span className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-primary"><span className="size-1.5 rounded-full bg-primary"/>{d.status}</span></div>)}</div></article>
      <article className="glass-panel rounded-xl p-5"><h2 className="text-lg font-semibold">Notificări</h2><div className="mt-4 space-y-4">{["Dr. Marin a confirmat consultația de 09:15.","Rezultatul Mariei Ionescu este disponibil.","Cabinetul 4 este rezervat pentru ora 14:00."].map((n,i)=><div key={n} className="flex gap-3"><span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${i===0?"bg-primary":"bg-secondary"}`}/><p className="text-xs leading-relaxed text-muted-foreground">{n}</p></div>)}</div></article>
    </section>
    {modal && <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/25 p-4 backdrop-blur-sm" onMouseDown={()=>setModal(null)}><div className="glass-panel w-full max-w-md rounded-xl bg-background p-6 shadow-2xl" onMouseDown={(e)=>e.stopPropagation()}><h2 className="text-xl font-semibold">{modal==="appointment"?"Programare rapidă":"Pacient nou"}</h2><p className="mt-1 text-sm text-muted-foreground">Completează datele esențiale pentru a continua.</p><div className="mt-5 space-y-3"><input className="h-11 w-full rounded-lg bg-card px-4 text-sm ring-1 ring-border outline-none focus:ring-primary" placeholder="Nume pacient"/><input className="h-11 w-full rounded-lg bg-card px-4 text-sm ring-1 ring-border outline-none focus:ring-primary" placeholder="Telefon"/>{modal==="appointment"&&<select className="h-11 w-full rounded-lg bg-card px-4 text-sm ring-1 ring-border outline-none"><option>Cardiologie · Dr. Elena Marin</option><option>Dermatologie · Dr. Radu Stan</option></select>}</div><div className="mt-6 flex justify-end gap-2"><Button variant="ghost" onClick={()=>setModal(null)}>Anulează</Button><Button onClick={()=>setModal(null)}>Salvează</Button></div></div></div>}
    <Button className="fixed bottom-5 right-5 rounded-full shadow-lg md:hidden" size="pill" onClick={()=>setModal("patient")}><UserPlus/>Pacient</Button>
  </div>;
}