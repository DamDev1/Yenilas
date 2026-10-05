'use client';
import Link from 'next/link';
import { Package, Droplet, Layers } from 'lucide-react';

export default function ProductCards({ products }: { products: any[] }) {
  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const cat = product.category || 'Uncategorized';
    if (!acc[cat]) {
      acc[cat] = {
        name: cat,
        totalQuantity: 0,
        totalValue: 0,
        variants: [],
        colors: new Set(),
        sizes: new Set(),
      };
    }
    const qty = product.totalQuantity || 0;
    const price = product.sellingPrice || 0;
    acc[cat].totalQuantity += qty;
    acc[cat].totalValue += (qty * price);
    acc[cat].variants.push(product);
    acc[cat].colors.add(product.name);
    if (product.size) {
      acc[cat].sizes.add(product.size);
    }
    return acc;
  }, {} as Record<string, any>);

  const categories = Object.values(groupedProducts);

  return (
    <>
      {categories.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center text-slate-500 border border-slate-100/50">
           <div className="flex flex-col items-center justify-center">
             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
               <Package className="w-8 h-8 text-slate-400" />
             </div>
             <p className="font-semibold text-slate-700">No products found</p>
             <p className="text-sm">Click "Add Product" to add your first paint variant.</p>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat: any) => (
            <Link 
              key={cat.name} 
              href={`/owner/products/category/${encodeURIComponent(cat.name)}`}
              className="glass rounded-3xl p-6 border border-slate-100/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all cursor-pointer group hover:border-blue-200 block"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Droplet className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full w-fit">
                    {cat.colors.size} Colors
                  </div>
                  {cat.sizes.size > 0 && (
                    <div className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full w-fit border border-emerald-100">
                      {Array.from(cat.sizes).join(', ')}
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{cat.name}</h3>
              <p className="text-slate-500 font-medium mb-6">Paint Category</p>
              
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Layers className="w-4 h-4" />
                    <span className="font-medium text-sm">Total Stock</span>
                  </div>
                  <span className="text-base font-bold text-slate-900">{cat.totalQuantity.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="w-4 h-4 flex items-center justify-center font-bold text-emerald-600">₦</span>
                    <span className="font-medium text-sm">Total Value</span>
                  </div>
                  <span className="text-base font-bold text-emerald-600">₦{cat.totalValue.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
