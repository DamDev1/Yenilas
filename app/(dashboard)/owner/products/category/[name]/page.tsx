import { getProductsWithTotalInventory } from '@/lib/actions/product';
import Link from 'next/link';
import { ArrowLeft, Plus, Package } from 'lucide-react';
import ProductRowActions from '../../ProductRowActions';

export default async function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);
  
  const allProducts = await getProductsWithTotalInventory();
  
  const products = allProducts.filter((p: any) => 
    (p.category || 'Uncategorized') === categoryName
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <Link 
          href="/owner/products"
          className="p-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors shadow-sm self-start"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">{categoryName} Variants</h2>
          <p className="text-slate-500 font-medium mt-1">Manage colors, sizes, and stock for this category.</p>
        </div>
        <div className="sm:ml-auto">
          <Link 
            href="/owner/products/new" 
            className="flex items-center gap-2 bg-[#3B41E3] hover:bg-[#2A2FC3] text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-[0_4px_12px_-4px_rgba(59,65,227,0.5)] w-fit"
          >
            <Plus className="w-5 h-5" />
            <span>Add Variant</span>
          </Link>
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden shadow-sm border border-slate-100/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Color Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Left</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                        <Package className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="font-semibold text-slate-700">No variants found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
                  <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{product.name}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                        {product.brandId?.name || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">
                      <span className="bg-slate-100 px-2 py-1 rounded-md">{product.size || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{product.totalQuantity || 0}</td>
                    <td className="px-6 py-4 font-bold text-emerald-600">
                      ₦{product.sellingPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ProductRowActions productId={product._id.toString()} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
