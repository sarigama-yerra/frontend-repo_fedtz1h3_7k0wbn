import { useState } from 'react'

export default function Navbar({ mode, setMode, cartCount, onOpenCart }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-pink-600 text-2xl">🥐</span>
          <span className="font-bold text-slate-800 text-lg">Home Bakery</span>
        </div>
        <nav className="hidden md:flex items-center gap-3">
          <button onClick={() => setMode('customer')} className={`px-3 py-1.5 rounded-md text-sm font-medium ${mode==='customer'?'bg-pink-600 text-white':'text-slate-700 hover:bg-slate-100'}`}>Customer</button>
          <button onClick={() => setMode('admin')} className={`px-3 py-1.5 rounded-md text-sm font-medium ${mode==='admin'?'bg-pink-600 text-white':'text-slate-700 hover:bg-slate-100'}`}>Admin</button>
          {mode==='customer' && (
            <button onClick={onOpenCart} className="relative px-3 py-1.5 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100">
              Cart
              {cartCount>0 && <span className="ml-2 inline-flex items-center justify-center text-xs bg-pink-600 text-white rounded-full px-2 py-0.5">{cartCount}</span>}
            </button>
          )}
        </nav>
        <button className="md:hidden" onClick={()=>setOpen(!open)}>☰</button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-3 space-y-2">
          <button onClick={() => {setMode('customer'); setOpen(false)}} className={`block w-full text-left px-3 py-2 rounded-md ${mode==='customer'?'bg-pink-600 text-white':'text-slate-700 hover:bg-slate-100'}`}>Customer</button>
          <button onClick={() => {setMode('admin'); setOpen(false)}} className={`block w-full text-left px-3 py-2 rounded-md ${mode==='admin'?'bg-pink-600 text-white':'text-slate-700 hover:bg-slate-100'}`}>Admin</button>
          {mode==='customer' && (
            <button onClick={() => {onOpenCart(); setOpen(false)}} className="block w-full text-left px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100">Cart {cartCount>0?`(${cartCount})`:''}</button>
          )}
        </div>
      )}
    </header>
  )
}
