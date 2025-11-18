import { useEffect, useMemo, useState } from 'react'
import { BarChart3, CheckCircle2, ClipboardList, DollarSign, Plus, Trash2 } from 'lucide-react'

function NumberTile({ label, value }) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-xl border border-slate-200 p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="text-2xl font-bold text-slate-800 mt-1">{value}</div>
    </div>
  )
}

function AdminPanel() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [orders, setOrders] = useState([])
  const [analytics, setAnalytics] = useState(null)

  const [form, setForm] = useState({ name: '', price: '', category: '', description: '', image_url: '' })

  const fetchAll = async () => {
    const [iRes, oRes, aRes] = await Promise.all([
      fetch(`${baseUrl}/api/items`).then(r => r.json()),
      fetch(`${baseUrl}/api/orders`).then(r => r.json()),
      fetch(`${baseUrl}/api/analytics`).then(r => r.json()),
    ])
    setItems(iRes)
    setOrders(oRes)
    setAnalytics(aRes)
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const createItem = async (e) => {
    e.preventDefault()
    const payload = { ...form, price: Number(form.price), available: true }
    const res = await fetch(`${baseUrl}/api/items`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) {
      setForm({ name: '', price: '', category: '', description: '', image_url: '' })
      fetchAll()
    }
  }

  const deleteItem = async (id) => {
    const res = await fetch(`${baseUrl}/api/items/${id}`, { method: 'DELETE' })
    if (res.status === 204) fetchAll()
  }

  const updateStatus = async (id, status) => {
    const res = await fetch(`${baseUrl}/api/orders/${id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    if (res.ok) fetchAll()
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3"><ClipboardList /> Admin</h1>

      {analytics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <NumberTile label="Total Orders" value={analytics.total_orders} />
          <NumberTile label="Revenue" value={`$${analytics.total_revenue.toFixed(2)}`} />
          <NumberTile label="Top Item" value={analytics.top_items?.[0]?.name || '—'} />
          <NumberTile label="Today" value={analytics.by_day?.slice(-1)[0]?.orders || 0} />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><Plus /> Add Item</h2>
          <form onSubmit={createItem} className="bg-white/80 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input value={form.name} onChange={e=>setForm(f=>({ ...f, name: e.target.value }))} className="border rounded-lg p-2" placeholder="Name" required />
              <input value={form.price} onChange={e=>setForm(f=>({ ...f, price: e.target.value }))} className="border rounded-lg p-2" placeholder="Price" type="number" min="0" step="0.01" required />
            </div>
            <input value={form.category} onChange={e=>setForm(f=>({ ...f, category: e.target.value }))} className="border rounded-lg p-2 w-full" placeholder="Category" />
            <input value={form.image_url} onChange={e=>setForm(f=>({ ...f, image_url: e.target.value }))} className="border rounded-lg p-2 w-full" placeholder="Image URL" />
            <textarea value={form.description} onChange={e=>setForm(f=>({ ...f, description: e.target.value }))} className="border rounded-lg p-2 w-full" placeholder="Description" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Create</button>
          </form>

          <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-3">Menu</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {items.map(it => (
              <div key={it.id} className="bg-white/80 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{it.name}</div>
                  <div className="text-xs text-slate-500">${Number(it.price).toFixed(2)} • {it.category || '—'}</div>
                </div>
                <button onClick={()=>deleteItem(it.id)} className="text-red-600 hover:text-red-700 p-2"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><BarChart3 /> Orders</h2>
          <div className="space-y-3">
            {orders.map(o => (
              <div key={o.id} className="bg-white/80 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{o.order_number}</div>
                  <div className="text-blue-600 font-bold">${Number(o.total_amount).toFixed(2)}</div>
                </div>
                <div className="text-xs text-slate-500 mt-1">{o.customer?.name} • {o.customer?.fulfillment}</div>
                <div className="text-xs text-slate-500 mt-1">Status: {o.status}</div>
                <div className="mt-2 space-x-2">
                  {['pending','confirmed','completed','cancelled'].map(s => (
                    <button key={s} onClick={()=>updateStatus(o.id, s)} className={`text-xs px-2 py-1 rounded border ${o.status===s? 'bg-blue-600 text-white border-blue-600':'border-slate-300'}`}>{s}</button>
                  ))}
                </div>
                <ul className="mt-3 text-sm text-slate-700 list-disc pl-5">
                  {o.items.map((it, idx)=>(
                    <li key={idx}>{it.quantity}× {it.name} (${Number(it.unit_price).toFixed(2)})</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
