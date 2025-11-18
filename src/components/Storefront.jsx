import { useEffect, useMemo, useState } from 'react'
import ItemCard from './ItemCard'

function Storefront() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [menu, setMenu] = useState([])
  const [cart, setCart] = useState([])
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '', notes: '', fulfillment: 'pickup' })
  const [placing, setPlacing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(null)

  const fetchMenu = async () => {
    const res = await fetch(`${baseUrl}/api/items?available=true`)
    const data = await res.json()
    setMenu(data)
  }

  useEffect(() => { fetchMenu() }, [])

  const addToCart = (item) => {
    setCart(prev => {
      const found = prev.find(x => x.item_id === item.id)
      if (found) return prev.map(x => x.item_id === item.id ? { ...x, quantity: x.quantity + 1 } : x)
      return [...prev, { item_id: item.id, quantity: 1 }]
    })
  }

  const itemsDetailed = useMemo(() => {
    const map = Object.fromEntries(menu.map(m => [m.id, m]))
    return cart.map(c => ({ ...c, name: map[c.item_id]?.name, unit_price: map[c.item_id]?.price || 0, subtotal: (map[c.item_id]?.price || 0) * c.quantity }))
  }, [cart, menu])

  const totals = useMemo(() => {
    const subtotal = itemsDetailed.reduce((acc, it) => acc + it.subtotal, 0)
    return { subtotal, total: subtotal }
  }, [itemsDetailed])

  const placeOrder = async () => {
    setPlacing(true)
    try {
      const res = await fetch(`${baseUrl}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: itemsDetailed, customer }) })
      if (res.ok) {
        const data = await res.json()
        setOrderPlaced(data)
        setCart([])
      }
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Bakery</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {menu.map(item => (
              <ItemCard key={item.id} item={item} onAdd={addToCart} />
            ))}
          </div>
        </div>

        <div>
          <div className="bg-white/80 border border-slate-200 rounded-xl p-4 sticky top-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Your Order</h2>
            <div className="space-y-2">
              {itemsDetailed.length === 0 && <div className="text-slate-500 text-sm">No items yet</div>}
              {itemsDetailed.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div>{it.quantity}× {it.name}</div>
                  <div>${Number(it.subtotal).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="border-t my-3"></div>
            <div className="flex items-center justify-between font-semibold">
              <div>Total</div>
              <div>${Number(totals.total).toFixed(2)}</div>
            </div>

            <div className="mt-4 space-y-2">
              <input value={customer.name} onChange={e=>setCustomer(c=>({ ...c, name: e.target.value }))} className="border rounded-lg p-2 w-full" placeholder="Your name" />
              <input value={customer.email} onChange={e=>setCustomer(c=>({ ...c, email: e.target.value }))} className="border rounded-lg p-2 w-full" placeholder="Email (optional)" />
              <input value={customer.phone} onChange={e=>setCustomer(c=>({ ...c, phone: e.target.value }))} className="border rounded-lg p-2 w-full" placeholder="Phone (optional)" />
              <select value={customer.fulfillment} onChange={e=>setCustomer(c=>({ ...c, fulfillment: e.target.value }))} className="border rounded-lg p-2 w-full">
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
              </select>
              {customer.fulfillment === 'delivery' && (
                <input value={customer.address} onChange={e=>setCustomer(c=>({ ...c, address: e.target.value }))} className="border rounded-lg p-2 w-full" placeholder="Delivery address" />
              )}
              <textarea value={customer.notes} onChange={e=>setCustomer(c=>({ ...c, notes: e.target.value }))} className="border rounded-lg p-2 w-full" placeholder="Notes (optional)" />
              <button disabled={placing || itemsDetailed.length===0 || !customer.name} onClick={placeOrder} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg">
                {placing ? 'Placing...' : 'Place Order'}
              </button>
              {orderPlaced && (
                <div className="text-green-700 text-sm bg-green-50 border border-green-200 p-2 rounded">Order placed! #{orderPlaced.order_number}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Storefront
