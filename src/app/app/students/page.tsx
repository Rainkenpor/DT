import { Key, ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode } from "react"

export default async function Students() {
  const res = await fetch('https://dummyjson.com/products', { next: { revalidate: 10 } })
  const data = await res.json()
  
  return (
    <div >
    {data.products.map((product: any) => (
      <div key={product.id}>
        {product.title} 
      </div>
        ))}
    </div>
  )
}