import { ShoppingCart } from 'lucide-react'

function ItemCard({ item, onAdd }) {
  return (
    <div className="bg-white/90 backdrop-blur rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {item.image_url && (
        <img src={item.image_url} alt={item.name} className="h-40 w-full object-cover" />
      )}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">{item.name}</h3>
            {item.category && <p className="text-xs text-slate-500 mt-1">{item.category}</p>}
          </div>
          <div className="text-blue-600 font-bold">${Number(item.price).toFixed(2)}</div>
        </div>
        {item.description && (
          <p className="text-sm text-slate-600 mt-2 line-clamp-3">{item.description}</p>
        )}
        <button
          onClick={() => onAdd(item)}
          disabled={!item.available}
          className="mt-4 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-3 py-2 rounded-lg transition"
        >
          <ShoppingCart size={18} /> Add to cart
        </button>
      </div>
    </div>
  )
}

export default ItemCard
