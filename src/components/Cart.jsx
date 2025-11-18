import { useMemo } from 'react'

export default function Cart({ items, onClose, onCheckout }) {
  const total = useMemo(()=> items.reduce((s,i)=> s + i.price*i.qty, 0), [items])

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end">
      <div className="w-full sm:w-[380px] h-full bg-white shadow-xl flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Your Cart</h3>
          <button onClick={onClose} className="text-slate-600 hover:text-slate-800">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length===0 && <p className="text-slate-500">Your cart is empty.</p>}
          {items.map((it)=> (
            <div key={it._id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800">{it.name}</p>
                <p className="text-sm text-slate-500">${it.price.toFixed(2)} × {it.qty}</p>
              </div>
              <p className="font-semibold text-slate-800">${(it.price*it.qty).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-600">Total</span>
            <span className="font-semibold text-slate-800">${total.toFixed(2)}</span>
          </div>
          <button disabled={items.length===0} onClick={onCheckout} className="w-full bg-pink-600 disabled:opacity-50 hover:bg-pink-700 text-white font-medium py-2 rounded-md">Checkout</button>
        </div>
      </div>
    </div>
  )
}
