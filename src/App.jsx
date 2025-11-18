import { useState } from 'react'
import Storefront from './components/Storefront'
import AdminPanel from './components/AdminPanel'
import Landing from './components/Landing'

function App() {
  const [mode, setMode] = useState('landing')

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50">
      <header className="bg-white/70 backdrop-blur border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧁</span>
            <div className="text-xl font-extrabold text-slate-900">Home Bakery</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setMode('landing')} className={`px-3 py-1.5 rounded-lg text-sm border ${mode==='landing' ? 'bg-pink-600 text-white border-pink-600' : 'border-slate-300 hover:bg-slate-50'}`}>Home</button>
            <button onClick={()=>setMode('customer')} className={`px-3 py-1.5 rounded-lg text-sm border ${mode==='customer' ? 'bg-pink-600 text-white border-pink-600' : 'border-slate-300 hover:bg-slate-50'}`}>Shop</button>
            <button onClick={()=>setMode('admin')} className={`px-3 py-1.5 rounded-lg text-sm border ${mode==='admin' ? 'bg-pink-600 text-white border-pink-600' : 'border-slate-300 hover:bg-slate-50'}`}>Admin</button>
          </div>
        </div>
      </header>
      {mode === 'landing' && (
        <Landing onStartShopping={() => setMode('customer')} onOpenAdmin={() => setMode('admin')} />
      )}
      {mode === 'customer' && <Storefront />}
      {mode === 'admin' && <AdminPanel />}
    </div>
  )
}

export default App
