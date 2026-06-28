const TECHS = [
  { name: 'Kubernetes', color: '#326CE5', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#326CE5" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="2" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="22" y2="12"/></svg> },
  { name: 'OpenTelemetry', color: '#f5a623', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#f5a623" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> },
  { name: 'Python', color: '#3776AB', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#3776AB" strokeWidth="1.5"><path d="M12 2C8 2 6 4 6 7v3h6v1H4c-2 0-4 2-4 5s2 5 4 5h2v-3c0-2 2-3 4-3h4c2 0 4-1 4-3V7c0-3-2-5-6-5z"/><path d="M12 22c4 0 6-2 6-5v-3h-6v-1h8c2 0 4-2 4-5s-2-5-4-5h-2v3c0 2-2 3-4 3H10c-2 0-4 1-4 3v5c0 3 2 5 6 5z"/></svg> },
  { name: 'Docker', color: '#2496ED', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#2496ED" strokeWidth="1.5"><rect x="2" y="10" width="3" height="3"/><rect x="6" y="10" width="3" height="3"/><rect x="10" y="10" width="3" height="3"/><rect x="10" y="6" width="3" height="3"/><rect x="14" y="10" width="3" height="3"/><path d="M18 12c1-2 3-2 4 0s-1 5-4 6H8c-3 0-6-2-6-5 0-2 1-3 2-3h1"/></svg> },
  { name: 'Terraform', color: '#7B42BC', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#7B42BC" strokeWidth="1.5"><polygon points="12,2 20,7 20,17 12,22 4,17 4,7"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="4" y1="7" x2="20" y2="17"/><line x1="20" y1="7" x2="4" y2="17"/></svg> },
  { name: 'AWS', color: '#FF9900', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#FF9900" strokeWidth="1.5"><path d="M6.5 15c-2-1-3-3-2.5-5 .3-1.2 1.2-2.2 2.5-2.5"/><path d="M17.5 15c2-1 3-3 2.5-5-.3-1.2-1.2-2.2-2.5-2.5"/><ellipse cx="12" cy="12" rx="5" ry="3"/><path d="M7 18c1.5 1 3 1.5 5 1.5s3.5-.5 5-1.5"/></svg> },
  { name: 'Azure', color: '#0089D6', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0089D6" strokeWidth="1.5"><path d="M13 3L4 19h6l3-6 3 6h4L13 3z"/></svg> },
  { name: 'Grafana', color: '#F46800', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#F46800" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="8,14 11,10 13,13 16,9"/></svg> },
  { name: 'Spark', color: '#E25A1C', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#E25A1C" strokeWidth="1.5"><path d="M13 2L3 14h8L9 22l12-12h-8L13 2z"/></svg> },
  { name: 'Ansible', color: '#EE0000', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#EE0000" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M9 17l7-10-4 8 4 2"/></svg> },
  { name: 'GitHub Actions', color: '#2088FF', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#2088FF" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> },
  { name: 'Helm', color: '#0F1689', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0F1689" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg> },
]

function MarqueeItem({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 px-9 border-r border-[#ececec] whitespace-nowrap text-[#444] text-sm font-medium h-[52px] hover:text-[#111] transition-colors cursor-default">
      <span className="w-[22px] h-[22px] flex items-center justify-center opacity-75 shrink-0">
        {icon}
      </span>
      {name}
    </div>
  )
}

export default function TechMarquee() {
  return (
    <div className="relative overflow-hidden
      before:absolute before:left-0 before:top-0 before:bottom-0 before:w-20 before:bg-gradient-to-r before:from-white before:to-transparent before:z-10 before:pointer-events-none
      after:absolute after:right-0 after:top-0 after:bottom-0 after:w-20 after:bg-gradient-to-l after:from-white after:to-transparent after:z-10 after:pointer-events-none">
      <div className="flex w-max marquee-track">
        {TECHS.map(t => <MarqueeItem key={t.name} name={t.name} icon={t.icon} />)}
        {TECHS.map(t => <MarqueeItem key={`${t.name}-2`} name={t.name} icon={t.icon} />)}
      </div>
    </div>
  )
}
