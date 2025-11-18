import { useEffect, useState } from 'react'

export default function Catalog({ onAdd }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(()=>{
    const load = async()=>{
      try{
        const res = await fetch(`${baseUrl}/api/items`)
        const data = await res.json()
        setItems(data)
      }catch(e){
        setError('Failed to load items')
      }finally{
        setLoading(false)
      }
    }
    load()
  },[])

  if(loading) return <div className="p-6">Loading menu...</div>
  if(error) return <div className="p-6 text-red-600">{error}</div>

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item=> (
        <div key={item._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover"/>}
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-800">{item.name}</h3>
                <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>
              </div>
              <span className="font-semibold text-pink-600">${item.price.toFixed(2)}</span>
            </div>
            <button onClick={()=>onAdd(item)} className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 rounded-md">Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  )
}
