const PARTNERS = [
  { name: 'BIDV', color: '#005DAA', abbr: 'BIDV' },
  { name: 'ACB', color: '#0066CC', abbr: 'ACB' },
  { name: 'Vingroup', color: '#0F4F9E', abbr: 'Vingroup' },
  { name: 'Dân Trí', color: '#e2000b', abbr: 'DÂN TRÍ' },
  { name: 'VnExpress', color: '#006699', abbr: 'VnExpress' },
  { name: 'VOV', color: '#cc0000', abbr: 'VOV' },
];

export default function MediaSection() {
  return (
    <section className="py-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-label">Báo chí &amp; Đối tác</div>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {PARTNERS.map(m => (
            <div key={m.name}
              className="w-28 h-16 border border-gray-200 flex items-center justify-center hover:border-havico-blue hover:shadow-sm transition-all cursor-pointer">
              <span className="text-sm font-black tracking-tight" style={{ color: m.color }}>{m.abbr}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
