import { useEffect, useState } from 'react'

function Sprinkle({ className, style }) {
  return (
    <span
      className={
        'absolute inline-block w-2 h-6 rounded-full bg-pink-400/80 rotate-12 blur-[0.2px] animate-float ' +
        (className || '')
      }
      style={style}
    />
  )
}

function Cloud({ className }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="w-28 h-10 bg-white/80 rounded-full blur-sm shadow-sm" />
      <div className="w-10 h-10 bg-white/80 rounded-full -mt-6 ml-4 blur-sm shadow-sm" />
      <div className="w-16 h-16 bg-white/80 rounded-full -mt-10 ml-10 blur-sm shadow-sm" />
    </div>
  )
}

export default function Landing({ onStartShopping, onOpenAdmin }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-pink-200 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-200 rounded-full blur-3xl animate-pulse-slower" />
        <Cloud className="top-20 left-8 animate-cloud" />
        <Cloud className="top-36 right-12 animate-cloud-delayed" />
      </div>

      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 md:pt-24 md:pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur rounded-full px-3 py-1 border border-pink-200 text-pink-700 text-sm">
            <span>Freshly baked daily</span> <span>•</span> <span>Made with love</span>
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight text-slate-900">
            Sweet treats for every little celebration
          </h1>
          <p className="mt-4 text-slate-600 text-lg">
            From buttery croissants to dreamy cupcakes, place your order online and pick up or get it delivered.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onStartShopping} className="px-5 py-3 rounded-xl bg-pink-600 text-white shadow-lg shadow-pink-600/20 hover:bg-pink-700 transition">
              Shop the menu
            </button>
            <button onClick={onOpenAdmin} className="px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-50">
              Admin sign in
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {["https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=600&auto=format&fit=crop", "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=600&auto=format&fit=crop", "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=600&auto=format&fit=crop"].map((src, idx) => (
              <img key={idx} src={src} alt="bakery" className={`h-28 w-full object-cover rounded-2xl border border-white/70 shadow ${mounted ? 'animate-in-up' : ''}`} />
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative bg-white/80 backdrop-blur rounded-3xl border border-slate-200 p-5 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjdXBjYWtlc3xlbnwwfDB8fHwxNzYzNTAyODYyfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="cupcakes" className="rounded-2xl object-cover w-full h-64" />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Assorted Cupcakes</div>
                  <div className="text-sm text-slate-500">Box of 6 • $18.00</div>
                </div>
                <button onClick={onStartShopping} className="px-3 py-1.5 rounded-lg bg-pink-600 text-white text-sm hover:bg-pink-700">Add</button>
              </div>
            </div>

            <Sprinkle style={{ top: -10, left: -12 }} />
            <Sprinkle style={{ top: 12, right: -8 }} className="bg-yellow-400/80 rotate-45" />
            <Sprinkle style={{ bottom: -8, left: 20 }} className="bg-blue-400/80 -rotate-12" />
            <Sprinkle style={{ bottom: 24, right: -8 }} className="bg-emerald-400/80 rotate-[22deg]" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Made with love',
              text: 'Every order is handcrafted in our tiny home kitchen with the finest ingredients.',
              icon: '💖'
            },
            {
              title: 'Pickup or delivery',
              text: 'Choose what works best for you — we offer flexible pickup times and local delivery.',
              icon: '🚗'
            },
            {
              title: 'Custom requests',
              text: 'Need something special? Leave a note at checkout and we\'ll make it magic.',
              icon: '✨'
            }
          ].map((f, i) => (
            <div key={i} className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 p-6 hover:-translate-y-0.5 transition transform">
              <div className="text-3xl">{f.icon}</div>
              <div className="mt-2 font-semibold text-slate-800">{f.title}</div>
              <div className="text-slate-600 text-sm mt-1">{f.text}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
