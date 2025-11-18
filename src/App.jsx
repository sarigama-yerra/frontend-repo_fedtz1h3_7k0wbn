import { useState } from 'react'
import Storefront from './components/Storefront'
import AdminPanel from './components/AdminPanel'

function App() {
  const [mode, setMode] = useState('customer')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-slate-900">Home Bakery</div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setMode('customer')} className={`px-3 py-1.5 rounded-lg text-sm border ${mode==='customer' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300'}`}>Customer</button>
            <button onClick={()=>setMode('admin')} className={`px-3 py-1.5 rounded-lg text-sm border ${mode==='admin' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300'}`}>Admin</button>
          </div>
        </div>
      </header>
      {mode === 'customer' ? <Storefront /> : <AdminPanel />}
    </div>
  )
}

export default App
