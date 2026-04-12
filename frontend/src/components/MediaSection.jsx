import ACB from '../../assets/partner/ACB.jpg';
import BIDV from '../../assets/partner/bidv.jpg';
import Techcombank from '../../assets/partner/techcombank.jpg';
import Vingroup from '../../assets/partner/vingroup.jpg';

const PARTNERS = [
  { name: 'ACB', img: ACB },
  { name: 'BIDV', img: BIDV },
  { name: 'Techcombank', img: Techcombank },
  { name: 'Vingroup', img: Vingroup },
];

export default function MediaSection() {
  return (
    <section className="py-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-label">Báo chí &amp; Đối tác</div>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {PARTNERS.map(p => (
            <div key={p.name}
              className="w-44 h-24 border border-gray-200 flex items-center justify-center hover:border-havico-blue hover:shadow-sm transition-all overflow-hidden">
              <img src={p.img} alt={p.name} className="max-w-full max-h-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
