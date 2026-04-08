import { useState, useEffect } from 'react';

export default function FloatingBtn() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <style>{`
        @keyframes ring {
          0%  { transform: rotate(0deg) scale(1); }
          10% { transform: rotate(-15deg) scale(1.1); }
          20% { transform: rotate(15deg) scale(1.1); }
          30% { transform: rotate(-10deg) scale(1.05); }
          40% { transform: rotate(10deg) scale(1.05); }
          50% { transform: rotate(0deg) scale(1); }
          100%{ transform: rotate(0deg) scale(1); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes zalo-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        .btn-phone { animation: ring 2s ease-in-out infinite; }
        .btn-zalo  { animation: zalo-bounce 1.8s ease-in-out infinite; }
        .pulse-ring {
          position: absolute; inset: 0; border-radius: 9999px;
          background: rgba(34,197,94,0.5);
          animation: pulse-ring 1.8s ease-out infinite;
        }
        .pulse-ring-2 {
          position: absolute; inset: 0; border-radius: 9999px;
          background: rgba(34,197,94,0.35);
          animation: pulse-ring 1.8s ease-out 0.6s infinite;
        }
        .pulse-ring-zalo {
          position: absolute; inset: 0; border-radius: 9999px;
          background: rgba(59,130,246,0.45);
          animation: pulse-ring 2s ease-out 0.3s infinite;
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* Zalo */}
        <div className="relative">
          <div className="pulse-ring-zalo" />
          <a
            href="https://zalo.me/0918738386"
            target="_blank"
            rel="noreferrer"
            className="btn-zalo relative bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
            title="Chat Zalo"
          >
            <span className="font-black text-xs tracking-tight">Zalo</span>
          </a>
        </div>

        {/* Phone */}
        <div className="relative">
          <div className="pulse-ring" />
          <div className="pulse-ring-2" />
          <a
            href="tel:0918738386"
            className="btn-phone relative bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
            title="Gọi 0918 73 83 86"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </a>
        </div>

        {/* Scroll to top */}
        {show && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gray-700 hover:bg-havico-blue text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors"
            title="Lên đầu trang"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"/>
            </svg>
          </button>
        )}
      </div>
    </>
  );
}
