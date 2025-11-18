import { useEffect, useMemo, useState } from 'react'

export default function AdminDashboard(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async()=>{
    setLoading(true)
    try{
      const url = filter? `${baseUrl}/api/orders?status=${encodeURIComponent(filter)}`: `${baseUrl}/api/orders`
      const res = await fetch(url)
      const data = await res.json()
      setOrders(data)
    }catch(e){
      setError('Failed to load orders')
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{load()},[filter])

  const totals = useMemo(()=>({
    count: orders.length,
    revenue: orders.reduce((s,o)=> s + (o.total_amount||0), 0)
  }), [orders])

  const changeStatus = async (id, status)=>{
    await fetch(`${baseUrl}/api/orders/${id}/status?status=${encodeURIComponent(status)}`,{method:'PATCH'})
    load()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Orders</h2>
        <select value={filter} onChange={e=>setFilter(e.target.value)} className="border rounded-md px-3 py-2">
          <option value="">All statuses</option>
          {['pending','confirmed','preparing','ready','delivered','cancelled'].map(s=> <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-slate-500">Orders</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">{totals.count}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-slate-500">Revenue</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">${totals.revenue.toFixed(2)}</p>
        </div>
      </div>

      {loading? <p>Loading...</p>: error? <p className="text-red-600">{error}</p> : (
        <div className="overflow-x-auto bg-white border rounded-lg">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="text-left p-3">Order ID</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Items</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o=> (
                <tr key={o._id} className="border-t">
                  <td className="p-3 font-mono text-xs">{o._id}</td>
                  <td className="p-3">{o.customer?.name}<br/><span className="text-slate-500 text-xs">{o.customer?.email}</span></td>
                  <td className="p-3">
                    <ul className="list-disc pl-4">
                      {o.items?.map((i,idx)=> <li key={idx}>{i.name} × {i.quantity}</li>)}
                    </ul>
                  </td>
                  <td className="p-3 font-semibold">${o.total_amount?.toFixed(2)}</td>
                  <td className="p-3"><span className="px-2 py-1 rounded bg-slate-100">{o.status}</span></td>
                  <td className="p-3 space-x-2">
                    {['confirmed','preparing','ready','delivered','cancelled'].map(s=> (
                      <button key={s} onClick={()=>changeStatus(o._id, s)} className="text-xs px-2 py-1 border rounded hover:bg-slate-50">{s}</button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Analytics baseUrl={baseUrl} />
    </div>
  )
}

function Analytics({ baseUrl }){
  const [data, setData] = useState(null)
  useEffect(()=>{(async()=>{
    const res = await fetch(`${baseUrl}/api/analytics/sales`)
    const d = await res.json()
    setData(d)
  })()},[])
  if(!data) return null
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Sales by status</h3>
        <ul className="space-y-1">
          {data.by_status?.map((s)=> (
            <li key={s.status} className="flex justify-between"><span className="capitalize">{s.status}</span><span>${s.revenue.toFixed(2)} ({s.orders})</span></li>
          ))}
        </ul>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Totals</h3>
        <p className="text-slate-700">Orders: <b>{data.totals?.orders}</b></p>
        <p className="text-slate-700">Revenue: <b>${data.totals?.revenue.toFixed(2)}</b></p>
      </div>
    </div>
  )
}
